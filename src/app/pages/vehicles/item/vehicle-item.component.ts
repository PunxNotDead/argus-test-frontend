import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VehicleType} from '../../../models/vehicle-type.enum';
import {Vehicle} from '../../../models/vehicle.model';
import VehiclesService from '../../../services/vehicles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import ShortMessageService from '../../../services/short-message.service';
import GoogleMapsService from '../../../services/google-maps.service';

@Component({
  selector: 'vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrls: ['./vehicle-item.component.scss']
})
export class VehicleItemComponent implements OnInit {
  public vehicleForm!: FormGroup;

  id: string | null  = null;

  types = [{
    title: 'Hybrid',
    value: VehicleType.Hybrid
  }, {
    title: 'SUV',
    value: VehicleType.SUV
  },
    {
      title: 'Truck',
      value: VehicleType.Truck
    }];

  vehicle: Vehicle = {
    id: '',
    name: '',
    created: 0,
    lastSuccessfulConnection: new Date(),
    type: VehicleType.Hybrid,
    location: {
      long: 0,
      lat: 0
    }
  }

  loading = false;

  constructor(
    private vehicleService: VehiclesService,
    private route: ActivatedRoute,
    private router: Router,
    private shortMessageService: ShortMessageService,
    private googleMapsService: GoogleMapsService
  ) {
  }

  ngOnInit(): void {
    this.vehicleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id !== 'new') {
      this.loading = true;
      this.vehicleService.getVehicleById(this.id).subscribe(vehicle => {
        this.vehicle = vehicle;
        this.vehicleForm.patchValue({
          name: this.vehicle.name,
          type: this.vehicle.type
        });
      },
        () => this.shortMessageService.showError('Can not load vehicle')
      ).add(
        () => {
          this.loading = false;
          this.googleMapsService.drawMarkers([this.vehicle.location], 'map-item', true, this.markerDragged.bind(this));
        }
      )
    } else {
      this.googleMapsService.drawMarkers([this.vehicle.location], 'map-item', true, this.markerDragged.bind(this));
    }
  }

  markerDragged(event: any) {
    this.vehicle.location.lat = event.latLng.lat();
    this.vehicle.location.long = event.latLng.lng();
  }

  save() {
    this.vehicle.type = this.vehicleForm.getRawValue().type;
    this.vehicle.name = this.vehicleForm.getRawValue().name;

    if (!this.vehicle.id) {
      this.vehicleService.createVehicle(this.vehicle).subscribe(data => {
          this.shortMessageService.showSuccess('Vehicle created');
          this.router.navigate(['/vehicles/list']);
        },
        () => this.shortMessageService.showError('Can not save vehicle'));
    } else {
      this.vehicleService.updateVehicle(this.vehicle).subscribe(data => {
          this.shortMessageService.showSuccess('Vehicle updated');
        },
        () => this.shortMessageService.showError('Can not save vehicle'));
    }

  }

  delete() {
    this.vehicleService.deleteVehicleById(this.vehicle.id).subscribe(data => {
        this.shortMessageService.showSuccess('Vehicle removed');
      this.router.navigate(['/vehicles/list']);
    },
      () => this.shortMessageService.showError('Can not delete vehicle'));
  }
}
