// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'knex_shopping',
      user:     'jacemi',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'knex_shopping',
      user:     'jacemi',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};


// var knex = require('knex')({
//   client: 'pg',
//   version: '7.2',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'your_database_password',
//     database: 'myapp_test'
//   }
// });