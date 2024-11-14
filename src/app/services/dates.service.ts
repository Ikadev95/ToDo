import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  today = new Date()
  days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  months = ['Gennaio', 'Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']

  constructor() { }

  convertDateForTodo(date: Date) {
    let result = "";

    // Converti 'date' in un oggetto Date se è una stringa
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Verifica se la conversione è valida
    if (isNaN(dateObj.getTime())) {
      console.error('Data non valida:', date);
      return null;
    }

    const isToday =
      dateObj.getDate() === this.today.getDate() &&
      dateObj.getMonth() === this.today.getMonth() &&
      dateObj.getFullYear() === this.today.getFullYear();

    const isTomorrow =
    dateObj.getDate() === this.today.getDate() +1  &&
    dateObj.getMonth() === this.today.getMonth() &&
    dateObj.getFullYear() === this.today.getFullYear();

    if (isToday) {
      result = "Oggi";
    }
    else if(isTomorrow){
      result = "Domani"
    }
    else {
      let day = dateObj.getDate();
      let month = this.months[dateObj.getMonth()];
      result = day + " " + month.substring(0, 3);
    }

    return result;
  }

  getTodayFullDate(){
    let month = this.months[this.today.getMonth()]
    let day = this.days[this.today.getDay()]

    return  `${day} ${this.today.getDate()} ${month} ${this.today.getFullYear()}`
  }

  isDatePast(dateStr: string): boolean {
    const currentYear = this.today.getFullYear();

    // Dividi la data in giorno e mese
    const [dayStr, monthAbbr] = dateStr.split(' ');
    const day = parseInt(dayStr);
    const monthIndex = this.months.findIndex(month => month.substring(0, 3).toLowerCase() === monthAbbr.toLowerCase());

    if (isNaN(day) || monthIndex === -1) {
      console.error("Formato data non valido");
      return false;
    }

    const inputDate = new Date(currentYear, monthIndex, day);

    // Confronta la data di input con la data attuale
    return inputDate < this.today;
  }

}
