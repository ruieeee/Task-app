import React, { useState, useEffect, ReactEventHandler } from "react";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from "./firebase";
import styles from "./TaskItem.module.css";
import { makeStyles } from "@material-ui/styles";
import MediaQuery from "react-responsive";
import { isMobile } from "./App";

const useStyles = makeStyles({
  item: {},
  filed: {
    marginTop: 30,
    marginButtom: 20,
    marginLeft: 20,
  },
  grid: {
    width: "50%",
  },
});

interface Props {
  id: string;
  title: string;
  userId: string;
}

const TaskItem: React.FC<Props> = (props) => {
  const [title, setTitle] = useState(props.title);
  const classes = useStyles();

  const editTask = () => {
    db.collection("tasks")
      .doc(props.id)
      .set({ title: title, userId: props.userId }, { merge: true }); //titleだけを変更する場合merge: true
    isMobile() && window.location.reload();
  };
  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };

  return (
    <div>
      <MediaQuery query="(max-width: 1000px)">
        <h2 className={styles.break}>・{props.title}</h2>
      </MediaQuery>
      <ListItem>
        <MediaQuery query="(min-width: 1000px)">
          <h2 className={styles.break2}>・{props.title}</h2>
        </MediaQuery>
        <br />
        <Grid container justify="center" className={styles.grid}>
          <TextField
            className={classes.filed}
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
    </div>
  );
};

export default TaskItem;
