export default () => ({
  appointment: {
    slot: {
      duration: process.env.APPOINTMENT_SLOT_DURATION
        ? parseInt(process.env.APPOINTMENT_SLOT_DURATION)
        : 30,
    },
  },
});
