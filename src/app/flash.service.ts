import { Injectable } from '@angular/core';
import { IFlash } from './flash.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashService {
  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: this.getRandomNumber(),
    remembered: 'incorrect'
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: this.getRandomNumber(),
    remembered: 'incorrect'
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: this.getRandomNumber(),
    remembered: 'incorrect'
  },
  ];

  flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);

  constructor() { }

  addFlash(flash: { question: string, answer: string }) {
    this.flashs = [
      ...this.flashs, {
        ...flash,
        show: false,
        id: this.getRandomNumber(),
      }
    ];
    this.flashs$.next(this.flashs);
  }

  toggleFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show
      },
      ...this.flashs.slice(index + 1)
    ]
    this.flashs$.next(this.flashs)
  }
  deleteFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect') {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice(index + 1)
    ]
    this.flashs$.next(this.flashs)
  }

  updateFlash(id: number, flash: { question: string, answer: string }) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        ...flash
      },
      ...this.flashs.slice(index + 1)
    ]
    this.flashs$.next(this.flashs)
  }

  getFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    return this.flashs[index];
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 1000)
  }
}
