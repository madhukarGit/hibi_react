import "./ApmPost.css";
import axios from "axios";
import { useState } from "react";
import { SettingsPhoneSharp } from "@mui/icons-material";

const ApmPost = (props) => {
  const [postToApm, setPostToApm] = useState("");
  const [postToApmData, setPostToApmData] = useState("");
  const [loading, setIsLoading] = useState(false);

  const postApmHandler = async() => {
    try{
        const res = await axios.get("http://10.78.151.41:9095/hibi/hibiwatcher")
        if(res.status === 200){
          setPostToApm("successfully started the watcher")
        }
    }catch(err){
      const res = await axios.get("http://10.78.151.41:9095/hibi/hibiwatcher")
        if(res.status === 200){
          setPostToApm("successfully started the watcher")
        }
    }
  };

  // const postToApmDataApiHandler = () => {
  //   axios.post("http://10.78.151.41:9095/hibi/taskIdFrames").then((res) => {
  //     if (res.status === 200) {
  //       axios.get("http://10.78.151.41:9095/hibi/hibimaster").then((res) => {
  //         if (res.data) {
  //           axios.get("http://10.78.151.41:9095/hibi/apmPost").then((res) => {
  //             let jsonData = JSON.stringify(res.data);
  //             let parseJson = JSON.parse(jsonData);
  //             setPostToApmData(parseJson.status);
  //           }).catch(err=>{
  //             setPostToApmData(err.message)
  //           });
  //         }
  //       }).catch(err=>{
  //         console.log("master ",err.message)
  //         setPostToApmData(err.message)
  //       });
  //     }
  //   }).catch(err=>{
  //     setPostToApmData(err.message)
  //   });
  // };


  
  const apm_post_api = async () => {
    try {
      const res = await axios.get("http://10.78.151.41:9095/hibi/apmPost");
      if (res.status === 200) {
        let jsonData = JSON.stringify(res.data);
        let parseJson = JSON.parse(jsonData);
          setPostToApmData(parseJson.status);
      }
      setIsLoading(false);
    } catch (err) {
      try{
        const res = await axios.get("http://10.78.151.41:9095/hibi/apmPost");
        if (res.status === 200) {
          let jsonData = JSON.stringify(res.data);
          let parseJson = JSON.parse(jsonData);
          setPostToApmData(parseJson.status);
        }
        setIsLoading(false);
      }catch(err){
        setPostToApmData("Invalid CSV, with asset Id not mapped to Images, I/O error")
      }
    }
  };

  const hibi_master_api = async () => {
    try {
      const res = await axios.get("http://10.78.151.41:9095/hibi/hibimaster");
      if (res.status === 200) {
        apm_post_api();
      }
    } catch (err) {
      console.log("err is ",err)
      setPostToApmData("CSV has no records to read");
      setIsLoading(false)
    }
  };
  const dataApiAsync = async () => {
    // axios.post("http://localhost:9095/hibi/taskIdFrames").then((res) => {
    //   if (res.status === 200) {
    //     axios.get("http://localhost:9095/hibi/hibimaster").then((res) => {
    //       if (res.data) {
    //         axios.get("http://localhost:9095/hibi/apmPost").then((res) => {
    //           let jsonData = JSON.stringify(res.data);
    //           let parseJson = JSON.parse(jsonData);
    //           setPostToApmData(parseJson.status);
    //         });
    //       }
    //     });
    //   }
    // });

    try {
      const res = await axios.post("http://10.78.151.41:9095/hibi/taskIdFrames");
      if (res.status === 200) {
        hibi_master_api();
      }
    } catch (err) {
      try {
        const res = await axios.post("http://10.78.151.41:9095/hibi/taskIdFrames");
        if (res.status === 200) {
          hibi_master_api();
        }
      } catch (err) {
        setIsLoading(false);
        setPostToApmData(err);
      }
    }
  };
  const postToApmDataApiHandler = () => {
    dataApiAsync();
    setIsLoading(true);
  };
  return (
    <div className="post__apm__data_hibi">
      <section className="apm_post__data">
        <span className="text__header_h3">
          
        </span>
        <button className="apm__post__button" onClick={postApmHandler}>
          Start HIBI watcher process
        </button>
        <span className="succesful_validation__apm">{postToApm}</span>
      </section>
      <section className="apm_post__data__data">
        <button className="apm__post__button" onClick={postToApmDataApiHandler}>
          Start HIBI to APM process
        </button>
        {loading && <div className="loading-spinner"></div>}
        <span className="succesful_validation__apm">{postToApmData}</span>
      </section>
    </div>
  );
};

export default ApmPost;
