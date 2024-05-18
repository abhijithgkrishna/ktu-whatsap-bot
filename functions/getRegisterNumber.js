const getBatchNames = require('./getBatchNames');
const getCollegeCode = require('./getCollegeCode');

const getRegisterNumber = async (studentName,regnoStart) => {

    const names = await getBatchNames(regnoStart);
    const student = names.find(name => name.name === studentName);
    const regno = student ? student.registerNo : null;
    
    return regno;
}

const stuRegNo = async (collegename,year,branch,name) => {
    const currentYear = new Date().getFullYear();
    year = (currentYear-2000) - year;
    name.toUpperCase();
    const collegeCode = await getCollegeCode(collegename);

    regnoStart = collegeCode + year + branch;
    const regno = await getRegisterNumber(name,regnoStart);
    return regno;
}

module.exports = stuRegNo;

