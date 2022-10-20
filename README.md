## Update 0.1.1
- Add duration;
- Duration has two method ( getDurationNow() | getDurationPeriods() )
- - -
# Install
```
npm install easy-timing --save
```
```javascript
const easyTiming = require("easy-timing");
```
# Values
Key | Type 
--- | ----
remaining | prototype
duration | prototype
getTimeNow | method
---
# Remaining
For example get remaining  
```javascript
// Current written date [ 2022/09/22 12:00:00 AM ]
easyTiming.remaining.get(/*options: RemainingOptions*/);
/* 
return {
  year: 0,
  month: 0,
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
  remain: 'a few seconds ago',
  eventTime: 'Currently',
  timeString: '2022-09-22T00:14:43+03:00',
  format: undefined
}
*/
```
For example, get the remaining before in detail.
```javascript
// Current written date [ 2022/09/22 12:00:00 AM ]
easyTiming.remaining.getYears({format:"YYYY/MM/DD hh:mm:ss a", timeString:"2022/01/01 12:00:00 am"}); // return Before 8 months
easyTiming.remaining.getMonths({format:"YYYY/MM/DD hh:mm:ss a", timeString:"2022/01/01 12:00:00 am"}); // return Before 8 months
easyTiming.remaining.getDays({format:"YYYY/MM/DD hh:mm:ss a", timeString:"2022/01/01 12:00:00 am"}); // return Before 24021 days
easyTiming.remaining.getHours({format:"YYYY/MM/DD hh:mm:ss a", timeString:"2022/01/01 12:00:00 am"}); // return Before 62640 hours
easyTiming.remaining.getMinute({format:"YYYY/MM/DD hh:mm:ss a", timeString:"2022/01/01 12:00:00 am"}); // return Before 37584019 minutes
easyTiming.remaining.getSeconds({format:"YYYY/MM/DD hh:mm:ss a", timeString:"2022/01/01 12:00:00 am"}); // return Before 2255154014 seconds
```
For example, get the remaining after in detail.
```javascript
// Current written date [ 2022/09/22 12:00:00 AM ]
easyTiming.remaining.getYears({format:"YYYY/MM/DD hh:mm:ss a", timeString:"2024/01/01 12:00:00 am", timeZone:3}) // return After 1 years
easyTiming.remaining.getDays({format:"YYYY/MM/DD hh:mm:ss a", timeString:"2024/01/01 12:00:00 am", timeZone:3}) // return After 4508 days
```
---
# Duration
```javascript
easyTiming.duration.getDurationNow(/*options: DurationNowOptions*/);
easyTiming.duration.getDurationPeriods(/*options: DurationPeriodsOptions*/);
/*
return {
  durationConnected: {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    durationString: ''
  },
  durationSeparately: {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  }
}
*/
```
For example, get the duration with now.
```javascript
// Current written date [ 2022/09/24 04:45:00 PM ]
easyTiming.duration.getDurationNow({end: "2025/09/19 PM 11:40:00", format:"YYYY/MM/DD A hh:mm:ss" , timeZone:"+0400"});
/*
return {
  durationConnected: {
    years: 2,
    months: 11,
    days: 25,
    hours: 6,
    minutes: 56,
    seconds: 7,
    milliseconds: 0,
    durationString: '2 years :: 11 months :: 25 days :: 6 hours :: 56 minutes :: 7 seconds'
  },
  durationSeparately: {
    years: 2.987847717358761,
    months: 35.854172608305134,
    days: 1091.2889699074074,
    hours: 26190.93527777778,
    minutes: 1571456.1166666667,
    seconds: 94287367,
    milliseconds: 94287367000
  }
}
*/
```
For example, get the duration between periods.
```javascript
easyTiming.duration.getDurationPeriods({start:"2019/05/22 09:12:05 AM", end: "2025/09/19 11:40:00 PM", format:"YYYY/MM/DD hh:mm:ss A"});
/*
return {
  durationConnected: {
    years: 6,
    months: 3,
    days: 29,
    hours: 14,
    minutes: 27,
    seconds: 55,
    milliseconds: 0,
    durationString: '6 years :: 3 months :: 29 days :: 14 hours :: 27 minutes :: 55 seconds'
  },
  durationSeparately: {
    years: 6.331691191215172,
    months: 75.98029429458207,
    days: 2312.6027199074074,
    hours: 55502.46527777778,
    minutes: 3330147.9166666665,
    seconds: 199808875,
    milliseconds: 199808875000
  }
}
*/
```
---
# Get Time Now
For example, get time now with format.
```javascript
// time now for my time zone +03:00
easyTiming.getTimeNow(/*options: timeNowOptions*/) // return 2022-09-22T00:34:58+03:00

// change time zone with format
easyTiming.getTimeNow({timeZone: 4, format:"ZZ YYYY/MM/DD hh:mm:ss a"}); // return +0400 2022/09/22 01:39:29 am
easyTiming.getTimeNow({timeZone: "+04:00", format:"YYYY MM DD hh:mm:ss A Z"}); // return 2022 09 22 01:39:29 AM +04:00
easyTiming.getTimeNow({timeZone: "+0400", format:"DD-YYYY-MM ZZ hh:mm:ss a"}); // return 22-2022-09 +0400 01:39:29 am
```
# Options
#### RemainingOptions
Key | Type 
--- | ---- 
timeString | string 
format | string, undefined
timeZone | string, number, undefined
#### timeNowOptions
Key | Type 
--- | ---- 
format | string, undefined
timeZone | string, number 
#### DurationNowOptions
Key | Type 
--- | ---- 
format | string, undefined
end | string, Date, undefined
timeZone | string, number, undefined
#### DurationPeriodsOptions
Key | Type 
--- | ---- 
format | string, undefined
start | string, Date
end | string, Date, undefined

# Time Zone
- Default time zone in your contory.
- You can seelec number time zone by [time zone map](https://www.timeanddate.com/time/map/)
- You can write time zone number ` -11 ` ` +12 ` or text ` "+0500" ` ` -03:00 ` ` +06:30 ` ` -0200 `
# Format
- YYYY = four-digit year
- MM   = two-digit month (01 through 12)
- DD   = two-digit day of month (01 through 31)
- hh   = two digits of hour (00 through 23) or (00 through 12) // 0 - 12 if enable a
- mm   = two digits of minute (00 through 59)
- ss   = two digits of second (00 through 59)
- s    = one or more digits representing a decimal fraction of a second
- a    = digits enable (am or pm)
- A    = digits enable (AM or PM)
- ZZ   = two-digit time zone (-12 through 14) // +0300
- Z   = one-digit time zone (-12 through 14) // +03:00
- TZD  = time zone designator (Z or +hh:mm or -hh:mm)