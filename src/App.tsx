import { FormControl, List, TextField } from "@material-ui/core";
import React, { useState, useEffect, ReactEventHandler } from "react";
import "./App.css";
import { db } from "./firebase";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import TaskItem from "./TaskItem";

const App: React.FC = () => {
  const [tasks, setTacks] = useState([{ id: "", title: "" }]);
  //複数のタスクのオブジェクトが入ってくるから配列で初期化

  const [input, setInput] = useState("");

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
    <div className="App">
      <h1>Todo App by React/firebase</h1>
      <FormControl>
        <TextField
          label="New task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
