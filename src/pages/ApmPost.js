import "./ApmPost.css";
import axios from "axios";
import { useState } from "react";

const ApmPost = (props) => {
  const [postToApm, setPostToApm] = useState("");
  const [postToApmData, setPostToApmData] = useState("");

  const postApmHandler = () => {
    axios.get("http://localhost:9095/hibi/hibiwatcher").then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        setPostToApm("successfully started the watcher");
      }
    });
  };

  const postToApmDataApiHandler = () => {
    axios.post("http://localhost:9095/hibi/taskIdFrames").then((res) => {
      console.log(res);
      if (res.status === 200) {
        axios.get("http://localhost:9095/hibi/hibimaster").then((res) => {
          if (res.data) {
            axios.get("http://localhost:9095/hibi/apmPost").then((res) => {
              let jsonData = JSON.stringify(res.data);
              let parseJson = JSON.parse(jsonData);
              console.log("json Data is ", parseJson);
              setPostToApmData(parseJson.status);
            });
          }
        });
      }
    });
  };
  return (
    <div className="post__apm__data_hibi">
      <section className="apm_post__data">
        <span className="text__header_h3">
          start processing the images in Hibi
        </span>
        <button className="apm__post__button" onClick={postApmHandler}>
          Start Hibi watcher process
        </button>
        <span className="succesful_validation__apm">{postToApm}</span>
      </section>
      <section className="apm_post__data__data">
        <button className="apm__post__button" onClick={postToApmDataApiHandler}>
          Start HIBI to APM Process
        </button>
        <span className="succesful_validation__apm">{postToApmData}</span>
      </section>
    </div>
  );
};

export default ApmPost;
