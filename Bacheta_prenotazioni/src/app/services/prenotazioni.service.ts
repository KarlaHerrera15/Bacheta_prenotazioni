import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prenotazione } from '../models/prenotazioni.model';
import { BrowserModule } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class PrenotazioniService {

  url = 'https://my-json-server.typicode.com/malizia-g/verificaPrenotazioni/prenotazioni';

  constructor(private http: HttpClient) {}

  getPrenotazioni() {
    return this.http.get<Prenotazione[]>(this.url);
  }

  addPrenotazione(prenotazione: Prenotazione) {
    return this.http.post(this.url, prenotazione);
  }
}

