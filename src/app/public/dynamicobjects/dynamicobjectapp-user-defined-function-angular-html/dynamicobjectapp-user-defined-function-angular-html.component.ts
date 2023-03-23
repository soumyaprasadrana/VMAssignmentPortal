// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Object App View Record Component
 */
import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MustMatch } from "../../widget/utils/must-match.validator";
import { CustomValidator } from "../../widget/utils/no-white-space-validator";
import { NodeclientService } from "../../services/nodeclient.service";
import { HttpHeaders } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent } from "../../widget/alert-dialog/alert-dialog.component";
import { SpinnerService } from "../../services/spinner-service";
import { ActivatedRoute, Router } from "@angular/router";
import { TeamService } from "../../services/teams.service";
import { AuthserviceService } from "../../services/authservice.service";
import { ToastService } from "../../widget/toast/toast-service";
import { DynamicObjectAppService } from "../../services/dynamicobjectapp.service";
import { CommonService } from "../../services/common.service";
import { UserService } from "../../services/users.service";
import { DomSanitizer } from "@angular/platform-browser";
import { UserDefinedFunctionsService } from "../../services/userdefinedfunctions.service";
import { InputDialogComponent } from "../../widget/alert-dialog/input-dialog.component";
import { MatButton } from "@angular/material/button";
@Component({
  selector: "app-dynamicobjectapp-user-defined-function-angular-html",
  templateUrl:
    "./dynamicobjectapp-user-defined-function-angular-html.component.html",
  styleUrls: [
    "./dynamicobjectapp-user-defined-function-angular-html.component.scss",
  ],
})
export class DynamicObjectAppUserDefinedFunctionANgularHTMLPageComponent
  implements OnInit {
  @Input() elementType?: any;
  @Input() attributes?: any;
  @Input() model?: any;
  @Input() click?: any;
  @Input() ngIf?: any;
  @Input() ngStyle?: any;
  @Input() ngClass?: any;
  @Input() context?: any;
  @Input() innerHTML?: any;
  CLASS = "<DynamicObjectAppUserDefinedFunctionANgularHTMLPageComponent>";
  ngIfOrigional: string = "";
  constructor(
    private _funService: UserDefinedFunctionsService,
    private route: ActivatedRoute,
    private router: Router,
    private _client: NodeclientService,
    private spinner: SpinnerService,
    private dynamicobjectappServie: DynamicObjectAppService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    console.log(this.CLASS + " :: entry");
    console.log(this.CLASS + " :: entry :: elementType ::", this.elementType);
    console.log(this.CLASS + " :: entry :: attributes ::", this.attributes);
    console.log(this.CLASS + " :: entry :: model ::", this.model);
    console.log(this.CLASS + " :: entry :: click ::", this.click);
    console.log(this.CLASS + " :: entry :: ngStyle ::", this.ngStyle);
    console.log(this.CLASS + " :: entry :: ngClass ::", this.ngClass);
    console.log(this.CLASS + " :: entry :: ngIf ::", this.ngIf);
    if (typeof this.ngIf == "string") {
      this.ngIfOrigional = this.ngIf;
      if (this.ngIf.includes("context"))
        this.ngIf = this.context[this.ngIf.split(".")[1]];
    }
    if (typeof this.ngIf == "undefined") this.ngIf = true;
  }
  HandleClick() {
    console.log(
      ">>>>>>>>>>>>>>>> HANDLE CLICK >>>>>>>>>>>",
      typeof this.click,
      typeof this.click == "function"
    );
    if (typeof this.click == "function") {
      this.click(this.context);
    }
  }
}
