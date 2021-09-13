import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerService } from './public/services/spinner-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VM Assignment Portal';
  isLoading: boolean = false;
  private subscription!: Subscription;
  constructor(private route: ActivatedRoute, private spinner: SpinnerService) {
    this.subscription = this.spinner.getSpinnerState().subscribe((value) => {
      if (value) {
        console.log('Spinner state:' + value.value);
        this.isLoading = value.value;
      } else {
      }
    });
  }

  ngOnInit() {}
}
