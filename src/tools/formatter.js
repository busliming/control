export default {
    moneyFormatter: val => {
        let result = Number.parseFloat(val);
        if (result) {
            return result < 10000 && result > -10000 ? result.toFixed(2) : (result / 10000).toFixed(2) + '万';
        } else {
            return '0.00'
        }
    },
    numberFormatter: val => {
        let result = Number.parseInt(val);
        if (result) {
            return result < 10000 && result > -10000 ? result : (result / 10000) + '万';
        } else {
            return '0'
        }
    },
    DateToYMD: date => {
        if (typeof(date) !== 'string') {
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
            return Y + M + D;
        } else {
            return date
        }
    },
    /**
     * Date对象转年月日时分秒
     */
    DateToYMDHMS:date => {
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? ('0'+date.getDate()) : date.getDate())+' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    /**金额字段处以1000**/
    divideBy1000: val => {
        return val ? parseInt(val/10) / 100 : '0.00'
    },
    /**保存两位小数点**/
    toFixed2(val) {
        return val ? parseFloat(val).toFixed(2) : '0.00'
    }
}
