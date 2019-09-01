import { exportDefaultSpecifier } from "@babel/types";

const helpers = {
    getDateStr: (date) => {
        const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const getOrdinalString = (number) => {
            let oneDecimal = number % 10;
            let twoDecimals = number % 100;
            if(oneDecimal == 1 && twoDecimals != 11) {
                return number + 'st';
            } 
            if(oneDecimal == 2 && twoDecimals != 12) {
                return number + 'nd';
            }
            if(oneDecimal == 3 && twoDecimals != 13){
                return number + 'rd';
            }
            return number + 'th';
        };
        return weekDays[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + getOrdinalString(date.getDate()) + ' ' + date.getFullYear();
    }
}

export default helpers;