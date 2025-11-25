import { signal } from '@angular/core';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  comment: string;
}

export class PersonsStore {
  private readonly storageKey = 'persons';
  persons = signal<Person[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const storedPersons = localStorage.getItem(this.storageKey);
    if (storedPersons) {
      this.persons.set(JSON.parse(storedPersons));
    } else {
      this.persons.set([]);
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.persons()));
  }

  addPerson(person: Omit<Person, 'id'>) {
    const newId = this.persons().length > 0 ? Math.max(...this.persons().map(p => p.id)) + 1 : 1;
    const newPerson: Person = { ...person, id: newId };
    this.persons.update(persons => [...persons, newPerson]);
    this.saveToStorage();
  }

  updatePerson(person: Person) {
    this.persons.update(persons =>
      persons.map(p => p.id === person.id ? person : p)
    );
    this.saveToStorage();
  }

  deletePerson(personId: number) {
    this.persons.update(persons => persons.filter(p => p.id !== personId));
    this.saveToStorage();
  }
}
