import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');


export default function DayListItem(props) {

  const { name, spots, selected, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });

  const spotsAvailable = () => {
    if (!spots) {
      return "no spots remaining"
    }
    if (spots === 1) {
      return "1 spot remaining"
    }
    return `${spots} spots remaining`

  }

  return (
    <li data-testid="day" className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{spotsAvailable()}</h3>
    </li>
  );
}
