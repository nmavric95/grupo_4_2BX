module.exports = {
  "development": {
    "username": "root",
    "password": 'root',
    "database": "2bx",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "dialectOptions": {
      "socketPath": "/Applications/MAMP/tmp/mysql/mysql.sock"
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
