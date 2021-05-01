function getMinuteRange(startDate, endDate) {
    const listDate = [];
    const dateMove = new Date(startDate);
    let strDate = startDate;
    
    while (strDate < endDate) {
      strDate = new Date(dateMove);
      listDate.push(strDate.toISOString().slice(0,17) + "00.000Z");
      dateMove.setMinutes(dateMove.getMinutes() + 1);
    };
    return listDate;
}

module.exports = {
  getMinuteRange,
};

