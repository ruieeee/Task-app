import { FormControl, List, TextField } from "@material-ui/core";
import React, { useState, useEffect, ReactEventHandler } from "react";
import { db } from "./firebase";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import TaskItem from "./TaskItem";
import styles from "./App.module.css";
import { makeStyles } from "@material-ui/styles";
import { auth } from "./firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";

export const isMobile = () => {
  var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return window.navigator.userAgent.search(regexp) !== -1;
};

const useStyles = makeStyles({
  filed: {
    marginTop: 30,
    marginButtom: 20,
  },
  list: {
    margin: "auto",
    width: "50%",
  },
  list2: {
    margin: "auto",
    width: "90%",
  },
});

const App: React.FC = (props: any) => {
  const [tasks, setTacks] = useState([{ id: "", title: "", userId: "" }]);
  //複数のタスクのオブジェクトが入ってくるから配列で初期化

  const [input, setInput] = useState("");
  const classes = useStyles();
  const user = auth.currentUser?.displayName;
  const uid = auth.currentUser?.uid;

  const tasksFilter = tasks.filter((task) => {
    return task.userId == uid;
  });

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTacks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          userId: doc.data().userId,
        }))
      );
    });
    return () => unSub();
    //snapshotのfirebase側の監視を終わらせる->サブスクリプションを停止させる->停止させるための関数:db.collectionの返り値
    //クリーンナップ関数でunSubを呼ぶ
  }, []);

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    let docData = { title: input, userId: uid };
    db.collection("tasks")
      .doc("task " + input)
      .set(docData)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    setInput("");
  };

  return (
    <div className={styles.app__root}>
      <h1>{isMobile() ? "mobile" : "PC"}</h1>
      <br />
      <Link to="/profile">プロフィール</Link>
      <br />
      <h1>Todo App by React/firebase</h1>
      <br />
      <h3>{user}</h3>
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
      <MediaQuery query="(min-width: 1000px)">
        <List className={classes.list}>
          {tasksFilter.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              userId={task.userId}
            />
          ))}
        </List>
      </MediaQuery>
      <MediaQuery query="(max-width: 1000px)">
        <List className={classes.list2}>
          {tasksFilter.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              userId={task.userId}
            />
          ))}
        </List>
      </MediaQuery>
    </div>
  );
};

export default App;
