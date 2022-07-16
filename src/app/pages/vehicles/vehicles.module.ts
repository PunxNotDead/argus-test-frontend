import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehiclesRoutingModule} from './vehicles-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {VehiclesListComponent} from './list/vehicles-list.component';
import {MatButtonModule} from '@angular/material/button';
import { VehicleItemComponent } from './item/vehicle-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {ServicesModule} from '../../services/services.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VehiclesRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        MatTableModule,
      ServicesModule
    ],
  declarations: [
    VehiclesListComponent,
    VehicleItemComponent
  ],
  providers: [
  ]
})
export class VehiclesModule {
}
