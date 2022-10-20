const moment = require("moment-timezone");
require('moment-countdown');

function _remaining(options: RemainingOptions) : RemainingReturn
{
    if(!options) options = {};
    let setTimeString;
    let isFormat = options.format ? true : false;
    let isTimeZone = false;
    if(options.timeString && options.format) setTimeString = options.timeString;
    else if(!options.timeString && options.format) setTimeString = getTimeNow({format:options.format, timeZone:options.timeZone});
    else setTimeString = getTimeNow({format:"YYYY/M/D h:mm:ss A ZZ", timeZone:options.timeZone});
    let conMoment = moment;
    if(options.format && options.timeZone && options.timeString) if(!(options.format.includes("Z") || options.format.includes("ZZ")))
    {
        setTimeString = setTimeString + " " + getTimeNow({format:"ZZ", timeZone:options.timeZone});
        options.format = options.format +" ZZ";
        isTimeZone = true;
    }
    if(!options.format) 
    if(options.timeZone) options.format = "YYYY/M/D h:mm:ss A ZZ";
    else options.format = "YYYY/M/D h:mm:ss A";
    if(options.format.includes("Z") || options.format.includes("ZZ")) conMoment = conMoment.parseZone(setTimeString, options.format);
    else conMoment = conMoment(setTimeString, options.format);
    let m = conMoment.countdown();
    let remain = conMoment.fromNow();
    let eventTime;
    if(remain.split(" ").includes("few")) eventTime = "Currently";
    else if(remain.split(" ").includes("in")) eventTime = "After";
    else if(remain.split(" ").includes("ago")) eventTime = "Before";
    if(!isFormat)
    {
        setTimeString = conMoment.format();
        options.format = undefined;
    }
    if(isTimeZone)
    {
        options.format = options.format+ "";
        setTimeString = setTimeString.split(getTimeNow({format:"ZZ", timeZone:options.timeZone})).join("").slice(0, -1);
        options.format = options.format.split("ZZ").join("").slice(0, -1);
    }
    return {year: m.years, month: m.months, day: m.days, hour: m.hours, minute: m.minutes, second: m.seconds, remain, eventTime, timeString: setTimeString, format: options.format};
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcYears(options: RemainingOptions) : string
{
    let remain = _remaining(options);
    if(remain.year) return remain.eventTime + " " + remain.year + " years";
    else if(remain.month) return remain.eventTime + " " + remain.month + " months";
    else if(remain.day) return remain.eventTime + " " + remain.day + " days";
    else if(remain.hour) return remain.eventTime + " " + remain.hour + " hours";
    else if(remain.minute) return remain.eventTime + " " + remain.minute + " minutes";
    else return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcMonths(options: RemainingOptions) : string
{
    let remain = _remaining(options);
    if(remain.year) return remain.eventTime + " " + ((remain.year * 12) + remain.month) + " months";
    else if(remain.month) return remain.eventTime + " " + remain.month + " months";
    else if(remain.day) return remain.eventTime + " " + remain.day + " days";
    else if(remain.hour) return remain.eventTime + " " + remain.hour + " hours";
    else if(remain.minute) return remain.eventTime + " " + remain.minute + " minutes";
    else return remain.eventTime + " " + remain.second + " seconds";
}
function getCalcDays(options: RemainingOptions) : string
{
    let remain = _remaining(options);
    if(remain.year) return remain.eventTime + " " + (((remain.year * 12) + remain.month) * 30) + remain.day + " days";
    else if(remain.month) return remain.eventTime + " " + (remain.month * 30) + remain.day +" days";
    else if(remain.day) return remain.eventTime + " " + remain.day + " days";
    else if(remain.hour) return remain.eventTime + " " + remain.hour + " hours";
    else if(remain.minute) return remain.eventTime + " " + remain.minute + " minutes";
    else return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcHours(options: RemainingOptions) : string
{
    let remain = _remaining(options);
    if(remain.year) return remain.eventTime + " " + (((((remain.year * 12) + remain.month) * 30) + remain.day) * 24) + remain.hour + " hours";
    else if(remain.month) return remain.eventTime + " " + (((remain.month * 30) + remain.day) * 24) + remain.hour +" hours";
    else if(remain.day) return remain.eventTime + " " + (remain.day * 24) + remain.hour + " hours";
    else if(remain.hour) return remain.eventTime + " " + remain.hour + " hours";
    else if(remain.minute) return remain.eventTime + " " + remain.minute + " minutes";
    else return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcMinute(options: RemainingOptions) : string
{
    let remain = _remaining(options);
    if(remain.year) return remain.eventTime + " " + (((((((remain.year * 12) + remain.month) * 30) + remain.day) * 24) + remain.hour) * 60) + remain.minute + " minutes";
    else if(remain.month) return remain.eventTime + " " + (((((remain.month * 30) + remain.day) * 24) + remain.hour) * 60) + remain.minute + " minutes";
    else if(remain.day) return remain.eventTime + " " + (((remain.day * 24) + remain.hour) * 60) + remain.minute + " minutes";
    else if(remain.hour) return remain.eventTime + " " + (remain.hour * 60) + remain.minute + " minutes";
    else if(remain.minute) return remain.eventTime + " " + remain.minute + " minutes";
    else return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getCalcSeconds(options: RemainingOptions) : string
{
    let remain = _remaining(options);
    if(remain.year) return remain.eventTime + " " + (((((((((remain.year * 12) + remain.month) * 30) + remain.day) * 24) + remain.hour) * 60) + remain.minute) * 60) + remain.second + " seconds";
    else if(remain.month) return remain.eventTime + " " + (((((((remain.month * 30) + remain.day) * 24) + remain.hour) * 60) + remain.minute) * 60) + remain.second +" seconds";
    else if(remain.day) return remain.eventTime + " " + (((((remain.day * 24) + remain.hour) * 60) + remain.minute) * 60) + remain.second + " seconds";
    else if(remain.hour) return remain.eventTime + " " + (((remain.hour * 60) + remain.minute) * 60) + remain.second + " seconds";
    else if(remain.minute) return remain.eventTime + " " + (remain.minute * 60) + remain.second + " seconds";
    else return remain.eventTime + " " + remain.second + " seconds";
}
////////////////////////////////////////////////////////////////////////////////////
function getDuration(start: string | Date | undefined, end: string | Date | undefined, format: string | undefined) : DurationgReturn
{
    let _start = moment(start, format);
    let _end = moment(end, format);
    let _duration = moment.duration(_end.diff(_start));
    return {
        durationConnected:{years:_duration.years(), months:_duration.months(), days:_duration.days(), hours:_duration.hours(), minutes:_duration.minutes(), seconds:_duration.seconds(), milliseconds: _duration.milliseconds(), 
            durationString: `${_duration.years() != 0 ? _duration.years()+" years :: " : ""}${_duration.months() != 0 ? _duration.months() +" months :: " : ""}${_duration.days() != 0 ? _duration.days() + " days :: " : ""}${_duration.hours() != 0 ? _duration.hours() + " hours :: ": ""}`
             + `${_duration.minutes() != 0 ? _duration.minutes() + " minutes :: " : ""}${_duration.seconds() != 0 ? _duration.seconds() + " seconds" : ""}${_duration.milliseconds() != 0 ? " :: " + _duration.milliseconds() + " milliseconds" : ""}`
            },
        durationSeparately:{years:_duration.asYears(), months:_duration.asMonths(), days:_duration.asDays(), hours:_duration.asHours(), minutes:_duration.asMinutes(), seconds:_duration.asSeconds(), milliseconds:_duration.asMilliseconds()}
    }
}
////////////////////////////////////////////////////////////////////////////////////
export function getTimeNow(options: timeNowOptions) : string
{
    if(!options) options = {};
    let date = new Date();
    let tzo = options.timeZone;
    if(tzo || tzo == 0)
    {
        if(typeof tzo == "string") 
        {
            if(tzo.includes(":")) 
            {
                let splitTzo:any[] = tzo.split(":");
                splitTzo[1] = (parseInt(tzo[1]) / 60) * 100;
                tzo = splitTzo.join(".");
            }
            else tzo = `${tzo.slice(0, - 2)}.${(parseInt(tzo.slice(- 2, tzo.length)) / 60) * 100}`;
            tzo = parseFloat(tzo);
        }
        let changeTime = date.getTime() + (date.getTimezoneOffset() * 60000);
        date = new Date(changeTime + (3600000 * tzo));
        let splitTzo:any[] = tzo.toString().split(".");
        splitTzo[0] = parseInt(splitTzo[0]);
        if(splitTzo[0] > 9) splitTzo[0] = `+${splitTzo[0]}`;
        else if(splitTzo[0] >= 0 && splitTzo[0] <= 9) splitTzo[0] = `+0${splitTzo[0]}`;
        else if(splitTzo[0] < 0 && splitTzo[0] >= -9) splitTzo[0] = `-0${splitTzo[0].toString().split("-").join("")}`;
        if(!splitTzo[1]) splitTzo[1] = "00";
        else
        {
            splitTzo[1] = (parseInt(splitTzo[1]) / 10) * 60;
            if(splitTzo[1] <= 9) splitTzo[1] = `0${splitTzo[1]}`;
        }
        tzo = splitTzo.join(":");
    } 
    else tzo = moment().format("Z");
    let splitDate = date.toLocaleDateString().split("/");
    let splitTime = date.toLocaleTimeString().split(":");
    let timeString = `${splitDate[2]}/${splitDate[0]}/${splitDate[1]} ${splitTime[0]}:${splitTime[1]}:${splitTime[2].split(" ")[0]} ${splitTime[2].split(" ")[1]} ${tzo}`;
    return moment.parseZone(timeString, "YYYY/M/D h:mm:ss A Z").format(options.format);
}

////////////////////////////////////////////////////////////////////////////////////
export let remaining:Remaining ={
    getSeconds(options: RemainingOptions): string { return getCalcSeconds(options)},
    getMinute(options: RemainingOptions): string { return getCalcMinute(options)},
    getHours(options: RemainingOptions): string { return getCalcHours(options)},
    getDays(options: RemainingOptions): string {return getCalcDays(options)},
    getMonths(options: RemainingOptions): string {return getCalcMonths(options)},
    getYears(options: RemainingOptions): string {return getCalcYears(options)},
    get(options: RemainingOptions) : RemainingReturn { return _remaining(options)},
    }

////////////////////////////////////////////////////////////////////////////////////
export let duration:Duration = {
    getDurationNow(options: DurationNowOptions) : DurationgReturn
    {
        if(!options) options = {};
        if(!options.end) options.end = getTimeNow({timeZone: options.timeZone});
        return getDuration(getTimeNow({timeZone: options.timeZone}), options.end, options.format);
    },
    getDurationPeriods(options: DurationPeriodsOptions) : DurationgReturn
    {
        if(!options) options = {};
        if(!options.start) options.start = getTimeNow({});
        if(!options.end) options.end = getTimeNow({});
        return getDuration(options.start, options.end, options.format);
    }

}

interface RemainingOptions{
    timeString?: string | undefined, 
    format?: string | undefined, 
    timeZone?: string | number | undefined
}
interface timeNowOptions{
    format?: string | undefined, 
    timeZone?: string | number | undefined
}
interface DurationNowOptions
{
    end?: string | Date | undefined,
    format?: string | undefined, 
    timeZone?: string | number | undefined
}
interface DurationPeriodsOptions{
    start?: string | Date | undefined,
    end?: string | Date | undefined,
    format?: string | undefined, 
}

type Remaining = {
    getSeconds(options: RemainingOptions): string,
    getMinute(options: RemainingOptions): string,
    getHours(options: RemainingOptions): string,
    getDays(options: RemainingOptions): string,
    getMonths(options: RemainingOptions): string,
    getYears(options: RemainingOptions): string,
    get(options: RemainingOptions): RemainingReturn
}
type Duration = {
    getDurationNow(options: DurationNowOptions) : DurationgReturn,
    getDurationPeriods(options: DurationPeriodsOptions) : DurationgReturn
}
type RemainingReturn = {
    year: number, month: number, day: number, hour: number, minute: number, second: number, remain: string, 
    eventTime:"Currently" | "After" | "Before", timeString:string, format:string | undefined
}
type DurationgReturn = {
    durationConnected:{years: number, months: number, days: number, hours: number, minutes: number, seconds: number, milliseconds: number, durationString: string},
    durationSeparately:{years: number, months: number, days: number, hours: number, minutes: number, seconds: number, milliseconds: number}
}

