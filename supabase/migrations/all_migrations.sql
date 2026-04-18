-- ══════════════════════════════════════════════
-- 1. QUESTIONS
-- ══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  q TEXT NOT NULL,
  a TEXT NOT NULL,
  w TEXT[] NOT NULL,
  category TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('general', 'kids', 'duo', 'bombe')),
  fun_fact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_mode ON questions(mode);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);

-- ══════════════════════════════════════════════
-- 2. CHALLENGES COUPLE
-- ══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('solo', 'duo', 'question')),
  intensity INTEGER NOT NULL CHECK (intensity BETWEEN 1 AND 5),
  category TEXT NOT NULL,
  emoji TEXT,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_challenges_intensity ON challenges(intensity);
CREATE INDEX IF NOT EXISTS idx_challenges_category ON challenges(category);

-- ══════════════════════════════════════════════
-- 3. COUPLES & HISTORIQUE
-- ══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS couples (
  id TEXT PRIMARY KEY,
  player1_name TEXT NOT NULL,
  player2_name TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS couple_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id TEXT REFERENCES couples(id) ON DELETE CASCADE,
  challenge_id INTEGER REFERENCES challenges(id),
  status TEXT NOT NULL CHECK (status IN ('completed', 'skipped', 'refused')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mode TEXT NOT NULL,
  players TEXT[] NOT NULL,
  winner TEXT,
  score_data JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_couples_user_id ON couples(user_id);
CREATE INDEX IF NOT EXISTS idx_couple_history_couple_id ON couple_history(couple_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_id ON game_sessions(user_id);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS couples_updated_at ON couples;
CREATE TRIGGER couples_updated_at
  BEFORE UPDATE ON couples
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ══════════════════════════════════════════════
-- 4. SÉCURITÉ (RLS)
-- ══════════════════════════════════════════════

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "questions_public_read" ON questions;
DROP POLICY IF EXISTS "questions_admin_write" ON questions;
CREATE POLICY "questions_public_read" ON questions FOR SELECT USING (true);
CREATE POLICY "questions_admin_write" ON questions FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "challenges_public_read" ON challenges;
DROP POLICY IF EXISTS "challenges_admin_write" ON challenges;
CREATE POLICY "challenges_public_read" ON challenges FOR SELECT USING (true);
CREATE POLICY "challenges_admin_write" ON challenges FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "couples_select" ON couples;
DROP POLICY IF EXISTS "couples_insert" ON couples;
DROP POLICY IF EXISTS "couples_update" ON couples;
CREATE POLICY "couples_select" ON couples FOR SELECT USING (true);
CREATE POLICY "couples_insert" ON couples FOR INSERT WITH CHECK (true);
CREATE POLICY "couples_update" ON couples FOR UPDATE USING (true);

ALTER TABLE couple_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "couple_history_all" ON couple_history;
CREATE POLICY "couple_history_all" ON couple_history FOR ALL USING (true);

ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "game_sessions_own" ON game_sessions;
CREATE POLICY "game_sessions_own" ON game_sessions FOR ALL
  USING (user_id = auth.uid() OR user_id IS NULL);
