// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Tools SPA FA Icons Component
 */
import { Component, OnInit } from '@angular/core';
import { FontAwsomeIconList } from '../../widget/utils/fa-icon-list';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from '../../widget/toast/toast-service';
@Component({
  selector: 'app-tools-spa-internal-faicons',
  templateUrl: './tools-spa-internal-faicons.component.html',
  styleUrls: ['./tools-spa-internal-faicons.component.scss'],
})
export class FAIconsComponent implements OnInit {
  iconList=FontAwsomeIconList.iconList;
  graphZoom:any=1;
  constructor(private clipboard: Clipboard,
    private toastService:ToastService) {
    
  }
 
  ngOnInit(): void {}

  copyToClipboard(value:string){
    var res=this.clipboard.copy(value);
    console.log(res);
    if(res)
      this.toastService.showSuccess(value+' copied to clipboard.',5000)
  }
}
