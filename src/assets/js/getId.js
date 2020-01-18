import Vue from 'vue'
const uuidGet = function () {
    let s = [];
    let hexDigits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 26; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x26), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    let timeStamp = new Date()
        .getTime()
        .toString()
        .substr(-7);
    s[8] = timeStamp;
    return s.join("");
}

Vue.prototype.uuidGet = uuidGet;
