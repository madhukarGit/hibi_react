import "./ApmPost.css";
import axios from "axios";
import { useState } from "react";

const ApmPost = (props) => {
  const [postToApm, setPostToApm] = useState("");
  const [postToApmData, setPostToApmData] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [listHibiCSVRecords, setListHibiCSVRecords] = useState([]);
  const [csvLoading, setCsvIsLoading] = useState(false);

  const postApmHandler = async () => {
    try {
      const res = await axios.get("http://localhost:9095/hibi/hibiwatcher");
      if (res.status === 200) {
        setPostToApm("successfully started the watcher");
      }
    } catch (err) {
      const res = await axios.get("http://localhost:9095/hibi/hibiwatcher");
      if (res.status === 200) {
        setPostToApm("successfully started the watcher");
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
      const res = await axios.get("http://localhost:9095/hibi/apmPost");
      if (res.status === 200) {
        let jsonData = JSON.stringify(res.data);
        let parseJson = JSON.parse(jsonData);
        setPostToApmData(parseJson.status);
      }
      setIsLoading(false);
    } catch (err) {
      try {
        const res = await axios.get("http://localhost:9095/hibi/apmPost");
        if (res.status === 200) {
          let jsonData = JSON.stringify(res.data);
          let parseJson = JSON.parse(jsonData);
          setPostToApmData(parseJson.status);
        }
        setIsLoading(false);
      } catch (err) {
        setPostToApmData(
          "Invalid CSV, with asset Id not mapped to Images, I/O error"
        );
      }
    }
  };

  const hibi_master_api = async () => {
    try {
      const res = await axios.get("http://localhost:9095/hibi/hibimaster");
      if (res.status === 200) {
        apm_post_api();
      }
    } catch (err) {
      console.log("err is ", err);
      setPostToApmData("CSV has no records to read");
      setIsLoading(false);
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
      const res = await axios.post("http://localhost:9095/hibi/taskIdFrames");
      if (res.status === 200) {
        hibi_master_api();
      }
    } catch (err) {
      try {
        const res = await axios.post("http://localhost:9095/hibi/taskIdFrames");
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

  const hibiMasterDataHandler = async () => {
    setCsvIsLoading(true);
    try {
      const res = await axios.get("http://localhost:9095/hibi/hibicsvData");
      console.log("res ", res.data);
      if (res.status === 200) {
        setCsvIsLoading(false);
      }
      setListHibiCSVRecords(res.data);
    } catch (err) {
      const res = await axios.get("http://localhost:9095/hibi/hibicsvData");
      console.log("res ", res.data);
      if (res.status === 200) {
        setCsvIsLoading(false);
      }
      setListHibiCSVRecords(res.data);
    }
  };

  const csvRecordData = (
    <div>
      <div className="tablular__list_records">
        <table className="table_hibi_csv_borders">
          <tr>
            <th>assetId</th>
            <th>assetLatitude</th>
            <th>assetLongitude</th>
            <th>datetime</th>
            <th>defectName</th>
            <th>frameId</th>
            <th>frameLatitude</th>
            <th>frameLongitude</th>
            <th>make</th>
            <th>model</th>
            <th>prediction</th>
            <th>severity</th>
          </tr>
          {listHibiCSVRecords.map((e) => {
            return (
              <tr>
                <td>{e.assetId}</td>
                <td>{e.assetLatitude}</td>
                <td>{e.assetLongitude}</td>
                <td>{e.datetime}</td>
                <td>{e.defectName}</td>
                <td>{e.frameId}</td>
                <td>{e.frameLatitude}</td>
                <td>{e.frameLongitude}</td>
                <td>{e.make}</td>
                <td>{e.model}</td>
                <td>{e.prediction}</td>
                <td>{e.severity}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );

  return (
    <>
      <div className="post__apm__data_hibi">
        <div className="title__jobs__demand">Run Jobs On Demand</div>

        <section className="apm_post__data">
          <button className="apm__post__button" onClick={postApmHandler}>
            Process images in HIBI
          </button>
        </section>
        <section className="apm_post__data__data">
          <button
            className="apm__post__button"
            onClick={postToApmDataApiHandler}
          >
            Send defects to LUMADA APM
          </button>
        </section>
        <section className="apm_post__data__data">
          <button className="apm__post__button" onClick={hibiMasterDataHandler}>
            View Latest HIBI Defect List
          </button>
        </section>
      </div>
      <div className="loading__validations__center">
        {loading && <div className="loading-spinner"></div>}
        <div className="validation__message_axios">
          <span className="succesful_validation__apm">{postToApm}</span>
          <span className="succesful_validation__apm">{postToApmData}</span>
        </div>
      </div>
      {csvLoading && <div className="loading-spinner"></div>}
      {listHibiCSVRecords.length > 0 && (
        <div className="table_csv_list">{csvRecordData}</div>
      )}
    </>
  );
};

export default ApmPost;
