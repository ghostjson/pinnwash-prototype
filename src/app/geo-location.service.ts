import { Injectable } from "@angular/core";

import { Plugins } from "@capacitor/core";

const { Geolocation } = Plugins;

@Injectable({
  providedIn: "root"
})
export class GeoLocationService {
  constructor() {}

  async getCurrentPosition() {
    const coords = await Geolocation.getCurrentPosition();
    return coords;
  }
}
