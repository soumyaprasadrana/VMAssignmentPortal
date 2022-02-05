import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsHomeComponent } from '../public/tools/tools-home/tools-home.component';
import { ToolsDbtComponent } from '../public/tools/tools-dbt/tools-dbt.component';
import { ToolsLtbComponent } from '../public/tools/tools-ltb/tools-ltb.component';
import { ToolsViewComponent } from '../public/tools/tools-view/tools-view.component';
import { PathModule } from '../public/widget/path/path.module';
import { CardsModule } from '../public/widget/card-small/card.module';
import { LTBButtonModule } from '../public/widget/ltb-button/ltb-button.module';
import { DBButtonModule } from '../public/widget/db-button/db-button.module';
import { CardsButtonModule } from '../public/widget/card-button/card.button.module';
import { LTBDialogModule } from '../public/widget/ltb-output-dialog/ltb-dialog.module';
import { ToolsSpaComponent } from '../public/tools/tools-spa/tools-spa.component';
import { ToolsSpaAppComponent } from '../public/tools/tools-spa-app/tools-spa-app.component';

@NgModule({
  declarations: [
    ToolsHomeComponent,
    ToolsDbtComponent,
    ToolsLtbComponent,
    ToolsViewComponent,
    ToolsSpaComponent,
    ToolsSpaAppComponent,
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    PathModule,
    CardsModule,
    CardsButtonModule,
    DBButtonModule,
    LTBButtonModule,
    LTBDialogModule,
  ],
})
export class ToolsModule {}
