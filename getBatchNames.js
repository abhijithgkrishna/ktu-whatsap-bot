const fetch = require("node-fetch");
const { RESULT_URL } = require('./constants/endpoint');


const getBatchNames = async (registerNo) => {
  const names = [];
    
  for (let i = 1; i <= 135; i++) {
    const body = {
        registerNo,
        schemeId: 1,
        };
    body.registerNo = registerNo + i.toString().padStart(3, "0");

  const apiResponse = await fetch(RESULT_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await apiResponse.json();

  if (data["status"] === 500) 
    return;

  const resultDetails = data["resultDetails"][0];
  const { firstName, middleName, surName } = resultDetails;
  const name = `${firstName}${middleName ? "" + middleName : ""}${
    surName ? " " + surName : "" }`;

  names.push({ name, registerNo: body.registerNo })
  }
    return names;
  };

  module.exports = getBatchNames;