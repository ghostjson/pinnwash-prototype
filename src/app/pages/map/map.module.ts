import { LoadingComponent } from "./../../ui/loading/loading.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MapPageRoutingModule } from "./map-routing.module";

import { MapPage } from "./map.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MapPageRoutingModule],
  declarations: [MapPage, LoadingComponent]
})
export class MapPageModule {}
