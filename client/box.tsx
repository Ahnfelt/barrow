/// <reference path="../DefinitelyTyped/react/react.d.ts" />
/// <reference path="../DefinitelyTyped/react/react-dom.d.ts" />

// TODO: JS files for these need to be in target/client right now, find a fix.
import React = require('react');
import ReactDOM = require('react-dom');

class CityRow extends React.Component<{UTCOffset: string}, {hours: string, minutes: string, seconds: string}> {
    private interval : number
    setTime() {
  
  	    var currentdate = new Date();
  	    var hours = currentdate.getUTCHours() + parseInt(this.props.UTCOffset);    

        // correct for number over 24, and negatives
        if(hours >= 24) { hours -= 24; }
        if(hours < 0) { hours += 12; }

        // add leading zero, first convert hours to string
        var hoursText = hours + "";
        if(hoursText.length == 1){ hoursText = "0" + hoursText; }

        // minutes are the same on every time zone
        var minutes = currentdate.getUTCMinutes();
	  
        // add leading zero, first convert hours to string
        var minutesText = minutes + "";
        if(minutesText.length == 1) { minutesText = "0" + minutesText; }

        var seconds = currentdate.getUTCSeconds();

        var secondsText = seconds + "";
        if(secondsText.length == 1) { secondsText = "0" + secondsText; }

        this.setState({
      	    hours: hoursText,
            minutes: minutesText,
            seconds: secondsText
        });
    }
    componentWillMount() {
  	    this.setTime();
    }
    componentDidMount() {
  	    this.interval = window.setInterval(() => this.setTime(), 1000);
    }
    componentWillUnmount() {
        window.clearInterval(this.interval)
    }
    render() {
        return(
            <div className="city-row" ref="cityRow">
                <span className="city-time">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</span>
            </div>
        )
    }
};

ReactDOM.render(
  <CityRow UTCOffset="1" />,
  document.getElementById('example')
);
