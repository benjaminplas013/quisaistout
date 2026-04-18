-- Questions: lecture publique, écriture réservée aux admins
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "questions_public_read" ON questions FOR SELECT USING (true);
CREATE POLICY "questions_admin_write" ON questions FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Challenges: lecture publique
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "challenges_public_read" ON challenges FOR SELECT USING (true);
CREATE POLICY "challenges_admin_write" ON challenges FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Couples: lecture/écriture par le proprio ou en anonyme (par ID)
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
CREATE POLICY "couples_select" ON couples FOR SELECT USING (true);
CREATE POLICY "couples_insert" ON couples FOR INSERT WITH CHECK (true);
CREATE POLICY "couples_update" ON couples FOR UPDATE USING (true);

-- Couple history: lecture/écriture publique (liée au couple par ID)
ALTER TABLE couple_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "couple_history_all" ON couple_history FOR ALL USING (true);

-- Game sessions: lecture/écriture par le proprio
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "game_sessions_own" ON game_sessions FOR ALL
  USING (user_id = auth.uid() OR user_id IS NULL);
