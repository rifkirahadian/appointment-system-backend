export default () => ({
  appointment: {
    slot: {
      duration: process.env.APPOINTMENT_SLOT_DURATION
        ? parseInt(process.env.APPOINTMENT_SLOT_DURATION)
        : 30,
      max: process.env.APPOINTMENT_SLOT_MAX
        ? parseInt(process.env.APPOINTMENT_SLOT_MAX)
        : 1,
    },
  },
});
