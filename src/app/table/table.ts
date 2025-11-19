import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  comment: string;
}
@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() persons: Person[] = [];
  @Output() onAddPerson = new EventEmitter<void>();
  @Output() onEditPerson = new EventEmitter<Person>();
  @Output() onDeletePerson = new EventEmitter<Person>();

  addPerson() {
    this.onAddPerson.emit();
  }

  editPerson(person: Person) {
    this.onEditPerson.emit(person);
  }

  deletePerson(person: Person) {
    this.onDeletePerson.emit(person);
  }
}