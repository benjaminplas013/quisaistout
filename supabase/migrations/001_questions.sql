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

CREATE INDEX idx_questions_mode ON questions(mode);
CREATE INDEX idx_questions_category ON questions(category);
