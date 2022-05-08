# Wetterstation
## Installation
Zur Installtion werden Superuser-Rechte angenommen.
### Nodejs
Als Webserver wird Nodejs verwendet. Das wird im Terminal zusammen mit NPM (Node Package Manager) mit folgenden Befehlen installiert:
1. ``apt-get update``
2. ``apt-get install -y nodejs``
3. ``apt-get install -y npm``

NPM ist dabei notwendig um die Pakete, mit denen das Programm arbeitet zu installieren.
### PostgreSQL
Zur Installation und Konfiguration von PostgreSQL muss man nur das Script postgres_script.sh ausführen. Dafür muss das Skript die nötigen Rechte haben, die man mit ``chmod 777`` vergibt. Danach führt man es mit ``./postgres_script.sh`` aus. Abschließend kann man noch den Autostart des Skripts mit ``systemctl enable postgresql`` einrichten.
### Projekt
Im Terminal muss lediglich der Befehl ``npm install`` ausgeführt werden.

**Nun ist der Server einsatzbereit.**
## Ausführung
Zum Ausführen des Servers muss man diesen mit Nodejs starten.
Hierfür wird der Befehl ``node app.js`` verwendet. Dabei muss man entweder im Projektverzeichnis sein oder ``app.js`` durch den korrekten Pfad ersetzen.
