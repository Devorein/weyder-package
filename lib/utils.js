const convertObjToQS = function(obj) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p) && obj[p].length!==0) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}

module.exports = {
    convertObjToQS,
}