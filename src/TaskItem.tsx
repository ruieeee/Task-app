import React, { useState, useEffect, ReactEventHandler } from "react";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from "./firebase";
import styles from "./TaskItem.module.css";

interface Props {
  id: string;
  title: string;
}

const TaskItem: React.FC<Props> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true }); //titleだけを変更する場合merge: true
  };
  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };

  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justify="flex-end">
        <TextField
          label="Edit Task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Grid>
      <button onClick={editTask} className={styles.taskitem__icon}>
        <EditOutlinedIcon />
      </button>
      <button onClick={deleteTask} className={styles.taskitem__icon}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </ListItem>
  );
};

export default TaskItem;
