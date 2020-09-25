import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseSubject, Student, Teacher, User} from '../../../providers/types/wl-types';
import {UserService} from '../../../providers/user.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'wl-create-edit-subject',
  templateUrl: './create-edit-subject.component.html',
  styleUrls: ['./create-edit-subject.component.scss']
})
export class CreateEditSubjectComponent implements OnInit {

  @Output()
  createSubject: EventEmitter<CourseSubject> = new EventEmitter();
  preselectedStudents: Student[];
  preselectedTutors: User[];

  @Input()
  set subject(subject: CourseSubject) {
    if (subject) {
      this.newSubject.controls.code.setValue(subject.code);
      this.newSubject.controls.name.setValue(subject.name);
      this.newSubject.controls.semester.setValue(subject.semester);
      this.newSubject.controls.description.setValue(subject.description);
      this.newSubject.controls.teacher.setValue(subject.teacher);
      this.newSubject.controls.tutors.setValue(subject.tutors);
      this.newSubject.controls.students.setValue(subject.students);
      this.newSubject.controls.groups.setValue(subject.groups);

      this.preselectedStudents = subject.students;
      this.preselectedTutors = subject.tutors;
    }
  }

  newSubject = new FormGroup({
    name: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required),
    semester: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    teacher: new FormControl(null),
    tutors: new FormControl(null),
    students: new FormControl(null),
    groups: new FormControl(null)
  });
  teachers: Teacher[] = [];
  tutors: User[] = [];
  students: Student[] = [];


  demoUsers: User[] = [{
    firstName: 'Alexandra',
    lastName: 'Ionel',
    email: 'alexainel94@gmail.com',
    username: 'alexandra.ionel'
  },
    {
      firstName: 'Mario',
      lastName: 'Rivis',
      email: 'mariorivis@gmail.com',
      username: 'mario.rivis'
    }, {
      firstName: 'Andy',
      lastName: 'Molin',
      email: 'andymolin@gmail.com',
      username: 'andy.molin'
    },
    {
      firstName: 'Darius',
      lastName: 'Nagy',
      email: 'dariusNagy@gmail.com',
      username: 'darius.nagy'
    }];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
      this.tutors = [...this.teachers, ...this.students];
    });
    this.userService.getStudents().subscribe(students => {
      this.students = students;
      this.tutors = [...this.teachers, ...this.students];
    });


    // TODO delete
    this.teachers = this.demoUsers;
    this.tutors = this.demoUsers;
    this.students = this.demoUsers;
  }

  create(): void {
    const value = this.newSubject.value;
    const courseSubject = value as CourseSubject;
    value.teacher = courseSubject.teacher.username;
    value.tutors = courseSubject.tutors.map(t => t.username);
    value.students = courseSubject.students.map(s => s.username);
    this.createSubject.emit(value);
  }

  close(): void {
    this.createSubject.emit(null);
  }

  selectTutors(tutors: string[]): void {
    this.newSubject.controls.tutors.setValue(tutors);
  }

  selectStudents(students: string[]): void {
    this.newSubject.controls.students.setValue(students);
  }

  selectTeacher(event: MatAutocompleteSelectedEvent): void {
    this.newSubject.controls.teacher.setValue(event.option.value);
  }
}
