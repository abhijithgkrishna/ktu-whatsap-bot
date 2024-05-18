const fetch = require("node-fetch");
const { RESULT_URL } = require('../constants/endpoint');


const getBatchNames = async (registerNo) => {
  const names = [];
  
  for (let i = 1; i <= 135; i++) {
    const paddedNumber = i.toString().padStart(3, "0");
    const currentRegisterNo = registerNo + paddedNumber;

    const body = {
      registerNo: currentRegisterNo,
      schemeId: 1,
    };

    try {
      const apiResponse = await fetch(RESULT_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      
      const data = await apiResponse.json();

      if (data["status"] === 500) {
        continue;
      }

      const resultDetails = data["resultDetails"][0];
      const { firstName, middleName, surName } = resultDetails;
      const name = `${firstName}${middleName ? " " + middleName : ""}${surName ? " " + surName : ""}`;

      names.push({ name, registerNo: currentRegisterNo });
    } catch (error) {
      console.error(`Fetch error for registerNo ${currentRegisterNo}:`, error);
    }
  }

  return names;
};



module.exports = getBatchNames;
