import { GeoLocationService } from "./../geo-location.service";
import { Component, ViewChild, ElementRef } from "@angular/core";

declare var google: any;

interface pos {
  lat: number;
  lng: number;
}

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  map: any;
  marker: any;

  @ViewChild("map", { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(private geoloc: GeoLocationService) {}

  ionViewDidEnter() {
    this.showMap();

    this.geoloc.getCurrentPosition().then(data => {
      console.log([data.coords.latitude, data.coords.longitude]);

      let position = new google.maps.LatLng(
        data.coords.latitude,
        data.coords.longitude
      );
      this.map.setCenter(position);
      this.marker.setPosition(position);
    });
  }

  showMap() {
    const location = new google.maps.LatLng(8.53024, 76.9291);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: true
    });

    google.maps.event.addListener(this.marker, "dragend", evt =>
      this.markerChange()
    );

    // this.map.addListener("dragend", this.markerChange());
  }

  markerChange(): void {
    console.log(this.marker.getPosition());
  }
}
