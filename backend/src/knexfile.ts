import type { Knex } from 'knex';
import { DatabaseKeys } from './../keys';

const keys:DatabaseKeys = new DatabaseKeys();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: keys.host,
      port: 3306,
      user: keys.user,
      password: keys.password,
      database: keys.database
    },
    migrations: {
      directory: './migrations',
      extension: 'ts',
    }
  }
};

export default config;