import { FormControl, List, TextField } from "@material-ui/core";
import React, { useState, useEffect, ReactEventHandler } from "react";
import { db } from "./firebase";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import TaskItem from "./TaskItem";
import styles from "./App.module.css";
import { makeStyles } from "@material-ui/styles";
import { auth } from "./firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  filed: {
    marginTop: 30,
    marginButtom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: React.FC = (props: any) => {
  const [tasks, setTacks] = useState([{ id: "", title: "" }]);
  //複数のタスクのオブジェクトが入ってくるから配列で初期化

  const [input, setInput] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTacks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
    //snapshotのfirebase側の監視を終わらせる->サブスクリプションを停止させる->停止させるための関数:db.collectionの返り値
    //クリーンナップ関数でunSubを呼ぶ
  }, []);

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({ title: input });
    setInput("");
  };

  return (
    <div className={styles.app__root}>
      <h1>Todo App by React/firebase</h1>
      <button
        className={styles.app__logout}
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push("login");
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        <ExitToAppIcon />
      </button>
      <br />
      <FormControl>
        <TextField
          className={classes.filed}
          label="New task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button disabled={!input} onClick={newTask} className={styles.app__icon}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
