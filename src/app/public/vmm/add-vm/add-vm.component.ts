import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../widget/utils/must-match.validator';
import { Team } from '../../DataModel/team';
import { TeamService } from '../../services/teams.service';
import { OS } from '../../DataModel/os';
import { OSService } from '../../services/vm.os.service';
@Component({
  selector: 'app-add-vm',
  templateUrl: './add-vm.component.html',
  styleUrls: ['./add-vm.component.scss']
})
export class AddVmComponent implements OnInit {
  registerForm !: FormGroup;
  submitted = false;
  selectedTeam!: string;
  selectedOS!: string;
  osList: Array<OS> = [];
  teams: Array<Team> = [];
  constructor(private formBuilder: FormBuilder, private tms: TeamService, private oss: OSService) {
    this.teams = tms.getTeams();
    this.osList = oss.getOsList();
  }
  public ngxteam = new FormControl();
  public ngxos = new FormControl();
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      ip: ['', Validators.required],
      host: ['', Validators.required],
      ngxos: ['', Validators.required],
      ram: ['', [Validators.required, Validators.max(200)]],
      group: ['', Validators.required],
      owner: ['', Validators.required],
      ngxteam: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
  toJSON(object: any) {
    return JSON.stringify(object);
  }
}
