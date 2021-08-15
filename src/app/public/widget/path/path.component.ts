import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router,Route } from '@angular/router';
@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})
export class PathComponent implements OnInit {
  path:any=[];
  htmlToBind:string="";
  constructor(private router:Router) {
    console.log(this.router.url);
    var url=this.router.url;
    url=url.replace('/portal','');
    console.log(url)
    var list=url.split('/');
    list=list.slice(1,list.length);
    console.log(list);
    for(var i=0; i<list.length; i++){
      var parent='/portal';
      for(var j=0; j<=i; j++){ 
        console.log("Calling pathbuilder for index :"+j);
        parent=this.pathBuilder(parent,list[j]);
      }
      console.log("Calling parsepathToHtml: ");
      if(i==list.length-1){
      this.parsePathToHtml(parent,false);
      console.log(parent);
      }
      else{
        this.parsePathToHtml(parent,true);
      console.log(parent);
      }
    }
    
    

   }

  ngOnInit(): void {
  }
  pathBuilder(oldPath:string,query:string){
    console.log("pathBuilder: called")
    
    return oldPath+"/"+query;
  }
  parsePathToHtml(path:string, isParent:boolean){
    console.log("parsePathToHtml: called");
    var tempL=path.split('/');
    
    
    this.path.push({path:path,title: tempL[tempL.length-1],isParent:isParent,parent:tempL[tempL.length-2]}); 
  }
}
