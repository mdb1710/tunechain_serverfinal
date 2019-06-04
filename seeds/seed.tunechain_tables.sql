INSERT INTO saved_searches (id, user_mood, user_genre)
VALUES
  (1, 'sad', 'soul'),
  (2, 'happy',  'rock');
  
 ALTER SEQUENCE IF EXISTS saved_searches_id_seq RESTART WITH 3; 