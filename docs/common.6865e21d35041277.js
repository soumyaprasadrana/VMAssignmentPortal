"use strict";(self.webpackChunkVMPORTAL=self.webpackChunkVMPORTAL||[]).push([[592],{6563:(v,h,t)=>{t.d(h,{v:()=>d});var l=t(520),i=t(5e3),c=t(5174);let d=(()=>{class o{constructor(s){this._client=s,this.listPromise=this.getListNamesFromNode()}getSpaList(){return this.getSPADataFromNode()}getListsNames(){return this.listPromise}getSPADataFromNode(){var s=new l.WM({"Content-Type":"application/json"});return this._client.get("api/public/spaMetadata",{headers:s})}getListNamesFromNode(){var s=new l.WM({"Content-Type":"application/json"});return this._client.get("api/public/lists",{headers:s})}getListItems(s,a){var e=new l.WM({"Content-Type":"application/json"}),n=this._client.get("api/public/lists/"+s,{headers:e});return new Promise((O,E)=>{n.then(u=>{var p={};p.res=u,p.item=a,O(p)}).catch(u=>{var p={};p.err=u,p.item=a,E(p)})})}}return o.\u0275fac=function(s){return new(s||o)(i.LFG(c.l))},o.\u0275prov=i.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},9982:(v,h,t)=>{t.d(h,{S:()=>o});var l=t(8929),i=t(520),c=t(5e3),d=t(5174);let o=(()=>{class _{constructor(a){this._client=a,this.vms=[],this.needRefresh=new l.xQ,this.observable=this.getDynamicObjectsObservable(),this.promiseX=this.getDataFromNode(),this.setNeedRefresh(!1),this.subscription=this.getNeedRefreshState().subscribe(e=>{e&&(this.needReload=e.value)})}setNeedRefresh(a){this.needRefresh.next({value:a})}clearneedRefreshState(){this.needRefresh.next()}getNeedRefreshState(){return this.needRefresh.asObservable()}getDynamicObjectsObservable2(){return this.observable}getDynamicObjectAppRecords(a){var e=new i.WM({"Content-Type":"application/json"});return this._client.get("api/dynamicobjects/"+a+"/getAll",{headers:e})}getDynamicObjects(){return console.log("getDynamicObjects() :: this.needReload ::",this.needReload),this.needReload&&(this.promiseX=this.getDataFromNode()),new Promise((e,r)=>{this.promiseX.then(n=>{this.needReload&&this.setNeedRefresh(!1),e(this.parseData(n))}).catch(n=>{this.needReload&&this.setNeedRefresh(!1),r(n)})})}getDynamicObject(a){console.log("getDynamicObject() :: this.needReload ::");var e=this.getDynamicObjectFromNode(a);return new Promise((n,m)=>{e.then(O=>{n(O)}).catch(O=>{m(O)})})}getDataFromNode(){var a=new i.WM({"Content-Type":"application/json"});return this._client.get("api/dynamicobjects/getAll",{headers:a})}getDynamicObjectFromNode(a){var e=new i.WM({"Content-Type":"application/json"});return this._client.get("api/dynamicobjects/get/"+a,{headers:e})}getDynamicObjectsObservable(){var a=new i.WM({"Content-Type":"application/json"});return this._client.getObservable("api/dynamicobjects/getAll",{headers:a})}deleteDynamicObject(a){var e=new i.WM({"Content-Type":"application/json"});return this._client.post("api/dynamicobjects/delete/"+a,{},{headers:e})}parseData(a){const e=[];var r=JSON.parse(a),n=0;for(var m in r)"user"!=m&&"protocols"!=m&&(e[n]={id:n,name:r[m].name,description:r[m].description,scope:r[m].scope.toUpperCase(),status:r[m].status},n++);return e}}return _.\u0275fac=function(a){return new(a||_)(c.LFG(d.l))},_.\u0275prov=c.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),_})()},6669:(v,h,t)=>{t.d(h,{n:()=>a});var l=t(9808),i=t(1620),c=t(4027),d=t(3075),o=t(4537),_=t(6140),s=t(5e3);let a=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[l.ez,c.q,i.o9,o.A0,d.u5,d.UX,_.x]]}),e})()},577:(v,h,t)=>{t.d(h,{Z:()=>_});var l=t(4027),i=t(3075),c=t(9808),d=t(8555),o=t(5e3);let _=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=o.oAB({type:s}),s.\u0275inj=o.cJS({imports:[[c.ez,l.q,i.u5,d.Bz]]}),s})()},2831:(v,h,t)=>{t.d(h,{m:()=>_});var l=t(4027),i=t(3075),c=t(9808),d=t(8555),o=t(5e3);let _=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=o.oAB({type:s}),s.\u0275inj=o.cJS({imports:[[c.ez,l.q,i.u5,d.Bz]]}),s})()}}]);