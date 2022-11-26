// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Tools LTB Component
 */
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
@Component({
  selector: 'app-tools-ltb',
  templateUrl: './tools-ltb.component.html',
  styleUrls: ['./tools-ltb.component.scss'],
})
export class ToolsLtbComponent implements OnInit {
  cardsMetaData: any;
  selectedDataContext: any;
  defaultSSHUsername: any;
  defaultSSHPassword: any;
  constructor(private _client: NodeclientService,private actRoute: ActivatedRoute, private router: Router) {
    //  this.cardsMetaData = ToolsLTBConfig.cardsMetaData;
    if (typeof history.state.ip != 'undefined') {
      this.selectedDataContext = history.state;
    }
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    this._client.get('api/public/sshMetadata', httpOptions).then(
      (res: any) => {
        this.defaultSSHUsername = res.defaultSSHUsername;
        this.defaultSSHPassword = res.defaultSSHPassword;
        this.cardsMetaData = this.parseMetadata(res.cardsMetaData);
        //console.log('api/public/sshMetadata res:', res);
      },
      (error) => {
        //console.log('error', error);
      }
    );
  }
  parseMetadata(metadata: any) {
    for (var i = 0; i < metadata.length; i++) {
      //row
      for (var j = 0; j < metadata[i].length; j++) {
        //item
        var formItems = metadata[i][j].cardFields[1];
        //console.log(formItems);
        if (typeof this.defaultSSHUsername != 'undefined') {
          formItems['ssh_username'][0] = this.defaultSSHUsername;
        }
        if (typeof this.defaultSSHPassword != 'undefined') {
          formItems['ssh_password'][0] = this.defaultSSHPassword;
        }
        if (this.selectedDataContext) {
          formItems['machine_ip'][0] = this.selectedDataContext.ip;

          if (
            this.selectedDataContext.extradata &&
            typeof this.selectedDataContext.extradata.sshUsername != 'undefined'
          ) {
            formItems['ssh_username'][0] =
              this.selectedDataContext.extradata.sshUsername;
          }
          if (typeof this.selectedDataContext.extradata != 'undefined') {
            formItems['ssh_password'][0] =
              this.selectedDataContext.extradata.sshPassword;
          }
        }
        for (var k in formItems) {
          //console.log('formItems[k][1]', formItems[k][1]);
          if (formItems[k][1] == 'required') {
            formItems[k][1] = Validators.required;
            //console.log('formItems[k][1]: true', formItems[k][1]);
          }
        }
        metadata[i][j].cardFields[1] = formItems;
        //console.log(metadata[i][j].cardFields[1]);
      }
    }
    return metadata;
  }
  openWebSSH(){
    console.log("clicked openWebSSH");
   
    var username=null;
    var password=null;
    var hostname=null;
    var port=22;
    if (typeof this.defaultSSHUsername != 'undefined') {
      username = this.defaultSSHUsername;
    }
    if (typeof this.defaultSSHPassword != 'undefined') {
      password = this.defaultSSHPassword;
    }
    if (this.selectedDataContext) {
      hostname = this.selectedDataContext.ip;
    }
      if (
        this.selectedDataContext.extradata &&
        typeof this.selectedDataContext.extradata.sshUsername != 'undefined'
      ) {
        username =
          this.selectedDataContext.extradata.sshUsername;
      }
      if (typeof this.selectedDataContext.extradata != 'undefined') {
        password =
          this.selectedDataContext.extradata.sshPassword;
      }
      const routerLink = ['/portal/spa/', 'sshclient'];
      var appUrl = this.router.serializeUrl(
        this.router.createUrlTree(routerLink,{ queryParams: { hostname: hostname, username: username,port:port,password:password } })
      );
   
    console.log(appUrl);
    window.open(appUrl, '_blank');
   
  }
  ngOnInit(): void {}
}
