
export function getAppointmentsForDay(state, day) {

  const foundDay = state.days.find(oneDay => oneDay.name === day)

  if(state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  
  const foundAppointments = foundDay.appointments.map(id => state.appointments[id])

  return foundAppointments;
  
}
