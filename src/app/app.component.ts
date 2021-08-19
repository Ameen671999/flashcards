import { identifierModuleUrl } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IFlash } from './flash.model';
import { FlashService } from './flash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})



export class AppComponent implements OnInit, OnDestroy{
@ViewChild('flashForm', {static:true}) flashForm: NgForm;
  editing = false;
  editingId: number  = 0;
  flashs: any;
  flashs$;
  flash = {
    question: '',
    answer: ''
  };
  subscription: Subscription

  constructor(private flashService: FlashService) {
    this.flashs$ = this.flashService.flashs$;
  }

  ngOnInit() {
    // this.subscription = this.flashService.flashs$.subscribe(flashs => {
    //   this.flashs = flashs;
    // })

  }

  handleSubmit() : void {
    this.flashService.addFlash(this.flash)
    this.handleClear();
  }

  handleClear() {
    this.flash = {question: '', answer:''};
    this.flashForm.resetForm();
  }

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }
  handleCancel() {
    this.editing = false;
    this.editingId = 0;
    this.handleClear();
  }

  trackByFlashId(index: number, flash: any) {
    return flash.id;
  }

  handleToggle(id: number) {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number) {
    this.flashService.deleteFlash(id);
  }

  handleEdit(id: number) {
   this.flashService.getFlash(id);
    this.editing =  true;
    this.editingId = id;
  }

  handleRememberedChange({id, flag}: {id:number, flag:any}) {
    this.flashService.rememberedChange(id, flag)
  }

  ngOnDestroy() {
    // if(this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }

}


