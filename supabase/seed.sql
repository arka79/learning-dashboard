-- Run this in Supabase > SQL Editor to set up your courses table

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL DEFAULT 'BookOpen',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow anon reads (for this demo)
CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);

-- Seed data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Code2'),
  ('System Design Fundamentals', 42, 'Cpu'),
  ('PostgreSQL Mastery', 88, 'Database'),
  ('TypeScript Deep Dive', 31, 'Layers');
