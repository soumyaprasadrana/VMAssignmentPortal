// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Snapshots Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotsRoutingModule } from './snapshots-routing.module';
import { PathModule } from '../public/widget/path/path.module';
import { CardsModule } from '../public/widget/card-small/card.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SnapshotsViewComponent } from '../public/snapshots/snapshots-view/snapshots-view.component';
import { SnapshotsHomeComponent } from '../public/snapshots/snapshots-home/snapshots-home.component';
import { SnapshotsGridComponent } from '../public/snapshots/snapshots-grid/snapshots-grid.component';

@NgModule({
  declarations: [
    SnapshotsViewComponent,
    SnapshotsHomeComponent,
    SnapshotsGridComponent

  ],
  imports: [
    CommonModule,
    SnapshotsRoutingModule,
    PathModule,
    CardsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
      // to avoid passing the same options over and over in each grids of your App
      enableAutoResize: true,
      autoResize: {
        container: '#container',
        rightPadding: 10,
      },
    }),
  ],
})
export class SnapshotsModule {}
