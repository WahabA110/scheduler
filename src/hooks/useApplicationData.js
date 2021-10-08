import { useEffect, useState } from "react";
import axios from "axios";

export function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  function updateSpots(appointmentId, newAppointments) {

    // figure out what day you just updated
    const updatedDayIndex = state.days.findIndex((day) => {
      return (day.appointments.indexOf(appointmentId) > -1);
    })

    const updatedDay = state.days[updatedDayIndex]
    // figure out which appointments belong to the day

    const appointmentIdsOnDay = updatedDay.appointments;

    const appointmentsOnDay = appointmentIdsOnDay.map((appointmentId) => {

      return newAppointments[appointmentId];

    })

    // figure out which appointments are null

    const spotsRemaining = appointmentsOnDay.filter((appointment) => {

      return appointment.interview === null;

    })

    const numOfSpots = spotsRemaining.length

    // recreate and return new days object with new spots

    const newDays = [...state.days]

    newDays[updatedDayIndex].spots = numOfSpots;

    return newDays;

  }

  // used to book the interview
  function bookInterview(appointmentId, interview) {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: { ...interview }
    };
    
    const newAppointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${appointmentId}`, {interview})
    .then(() => {
      const newDays = updateSpots(appointmentId, newAppointments);
      setState({...state, appointments: newAppointments, days: newDays});
    })
  } 


  // used to cancel the interview
  function cancelInterview(appointmentId) {

    const appointment = {
      ...state.appointments[appointmentId],
      interview: null
    };

    const newAppointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${appointmentId}`)
    .then(() => {
      const newDays = updateSpots(appointmentId, newAppointments);
      setState({...state, appointments: newAppointments, days: newDays});
    })
  }


  // function used to set the day to book appointments
  const setDay = day => setState({ ...state, day });


  // grabs data from server and sets it into state
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview };

}