```sh
mariadb -u root -p
CREATE DATABASE grb;
CREATE USER 'grbadmin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON grb.* TO 'grbadmin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```sh
sudo systemctl start mariadb
# or if you are a windows user, do run the executeables of mysqld
```

```sh
npm install
npm run dev
```
