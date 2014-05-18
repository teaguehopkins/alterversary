module.exports = function (firstDate, callback) {
//takes a first date and calls back with an array of arrays of form [alternate anniversary label, date]


/* unnessesary
var year = firstDate.getFullYear()
var month = firstDate.getMonth()     // starts at 0
var day = firstDate.getDate()      // returns the day of month
var hours = firstDate.getHours()
var min = firstDate.getMinutes()
*/

var alterversaryArray = []
var measureArray = ['seconds', 'minutes', 'hours', 'days', 'weeks']
var numberArray = [1,5,15,25]
//var numberArray = [1,2,3,4,5,6,7,8,9]

function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}

function addTime(number, measure){
  var conv=1;
  switch (measure){
    case 'milliseconds':
      conv=1;
      break;
    case 'seconds':
      conv=1000
      break;
    case 'minutes':
      conv=1000*60;
      break;
    case 'hours':
      conv=1000*60*60;
      break;
    case 'days':
      conv=1000*60*60*24;
      break;
    case 'weeks':
      conv=1000*60*60*24*7;
      break;
    }
  var futureDate = new Date(firstDate.getTime() + conv*number)
  //console.log(number +" "+measure+": "+futureDate.toDateString());

if(isValidDate(futureDate)&&(futureDate.getTime()-firstDate.getTime()<1000*60*60*24*365*150)&&(futureDate.getTime()>new Date())) //valid date, after current date, and less than 150 years after first date
    {
      if (number>=1000000) {
    number=number/1000000;
    number=number+"M";
}
      alterversaryArray.push([number +" "+measure,futureDate]);}
  }

numberArray.forEach(function (mult){
  for (var x = mult; x <= 10000000000; x=x*10) {
    measureArray.forEach(function(measure){
      addTime(x, measure)});
  }
});

  alterversaryArray.sort(function(a,b){return a[1]-b[1]});

  callback(null, alterversaryArray);
}
