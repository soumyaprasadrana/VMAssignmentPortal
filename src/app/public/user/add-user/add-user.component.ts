import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../DataModel/team';
import { TeamService } from '../../services/teams.service';
import { MustMatch } from '../../widget/utils/must-match.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public ngxteam = new FormControl();
  registerForm !: FormGroup;
  submitted = false;
  teams: Array<Team> = [];
  constructor(private formBuilder: FormBuilder, private tms: TeamService) {
    this.teams = tms.getTeams();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      user_name: ['', Validators.required],
      user_pass: ['', [Validators.required, Validators.minLength(6)]],
      conf_pass: ['', Validators.required],
      ngxteam: ['', Validators.required]

    }, {
      validator: MustMatch('user_pass', 'conf_pass')
    });
  }



  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.registerForm)
      console.log("Invalid")
      return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
}
