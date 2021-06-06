import React from "react";
import { isMobile } from "../../App";

type typeProfile = {
  name: string;
  age: number;
  birthday: string;
  PR: string;
  uid: string;
  profileId: string;
};

const editButton: React.FC<typeProfile> = (props) => {
  return (
    <div>
      <input type="text" />
    </div>
  );
};

export default editButton;
