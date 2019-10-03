module.exports = {
  duration: function (startDate,endDate){
    var months;
    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return months <= 0 ? 0 : months;
  },
  payBackDate:function (investedDate,duration) {
    let date = new Date(investedDate);
    date.setMonth(new Date(investedDate).getMonth() + duration);
    return  date.toDateString();
  },
  interest:function (roi,amount) {
    return (amount * roi)/100
  }
}