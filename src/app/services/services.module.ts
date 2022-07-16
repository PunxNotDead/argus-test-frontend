import {NgModule} from '@angular/core';
import VehiclesService from './vehicles.service';
import {HttpClientModule} from '@angular/common/http';
import ShortMessageService from './short-message.service';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import GoogleMapsService from './google-maps.service';

@NgModule({
  imports: [
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: [
  ],
  providers: [
    VehiclesService,
    ShortMessageService,
    GoogleMapsService
  ]
})
export class ServicesModule {
}
