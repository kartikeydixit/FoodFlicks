import React, { useState } from "react";
import "./CreateCanteen.css";
const CreateCanteen = () => {
  const [data, setData] = useState({
    name: "",
    location: "",
    menu: [],
  });
  return (
    <div>
      <form>
        <input placeholder="Enter Canteen Name" />
        <input placeholder="Enter Location" />
      </form>
    </div>
  );
};

export default CreateCanteen;
