import { DataSource } from 'typeorm';
import { EntityName } from './entity-name.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'my_database',
  synchronize: true,
  logging: false,
  entities: [EntityName],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('❌ Error during Data Source initialization:', err);
  });
