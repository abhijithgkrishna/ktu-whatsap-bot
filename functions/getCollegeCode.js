const fs = require('fs');
const csv = require('csv-parser');

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const findCollegeCode = async (collegeName) => {
  try {
    const results = await parseCSV('colleges.csv');
    const college = results.find(college => college.college_name === collegeName);
    return college ? college.code : null;
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return null;
  }
};


module.exports = findCollegeCode;
