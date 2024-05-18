process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const getBatchNames = require('./getBatchNames');
const getCollegeCode = require('./getCollegeCode');


const tester = async () => {
    const collegeCode = await getCollegeCode('Government Engineering College Barton Hill  Thiruvananthapuram');
    console.log('College Code:', collegeCode);
    
    const batchNames = await getBatchNames('TVE21CS').then(console.log);
    
}

tester();