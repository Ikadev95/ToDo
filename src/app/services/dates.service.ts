import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  months = ['Gennaio', 'Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']

  constructor() { }

  convertDateForTodo(date: any) {
    console.log(date);

    // Converti 'date' in un oggetto Date se è una stringa
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Verifica se la conversione è valida
    if (isNaN(dateObj.getTime())) {
      console.error('Data non valida:', date);
      return null;
    }
    let day = dateObj.getDate()
    let month = this.months[dateObj.getMonth()];
    let result = day + " " + month.substring(0, 3) ;
    return result;
  }



}
