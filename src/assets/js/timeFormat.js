import Vue from 'vue'

const timeFormat = function (timeStamp) {
    let year = new Date(timeStamp).getFullYear();
    let month =
        new Date(timeStamp).getMonth() + 1 < 10
            ? "0" + (new Date(timeStamp).getMonth() + 1)
            : new Date(timeStamp).getMonth() + 1;
    let date =
        new Date(timeStamp).getDate() < 10
            ? "0" + new Date(timeStamp).getDate()
            : new Date(timeStamp).getDate();
    let hh =
        new Date(timeStamp).getHours() < 10
            ? "0" + new Date(timeStamp).getHours()
            : new Date(timeStamp).getHours();
    let mm =
        new Date(timeStamp).getMinutes() < 10
            ? "0" + new Date(timeStamp).getMinutes()
            : new Date(timeStamp).getMinutes();
    return year + "-" + month + "-" + date + " " + hh + ":" + mm;
}

Vue.prototype.timeFormat = timeFormat
