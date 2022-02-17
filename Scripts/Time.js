function padNum(num,length = 2){
    var rev = num.toString().split("").reverse().join("");
    for(var i = rev.length; i < length; i++){
        rev += "0";
    }
    return rev.split("").reverse().join("");
}

class Time {
    constructor(hours = new Date().getHours(), minutes = new Date().getMinutes(), seconds = new Date().getSeconds(), ms = new Date().getMilliseconds()){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.ms = ms;
    }
    static parseTime(timeStr){
        var vals = timeStr.split(".")
        var clockTime = vals[0].split(":").map(x => parseInt(x))
        return new Time(clockTime[0],clockTime[1],clockTime[2] || 0,parseInt(vals[1] || "0"))
    }
    totalMS = () => (this.hours * 36e5) + (this.minutes * 6e4) + (this.seconds * 1e3) + this.ms;
    
    static now = () => new Time();
    static forDate = (date = new Date()) => new Time(date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds());
    
    toString = () => `${padNum(this.hours)}:${padNum(this.minutes)}:${padNum(this.seconds)}.${padNum(this.ms,3)}`;
    hourMinString = () => this.toString().substr(0,5);
    minSecString = () => this.toString().substr(3,5);
    clockTimeString = () => this.toString().split(".")[0];
}
