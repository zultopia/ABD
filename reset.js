const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'grbadmin',
  password: 'password',
  database: 'grb',
  multipleStatements: true // Enable multiple statements
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }

  console.log('Connected as id ' + connection.threadId);

  // Drop all tables
  connection.query('SET FOREIGN_KEY_CHECKS = 0', function(error, results, fields) {
    if (error) {
      console.error('Error disabling foreign key checks: ' + error.stack);
      return;
    }

    connection.query('SHOW TABLES', function(error, results, fields) {
      if (error) {
        console.error('Error fetching tables: ' + error.stack);
        return;
      }

      results.forEach(function(result) {
        const tableName = result[`Tables_in_${connection.config.database}`];
        connection.query(`DROP TABLE IF EXISTS ${tableName}`, function(error, results, fields) {
          if (error) {
            console.error('Error dropping table ' + tableName + ': ' + error.stack);
            return;
          }
          console.log('Dropped table ' + tableName);
        });
      });

      connection.query('SET FOREIGN_KEY_CHECKS = 1', function(error, results, fields) {
        if (error) {
          console.error('Error enabling foreign key checks: ' + error.stack);
          return;
        }
        console.log('All tables dropped successfully.');

        connection.end(function(err) {
          if (err) {
            console.error('Error disconnecting: ' + err.stack);
            return;
          }
          console.log('Disconnected.');
        });
      });
    });
  });
});
