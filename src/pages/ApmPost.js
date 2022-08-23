import "./ApmPost.css";
import axios from "axios";
import { useState } from "react";
import { SettingsPhoneSharp } from "@mui/icons-material";

const ApmPost = (props) => {
  const [postToApm, setPostToApm] = useState("");
  const [postToApmData, setPostToApmData] = useState("");

  const postApmHandler = () => {
    axios.get("http://10.78.151.41:9095/hibi/hibiwatcher").then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        setPostToApm("successfully started the watcher");
      }
    });
  };

  const postToApmDataApiHandler = () => {
    axios.post("http://10.78.151.41:9095/hibi/taskIdFrames").then((res) => {
      if (res.status === 200) {
        axios.get("http://10.78.151.41:9095/hibi/hibimaster").then((res) => {
          if (res.data) {
            axios.get("http://10.78.151.41:9095/hibi/apmPost").then((res) => {
              let jsonData = JSON.stringify(res.data);
              let parseJson = JSON.parse(jsonData);
              setPostToApmData(parseJson.status);
            }).catch(err=>{
              setPostToApmData(err.message)
            });
          }
        }).catch(err=>{
          console.log("master ",err.message)
          setPostToApmData(err.message)
        });
      }
    }).catch(err=>{
      console.log("err ",err)
      setPostToApmData(err.message)
    });
  };
  return (
    <div className="post__apm__data_hibi">
      <section className="apm_post__data">
        <span className="text__header_h3">
          start processing the images in Hibi
        </span>
        <button className="apm__post__button" onClick={postApmHandler}>
          Start HIBI watcher process
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
