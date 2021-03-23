var funcs = {
    newDateFormat(dateValue) {
        let newDate = dateValue.split('T')[0];
        newDate = newDate.split('-')[2] + '/' + newDate.split('-')[1] + '/' + newDate.split('-')[0];
        return newDate;
    },
    newTimeFormat(timeValue) { let timeZone = 1; // Fuseaux horaire (UTC+1)
        let newTime = parseInt(timeValue.substring(11, 13))+timeZone;
        if(newTime > 23) { newTime -= 24; }
        newTime = newTime + timeValue.substring(13, 16).replace(':', 'h');
        return newTime;
    }
}
  
export default funcs