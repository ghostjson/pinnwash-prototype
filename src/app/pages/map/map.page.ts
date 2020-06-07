import { FormsModule } from "@angular/forms";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { GeoLocationService } from "src/app/geo-location.service";

declare var google: any;

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage implements OnInit {
  map: any;
  marker: any;
  address: any = "";
  googleAutocomplete: any = new google.maps.places.AutocompleteService();
  searchResults: Array<any> = [];
  geocoder: any = new google.maps.Geocoder();
  loading: boolean = false;

  @ViewChild("map", { read: ElementRef, static: false }) mapRef: ElementRef;
  @ViewChild("input", { read: ElementRef, static: false }) inputRef: ElementRef;

  constructor(private geoloc: GeoLocationService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.showMap();

    this.loading = true;
    this.geoloc.getCurrentPosition().then(data => {
      console.log([data.coords.latitude, data.coords.longitude]);

      let position = new google.maps.LatLng(
        data.coords.latitude,
        data.coords.longitude
      );
      this.map.setCenter(position);
      this.marker.setPosition(position);
      this.setLocationAddress(this.marker.getPosition());
      this.loading = false;
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

    google.maps.event.addListener(this.map, "click", evt => {
      this.marker.setPosition(evt.latLng);
      this.markerChange();
    });
  }

  markerChange(): void {
    console.log(this.marker.getPosition());
    this.setLocationAddress(this.marker.getPosition());
  }

  setLocationAddress(position) {
    const geocoder = new google.maps.Geocoder();
    this.loading = true;
    geocoder.geocode({ location: position }, (results, status) => {
      this.inputRef.nativeElement.value = results[0].formatted_address;
      this.loading = false;
    });
  }

  searchAddress() {
    if (this.address.length > 0) {
      this.googleAutocomplete.getPlacePredictions(
        { input: this.address },
        predictions => {
          this.searchResults = predictions;
          console.log(predictions);
        }
      );
    }
  }

  setResult(place) {
    this.address = place;

    this.loading = true;
    this.geocoder.geocode({ address: this.address }, (results, status) => {
      this.map.setCenter(results[0].geometry.location);
      this.marker.setPosition(results[0].geometry.location);
      console.log(results[0].geometry.location);
      this.loading = false;
    });

    this.searchResults = [];
  }

  setCurrentLocation() {
    this.loading = true;
    this.geoloc.getCurrentPosition().then(data => {
      console.log([data.coords.latitude, data.coords.longitude]);

      let position = new google.maps.LatLng(
        data.coords.latitude,
        data.coords.longitude
      );
      this.map.setCenter(position);
      this.marker.setPosition(position);
      this.setLocationAddress(this.marker.getPosition());
      this.markerChange();
      this.loading = false;
    });
  }
}
