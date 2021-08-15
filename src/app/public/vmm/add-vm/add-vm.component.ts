import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../widget/utils/must-match.validator';
@Component({
  selector: 'app-add-vm',
  templateUrl: './add-vm.component.html',
  styleUrls: ['./add-vm.component.scss']
})
export class AddVmComponent implements OnInit {
  registerForm !: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      ip: ['', Validators.required],
      host: ['', Validators.required],
      os: ['', Validators.required],
      osVer: ['', Validators.required],
      ram: ['', [Validators.required, Validators.max(200)]],
      group: ['', Validators.required],
      owner: ['', Validators.required],
      team: ['', Validators.required]
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
}
