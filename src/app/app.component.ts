import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerService } from './public/services/spinner-service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AuthserviceService } from './public/services/authservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VM Assignment Portal';
  isLoading: boolean = false;
  private subscription!: Subscription;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;
  constructor(
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private idle: Idle,
    private keepalive: Keepalive,
    private auth: AuthserviceService,
    private router: Router
  ) {
    this.subscription = this.spinner.getSpinnerState().subscribe((value) => {
      if (value) {
        //console.log('Spinner state:' + value.value);
        this.isLoading = value.value;
      } else {
      }
    });

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5 * 60);

    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      if (!this.router.url.includes('login')) {
        this.signOut();
      } else {
        console.log('Already on the sign in page !');
      }
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      console.log("You've gone idle!");
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log('You will time out in ' + countdown + ' seconds!');
    });

    // Sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.reset();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  signOut() {
    //console.log('Signing out user ...');
    var promise = this.auth.signOut();
    promise
      .then((result) => {
        if (result.status) {
          this.router.navigate(['/portal/login']).then(() => {
            window.location.reload();
          });
        } else {
          console.log('Signout Failed!');
        }
      })
      .catch((result) => {
        console.log('Signout Failed');
      });
  }

  ngOnInit() {}

  ngAfterContentInit() {}
}
