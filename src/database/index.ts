import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserType1724673366564 } from './migrations/1724673366564-UserType';
import { CreateUsers1724673355604 } from './migrations/1724673355604-CreateUsers';
import { User } from '../entities/User';
import { UserType } from '../entities/UserType';

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'dpg-cr65lqbv2p9s73amvtfg-a.oregon-postgres.render.com',
  port: 5432,
  username: 'esig',
  password: '7ZcVfg9MWMwGfqTpXC0pqiij5qfoc744',
  database: 'esigchallenge',
  synchronize: true,
  logging: false,
  // migrations: ['src/database/migrations/*.ts'],
  migrations: [UserType1724673366564, CreateUsers1724673355604],
  entities: [User, UserType],
  subscribers: [],
  ssl: {
    rejectUnauthorized: true,
  },
};

export default new DataSource(options);