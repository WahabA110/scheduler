import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const { interviewers, interviewer, setInterviewer } = props;

  const parsedInterviewers = interviewers.map(eachInterviewer => <InterviewerListItem key={eachInterviewer.id} id={eachInterviewer.id} name={eachInterviewer.name} avatar={eachInterviewer.avatar} selected={eachInterviewer.id === interviewer} setInterviewer={(event) => setInterviewer(eachInterviewer.id)} />)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">interviewer</h4>
      <ul className="interviewers__list">{ parsedInterviewers }</ul>
    </section>
  );
}