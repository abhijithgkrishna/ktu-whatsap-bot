process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const stuRegNo = require('./functions/getRegisterNumber');


stuRegNo('College of Engineering  Thiruvananthapuram',3,'CS','K P SREENATH').then(console.log)

