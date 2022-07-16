import {Injectable} from '@angular/core';
import {Point} from '../models/point.model';

@Injectable()
export default class GoogleMapsService {
  drawMarkers(items: Point[], element: string, draggable = false, callback?: Function) {
    const coords = items.map(item => ({lng: item.long, lat: item.lat}));
  // @ts-ignore
    const map = new google.maps.Map(document.getElementById(element), {
      zoom: 4,
      center: coords.length ? coords[0] : null,
    });

    coords.forEach(coord => {
      // @ts-ignore
      const marker = new google.maps.Marker({
        position: coord,
        map: map,
        draggable
      });

      if (draggable) {
        // @ts-ignore
        google.maps.event.addListener(marker, 'dragend', callback);
      }
    })
  }
}
