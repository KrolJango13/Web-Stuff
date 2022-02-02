class Time {
    constructor(hours = new Date().getHours(), minutes = new Date().getMinutes(), seconds = new Date().getSeconds(), ms = new Date().getMilliseconds()){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.ms = ms;
    }
    static fromMS(ms){
        var hours = Math.floor(ms/36e5);
        ms -= hours;
        var mins = Math.floor(ms/6e4);
        ms -= mins;
        var sec = Math.floor(ms/1000);
        ms -= sec;
        return new Time(hours,mins,sec,ms);
    }
    totalMS = () => (this.hours * 36e5) + (this.minutes * 6e4) + (this.seconds * 1000) + this.ms;
    until = (otherTime) => Time.fromMS(this.totalMS() - otherTime.totalMS());
    addTime(otherTime){
        this.hours += otherTime.hours;
        this.minutes += otherTime.minutes;
        this.seconds += otherTime.seconds'
        this.ms += otherTime.ms;
    }
    static now(){
        var d = new Date();
        return new Time(d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds());
    }
}
