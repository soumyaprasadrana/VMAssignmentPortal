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
  @Input() elementType?: any = "div";
  @Input() attributes?: any = { color: "red" };
  @Input() model?: any;
  @Input() click?: any = () => alert(1);
  @Input() ngIf?: any = true;
  @Input() ngStyle?: any;
  @Input() ngClass?: any;
  constructor(
    private _funService: UserDefinedFunctionsService,
    private route: ActivatedRoute,
    private router: Router,
    private _client: NodeclientService,
    private spinner: SpinnerService,
    private dynamicobjectappServie: DynamicObjectAppService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {}
}
