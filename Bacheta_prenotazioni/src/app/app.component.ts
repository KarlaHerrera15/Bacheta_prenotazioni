import { Component, OnInit } from '@angular/core';
import { Prenotazione } from './models/prenotazioni.model';
import { PrenotazioniService } from './services/prenotazioni.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'prenotazioni-dentista';

  // 🔹 Vettore prenotazioni
  prenotazioni: Prenotazione[] = [];

  // 🔹 Prenotazione selezionata per i dettagli
  prenotazioneSelezionata?: Prenotazione;

  // 🔹 Modello per il form
  nuovaPrenotazione: Prenotazione = {
    nome: '',
    data: '',
    ora: '',
    tipoVisita: ''
  };

  constructor(private prenotazioniService: PrenotazioniService) {}

  // ✅ Carica prenotazioni all'avvio
  ngOnInit(): void {
    this.caricaPrenotazioni();
  }

  caricaPrenotazioni(): void {
    this.prenotazioniService.getPrenotazioni()
      .subscribe({
        next: (data) => {
          this.prenotazioni = data;
          console.log("Prenotazioni caricate:", data);
        },
        error: (err) => {
          console.error("Errore nel caricamento:", err);
        }
      });
  }

  // ✅ Aggiungi nuova prenotazione
  aggiungiPrenotazione(): void {

    // 🔒 Controllo doppia prenotazione (stesso giorno e ora)
    const esiste = this.prenotazioni.some(p =>
      p.data === this.nuovaPrenotazione.data &&
      p.ora === this.nuovaPrenotazione.ora
    );

    if (esiste) {
      alert("Esiste già una prenotazione in questo giorno e orario!");
      return;
    }

    // 🔹 Aggiunta locale immediata (UI reattiva)
    const nuova = { ...this.nuovaPrenotazione };
    this.prenotazioni.push(nuova);

    // 🔹 POST al server
    this.prenotazioniService.addPrenotazione(nuova)
      .subscribe({
        next: (response) => {
          console.log("Prenotazione salvata sul server:", response);
        },
        error: (err) => {
          console.error("Errore nel salvataggio:", err);
        }
      });

    // 🔹 Reset form
    this.nuovaPrenotazione = {
      nome: '',
      data: '',
      ora: '',
      tipoVisita: ''
    };
  }

  // ✅ Mostra dettagli prenotazione
  mostraDettagli(prenotazione: Prenotazione): void {
    this.prenotazioneSelezionata = prenotazione;
  }
}