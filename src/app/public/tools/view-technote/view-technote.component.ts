import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/spinner-service';
import { TechnotesService } from '../../services/technotes.service';

@Component({
  selector: 'app-view-technote',
  templateUrl: './view-technote.component.html',
  styleUrls: ['./view-technote.component.scss'],
})
export class ViewTechnoteComponent implements OnInit {
  technoteID: any;
  technotesDataSet!: any[];
  isLoaded!: boolean;
  technote: any;
  isDataloadFailed: any;

  constructor(
    private actRoute: ActivatedRoute,
    private spinner: SpinnerService,
    private technotesServie: TechnotesService
  ) {
    this.technoteID = this.actRoute.snapshot.params.technoteID;
    var promise = this.technotesServie.getTechnotes();
    promise
      .then((res: any[]) => {
        this.spinner.setSpinnerState(false);
        console.log('inside promise.then -< setting technotesDataSet', res);
        this.technotesDataSet = res;
        console.log(res);
        this.technote = this.technotesDataSet.filter(
          (data) => data.id == this.technoteID
        )[0];
        console.log(this.technote);
        this.isLoaded = true;
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
        this.isLoaded = false;
        this.isDataloadFailed;
      });
  }

  ngOnInit(): void {}
}
