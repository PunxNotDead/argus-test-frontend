import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VehiclesListComponent} from './list/vehicles-list.component';
import {VehicleItemComponent} from './item/vehicle-item.component';

const customersRoutes: Routes = [
  {
    path: 'list',
    component: VehiclesListComponent,
  },
  {
    path: 'item/:id',
    component: VehicleItemComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(customersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class VehiclesRoutingModule {
}
