#!/bin/bash

#Pi-Projekt Postgresql Skript


sudo apt-get  update
sudo apt-get install postgresql postgresql-contrib
pg_lsclusters

sudo -u postgres psql -c "CREATE USER pi WITH PASSWORD 'buddybibi';"
sudo -u postgres psql -c "ALTER USER pi WITH SUPERUSER; "
sudo -u postgres psql -c "ALTER USER pi WITH CREATEROLE;"
sudo -u postgres psql -c "ALTER USER pi WITH CREATEDB;" 
sudo -u postgres psql -c "CREATE DATABASE app; "
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE app to pi;"
sudo -u postgres psql -d app -c "CREATE TABLE sensor(id SERIAL PRIMARY KEY, temperature NUMERIC(4, 1) NOT NULL, humidity NUMERIC(4, 1) NOT NULL, time timestamp without time zone NOT NULL);"