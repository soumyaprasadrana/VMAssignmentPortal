import { NgModule } from '@angular/core';
import { NgxTextOverflowClampModule } from 'ngx-text-overflow-clamp';
import { NgPipesModule } from 'ngx-pipes';
import { NgToArrayPipeModule } from 'angular-pipes';
@NgModule({
  declarations: [],
  imports: [NgxTextOverflowClampModule, NgPipesModule, NgToArrayPipeModule],
  exports: [NgxTextOverflowClampModule, NgPipesModule, NgToArrayPipeModule],
})
export class AppCommonModule {}
