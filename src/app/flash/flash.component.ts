import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IFlash } from '../flash.model';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})


export class FlashComponent implements OnInit {

@Output() onToggleCard = new EventEmitter();
@Output() onDelete = new EventEmitter();
@Output() OnEdit = new EventEmitter();
@Output() onRememberedChange = new EventEmitter();

@Input() flash: IFlash = {
  id:1,
  question: 'Who is this',
  answer: 'this is me',
  show: false,
  remembered: 'incorrect'
}
  constructor() { }

  ngOnInit(): void {
  }

  toggleCard() {
    this.onToggleCard.emit(this.flash.id);
  }

  markCorrect() {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'correct'
    })
  }

  markIncorrect() {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'incorrect'
    })
  }

  editFlash() {
    this.OnEdit.emit(this.flash.id)
  }

  deleteFlash() {
    this.onDelete.emit(this.flash.id)
  }

}
