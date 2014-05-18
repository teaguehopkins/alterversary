var dateMath = require('./datemathmodule.js')
var firstDate = new Date(process.argv[2]);
console.log('First Date: ' +firstDate);

var dateObject = dateMath(firstDate, function(err, data){
    data.forEach(function(x){
    console.log(x);}
  )
});
