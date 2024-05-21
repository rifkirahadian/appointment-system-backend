import { Appointment } from './appointment.entity';

export const appointmentsProviders = [
  {
    provide: 'APPOINTMENTS_REPOSITORY',
    useValue: Appointment,
  },
];
