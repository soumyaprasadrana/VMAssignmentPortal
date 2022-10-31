// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Tools Home Component
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { VmsService } from '../../services/vms.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { SnapshotsConfig } from '../snapshots.config';

@Component({
  selector: 'app-snapshots-home',
  templateUrl: './snapshots-home.component.html',
  styleUrls: ['./snapshots-home.component.scss'],
})
export class SnapshotsHomeComponent implements OnInit {
  cardsMetaData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vms: VmsService,
    private dialog: MatDialog,
    private _client: NodeclientService
  ) {
    this.cardsMetaData = SnapshotsConfig.cardsMetaData;
  }

  ngOnInit(): void {}
  goToViewAllSnapshots() {
    this.router.navigate(['../grid'], {
      relativeTo: this.route,
      state: { action: 'all' },
    });
  }
  goToSearchSnapshots() {
    this.router.navigate(['../grid'], {
      relativeTo: this.route,
      state: { action: 'search' },
    });
  }
  goToSnapshotsCount() {
    this.router.navigate(['../grid'], {
      relativeTo: this.route,
      state: { action: 'count' },
    });
  }
  runUpdateCount() {
    this.vms
      .runUpdateSnapshotCount()
      .then((res: any) => {
        try {
          res = JSON.parse(res);
        } catch (e) {}
        if (
          res.status.toString().toLowerCase() == 'success' ||
          res.status.toString().toLowerCase() == 'true'
        ) {
          this.openDialog(
            {
              type: 'message',
              message: res.message,
            },
            null
          );
        } else {
          this.openDialog(
            {
              type: 'alert',
              message: res.message,
            },
            null
          );
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.openDialog(
          {
            type: 'alert',
            message: err.message,
          },
          null
        );
      });
  }
  runUpdateExtradata() {
    this.vms
      .runUpdateExtradata()
      .then((res: any) => {
        try {
          res = JSON.parse(res);
        } catch (e) {}
        if (
          res.status.toString().toLowerCase() == 'success' ||
          res.status.toString().toLowerCase() == 'true'
        ) {
          this.openDialog(
            {
              type: 'message',
              message: res.message,
            },
            null
          );
        } else {
          this.openDialog(
            {
              type: 'alert',
              message: res.message,
            },
            null
          );
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.openDialog(
          {
            type: 'alert',
            message: err.message,
          },
          null
        );
      });
  }
  restartSnapshotService() {
    this.vms
      .restartSnapshotService()
      .then((res: any) => {
        try {
          res = JSON.parse(res);
        } catch (e) {}
        if (
          res.status.toString().toLowerCase() == 'success' ||
          res.status.toString().toLowerCase() == 'true'
        ) {
          this.openDialog(
            {
              type: 'message',
              message: res.message,
            },
            null
          );
        } else {
          this.openDialog(
            {
              type: 'alert',
              message: res.message,
            },
            null
          );
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.openDialog(
          {
            type: 'alert',
            message: err.message,
          },
          null
        );
      });
  }
  openDialog(data: any, callback: any) {
    this.dialog
      .open(AlertDialogComponent, {
        data: data,
        panelClass: 'app-dialog-class',
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        if (typeof callback == 'function') {
          callback(res);
        }
      });
  }
}
