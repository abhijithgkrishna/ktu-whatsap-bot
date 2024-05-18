const RESULT_URL = 'https://api.ktu.edu.in/ktu-web-service/anon/individualresult'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fetch = require("node-fetch");
const registerNo = "TVE21CS"
const body = {
    registerNo,
    schemeId: 1
}

const names = []

// data["resultDetails"][0]["firstName"]

const getResult = async () => {
    const apiResponse = await fetch(RESULT_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })
    const data = await apiResponse.json()
    const name = data["resultDetails"][0]["firstName"]

    console.log(name);
    names.push(name)
}

for (let i = 1; i <= 26; i++) {
    body.registerNo = registerNo + i.toString().padStart(3, '0')
    console.log(body.registerNo);
    getResult()
}

console.log("Helpppp",names)


// getResult()