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

CREATE INDEX idx_couples_user_id ON couples(user_id);
CREATE INDEX idx_couple_history_couple_id ON couple_history(couple_id);
CREATE INDEX idx_game_sessions_user_id ON game_sessions(user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER couples_updated_at
  BEFORE UPDATE ON couples
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
