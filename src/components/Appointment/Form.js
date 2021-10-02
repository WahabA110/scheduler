import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { action } from "@storybook/addon-actions/dist/preview";

export default function Form(props) {

  const { name, interviewers, interviewer, onSave, onCancel } = props;

  const [ StudentName, setStudentName ] = useState(name || "");
  const [ InterviewerId, setInterviewerId ] = useState(interviewer || null);

  const reset = () => {
    setStudentName("")
    setInterviewerId(null)
  }

  const cancel = () => {
    reset()
    onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={StudentName}
            onChange={(event) => setStudentName(event.target.value)}
          />
        </form>
        <InterviewerList interviewers={interviewers} interviewer={InterviewerId} setInterviewer={setInterviewerId} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => onSave(StudentName, InterviewerId)}>Save</Button>
        </section>
      </section>
    </main>
  );

}