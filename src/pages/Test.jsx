import axios from "axios";
import { useEffect } from "react";

const Test = () => {
  let dates = [
    "2022-03-01T11:29:36.74518",
    "2022-03-01T11:29:37.835318",
    "2022-03-01T11:30:03.107275",
  ];

  useEffect(() => {
    let date = new Date(dates[0]);
    console.log("date is ", date);

    let sorted = dates.sort(function (a, b) {
      console.log(a);
      console.log(b);
      return new Date(a) < new Date(b) ? 1 : -1;
    });

    console.log(sorted);
  });
  return <div></div>;
};

export default Test;
