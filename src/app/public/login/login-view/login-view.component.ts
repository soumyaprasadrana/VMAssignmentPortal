// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Login View Component
 */
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';
import { FormGroup } from '@angular/forms';
import { SpinnerService } from '../../services/spinner-service';
import { NodeclientService } from '../../services/nodeclient.service';
import { HttpHeaders } from '@angular/common/http';
interface Alert {
  type: string;
  message: string;
}
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  providers: [NgbCarouselConfig],
})
export class LoginViewComponent implements OnInit {
  /* For View */
  showNavigationArrows = false;
  showNavigationIndicators = true;
  images = [1, 2, 3, 4, 5,6].map((n) => `assets/images/${n}.PNG`);
  /* For Validation */
  form: FormGroup = new FormGroup({
    password: new FormControl('', Validators.minLength(2)),
    passwordConfirm: new FormControl('', Validators.minLength(2)),
  });

  submitted = false;
  //Alert Message
  //Alert Message
  alert: Alert = {
    type: '',
    message: '',
  };
  showAlert: boolean = false;
  hideloginfooter: boolean = false;
  hide: boolean = true;

  constructor(
    config: NgbCarouselConfig,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthserviceService,
    private spinner: SpinnerService,
    private _client: NodeclientService
  ) {
    // customize default values of carousels used by this component tree

    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    var httpOptions = {
      headers: headers,
    };

    var hideloginfooter;
    this._client
      .get('api/config/hideloginfooter', httpOptions)
      .then((res: any) => {
        hideloginfooter = res.hideloginfooter;
        console.log(
          'Confi hideloginfooter loded from server :',
          hideloginfooter
        );
        this.hideloginfooter = hideloginfooter;
      })
      .catch((err) => {
        console.log('Error Occurred! Using default value!');
      });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    var promise = this.auth.checkSession();
    promise
      .then((result) => {
        //console.log('After Result');
        if (result.status) {
          //console.log('Authentication Sucessfull');
          this.alert.type = 'success';
          this.alert.message = 'Login Success';
          this.router.navigate(['/portal/home/dash']);
          this.showAlert = true;
        }
      })
      .catch((result) => {
        //Handle error case
        //console.log('Login Failed.', result);
      });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.alert.type = 'danger';
      this.alert.message = 'Form is invalid';
      this.showAlert = true;
      return;
    }

    this.spinner.setSpinnerState(true);
    //console.log(this.f.username.value);
    //console.log(this.f.password.value);
    //this.auth.login(this.f.username.value, this.f.password.value);
    var promise = this.auth.login(this.f.username.value, this.f.password.value);
    promise
      .then((result) => {
        //console.log('After Result');
        if (result.status) {
          //console.log('Login Success true');
          this.alert.type = 'success';
          this.alert.message = 'Login Success';
          this.router.navigate(['/portal/home']);
          this.showAlert = true;

          this.spinner.setSpinnerState(false);
        } else {
          this.alert.type = 'danger';
          this.alert.message = result.message;
          this.showAlert = true;

          this.spinner.setSpinnerState(false);
        }
      })
      .catch((result) => {
        this.alert.type = 'danger';
        this.alert.message = result.message;
        this.showAlert = true;

        this.spinner.setSpinnerState(false);
      });
  }
}
