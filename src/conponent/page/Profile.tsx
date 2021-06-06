import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import styles from "../../App.module.css";
import editButton from "../parts/editButton";

//https://usagi.hatenablog.jp/entry/2020/07/16/235337
//型 'JSX.IntrinsicElements' に存在しません。の問題解決
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       editButton: React.DetailedHTMLProps<
//         React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//     }
//   }
// }

export const isMobile = () => {
  var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return window.navigator.userAgent.search(regexp) !== -1;
};

type typeProfile = {
  name: string;
  age: number;
  birthday: string;
  PR: string;
  uid: string;
  profileId: string;
};

const Profile: React.FC = (props: any) => {
  const uid = auth.currentUser?.uid;
  const [profile, setprofile] = useState([
    { name: "", age: 0, birthday: "", PR: "", uid: "", profileId: "" },
  ]);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    const unSub = db.collection("Profiles").onSnapshot((snapshot) => {
      setprofile(
        snapshot.docs.map((doc) => ({
          name: doc.data().name,
          age: doc.data().age,
          birthday: doc.data().birthday,
          PR: doc.data().PR,
          uid: doc.data().uid,
          profileId: doc.id,
        }))
      );
    });

    return () => unSub();
    //snapshotのfirebase側の監視を終わらせる->サブスクリプションを停止させる->停止させるための関数:db.collectionの返り値
    //クリーンナップ関数でunSubを呼ぶ
  }, []);

  const profileData: typeProfile = profile[0];
  //   console.log(Data);

  return (
    <div className={styles.app__root}>
      <h1>{isMobile() ? "mobile" : "PC"}</h1>
      <br />
      <h1>プロフィール</h1>
      <p>名前：{profileData.name}</p>
      <p>年齢：{profileData.age}</p>
      <p>誕生日：{profileData.birthday}</p>
      <p>自己紹介：{profileData.PR}</p>
    </div>
  );
};

export default Profile;
