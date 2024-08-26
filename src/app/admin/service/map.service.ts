import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  readonly RANDOM_CITY_LENGHT = 5;

  private map!: L.Map;

  private currentMarker!: L.Marker;

  public coordinates$ = new Subject<{ lat: number; lng: number; city: string }>();

  readonly MAX_ZOOM = 18;

  readonly MIN__ZOOM = 3;

  public initMap(mapId: string, center: [number, number], zoom: number): void {
    this.map = L.map(mapId, {
      center,
      zoom,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: this.MAX_ZOOM,
      minZoom: this.MIN__ZOOM,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    tiles.addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.onMapClick(e);
    });
  }

  private async onMapClick(e: L.LeafletMouseEvent): Promise<void> {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);

    const cityName = await this.getCityName(e.latlng.lat, e.latlng.lng);
    marker.bindPopup(`${cityName}`).openPopup();

    this.currentMarker = marker;

    this.coordinates$.next({ lat: e.latlng.lat, lng: e.latlng.lng, city: cityName });
  }

  // eslint-disable-next-line class-methods-use-this
  public async getCityName(lat: number, lng: number): Promise<string> {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
    );
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village || `${this.getRandomCityName()}`;
  }

  public updateMapMarker(lat: number, lng: number, city: string): void {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }
    this.currentMarker = L.marker([lat, lng]).addTo(this.map);
    this.currentMarker.bindPopup(`${city}`).openPopup();
    this.coordinates$.next({ lat, lng, city });
  }

  private getRandomCityName(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const cityLength = this.RANDOM_CITY_LENGHT;

    let result = '';

    for (let i = 0; i < cityLength; i += 1) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
    }

    return result;
  }
}
