import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const { name, interviewers, interviewer, onSave, onCancel } = props;

  const [ StudentName, setStudentName ] = useState(name || "");
  const [ InterviewerId, setInterviewerId ] = useState(interviewer || null);
  const [ error, setError ] = useState("");

  const reset = () => {
    setStudentName("");
    setInterviewerId(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  function validate() {
    if (StudentName === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!InterviewerId) {
      setError("Please select an interviewer");
      return;
    }
  
    setError("");
    onSave(StudentName, InterviewerId);
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={interviewers} interviewer={InterviewerId} setInterviewer={setInterviewerId} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );

}