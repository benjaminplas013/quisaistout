CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('solo', 'duo', 'question')),
  intensity INTEGER NOT NULL CHECK (intensity BETWEEN 1 AND 5),
  category TEXT NOT NULL,
  emoji TEXT,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_challenges_intensity ON challenges(intensity);
CREATE INDEX idx_challenges_category ON challenges(category);
