import { useEffect } from "react";
import axios from "axios";
import "./MainLogin.css";
import { useState } from "react";

const Main = ({ assetId }) => {
  const [hibiData, setHibiData] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [assetIdHibi, setAssetIdHibi] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   axios.get("http://localhost:8080/hibi").then((res) => {
  //     console.log("res daya ", res.data);
  //     let data = res.data.filter((e) => {
  //       return e.datetime === dateFrom;
  //     });
  //     setHibiData(data);
  //   });
  // }, [dateFrom]);
  // console.log("data is ", hibiData);
  // useEffect(() => {
  //   axios.get("http://localhost:8080/hibi").then((res) => {
  //     console.log(res.data);
  //     let data = res.data.sort(function (x, y) {
  //       return new Date(x.datetime) < new Date(y.datetime) ? 1 : -1;
  //     });

  //     setHibiData(data);
  //   });
  // }, []);

  useEffect(() => {
    axios
      .post("http://10.78.151.41:9095/hibi/asset", {
        assetId: assetId,
      })
      .then((res) => {
        let data = res.data;
        let groupedData = groupBy(data, "frameId");
        let ans = groupByDefectNames(groupedData);
        setHibiData(ans);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  const groupBy = (input, key) => {
    return input.reduce((acc, currentValue) => {
      let groupKey = currentValue[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(currentValue);
      return acc;
    }, {});
  };

  const groupByDefectNames = (data) => {
    let ans = [];
    let transformedHibiObj = {
      assetId: "",
      assetLatitude: "",
      assetLongitude: "",
      datetime: "",
      defectName: "",
      frameId: "",
      frameLatitude: "",
      frameLongitude: "",
      hibiId: "",
      imgPath: "",
      make: "",
      model: "",
      prediction: "",
      severity: "",
    };
    for (let i = 0; i < Object.keys(data).length; i++) {
      for (let j = 0; j < data[Object.keys(data)[i]].length; j++) {
        transformedHibiObj.assetId = data[Object.keys(data)[i]][j].assetId;
        transformedHibiObj.assetLatitude =
          data[Object.keys(data)[i]][j].assetLatitude;
        transformedHibiObj.assetLongitude =
          data[Object.keys(data)[i]][j].assetLongitude;
        transformedHibiObj.datetime = data[Object.keys(data)[i]][j].datetime;
        transformedHibiObj.defectName +=
          data[Object.keys(data)[i]][j].defectName + ",";
        transformedHibiObj.frameId = data[Object.keys(data)[i]][j].frameId;
        transformedHibiObj.frameLatitude =
          data[Object.keys(data)[i]][j].frameLatitude;
        transformedHibiObj.frameLongitude =
          data[Object.keys(data)[i]][j].frameLongitude;
        transformedHibiObj.hibiId = data[Object.keys(data)[i]][j].hibiId;
        transformedHibiObj.imgPath = data[Object.keys(data)[i]][j].imgPath;
        transformedHibiObj.make = data[Object.keys(data)[i]][j].make;
        transformedHibiObj.model = data[Object.keys(data)[i]][j].model;
        transformedHibiObj.prediction =
          data[Object.keys(data)[i]][j].prediction;
        transformedHibiObj.severity = data[Object.keys(data)[i]][j].severity;
      }

      // setHibiData((prev) => {
      //   return [...prev, transformedHibiObj];
      // });
      ans.push(transformedHibiObj);
      transformedHibiObj = {
        assetId: "",
        assetLatitude: "",
        assetLongitude: "",
        datetime: "",
        defectName: "",
        frameId: "",
        frameLatitude: "",
        frameLongitude: "",
        hibiId: "",
        imgPath: "",
        make: "",
        model: "",
        prediction: "",
        severity: "",
      };
    }
    console.log("ans ", ans);
    return ans;
  };

  const dateToDaysAgo = (date) => {
    let a = new Date();
    let b = new Date(date);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  };

  const dateToIsoTransform = (date) => {
    let str = date.split("T");
    let vals = str[1].split(".");
    let modifiedDate = str[0] + " " + vals[0];
    return modifiedDate;
  };

  const defectNameSpilt = (defects) => {
    const names = defects.split(",");
    return names;
  };

  let card_hibi_data =
    hibiData.length > 0 &&
    hibiData.map((hib) => {
      let transformedData = dateToDaysAgo(hib.datetime);
      let dateToIso = dateToIsoTransform(hib.datetime);
      let defectNames = defectNameSpilt(hib.defectName);
      return (
        <div key={hib.hibiId}>
          <div className="testimonals__card">
            <div className="model__card__asset__date">
              <span className="model__card__props3__date">
                {`${transformedData} days ago`}
              </span>
              <span className="card__title__lg-header">{hib.assetId}</span>
            </div>

            <div className="card__title">
              <span className="card__title__lg">
                {defectNames.map((e) => {
                  return (
                    <span className="card__defect__title__value">{e}</span>
                  );
                })}
              </span>
            </div>
            <div className="load__image__alt">
              {/* <WindowIcon /> */}
              <img
                src={hib.imgPath}
                alt="sample"
                className="img__sunflower__smaple"
              />
            </div>
            <div className="card_props">
              <span className="model__card__props3">Model:</span>
              <span className="model__card__props3__value">{hib.model}</span>
            </div>
            <div className="card_props">
              <span className="model__card__props3">Severity:</span>
              <span className="model__card__props3__value">{hib.severity}</span>
            </div>
            <div className="card_props">
              <span className="model__card__props3">Make:</span>
              <span className="model__card__props3__value">{hib.make}</span>
            </div>
            <div className="card_props">
              <span className="model__card__props3">Date:</span>
              <span className="model__card__props3__value">{dateToIso}</span>
            </div>
          </div>
        </div>
      );
    });

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://10.78.151.41:9095/hibi/asset", {
        assetId: assetIdHibi,
      })
      .then((res) => {
        let data = res.data.sort(function (x, y) {
          return new Date(x.datetime) < new Date(y.datetime) ? 1 : -1;
        });
        setHibiData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <>
      <div className="card__hibi__filters">
        <div className="asset__search__hibi">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="asset id"
              className="asset_search__label"
              onChange={(e) => setAssetIdHibi(e.target.value)}
            />

            <button type="submit" className="asset_search__label_button">
              submit
            </button>
          </form>
        </div>
        <input
          type="date"
          className="card__hibi__date__filter"
          onChange={(e) => setDateFrom(e.target.value)}
          value={dateFrom}
        />
        <label className="card__hibi__date__filter-label">Date from</label>
        <input
          type="date"
          className="card__hibi__date__filter"
          onChange={(e) => setDateTo(e.target.value)}
        />
        <label className="card__hibi__date__filter-label">Date to</label>
        <div>
          <span className="assests__length_assets">TOTAL ASSESTS</span>
          {hibiData.length > 0 ? (
            <span className="assests__length_assets__value">
              {hibiData.length}
            </span>
          ) : (
            <span className="assests__length_assets__value">0</span>
          )}
        </div>
      </div>
      <div className="main__container">
        {hibiData.length > 0 && (
          <section className="testimonals">{card_hibi_data}</section>
        )}
        {hibiData.length === 0 && (
          <div className="testimonals__card__center__align">
            <div className="testimonals__card__error">
              <span className="error__text__data">
                Asset ID <p className="asset__zero_length__data">{assetId}</p>{" "}
                has no data
              </span>
              <span className="error__api_network">{error}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
