import { Component, OnInit } from '@angular/core';
import { Timer } from '../timer'
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.css']
})
export class TimersComponent implements OnInit {
  private tick: number;
  private subscription: Subscription;

  timer: Timer = {
    id: 1,
    duration: '00:05',
    status: 'stop'
  };

  constructor() { }

  ngOnInit() {
    // this.startTimer();
  }

  stringToSeconds(): number {
    var getValue = this.timer.duration.split(":");
    var getSeconds = (Number(getValue[0]) * 60) + (Number(getValue[1]));
    return getSeconds;
  }

  secondsToString(getSeconds: number): string {
    var getMinute, seconds = "00"


    if (getSeconds >= 60) {
      getMinute = Math.floor(getSeconds/ 60).toString();
      seconds = (getSeconds % 60).toString();
    }
    else {
      getMinute = "00";
      seconds = getSeconds.toString();
    }

    if (Number(getMinute) < 10 && getMinute != "00") {
      getMinute = "0" + getMinute;
    }

    if (Number(seconds) < 10) {
      seconds = "0" + seconds;
    }
      return getMinute + ":" + seconds;
  }

  startTimer() {
    const start: number = this.stringToSeconds();
    let customTimer = TimerObservable.create(0, 1000);

    this.subscription = customTimer.subscribe(t => {
      this.timer.duration = this.secondsToString(start - t);
      if (this.stringToSeconds() <= 0) {
        this.subscription.unsubscribe();
        this.timer.duration = "Done!"
      }
    });

    
  }

}
