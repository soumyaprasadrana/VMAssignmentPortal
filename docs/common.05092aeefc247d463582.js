(self.webpackChunkvmportal=self.webpackChunkvmportal||[]).push([[592],{2305:(t,e,r)=>{"use strict";r.d(e,{U:()=>i});var a=r(9765),c=r(1841),n=r(7716),s=r(9805),o=r(7638);let i=(()=>{class t{constructor(t,e){this._props=t,this._client=e,this.teams=[],this.needRefresh=new a.xQ,this.promise=this._props.getDataFromNode(),this.setNeedRefresh(!1),this.subscription=this.getNeedRefreshState().subscribe(t=>{t&&(this.needReload=t.value)})}setNeedRefresh(t){this.needRefresh.next({value:t})}clearneedRefreshState(){this.needRefresh.next()}getNeedRefreshState(){return this.needRefresh.asObservable()}getTeams(){return this.needReload&&(this._props.setNeedRefresh(!0),this.promise=this._props.getDataFromNode()),new Promise((t,e)=>{this.promise.then(e=>{this.needReload&&this.setNeedRefresh(!1),t(function(t){for(var e=JSON.parse(t).teamList.split(":"),r=1,a=[],c=0;c<e.length;c++)a.push({id:r,team_name:e[c],team_desc:e[c]}),r++;return a}(e))}).catch(t=>{this.needReload&&this.setNeedRefresh(!1),e(t)})})}getTeam(t){return new Promise((e,r)=>{var a=new c.WM({"Content-Type":"application/json"});this._client.get("api/admin/getTeam/"+t,{headers:a}).then(t=>{e(t)}).catch(t=>{r(t)})})}deleteTeam(t){return new Promise((e,r)=>{var a=new c.WM({"Content-Type":"application/json"});this._client.post("api/admin/team/delete/"+t,null,{headers:a}).then(t=>{e(t)}).catch(t=>{r(t)})})}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(s.U),n.LFG(o.l))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},6669:(t,e,r)=>{"use strict";r.d(e,{n:()=>d});var a=r(8583),c=r(5566),n=r(6679),s=r(3679),o=r(6640),i=r(7716);let d=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[[a.ez,n.q,c.o9,o.A0,s.u5,s.UX]]}),t})()},8028:(t,e,r)=>{"use strict";r.d(e,{w:()=>g});var a=r(7716),c=r(287),n=r(8583),s=r(4655),o=r(1792),i=r(8590);const d=function(t){return{color:t}};function l(t,e){if(1&t&&a._UZ(0,"i",10),2&t){const t=a.oxw(2);a.Gre("h5 ",t.cardStackIcon," fa-stack-1x ml-1 mt-1 card-icon-color"),a.Q6J("ngStyle",a.VKq(4,d,t.cardStackIconColor))}}const h=function(t,e){return{"width.px":t,"height.px":e}},u=function(t){return{"card-notify-badge-danger":t}};function p(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"div",1),a._uU(1,"\n    "),a.TgZ(2,"div",2),a.NdJ("click",function(){return a.CHM(t),a.oxw().clickHandle()}),a._uU(3,"\n        "),a.TgZ(4,"span",3),a._UZ(5,"i"),a.qZA(),a._uU(6,"\n        "),a.TgZ(7,"h1",4),a._uU(8,"\n            "),a.TgZ(9,"span",5),a._uU(10,"\n                 "),a._UZ(11,"i",6),a._uU(12,"\n                "),a.YNc(13,l,1,6,"i",7),a._uU(14,"\n            "),a.qZA(),a._uU(15,"\n            "),a._UZ(16,"br"),a._uU(17,"\n            "),a.TgZ(18,"span",8),a._uU(19),a.qZA(),a._uU(20,"\n        "),a.qZA(),a._uU(21,"\n        "),a.TgZ(22,"p",9),a._uU(23),a.qZA(),a._uU(24,"\n\n    "),a.qZA(),a._uU(25,"\n"),a.qZA()}if(2&t){const t=a.oxw();a.Q6J("ngStyle",a.WLB(16,h,t.cardWidth,t.cardHeight)),a.xp6(2),a.Q6J("routerLink",t.cardRouterLink)("state",t.cardRouterState),a.xp6(2),a.Q6J("ngClass",a.VKq(19,u,t.cardDanger)),a.xp6(1),a.Tol(t.badgeIcon),a.xp6(6),a.Gre("",t.cardIconClass," fa-stack-2x card-icon-color"),a.Q6J("ngStyle",a.VKq(21,d,t.cardIconColor)),a.xp6(2),a.Q6J("ngIf",t.cardStackIcon),a.xp6(6),a.Oqu(t.cardTitle),a.xp6(3),a.Q6J("clamp",t.cardTextClamp)("matTooltip",t.cardTextClamp?t.cardText:null),a.xp6(1),a.Oqu(t.cardText)}}let g=(()=>{class t{constructor(t){this._auth=t,this.cardHeight="200",this.cardWidth="100",this.cardRouterLink=[],this.cardIconClass="",this.cardStackIcon="",this.cardTitle="",this.cardText="",this.iconColor="",this.badgeIcon="fa fa-cog",this.cardTextClamp=2,this.cardDanger=!1,this.cardIconColor="",this.cardStackIconColor="",this.visible=!0,this.loggedUser=t.getUser()}ngOnInit(){this.cardPermissions&&"function"==typeof this.cardPermissions&&(this.visible=this.cardPermissions(this.loggedUser)),this.iconColor=this.getRandomColor(),""!=this.badgeIcon&&void 0!==this.badgeIcon&&"undefined"!=this.badgeIcon||(this.badgeIcon="fa fa-cog")}getRandomColor(){return"#"+("000000"+Math.floor(16777216*Math.random()).toString(16)).slice(-6)}clickHandle(){"function"==typeof this.callback&&this.parentObject?this.callback(this.parentObject):"function"!=typeof this.callback||this.parentObject||this.callback()}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(c.q))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-card-small"]],inputs:{cardHeight:"cardHeight",cardWidth:"cardWidth",cardRouterLink:"cardRouterLink",cardIconClass:"cardIconClass",cardPermissions:"cardPermissions",cardStackIcon:"cardStackIcon",cardTitle:"cardTitle",cardText:"cardText",iconColor:"iconColor",badgeIcon:"badgeIcon",cardTextClamp:"cardTextClamp",cardDanger:"cardDanger",cardIconColor:"cardIconColor",cardStackIconColor:"cardStackIconColor",callback:"callback",parentObject:"parentObject",cardRouterState:"cardRouterState"},decls:1,vars:1,consts:[["class","card",3,"ngStyle",4,"ngIf"],[1,"card",3,"ngStyle"],[1,"card-body","text-center",3,"routerLink","state","click"],[1,"card-notify-badge",3,"ngClass"],[1,"h4","bg-light","-1","text-muted","link","pe-auto","center-block"],[1,"fa-stack"],["area-label","false",3,"ngStyle"],[3,"class","ngStyle",4,"ngIf"],[1,"ml-2","mt-2","align-middle"],[1,"card-text",3,"clamp","matTooltip"],[3,"ngStyle"]],template:function(t,e){1&t&&a.YNc(0,p,26,23,"div",0),2&t&&a.Q6J("ngIf",e.visible)},directives:[n.O5,n.PC,s.rH,n.mk,o.M,i.gM],styles:[".card[_ngcontent-%COMP%]{border-radius:4px;background:#fff;box-shadow:0 6px 10px #00000014,0 0 6px #0000000d;transition:transform .3s cubic-bezier(.155,1.105,.295,1.12),box-shadow .3s;cursor:pointer}.card[_ngcontent-%COMP%]:hover{transform:scale(1.05);box-shadow:0 10px 20px #0000001f,0 4px 8px #0000000f}.card-notify-badge-danger[_ngcontent-%COMP%]{background:#f85f18!important}"]}),t})()},2831:(t,e,r)=>{"use strict";r.d(e,{m:()=>i});var a=r(6679),c=r(3679),n=r(8583),s=r(4655),o=r(7716);let i=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[n.ez,a.q,c.u5,s.Bz]]}),t})()},2232:(t,e,r)=>{"use strict";r.d(e,{w:()=>a});class a{static restrictWhiteSpace(t){return t.value.indexOf(" ")>=0?{restrictWhiteSpace:!0}:null}}}}]);