DROP DATABASE IF EXISTS api_development;
CREATE DATABASE api_development;

\c api_development;

CREATE TABLE models (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  attribute INTEGER,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);


INSERT INTO models ( name, attribute )
VALUES ( 'test', 1 );

DROP DATABASE IF EXISTS api_test;
CREATE DATABASE api_test;

\c api_test;

CREATE TABLE models (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  attribute INTEGER,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);
