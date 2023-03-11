"use strict";(self.webpackChunkVMPORTAL=self.webpackChunkVMPORTAL||[]).push([[810],{1810:(Re,T,u)=>{u.r(T),u.d(T,{UserModule:()=>Pe});var _=u(9808),m=u(8555),Q=u(5866),e=u(5e3),V=u(3708);let w=(()=>{class n{constructor(t){this.routeHandle=t}ngOnInit(){}getRouterOutletState(t){return t&&t.activatedRouteData&&t.activatedRouteData.animation}onRouterOutletActivate(t){this.routeHandle.setUserRouterOutlet(t)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(V.f))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-user-view"]],decls:5,vars:1,consts:[["o","outlet"]],template:function(t,i){if(1&t&&(e.TgZ(0,"main"),e._uU(1,"\n    "),e._UZ(2,"router-outlet",null,0),e._uU(4,"\n"),e.qZA()),2&t){const o=e.MAs(3);e.Q6J("@routeAnimations",i.getRouterOutletState(o))}},directives:[m.lC],styles:[""],data:{animation:[Q.zh]}}),n})();var y=u(9135),q=u(520),s=u(3075),h=u(8235),E=u(5942),F=u(2232),A=u(2305),C=u(7440),x=u(5174),N=u(8341),I=u(287),J=u(4680),b=u(7160),S=u(3176),f=u(4537),Y=u(1377);function M(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Full name is required"),e.qZA())}function O(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n                                "),e.YNc(2,M,2,0,"div",44),e._uU(3,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.user_name.errors.required)}}function D(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Username is required"),e.qZA())}function k(n,r){1&n&&(e.TgZ(0,"div"),e._uU(1,"White Space is not allowed."),e.qZA())}function K(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n                                    "),e.YNc(2,D,2,0,"div",44),e._uU(3,"\n                                    "),e.YNc(4,k,2,0,"div",46),e._uU(5,"\n                                "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.user_id.errors.required),e.xp6(2),e.Q6J("ngIf",t.f.user_id.errors.restrictWhiteSpace)}}function L(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Passwod is required"),e.qZA())}function P(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Password must be at least 6 characters"),e.qZA())}function R(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n                                "),e.YNc(2,L,2,0,"div",44),e._uU(3,"\n                                "),e.YNc(4,P,2,0,"div",44),e._uU(5,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.user_pass.errors.required),e.xp6(2),e.Q6J("ngIf",t.f.user_pass.errors.minlength)}}function B(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Confirm Passwod is required"),e.qZA())}function j(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Passwords must match"),e.qZA())}function $(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n                                "),e.YNc(2,B,2,0,"div",44),e._uU(3,"\n                                "),e.YNc(4,j,2,0,"div",44),e._uU(5,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.conf_pass.errors.required),e.xp6(2),e.Q6J("ngIf",t.f.conf_pass.errors.mustMatch)}}function W(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"E-Mail is required"),e.qZA())}function z(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Invalid E-Mail!"),e.qZA())}function G(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n\n                                "),e.YNc(2,W,2,0,"div",44),e._uU(3,"\n                                "),e.YNc(4,z,2,0,"div",44),e._uU(5,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.user_email.errors.required),e.xp6(2),e.Q6J("ngIf",t.f.user_email.errors.email)}}function H(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Team is required"),e.qZA())}function X(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n\n                                "),e.YNc(2,H,2,0,"div",44),e._uU(3,"\n                            "),e.qZA()),2&n){const t=e.oxw(2);e.xp6(2),e.Q6J("ngIf",t.f.team.errors.required)}}const ee=function(n){return{"is-ngx-invalid is-invalid":n}};function ne(n,r){if(1&n&&(e.TgZ(0,"div",9),e._uU(1,"\n                        "),e.TgZ(2,"div",10),e._uU(3,"\n                            "),e.TgZ(4,"label",47),e._uU(5,"Team:"),e.qZA(),e._uU(6,"\n                            "),e._uU(7,"\n                            "),e._UZ(8,"span",48),e._uU(9,"\n                            "),e.TgZ(10,"ng-select",49),e._uU(11,"\n                            "),e.qZA(),e._uU(12,"\n                            "),e.YNc(13,X,4,1,"div",14),e._uU(14,"\n                        "),e.qZA(),e._uU(15,"\n                    "),e.qZA()),2&n){const t=e.oxw();e.xp6(10),e.Q6J("items",t.teams)("formControl",t.team)("ngClass",e.VKq(4,ee,t.submitted&&t.f.team.errors)),e.xp6(3),e.Q6J("ngIf",t.submitted&&t.f.team.errors)}}function te(n,r){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.xp6(1),e.Oqu(t)}}function ie(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Delete VM is required"),e.qZA())}function re(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n                        "),e.YNc(2,ie,2,0,"div",44),e._uU(3,"\n                    "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.removeVM.errors.required)}}function se(n,r){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.xp6(1),e.Oqu(t)}}function oe(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Create User is required"),e.qZA())}function ue(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n                        "),e.YNc(2,oe,2,0,"div",44),e._uU(3,"\n                    "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.addUser.errors.required)}}function ae(n,r){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.xp6(1),e.Oqu(t)}}function de(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Edit User is required"),e.qZA())}function _e(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n                        "),e.YNc(2,de,2,0,"div",44),e._uU(3,"\n                    "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.editUser.errors.required)}}function le(n,r){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.xp6(1),e.Oqu(t)}}function me(n,r){1&n&&(e.TgZ(0,"div",45),e._uU(1,"Delete User is required"),e.qZA())}function Ue(n,r){if(1&n&&(e.TgZ(0,"div",43),e._uU(1,"\n                        "),e.YNc(2,me,2,0,"div",44),e._uU(3,"\n                    "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.removeUser.errors.required)}}const d=function(n){return{"is-invalid":n}};let pe=(()=>{class n{constructor(t,i,o,a,c,g,v,p,Z){this.formBuilder=t,this.tms=i,this._spinner=o,this._client=a,this.dialog=c,this.router=g,this._auth=v,this.userService=p,this.toastService=Z,this.team=new s.NI,this.submitted=!1,this.teams=[],this.permissionValueList=["No","Yes"],this.title=" Create User",i.getTeams().then(U=>{this.teams=U}).catch(U=>{}),this.loggedUser=this._auth.getUser()}ngOnInit(){var t;t=this.loggedUser.permissions.is_admin?s.kI.required:null,this.registerForm=this.formBuilder.group({user_name:["",s.kI.required],user_id:["",[s.kI.required,F.w.restrictWhiteSpace]],user_email:["",[s.kI.required,s.kI.email]],user_pass:["",[s.kI.required,s.kI.minLength(6)]],conf_pass:["",s.kI.required],team:[null,t],addUser:["No",s.kI.required],editUser:["No",s.kI.required],removeUser:["No",s.kI.required],removeVM:["No",s.kI.required]},{validator:(0,E.Y)("user_pass","conf_pass")})}get f(){return this.registerForm.controls}onSubmit(){if(this.submitted=!0,this._spinner.setSpinnerState(!0),this.registerForm.invalid)this._spinner.setSpinnerState(!1);else{var t=new q.WM({"Content-Type":"application/json"});this._client.post("api/user/adduser",this.registerForm.value,{headers:t}).then(a=>{this._spinner.setSpinnerState(!1),a&&(a=JSON.parse(a)),"Success"==a.status?(this.userService.setNeedRefresh(!0),this.loggedUser.useToast?(this.toastService.showSuccess("User created successfully!",5e3),this.router.navigate(["/portal/home/user/dash"])):this.openDialog({type:"message",message:"User created successfully!"},()=>{this.router.navigate(["/portal/home/user/dash"])})):(this._spinner.setSpinnerState(!1),this.openDialog({type:"alert",message:a.message},null))}).catch(a=>{this._spinner.setSpinnerState(!1),this.openDialog({type:"alert",message:a.message},null)})}}openDialog(t,i){this.dialog.open(h.h,{data:t,panelClass:"app-dialog-class"}).afterClosed().toPromise().then(o=>{"function"==typeof i&&i()})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(s.qu),e.Y36(A.U),e.Y36(C.V),e.Y36(x.l),e.Y36(N.uw),e.Y36(m.F0),e.Y36(I.q),e.Y36(J.K),e.Y36(b.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-add-user"]],decls:205,vars:43,consts:[[1,"container-fluid-lg","p-3","my-3"],[1,"row"],[1,"col-xs-6"],[1,"page-title","ml-3"],["area-label","false",1,"fa","fa-user-plus"],[3,"formGroup","ngSubmit"],[1,"row","ml-4"],[1,"col-lg-12"],[1,"row","p-1"],[1,"col-sm-6"],[1,"form-group","required"],["for","name"],["area-label","false",1,"fa","fa-vcard","form-control-prefix-icon","text-muted"],["id","name","type","text","formControlName","user_name",1,"form-control","form-control-include-icon",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],[1,"form-group"],["for","userid"],["area-label","false",1,"fa","fa-user","form-control-prefix-icon","text-muted"],["id","userid","type","text","formControlName","user_id",1,"form-control","form-control-include-icon",3,"ngClass"],["for","password"],["area-label","false",1,"fa","fa-lock","form-control-prefix-icon","text-muted"],["id","password","type","password","autocomplete","new-password","formControlName","user_pass",1,"form-control","form-control-include-icon",3,"ngClass"],["for","conf_password"],["id","conf_password","type","password","autocomplete","new-password","formControlName","conf_pass",1,"form-control","form-control-include-icon",3,"ngClass"],["for","email"],["area-label","false",1,"fa","fa-envelope","form-control-prefix-icon","text-muted"],["id","email","formControlName","user_email",1,"form-control","form-control-include-icon",3,"ngClass"],["class","col-sm-6",4,"ngIf"],[1,"ml-3"],["area-label","false",1,"fa","fa-key"],[1,"row","p-1","ml-4"],[1,"col-sm-2","mr-0","pr-0"],["for","remove_vm"],["id","remove_vm","formControlName","removeVM",1,"form-control",3,"ngClass"],[4,"ngFor","ngForOf"],["for","addUser"],["id","addUser","formControlName","addUser",1,"form-control",3,"ngClass"],["for","editUser"],["id","editUser","formControlName","editUser",1,"form-control",3,"ngClass"],["for","removeUser"],["id","removeUser","formControlName","removeUser",1,"form-control",3,"ngClass"],[1,"col","mr-0"],["type","submit","mat-button","",1,"btn","float-sm-right","text-capitalize","btn-primary","mui-w-100","mui-text-bold",3,"click"],[1,"invalid-feedback"],["class","ml-1",4,"ngIf"],[1,"ml-1"],[4,"ngIf"],["for","team"],["area-label","false",1,"fa","fa-users","form-control-prefix-icon","text-muted","form-control",2,"padding","0 !important"],["bindLabel","team_desc","placeholder","Select Team","bindValue","team_name","formControlName","team","ngDefaultControl","",1,"form-control-include-icon",3,"items","formControl","ngClass"]],template:function(t,i){1&t&&(e._uU(0,"\n"),e._UZ(1,"app-path"),e._uU(2,"\n\n"),e.TgZ(3,"div",0),e._uU(4,"\n    "),e.TgZ(5,"div",1),e._uU(6,"\n        "),e.TgZ(7,"div",2),e._uU(8,"\n            "),e.TgZ(9,"h3",3),e._uU(10,"\n                "),e._UZ(11,"i",4),e._uU(12),e._UZ(13,"hr"),e._uU(14,"\n            "),e.qZA(),e._uU(15,"\n        "),e.qZA(),e._uU(16,"\n    "),e.qZA(),e._uU(17,"\n    "),e.TgZ(18,"form",5),e.NdJ("ngSubmit",function(){return i.onSubmit()}),e._uU(19,"\n        "),e.TgZ(20,"div",6),e._uU(21,"\n            "),e.TgZ(22,"div",7),e._uU(23,"\n                "),e.TgZ(24,"div",8),e._uU(25,"\n                    "),e.TgZ(26,"div",9),e._uU(27,"\n                        "),e.TgZ(28,"div",10),e._uU(29,"\n                            "),e.TgZ(30,"label",11),e._uU(31,"Full Name:"),e.qZA(),e._uU(32,"\n                            "),e._UZ(33,"span",12),e._uU(34,"\n                            "),e._UZ(35,"input",13),e._uU(36,"\n                            "),e.YNc(37,O,4,1,"div",14),e._uU(38,"\n                        "),e.qZA(),e._uU(39,"\n                    "),e.qZA(),e._uU(40,"\n                    "),e.TgZ(41,"div",9),e._uU(42,"\n                        "),e.TgZ(43,"div",10),e._uU(44,"\n                            "),e.TgZ(45,"div",15),e._uU(46,"\n                                "),e.TgZ(47,"label",16),e._uU(48,"Username:"),e.qZA(),e._uU(49,"\n                                "),e._UZ(50,"span",17),e._uU(51,"\n                                "),e._UZ(52,"input",18),e._uU(53,"\n                                "),e.YNc(54,K,6,2,"div",14),e._uU(55,"\n\n                            "),e.qZA(),e._uU(56,"\n                        "),e.qZA(),e._uU(57,"\n                    "),e.qZA(),e._uU(58,"\n\n                "),e.qZA(),e._uU(59,"\n                "),e.TgZ(60,"div",8),e._uU(61,"\n                    "),e.TgZ(62,"div",9),e._uU(63,"\n                        "),e.TgZ(64,"div",10),e._uU(65,"\n                            "),e.TgZ(66,"label",19),e._uU(67,"Password:"),e.qZA(),e._uU(68,"\n                            "),e._UZ(69,"span",20),e._uU(70,"\n                            "),e._UZ(71,"input",21),e._uU(72,"\n                            "),e.YNc(73,R,6,2,"div",14),e._uU(74,"\n                        "),e.qZA(),e._uU(75,"\n                    "),e.qZA(),e._uU(76,"\n                    "),e.TgZ(77,"div",9),e._uU(78,"\n                        "),e.TgZ(79,"div",10),e._uU(80,"\n                            "),e.TgZ(81,"label",22),e._uU(82,"Confirm Password:"),e.qZA(),e._uU(83,"\n                            "),e._UZ(84,"span",20),e._uU(85,"\n                            "),e._UZ(86,"input",23),e._uU(87,"\n                            "),e.YNc(88,$,6,2,"div",14),e._uU(89,"\n                        "),e.qZA(),e._uU(90,"\n                    "),e.qZA(),e._uU(91,"\n\n                "),e.qZA(),e._uU(92,"\n                "),e.TgZ(93,"div",8),e._uU(94,"\n\n                    "),e.TgZ(95,"div",9),e._uU(96,"\n                        "),e.TgZ(97,"div",10),e._uU(98,"\n                            "),e.TgZ(99,"label",24),e._uU(100,"E-Mail:"),e.qZA(),e._uU(101,"\n                            "),e._UZ(102,"span",25),e._uU(103,"\n                            "),e._UZ(104,"input",26),e._uU(105,"\n                            "),e.YNc(106,G,6,2,"div",14),e._uU(107,"\n                        "),e.qZA(),e._uU(108,"\n                    "),e.qZA(),e._uU(109,"\n                    "),e.YNc(110,ne,16,6,"div",27),e._uU(111,"\n\n                "),e.qZA(),e._uU(112,"\n\n            "),e.qZA(),e._uU(113,"\n\n\n        "),e.qZA(),e._uU(114,"\n        "),e.TgZ(115,"div",1),e._uU(116,"\n            "),e.TgZ(117,"div",2),e._uU(118,"\n\n                "),e.TgZ(119,"h4",28),e._uU(120,"\n\n                    "),e._UZ(121,"i",29),e._uU(122," User Permissions\n                    "),e._UZ(123,"hr"),e._uU(124,"\n                "),e.qZA(),e._uU(125,"\n            "),e.qZA(),e._uU(126,"\n        "),e.qZA(),e._uU(127,"\n        "),e.TgZ(128,"div",30),e._uU(129,"\n            "),e.TgZ(130,"div",31),e._uU(131,"\n                "),e.TgZ(132,"div",10),e._uU(133,"\n                    "),e.TgZ(134,"label",32),e._uU(135,"Delete VM:"),e.qZA(),e._uU(136,"\n                    "),e.TgZ(137,"select",33),e._uU(138,"\n                        "),e.YNc(139,te,2,1,"option",34),e._uU(140,"\n                    "),e.qZA(),e._uU(141,"\n                    "),e.YNc(142,re,4,1,"div",14),e._uU(143,"\n                "),e.qZA(),e._uU(144,"\n            "),e.qZA(),e._uU(145,"\n\n\n            "),e.TgZ(146,"div",31),e._uU(147,"\n                "),e.TgZ(148,"div",10),e._uU(149,"\n                    "),e.TgZ(150,"label",35),e._uU(151,"Create User:"),e.qZA(),e._uU(152,"\n                    "),e.TgZ(153,"select",36),e._uU(154,"\n                        "),e.YNc(155,se,2,1,"option",34),e._uU(156,"\n                    "),e.qZA(),e._uU(157,"\n                    "),e.YNc(158,ue,4,1,"div",14),e._uU(159,"\n                "),e.qZA(),e._uU(160,"\n            "),e.qZA(),e._uU(161,"\n\n            "),e.TgZ(162,"div",31),e._uU(163,"\n                "),e.TgZ(164,"div",10),e._uU(165,"\n                    "),e.TgZ(166,"label",37),e._uU(167,"Edit User:"),e.qZA(),e._uU(168,"\n                    "),e.TgZ(169,"select",38),e._uU(170,"\n                        "),e.YNc(171,ae,2,1,"option",34),e._uU(172,"\n                    "),e.qZA(),e._uU(173,"\n                    "),e.YNc(174,_e,4,1,"div",14),e._uU(175,"\n                "),e.qZA(),e._uU(176,"\n            "),e.qZA(),e._uU(177,"\n\n            "),e.TgZ(178,"div",31),e._uU(179,"\n                "),e.TgZ(180,"div",10),e._uU(181,"\n                    "),e.TgZ(182,"label",39),e._uU(183,"Delete User:"),e.qZA(),e._uU(184,"\n                    "),e.TgZ(185,"select",40),e._uU(186,"\n                        "),e.YNc(187,le,2,1,"option",34),e._uU(188,"\n                    "),e.qZA(),e._uU(189,"\n                    "),e.YNc(190,Ue,4,1,"div",14),e._uU(191,"\n                "),e.qZA(),e._uU(192,"\n            "),e.qZA(),e._uU(193,"\n        "),e.qZA(),e._uU(194,"\n        "),e.TgZ(195,"div",8),e._uU(196,"\n            \n            "),e.TgZ(197,"div",41),e._uU(198,"\n                "),e.TgZ(199,"button",42),e.NdJ("click",function(){return i.onSubmit}),e._uU(200,"Submit"),e.qZA(),e._uU(201,"\n            "),e.qZA(),e._uU(202,"\n        "),e.qZA(),e._uU(203,"\n    "),e.qZA(),e._uU(204,"\n\n"),e.qZA()),2&t&&(e.xp6(12),e.hij(" ",i.title,"\n                "),e.xp6(6),e.Q6J("formGroup",i.registerForm),e.xp6(17),e.Q6J("ngClass",e.VKq(25,d,i.submitted&&i.f.user_name.errors)),e.xp6(2),e.Q6J("ngIf",i.submitted&&i.f.user_name.errors),e.xp6(15),e.Q6J("ngClass",e.VKq(27,d,i.submitted&&i.f.user_id.errors)),e.xp6(2),e.Q6J("ngIf",i.submitted&&i.f.user_id.errors),e.xp6(17),e.Q6J("ngClass",e.VKq(29,d,i.submitted&&i.f.user_pass.errors)),e.xp6(2),e.Q6J("ngIf",i.submitted&&i.f.user_pass.errors),e.xp6(13),e.Q6J("ngClass",e.VKq(31,d,i.submitted&&i.f.conf_pass.errors)),e.xp6(2),e.Q6J("ngIf",i.submitted&&i.f.conf_pass.errors),e.xp6(16),e.Q6J("ngClass",e.VKq(33,d,i.submitted&&i.f.user_email.errors)),e.xp6(2),e.Q6J("ngIf",i.submitted&&i.f.user_email.errors),e.xp6(4),e.Q6J("ngIf",i.loggedUser.permissions.is_admin),e.xp6(27),e.Q6J("ngClass",e.VKq(35,d,i.submitted&&i.f.removeVM.errors)),e.xp6(2),e.Q6J("ngForOf",i.permissionValueList),e.xp6(3),e.Q6J("ngIf",i.submitted&&i.f.removeVM.errors),e.xp6(11),e.Q6J("ngClass",e.VKq(37,d,i.submitted&&i.f.addUser.errors)),e.xp6(2),e.Q6J("ngForOf",i.permissionValueList),e.xp6(3),e.Q6J("ngIf",i.submitted&&i.f.addUser.errors),e.xp6(11),e.Q6J("ngClass",e.VKq(39,d,i.submitted&&i.f.editUser.errors)),e.xp6(2),e.Q6J("ngForOf",i.permissionValueList),e.xp6(3),e.Q6J("ngIf",i.submitted&&i.f.editUser.errors),e.xp6(11),e.Q6J("ngClass",e.VKq(41,d,i.submitted&&i.f.removeUser.errors)),e.xp6(2),e.Q6J("ngForOf",i.permissionValueList),e.xp6(3),e.Q6J("ngIf",i.submitted&&i.f.removeUser.errors))},directives:[S.l,s._Y,s.JL,s.sg,s.Fj,s.JJ,s.u,_.mk,_.O5,f.w9,s.oH,s.EJ,_.sg,s.YN,s.Kr,Y.lW],styles:[""]}),n})();var fe=u(960),ce=u(6916);function ge(n,r){1&n&&(e.TgZ(0,"div",36),e._uU(1,"Full name is required"),e.qZA())}function ve(n,r){if(1&n&&(e.TgZ(0,"div",34),e._uU(1,"\n                                "),e.YNc(2,ge,2,0,"div",35),e._uU(3,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.user_name.errors.required)}}function Ze(n,r){1&n&&(e.TgZ(0,"div",36),e._uU(1,"E-Mail is required"),e.qZA())}function Te(n,r){1&n&&(e.TgZ(0,"div",36),e._uU(1,"Invalid E-Mail!"),e.qZA())}function qe(n,r){if(1&n&&(e.TgZ(0,"div",34),e._uU(1,"\n                                "),e.YNc(2,Ze,2,0,"div",35),e._uU(3,"\n                                "),e.YNc(4,Te,2,0,"div",35),e._uU(5,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.user_email.errors.required),e.xp6(2),e.Q6J("ngIf",t.f.user_email.errors.email)}}function he(n,r){1&n&&(e.TgZ(0,"div",36),e._uU(1,"Team is required"),e.qZA())}function Ae(n,r){if(1&n&&(e.TgZ(0,"div",34),e._uU(1,"\n                                "),e.YNc(2,he,2,0,"div",35),e._uU(3,"\n                            "),e.qZA()),2&n){const t=e.oxw(2);e.xp6(2),e.Q6J("ngIf",t.f.team.errors.required)}}const Ce=function(n){return{"is-ngx-invalid is-invalid":n}};function xe(n,r){if(1&n&&(e.TgZ(0,"div",9),e._uU(1,"\n                        "),e.TgZ(2,"div",10),e._uU(3,"\n                            "),e.TgZ(4,"label",37),e._uU(5,"Team:"),e.qZA(),e._uU(6,"\n                            "),e._uU(7,"\n                            "),e._UZ(8,"span",38),e._uU(9,"\n                            "),e.TgZ(10,"ng-select",39),e._uU(11,"\n                            "),e.qZA(),e._uU(12,"\n                            "),e.YNc(13,Ae,4,1,"div",14),e._uU(14,"\n                        "),e.qZA(),e._uU(15,"\n                    "),e.qZA()),2&n){const t=e.oxw();e.xp6(10),e.Q6J("items",t.teams)("formControl",t.team)("ngClass",e.VKq(4,Ce,t.submitted&&t.f.team.errors)),e.xp6(3),e.Q6J("ngIf",t.submitted&&t.f.team.errors)}}function Ne(n,r){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.xp6(1),e.Oqu(t)}}function Ie(n,r){1&n&&(e.TgZ(0,"div",36),e._uU(1,"Delete VM is required"),e.qZA())}function Je(n,r){if(1&n&&(e.TgZ(0,"div",34),e._uU(1,"\n                                "),e.YNc(2,Ie,2,0,"div",35),e._uU(3,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.removeVM.errors.required)}}function be(n,r){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.xp6(1),e.Oqu(t)}}function Se(n,r){1&n&&(e.TgZ(0,"div",36),e._uU(1,"Create User is required"),e.qZA())}function Ye(n,r){if(1&n&&(e.TgZ(0,"div",34),e._uU(1,"\n                                "),e.YNc(2,Se,2,0,"div",35),e._uU(3,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.addUser.errors.required)}}function Qe(n,r){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.xp6(1),e.Oqu(t)}}function Ve(n,r){1&n&&(e.TgZ(0,"div",36),e._uU(1,"Edit User is required"),e.qZA())}function we(n,r){if(1&n&&(e.TgZ(0,"div",34),e._uU(1,"\n                                "),e.YNc(2,Ve,2,0,"div",35),e._uU(3,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.editUser.errors.required)}}function ye(n,r){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.xp6(1),e.Oqu(t)}}function Ee(n,r){1&n&&(e.TgZ(0,"div",36),e._uU(1,"Delete User is required"),e.qZA())}function Fe(n,r){if(1&n&&(e.TgZ(0,"div",34),e._uU(1,"\n                                "),e.YNc(2,Ee,2,0,"div",35),e._uU(3,"\n                            "),e.qZA()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",t.f.removeUser.errors.required)}}const l=function(n){return{"is-invalid":n}},Oe=[{path:"",component:w,children:[{path:"dash",component:y.n,data:{animation:"user",title:"Users"}},{path:"add",component:pe,data:{animation:"add",title:"Add User"}},{path:"edit",component:(()=>{class n{constructor(t,i,o,a,c,g,v,p,Z){this.formBuilder=t,this.tms=i,this._spinner=o,this._client=a,this.dialog=c,this.router=g,this.userService=v,this._auth=p,this.toastService=Z,this.team=new s.NI,this.submitted=!1,this.teams=[],this.userList=[],this.permissionValueList=["No","Yes"],this.title=" Edit User",i.getTeams().then(U=>{this.teams=U}).catch(U=>{}),this.loggedUser=p.getUser()}ngOnInit(){this.registerForm=this.formBuilder.group({user_name:["",s.kI.required],user_email:["",[s.kI.required,s.kI.email]],team:[null,this.loggedUser.permissions.is_admin?s.kI.required:null],addUser:["NO",s.kI.required],editUser:["No",s.kI.required],removeUser:["No",s.kI.required],removeVM:["No",s.kI.required]}),this._spinner.setSpinnerState(!0),this.userService.getUsers().then(i=>{this.userList=i,this.getData(this.userList),this._spinner.setSpinnerState(!1)}).catch(i=>{this._spinner.setSpinnerState(!1)}),this._spinner.setSpinnerState(!1)}get f(){return this.registerForm.controls}getData(t){this.openDialogInput({title:"Choose a user",label:"Username",placeholder:"Select user",list:t,bindLabel:"user_name",bindValue:"user_id",closeCallback:()=>{this.router.navigate(["/portal/home/user/dash"])}},i=>{i=i.dataCtrl.user_id,this._spinner.setSpinnerState(!0),this.userService.getUser(i).then(o=>{o=JSON.parse(o),this.registerForm=this.formBuilder.group({user_id:[o.user.user_id,s.kI.required],user_name:[o.user.user_name,s.kI.required],user_email:[o.user.user_email,[s.kI.required,s.kI.email]],team:[o.user.user_team,s.kI.required],addUser:[this.parsePermission(o.protocols.create_user),s.kI.required],editUser:[this.parsePermission(o.protocols.update_user),s.kI.required],removeUser:[this.parsePermission(o.protocols.delete_user),s.kI.required],removeVM:[this.parsePermission(o.protocols.delete_vm),s.kI.required]}),this._spinner.setSpinnerState(!1)}).catch(o=>{this._spinner.setSpinnerState(!1)}),this._spinner.setSpinnerState(!1)})}parsePermission(t){return 1==t?"Yes":"No"}onSubmit(){if(this.submitted=!0,this._spinner.setSpinnerState(!0),this.registerForm.invalid)this._spinner.setSpinnerState(!1);else{var t=new q.WM({"Content-Type":"application/json"});this._client.post("api/user/updateUser",this.registerForm.value,{headers:t}).then(a=>{this._spinner.setSpinnerState(!1),a&&(a=JSON.parse(a)),"Success"==a.status?(this.userService.setNeedRefresh(!0),this.loggedUser.useToast?(this.toastService.showSuccess("User updated successfully!",5e3),this.router.navigate(["/portal/home/user/dash"])):this.openDialog({type:"message",message:"User updated successfully!"},()=>{this.router.navigate(["/portal/home/user/dash"])})):(this._spinner.setSpinnerState(!1),this.openDialog({type:"alert",message:a.message},null))}).catch(a=>{this._spinner.setSpinnerState(!1),this.openDialog({type:"alert",message:a.message},null)})}}openDialog(t,i){this.dialog.open(h.h,{data:t,panelClass:"app-dialog-class"}).afterClosed().toPromise().then(o=>{"function"==typeof i&&i()})}openDialogInput(t,i){this.dialog.open(ce.k,{data:t,panelClass:"app-dialog-class",width:"500px"}).afterClosed().toPromise().then(o=>{"function"==typeof i&&""!=o&&null!=o&&i(o)})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(s.qu),e.Y36(A.U),e.Y36(C.V),e.Y36(x.l),e.Y36(N.uw),e.Y36(m.F0),e.Y36(J.K),e.Y36(I.q),e.Y36(b.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-edit-user"]],decls:154,vars:31,consts:[[1,"container-fluid-lg","p-3","my-3"],[1,"row"],[1,"col-xs-6"],[1,"page-title","ml-3"],["area-label","false",1,"fa","fa-user"],[3,"formGroup","ngSubmit"],[1,"row","ml-4"],[1,"col-lg-12"],[1,"row","p-3"],[1,"col-sm-6"],[1,"form-group","required"],["for","name"],["area-label","false",1,"fa","fa-vcard","form-control-prefix-icon","text-muted"],["id","name","type","text","formControlName","user_name",1,"form-control","form-control-include-icon",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["for","email"],["area-label","false",1,"fa","fa-envelope","form-control-prefix-icon","text-muted"],["id","email","formControlName","user_email",1,"form-control","form-control-include-icon",3,"ngClass"],["class","col-sm-6",4,"ngIf"],[1,"ml-3"],["area-label","false",1,"fa","fa-key"],[1,"row","p-3","ml-4"],[1,"col-sm-2","mr-0","pr-0"],["for","remove_vm"],["id","remove_vm","formControlName","removeVM",1,"form-control",3,"ngClass"],[4,"ngFor","ngForOf"],["for","addUser"],["id","addUser","formControlName","addUser",1,"form-control",3,"ngClass"],["for","editUser"],["id","editUser","formControlName","editUser",1,"form-control",3,"ngClass"],["for","removeUser"],["id","removeUser","formControlName","removeUser",1,"form-control",3,"ngClass"],[1,"col","mr-0"],["type","submit","mat-button","",1,"btn","float-sm-right","text-capitalize","btn-primary","mui-w-100","mui-text-bold",3,"click"],[1,"invalid-feedback"],["class","ml-1",4,"ngIf"],[1,"ml-1"],["for","team"],["area-label","false",1,"fa","fa-users","form-control-prefix-icon","text-muted","form-control",2,"padding","0 !important"],["bindLabel","team_desc","placeholder","Select Team","bindValue","team_name","formControlName","team","ngDefaultControl","",1,"form-control-include-icon",3,"items","formControl","ngClass"]],template:function(t,i){1&t&&(e._uU(0,"\n"),e._UZ(1,"app-path"),e._uU(2,"\n\n"),e.TgZ(3,"div",0),e._uU(4,"\n    "),e.TgZ(5,"div",1),e._uU(6,"\n        "),e.TgZ(7,"div",2),e._uU(8,"\n            "),e.TgZ(9,"h3",3),e._uU(10,"\n                "),e._UZ(11,"i",4),e._uU(12),e._UZ(13,"hr"),e._uU(14,"\n            "),e.qZA(),e._uU(15,"\n        "),e.qZA(),e._uU(16,"\n    "),e.qZA(),e._uU(17,"\n    "),e.TgZ(18,"form",5),e.NdJ("ngSubmit",function(){return i.onSubmit()}),e._uU(19,"\n        "),e.TgZ(20,"div",6),e._uU(21,"\n            "),e.TgZ(22,"div",7),e._uU(23,"\n                "),e.TgZ(24,"div",8),e._uU(25,"\n                    "),e.TgZ(26,"div",9),e._uU(27,"\n                        "),e.TgZ(28,"div",10),e._uU(29,"\n                            "),e.TgZ(30,"label",11),e._uU(31,"Full Name:"),e.qZA(),e._uU(32,"\n                            "),e._UZ(33,"span",12),e._uU(34,"\n                            "),e._UZ(35,"input",13),e._uU(36,"\n                            "),e.YNc(37,ve,4,1,"div",14),e._uU(38,"\n                        "),e.qZA(),e._uU(39,"\n                    "),e.qZA(),e._uU(40,"\n                    "),e.TgZ(41,"div",9),e._uU(42,"\n                        "),e.TgZ(43,"div",10),e._uU(44,"\n                            "),e.TgZ(45,"label",15),e._uU(46,"E-Mail:"),e.qZA(),e._uU(47,"\n                            "),e._UZ(48,"span",16),e._uU(49,"\n                            "),e._UZ(50,"input",17),e._uU(51,"\n                            "),e.YNc(52,qe,6,2,"div",14),e._uU(53,"\n                        "),e.qZA(),e._uU(54,"\n                    "),e.qZA(),e._uU(55,"\n                "),e.qZA(),e._uU(56,"\n                "),e.TgZ(57,"div",8),e._uU(58,"\n                    "),e.YNc(59,xe,16,6,"div",18),e._uU(60,"\n                "),e.qZA(),e._uU(61,"\n\n                "),e.TgZ(62,"div",1),e._uU(63,"\n                    "),e.TgZ(64,"div",2),e._uU(65,"\n\n                        "),e.TgZ(66,"h4",19),e._uU(67,"\n\n                            "),e._UZ(68,"i",20),e._uU(69," User Permissions\n                            "),e._UZ(70,"hr"),e._uU(71,"\n                        "),e.qZA(),e._uU(72,"\n                    "),e.qZA(),e._uU(73,"\n                "),e.qZA(),e._uU(74,"\n                "),e.TgZ(75,"div",21),e._uU(76,"\n                    "),e.TgZ(77,"div",22),e._uU(78,"\n                        "),e.TgZ(79,"div",10),e._uU(80,"\n                            "),e.TgZ(81,"label",23),e._uU(82,"Delete VM:"),e.qZA(),e._uU(83,"\n                            "),e.TgZ(84,"select",24),e._uU(85,"\n                        "),e.YNc(86,Ne,2,1,"option",25),e._uU(87,"\n                    "),e.qZA(),e._uU(88,"\n                            "),e.YNc(89,Je,4,1,"div",14),e._uU(90,"\n                        "),e.qZA(),e._uU(91,"\n                    "),e.qZA(),e._uU(92,"\n\n\n                    "),e.TgZ(93,"div",22),e._uU(94,"\n                        "),e.TgZ(95,"div",10),e._uU(96,"\n                            "),e.TgZ(97,"label",26),e._uU(98,"Create User:"),e.qZA(),e._uU(99,"\n                            "),e.TgZ(100,"select",27),e._uU(101,"\n                        "),e.YNc(102,be,2,1,"option",25),e._uU(103,"\n                    "),e.qZA(),e._uU(104,"\n                            "),e.YNc(105,Ye,4,1,"div",14),e._uU(106,"\n                        "),e.qZA(),e._uU(107,"\n                    "),e.qZA(),e._uU(108,"\n\n                    "),e.TgZ(109,"div",22),e._uU(110,"\n                        "),e.TgZ(111,"div",10),e._uU(112,"\n                            "),e.TgZ(113,"label",28),e._uU(114,"Edit User:"),e.qZA(),e._uU(115,"\n                            "),e.TgZ(116,"select",29),e._uU(117,"\n                        "),e.YNc(118,Qe,2,1,"option",25),e._uU(119,"\n                    "),e.qZA(),e._uU(120,"\n                            "),e.YNc(121,we,4,1,"div",14),e._uU(122,"\n                        "),e.qZA(),e._uU(123,"\n                    "),e.qZA(),e._uU(124,"\n\n                    "),e.TgZ(125,"div",22),e._uU(126,"\n                        "),e.TgZ(127,"div",10),e._uU(128,"\n                            "),e.TgZ(129,"label",30),e._uU(130,"Delete User:"),e.qZA(),e._uU(131,"\n                            "),e.TgZ(132,"select",31),e._uU(133,"\n                        "),e.YNc(134,ye,2,1,"option",25),e._uU(135,"\n                    "),e.qZA(),e._uU(136,"\n                            "),e.YNc(137,Fe,4,1,"div",14),e._uU(138,"\n                        "),e.qZA(),e._uU(139,"\n                    "),e.qZA(),e._uU(140,"\n                "),e.qZA(),e._uU(141,"\n                "),e.TgZ(142,"div",8),e._uU(143,"\n                    \n                    "),e.TgZ(144,"div",32),e._uU(145,"\n                        "),e.TgZ(146,"button",33),e.NdJ("click",function(){return i.onSubmit}),e._uU(147,"Submit"),e.qZA(),e._uU(148,"\n                    "),e.qZA(),e._uU(149,"\n                "),e.qZA(),e._uU(150,"\n\n            "),e.qZA(),e._uU(151,"\n        "),e.qZA(),e._uU(152,"\n    "),e.qZA(),e._uU(153,"\n\n"),e.qZA()),2&t&&(e.xp6(12),e.hij(" ",i.title,"\n                "),e.xp6(6),e.Q6J("formGroup",i.registerForm),e.xp6(17),e.Q6J("ngClass",e.VKq(19,l,i.submitted&&i.f.user_name.errors)),e.xp6(2),e.Q6J("ngIf",i.submitted&&i.f.user_name.errors),e.xp6(13),e.Q6J("ngClass",e.VKq(21,l,i.submitted&&i.f.user_email.errors)),e.xp6(2),e.Q6J("ngIf",i.submitted&&i.f.user_email.errors),e.xp6(7),e.Q6J("ngIf",i.loggedUser.permissions.is_admin),e.xp6(25),e.Q6J("ngClass",e.VKq(23,l,i.submitted&&i.f.removeVM.errors)),e.xp6(2),e.Q6J("ngForOf",i.permissionValueList),e.xp6(3),e.Q6J("ngIf",i.submitted&&i.f.removeVM.errors),e.xp6(11),e.Q6J("ngClass",e.VKq(25,l,i.submitted&&i.f.addUser.errors)),e.xp6(2),e.Q6J("ngForOf",i.permissionValueList),e.xp6(3),e.Q6J("ngIf",i.submitted&&i.f.addUser.errors),e.xp6(11),e.Q6J("ngClass",e.VKq(27,l,i.submitted&&i.f.editUser.errors)),e.xp6(2),e.Q6J("ngForOf",i.permissionValueList),e.xp6(3),e.Q6J("ngIf",i.submitted&&i.f.editUser.errors),e.xp6(11),e.Q6J("ngClass",e.VKq(29,l,i.submitted&&i.f.removeUser.errors)),e.xp6(2),e.Q6J("ngForOf",i.permissionValueList),e.xp6(3),e.Q6J("ngIf",i.submitted&&i.f.removeUser.errors))},directives:[S.l,s._Y,s.JL,s.sg,s.Fj,s.JJ,s.u,_.mk,_.O5,f.w9,s.oH,s.EJ,_.sg,s.YN,s.Kr,Y.lW],styles:[""]}),n})(),data:{animation:"add",title:"Edit User"}},{path:"",redirectTo:"dash",pathMatch:"full"},{path:"**",component:fe.R,data:{animation:"notFound",title:"404-Page Not Found"}}]}];let De=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[m.Bz.forChild(Oe)],m.Bz]}),n})();var ke=u(1008),Ke=u(4027),Le=u(2831);let Pe=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[_.ez,De,ke.u,s.u5,s.UX,f.A0,Ke.q,Le.m]]}),n})()}}]);