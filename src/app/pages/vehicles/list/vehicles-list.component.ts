import { Component, OnInit } from '@angular/core';
import VehiclesService from '../../../services/vehicles.service';
import {Vehicle} from '../../../models/vehicle.model';
import {Router} from '@angular/router';
import GoogleMapsService from '../../../services/google-maps.service';

@Component({
  selector: 'vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {

  data: Vehicle[] = [];
  displayedColumns = ['id', 'name', 'type', 'created', 'lastSuccessfulConnection'];
  loading = true;

  constructor(
    private vehicleService: VehiclesService,
    private router: Router,
    private googleMapsService: GoogleMapsService
  ) { }

  ngOnInit(): void {
    this.vehicleService.getList().subscribe(data => {
      this.data = data;

      this.googleMapsService.drawMarkers(this.data.map(item => item.location), 'map');
    },
      error => {

      })
      .add(() => {
        this.loading = false;
      });
  }

  rowClicked(row: Vehicle) {
    this.router.navigate(['/vehicles/item', row.id]);
  }
}
