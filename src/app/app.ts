import { Component, signal, OnInit } from '@angular/core';
import { PopUp } from './pop-up/pop-up';
import { Table } from './table/table';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  comment: string;
}

@Component({
  selector: 'app-root',
  imports: [PopUp, Table],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  persons = signal<Person[]>([]);
  isPopupVisible = signal(false);
  editingPerson = signal<Person | null>(null);

  ngOnInit() {
    const storedPersons = localStorage.getItem('persons');
    if (storedPersons) {
      this.persons.set(JSON.parse(storedPersons));
    }
  }

  private savePersonsToStorage() {
    localStorage.setItem('persons', JSON.stringify(this.persons()));
  }

  openPopup() {
    this.editingPerson.set(null);
    this.isPopupVisible.set(true);
  }

  editPerson(person: Person) {
    this.editingPerson.set(person);
    this.isPopupVisible.set(true);
  }

  deletePerson(person: Person) {
    this.persons.update(persons => persons.filter(p => p.id !== person.id));
    this.savePersonsToStorage();
  }

  savePerson(person: Person) {
    if (this.editingPerson()) {
   
      this.persons.update(persons =>
        persons.map(p => p.id === person.id ? person : p)
      );
    } else {
      
      const newId =
        this.persons().length > 0
          ? Math.max(...this.persons().map(p => p.id)) + 1
          : 1;

      this.persons.update(persons => [
        ...persons,
        { ...person, id: newId }
      ]);
    }

    this.savePersonsToStorage();
    this.closePopup();
  }

  closePopup() {
    this.isPopupVisible.set(false);
    this.editingPerson.set(null);
  }
}
