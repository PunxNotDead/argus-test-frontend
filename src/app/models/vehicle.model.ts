import {VehicleType} from './vehicle-type.enum';
import {Point} from './point.model';

export interface Vehicle {
  id: string;
  name: string;
  created: number;
  type: VehicleType;
  lastSuccessfulConnection: Date;
  location: Point;
}
