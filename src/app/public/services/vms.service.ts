import { Injectable } from '@angular/core';
import { VM } from '../DataModel/vm';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
/* VM Management System Services it will include all vm related services */
export class VmsService {
  vms :Array<any> = [];
  constructor() { 
    this.vms=this.mockData(500);

  }
  getVms() {
    
    return this.vms;
  }
  mockData(count: number) :Array<any>{
    // mock a dataset
    const mockDataset:VM[] = [];
    for (let i = 0; i < count; i++) {
      
      const randomCount = Math.floor(Math.random() * 5);
      const randomCountOS = Math.floor(Math.random() * 3);
      const randomCountStatus = Math.floor(Math.random() * 3);
      const randomCountGroup = Math.floor(Math.random() * 11);
      var group=['Gromggggggggggggggup1','Groumgggggggp2','Groumgggggggggggp3','Groumgggghp4','Grhmmmmmoup5','Gromgggggggghup6','Grmhhhhhhhoup7','Groumggggggggggghp8','Grouhgggggggmp9','Groumggggggggggggp10','Groupmgggggggh11','Groumgggggggggggghp12']
      var os=['Windows','Linux','AIX']
      var status=['Available','Occupied']
      var owner=['Soumya','Ashutosh','Hitesh']
      mockDataset[i] = {
        id:i,
        ip: '17.20.152.'+i,
        hostname: 'icdvmghfhfghgf152' + i,
        os: os[randomCountOS],
        ver: 'Version '+i,
        group:group[randomCountGroup],
        snap_count: Math.floor(Math.random() * 10)+1,
        ram: randomCountOS,
        status: status[randomCountStatus],
        owner:owner[randomCountStatus],
        comment:'XYghghghghghghghghghghghghghghghghghdrthhhhhhZ'+ i +randomCountStatus+randomCount+randomCountOS,
        vm_owner_lab:owner[randomCountStatus],
        cssClass:'',
        global:''
      };
      if(mockDataset[i].snap_count>=5 && mockDataset[i].snap_count<=8){
        mockDataset[i].cssClass='warnSnap';
      }
      else if(mockDataset[i].snap_count>8){
        mockDataset[i].cssClass='alertSnap';
      }
      mockDataset[i].global=mockDataset[i].ip+' '+mockDataset[i].hostname+' '+mockDataset[i].owner+' '+mockDataset[i].ram+' '+mockDataset[i].snap_count+' '+mockDataset[i].os+' '+mockDataset[i].ver+' '+mockDataset[i].group+' '+mockDataset[i].status+' '+mockDataset[i].owner;
     
    }
  
    return mockDataset;
  }
  
}
