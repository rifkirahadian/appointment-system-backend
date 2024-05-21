import { Sequelize } from 'sequelize-typescript';
import { Appointment } from 'src/appointment/entities/appointment.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '.db/data.sqlite3',
      });
      sequelize.addModels([Appointment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
