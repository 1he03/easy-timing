"use strict";
exports.__esModule = true;
exports.duration = exports.remaining = exports.getTimeNow = void 0;
var moment = require("moment-timezone");
require('moment-countdown');
function _remaining(options) {
    if (!options)
        options = {};
    var setTimeString;
    var isFormat = options.format ? true : false;
    var isTimeZone = false;
    if (options.timeString && options.format)
        setTimeString = options.timeString;
    else if (!options.timeString && options.format)
        setTimeString = getTimeNow({ format: options.format, timeZone: options.timeZone });
    else
        setTimeString = getTimeNow({ format: "YYYY/M/D h:mm:ss A ZZ", timeZone: options.timeZone });
    var conMoment = moment;
    if (options.format && options.timeZone && options.timeString)
        if (!(options.format.includes("Z") || options.format.includes("ZZ"))) {
            setTimeString = setTimeString + " " + getTimeNow({ format: "ZZ", timeZone: options.timeZone });
            options.format = options.format + " ZZ";
            isTimeZone = true;
        }
    if (!options.format)
        if (options.timeZone)
            options.format = "YYYY/M/D h:mm:ss A ZZ";
        else
            options.format = "YYYY/M/D h:mm:ss A";
    if (options.format.includes("Z") || options.format.includes("ZZ"))
        conMoment = conMoment.parseZone(setTimeString, options.format);
    else
        conMoment = conMoment(setTimeString, options.format);
    var m = conMoment.countdown();
    var remain = conMoment.fromNow();
    var eventTime;
    if (remain.split(" ").includes("few"))
        eventTime = "Currently";
    else if (remain.split(" ").includes("in"))
        eventTime = "After";
    else if (remain.split(" ").includes("ago"))
        eventTime = "Before";
    if (!isFormat) {
        setTimeString = conMoment.format();
        options.format = undefined;
    }
    if (isTimeZone) {
        options.format = options.format + "";
        setTimeString = setTimeString.split(getTimeNow({ format: "ZZ", timeZone: options.timeZone })).join("").slice(0, -1);
        options.format = options.format.split("ZZ").join("").slice(0, -1);
    }
    return { year: m.years, month: m.months, day: m.days, hour: m.hours, minute: m.minutes, second: m.seconds, remain: remain, eventTime: eventTime, timeString: setTimeString, format: options.format };
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcYears(options) {
    var remain = _remaining(options);
    if (remain.year)
        return remain.eventTime + " " + remain.year + " years";
    else if (remain.month)
        return remain.eventTime + " " + remain.month + " months";
    else if (remain.day)
        return remain.eventTime + " " + remain.day + " days";
    else if (remain.hour)
        return remain.eventTime + " " + remain.hour + " hours";
    else if (remain.minute)
        return remain.eventTime + " " + remain.minute + " minutes";
    else
        return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcMonths(options) {
    var remain = _remaining(options);
    if (remain.year)
        return remain.eventTime + " " + ((remain.year * 12) + remain.month) + " months";
    else if (remain.month)
        return remain.eventTime + " " + remain.month + " months";
    else if (remain.day)
        return remain.eventTime + " " + remain.day + " days";
    else if (remain.hour)
        return remain.eventTime + " " + remain.hour + " hours";
    else if (remain.minute)
        return remain.eventTime + " " + remain.minute + " minutes";
    else
        return remain.eventTime + " " + remain.second + " seconds";
}
function getCalcDays(options) {
    var remain = _remaining(options);
    if (remain.year)
        return remain.eventTime + " " + (((remain.year * 12) + remain.month) * 30) + remain.day + " days";
    else if (remain.month)
        return remain.eventTime + " " + (remain.month * 30) + remain.day + " days";
    else if (remain.day)
        return remain.eventTime + " " + remain.day + " days";
    else if (remain.hour)
        return remain.eventTime + " " + remain.hour + " hours";
    else if (remain.minute)
        return remain.eventTime + " " + remain.minute + " minutes";
    else
        return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcHours(options) {
    var remain = _remaining(options);
    if (remain.year)
        return remain.eventTime + " " + (((((remain.year * 12) + remain.month) * 30) + remain.day) * 24) + remain.hour + " hours";
    else if (remain.month)
        return remain.eventTime + " " + (((remain.month * 30) + remain.day) * 24) + remain.hour + " hours";
    else if (remain.day)
        return remain.eventTime + " " + (remain.day * 24) + remain.hour + " hours";
    else if (remain.hour)
        return remain.eventTime + " " + remain.hour + " hours";
    else if (remain.minute)
        return remain.eventTime + " " + remain.minute + " minutes";
    else
        return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcMinute(options) {
    var remain = _remaining(options);
    if (remain.year)
        return remain.eventTime + " " + (((((((remain.year * 12) + remain.month) * 30) + remain.day) * 24) + remain.hour) * 60) + remain.minute + " minutes";
    else if (remain.month)
        return remain.eventTime + " " + (((((remain.month * 30) + remain.day) * 24) + remain.hour) * 60) + remain.minute + " minutes";
    else if (remain.day)
        return remain.eventTime + " " + (((remain.day * 24) + remain.hour) * 60) + remain.minute + " minutes";
    else if (remain.hour)
        return remain.eventTime + " " + (remain.hour * 60) + remain.minute + " minutes";
    else if (remain.minute)
        return remain.eventTime + " " + remain.minute + " minutes";
    else
        return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcSeconds(options) {
    var remain = _remaining(options);
    if (remain.year)
        return remain.eventTime + " " + (((((((((remain.year * 12) + remain.month) * 30) + remain.day) * 24) + remain.hour) * 60) + remain.minute) * 60) + remain.second + " seconds";
    else if (remain.month)
        return remain.eventTime + " " + (((((((remain.month * 30) + remain.day) * 24) + remain.hour) * 60) + remain.minute) * 60) + remain.second + " seconds";
    else if (remain.day)
        return remain.eventTime + " " + (((((remain.day * 24) + remain.hour) * 60) + remain.minute) * 60) + remain.second + " seconds";
    else if (remain.hour)
        return remain.eventTime + " " + (((remain.hour * 60) + remain.minute) * 60) + remain.second + " seconds";
    else if (remain.minute)
        return remain.eventTime + " " + (remain.minute * 60) + remain.second + " seconds";
    else
        return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getDuration(start, end, format) {
    var _start = moment(start, format);
    var _end = moment(end, format);
    var _duration = moment.duration(_end.diff(_start));
    return {
        durationConnected: { years: _duration.years(), months: _duration.months(), days: _duration.days(), hours: _duration.hours(), minutes: _duration.minutes(), seconds: _duration.seconds(), milliseconds: _duration.milliseconds(),
            durationString: "".concat(_duration.years() != 0 ? _duration.years() + " years :: " : "").concat(_duration.months() != 0 ? _duration.months() + " months :: " : "").concat(_duration.days() != 0 ? _duration.days() + " days :: " : "").concat(_duration.hours() != 0 ? _duration.hours() + " hours :: " : "")
                + "".concat(_duration.minutes() != 0 ? _duration.minutes() + " minutes :: " : "").concat(_duration.seconds() != 0 ? _duration.seconds() + " seconds" : "").concat(_duration.milliseconds() != 0 ? " :: " + _duration.milliseconds() + " milliseconds" : "")
        },
        durationSeparately: { years: _duration.asYears(), months: _duration.asMonths(), days: _duration.asDays(), hours: _duration.asHours(), minutes: _duration.asMinutes(), seconds: _duration.asSeconds(), milliseconds: _duration.asMilliseconds() }
    };
}
////////////////////////////////////////////////////////////////////////////////////
function getTimeNow(options) {
    if (!options)
        options = {};
    var date = new Date();
    var tzo = options.timeZone;
    if (tzo || tzo == 0) {
        if (typeof tzo == "string") {
            if (tzo.includes(":")) {
                var splitTzo_1 = tzo.split(":");
                splitTzo_1[1] = (parseInt(tzo[1]) / 60) * 100;
                tzo = splitTzo_1.join(".");
            }
            else
                tzo = "".concat(tzo.slice(0, -2), ".").concat((parseInt(tzo.slice(-2, tzo.length)) / 60) * 100);
            tzo = parseFloat(tzo);
        }
        var changeTime = date.getTime() + (date.getTimezoneOffset() * 60000);
        date = new Date(changeTime + (3600000 * tzo));
        var splitTzo = tzo.toString().split(".");
        splitTzo[0] = parseInt(splitTzo[0]);
        if (splitTzo[0] > 9)
            splitTzo[0] = "+".concat(splitTzo[0]);
        else if (splitTzo[0] >= 0 && splitTzo[0] <= 9)
            splitTzo[0] = "+0".concat(splitTzo[0]);
        else if (splitTzo[0] < 0 && splitTzo[0] >= -9)
            splitTzo[0] = "-0".concat(splitTzo[0].toString().split("-").join(""));
        if (!splitTzo[1])
            splitTzo[1] = "00";
        else {
            splitTzo[1] = (parseInt(splitTzo[1]) / 10) * 60;
            if (splitTzo[1] <= 9)
                splitTzo[1] = "0".concat(splitTzo[1]);
        }
        tzo = splitTzo.join(":");
    }
    else
        tzo = moment().format("Z");
    var splitDate = date.toLocaleDateString().split("/");
    var splitTime = date.toLocaleTimeString().split(":");
    var timeString = "".concat(splitDate[2], "/").concat(splitDate[0], "/").concat(splitDate[1], " ").concat(splitTime[0], ":").concat(splitTime[1], ":").concat(splitTime[2].split(" ")[0], " ").concat(splitTime[2].split(" ")[1], " ").concat(tzo);
    return moment.parseZone(timeString, "YYYY/M/D h:mm:ss A Z").format(options.format);
}
exports.getTimeNow = getTimeNow;
////////////////////////////////////////////////////////////////////////////////////
exports.remaining = {
    getSeconds: function (options) { return getCalcSeconds(options); },
    getMinute: function (options) { return getCalcMinute(options); },
    getHours: function (options) { return getCalcHours(options); },
    getDays: function (options) { return getCalcDays(options); },
    getMonths: function (options) { return getCalcMonths(options); },
    getYears: function (options) { return getCalcYears(options); },
    get: function (options) { return _remaining(options); }
};
////////////////////////////////////////////////////////////////////////////////////
exports.duration = {
    getDurationNow: function (options) {
        if (!options)
            options = {};
        if (!options.end)
            options.end = getTimeNow({ timeZone: options.timeZone });
        return getDuration(getTimeNow({ timeZone: options.timeZone }), options.end, options.format);
    },
    getDurationPeriods: function (options) {
        if (!options)
            options = {};
        if (!options.start)
            options.start = getTimeNow({});
        if (!options.end)
            options.end = getTimeNow({});
        return getDuration(options.start, options.end, options.format);
    }
};
