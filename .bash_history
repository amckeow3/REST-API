vi _prepare_server.sh
ls -lah
chmod 744 _prepare_server.sh
ls -lah
./_prepare_server.sh 
mysql_secure_installation
curl https://www.w3resource.com/sql/sample-database-of-sql-in-mysql-format.txt --output db.sql
ls
mysql -u root -p
mysql -u root -p sample < db.sql
mkdir server
pwd
cd server
npm init -y && npm i mariadb express
ls
vi server.js
vi swagger.json
node server.js
npm i swagger-ui-express
node server.js
vi server.js
vi swagger.json
vi server/js
