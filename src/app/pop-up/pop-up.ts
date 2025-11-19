import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-pop-up',
  imports: [FormsModule, CommonModule],
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css',
})
export class PopUp implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() personToEdit: Person | null = null;
  @Output() onSave = new EventEmitter<Person>();
  @Output() onCancel = new EventEmitter<void>();

  person: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    age: 0,
    dateOfBirth: '',
    comment: ''
  };

  formError = false;
  dobError = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['personToEdit'] && this.personToEdit) {
      this.person = { ...this.personToEdit };
    } else if (changes['isVisible'] && this.isVisible) {
      this.person = {
        id: 0,
        firstName: '',
        lastName: '',
        age: 0,
        dateOfBirth: '',
        comment: ''
      };
    }
    this.formError = false;
    this.dobError = false;
  }


  onDobChange() {
    this.dobError = false;
    if (this.person.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.person.dateOfBirth);
      if (birthDate > today) {
        this.dobError = true;
        return;
      }
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.person.age = age;
    }
  }

  onAgeChange() {
    if (this.person.age && this.person.age > 0) {
      const today = new Date();
      const birthYear = today.getFullYear() - this.person.age;
      this.person.dateOfBirth = `${birthYear}-01-01`;
    }
  }

  save() {
    this.formError = false;
    this.dobError = false;

    if (!this.person.firstName || !this.person.lastName || !this.person.age || !this.person.dateOfBirth) {
      this.formError = true;
      return;
    }

    const today = new Date();
    const birthDate = new Date(this.person.dateOfBirth);
    if (birthDate > today) {
      this.dobError = true;
      return;
    }
    

    this.onSave.emit(this.person);
  }

  cancel() {
    this.onCancel.emit();
  }
}                             