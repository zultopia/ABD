```sh
mariadb -u root -p
CREATE DATABASE grb;
CREATE USER 'grbadmin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON grb.* TO 'grbadmin'@'localhost';
FLUSH PRIVILEGES;
EXIT;

sudo systemctl start mariadb
```

```sh
npm install
npm run dev
```
