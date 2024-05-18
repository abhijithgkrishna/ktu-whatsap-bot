const fs = require('fs');
const csv = require('csv-parser');


const RESULT_URL =
  "https://api.ktu.edu.in/ktu-web-service/anon/individualresult";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const fetch = require("node-fetch");
const registerNo = "TVE21CS";
const body = {
  registerNo,
  schemeId: 1,
};

const names = [];

// data["resultDetails"][0]["firstName"]

const getResult = async () => {
  const apiResponse = await fetch(RESULT_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const data = await apiResponse.json();

  if (data["status"] === 500) {
    return;
  }
  const resultDetails = data["resultDetails"][0];
  const { firstName, middleName, surName } = resultDetails;

  const name = `${firstName}${middleName ? "" + middleName : ""}${
    surName ? " " + surName : ""
  }`;
  // console.log(name);
  names.push({ name, registerNo: body.registerNo });
};
const getNames = async () => {
  for (let i = 1; i <= 135; i++) {
    body.registerNo = registerNo + i.toString().padStart(3, "0");
    // console.log(body.registerNo);
    await getResult();
  }
  console.log("Helpppp", names, names.length);
};
getNames();
// console.log("Helpppp",names)

// getResult()
// const getCollegeCode = (collegeName){

// }