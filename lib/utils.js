const chalk = require('chalk');

const error = (msg) => console.log(chalk.red.bold(`${msg}`))
	
const success = (msg) => console.log(chalk.green.bold(`${msg}`))

const convertObjToQS = function(obj) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}

const displayTable = function(obj){
  for(let key in obj){
    console.log(chalk.green.bold(key.toUpperCase()+' ')+"-".repeat(20-key.length)+chalk.blue.bold(' '+obj[key]));
  }
} 
module.exports = {
    convertObjToQS,
    'msg': {
      error,
      success
    },
    displayTable
}