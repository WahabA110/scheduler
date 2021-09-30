import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, day, setDay } = props;

  const parsedDays = days.map(eachDay => <DayListItem key={eachDay.id} name={eachDay.name} setDay={setDay} spots={eachDay.spots} selected={day === eachDay.name} />)

  return (
    <ul>
      { parsedDays }
    </ul>
  )

}