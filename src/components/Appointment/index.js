import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const { id, interview, interviewers, bookInterview, cancelInterview } = props;
  

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = 'CONFIRM';
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function onSave(name, interviewer) {
  
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE);

    bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((err) => {
      console.log("error: ", err);
      transition(ERROR_SAVE, true);
    });
  };

  function onDelete() {

    transition(DELETE, true);

    cancelInterview(id)
    .then(() => {
      transition(EMPTY);
    })
    .catch((err) => {
      console.log("error: ", err);
      transition(ERROR_DELETE, true);
    });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)} />}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={back} onSave={onSave} />}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onConfirm={onDelete} onCancel={back}/>}
      {mode === EDIT && <Form name={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onCancel={back} onSave={onSave} />}
      {mode === ERROR_SAVE && <Error message={"Could not create appointment"} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"Could not cancel appointment"} onClose={back} />}
    </article>
  );

}