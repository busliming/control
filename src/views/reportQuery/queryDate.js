export default {
    // 获取今日的起始和结束时间
    ToDayStr() {
        var returnStr = [];
        var date = new Date();      //当前时间
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        returnStr = [year + "-" + month + "-" + day + " 00:00:00" , year + "-" + month + "-" + day + " 23:59:59"]
        return returnStr
    },
    // 获取昨日的起始和结束时间
    YesterDayStr() {
        var returnStr = [];
        var date = this.GetDate(1, 1);       //当前时间前一天
        var returnStr = "";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        returnStr = [year + "-" + month + "-" + day + " 00:00:00" , year + "-" + month + "-" + day + " 23:59:59"]
        return returnStr;
    },
    // 获取本周的起始和结束时间
    ThisWeekStr() {
        var returnStr = [];
        var date = new Date();      //当前时间
        var week = date.getDay();   //获取今天星期几
        var monday = this.GetDate2(week - 1, 1, date);      //获取星期一
        var sunday = this.GetDate2(7 - week, 2, date);   //获取星期天
        //起始时间的年月日
        var year1 = monday.getFullYear();
        var month1 = monday.getMonth() + 1;
        var day1 = monday.getDate();
        //结束时间的年月日
        var year2 = sunday.getFullYear();
        var month2 = sunday.getMonth() + 1;
        var day2 = sunday.getDate();
        //处理起始时间小于10的追加"0"在前面
        month1 = month1 < 10 ? "0" + month1 : month1;
        day1 = day1 < 10 ? "0" + day1 : day1;
        //处理结束时间小于10的追加"0"在前面
        month2 = month2 < 10 ? "0" + month2 : month2;
        day2 = day2 < 10 ? "0" + day2 : day2;
        returnStr = [year1 + "-" + month1 + "-" + day1 + " 00:00:00" , year2 + "-" + month2 + "-" + day2 + " 23:59:59"]
        return returnStr;
    },
    // 获取上周的起始和结束时间
    LastWeekStr() {
        var returnStr = [];
        var date = new Date();      //当前时间
        var week = date.getDay();   //获取今天星期几
        var monday = this.GetDate2(week + 6, 1, date);      //获取上周星期一
        var sunday = this.GetDate2(week, 1, date);          //获取上周星期天
        //起始时间的年月日
        var year1 = monday.getFullYear();
        var month1 = monday.getMonth() + 1;
        var day1 = monday.getDate();
        //结束时间的年月日
        var year2 = sunday.getFullYear();
        var month2 = sunday.getMonth() + 1;
        var day2 = sunday.getDate();
        //处理起始时间小于10的追加"0"在前面
        month1 = month1 < 10 ? "0" + month1 : month1;
        day1 = day1 < 10 ? "0" + day1 : day1;
        //处理结束时间小于10的追加"0"在前面
        month2 = month2 < 10 ? "0" + month2 : month2;
        day2 = day2 < 10 ? "0" + day2 : day2;
        returnStr = [year1 + "-" + month1 + "-" + day1 + " 00:00:00" , year2 + "-" + month2 + "-" + day2 + " 23:59:59"]
        return returnStr;
    },
    // 获取本月的起始和结束时间
    ThisMonthStr() {
        var returnStr = [];
        var date = new Date();      //当前时间
        var year = date.getFullYear();
        var month = date.getMonth();
        
        var min = new Date(year, month, 1);                 //本月月初
        var max = new Date(year, month + 1, 0);             //本月月底
     
        //起始时间的年月日
        var year1 = min.getFullYear();
        var month1 = min.getMonth() + 1;
        var day1 = min.getDate();
        //结束时间的年月日
        var year2 = max.getFullYear();
        var month2 = max.getMonth() + 1;
        var day2 = max.getDate();
        //处理起始时间小于10的追加"0"在前面
        month1 = month1 < 10 ? "0" + month1 : month1;
        day1 = day1 < 10 ? "0" + day1 : day1;
        //处理结束时间小于10的追加"0"在前面
        month2 = month2 < 10 ? "0" + month2 : month2;
        day2 = day2 < 10 ? "0" + day2 : day2;
        returnStr = [year1 + "-" + month1 + "-" + day1 + " 00:00:00" , year2 + "-" + month2 + "-" + day2 + " 23:59:59"]
        return returnStr;
    },
    // 获取上月的起始和结束时间
    LastMonthStr() {
        var returnStr = [];
        var date = new Date();      //当前时间
        var year = date.getFullYear();
        var month = date.getMonth();
        
        var min = new Date(year, month - 1, 1);                 //上月月初
        var max = new Date(year, month , 0);                    //上月月底
     
        //起始时间的年月日
        var year1 = min.getFullYear();
        var month1 = min.getMonth() + 1;
        var day1 = min.getDate();
        //结束时间的年月日
        var year2 = max.getFullYear();
        var month2 = max.getMonth() + 1;
        var day2 = max.getDate();
        //处理起始时间小于10的追加"0"在前面
        month1 = month1 < 10 ? "0" + month1 : month1;
        day1 = day1 < 10 ? "0" + day1 : day1;
        //处理结束时间小于10的追加"0"在前面
        month2 = month2 < 10 ? "0" + month2 : month2;
        day2 = day2 < 10 ? "0" + day2 : day2;
        returnStr = [year1 + "-" + month1 + "-" + day1 + " 00:00:00" , year2 + "-" + month2 + "-" + day2 + " 23:59:59"]
        return returnStr;
    },
    GetDate(day, type) {
        var zdate = new Date();
        var edate;
        if (type === 1) {
            edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
        } else {
            edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
        }
        return edate;
    },
    GetDate2(day, type, date) {
        var zdate;
        if (date === null || date === undefined) {
            zdate = new Date();
        } else {
            zdate = date;
        }
        var edate;
        if (type === 1) {
            edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
        } else {
            edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
        }
        return edate;
    }
}