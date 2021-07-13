import React from "react";
import { Card } from "reactstrap";
//css
import inputstyles from "../../assets/css/inputimage.module.css";

const InputImage = () => {
  return (
    <div className={inputstyles.container}>
      {/**Create label for styling */}
      <div className={inputstyles.imagecontainer}>
        <Card className={inputstyles.imagebox}>
          <img
            className="img-fluid"
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="red sneakers"
          />
        </Card>
      </div>
      <div>
        <label htmlFor="fileupload" className={inputstyles.customfileupload}>
          Add image
        </label>
        <input id="fileupload" type="file" className={inputstyles.fileinput} />
      </div>
    </div>
  );
};

export default InputImage;
