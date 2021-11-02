import { Component, OnInit } from '@angular/core';
import { VMMConfig } from '../vmm.config';

@Component({
  selector: 'app-vmm-home',
  templateUrl: './vmm-home.component.html',
  styleUrls: ['./vmm-home.component.scss'],
})
export class VmmHomeComponent implements OnInit {
  cardsMetaData: any;
  constructor() {
    this.cardsMetaData = VMMConfig.cardsMetaData;
  }

  ngOnInit(): void {}
}
