// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal Nav Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material.module';
import { HomeRoutingModule } from '../../../home/home-routing.module';
import { FormsModule } from '@angular/forms';
import { QuickLinkComponent } from '../quick-link/quick-link.component';
@NgModule({
  declarations: [TopNavComponent, SideNavComponent, QuickLinkComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [TopNavComponent, SideNavComponent, QuickLinkComponent],
})
export class NavModule {}
