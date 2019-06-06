CREATE TABLE IF NOT EXISTS saved_searches (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_mood TEXT NOT NULL,
  user_genre TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
  
);