import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { formatDate } from '@angular/common' 
@Component({
  selector: 'app-add-edit-train',
  templateUrl: './add-edit-train.component.html',
  styleUrls: ['./add-edit-train.component.scss']
})
export class AddEditTrainComponent implements OnInit {


  @Input() formType: any
  @Input() trainData: any
  @Output() refreshListEvent = new EventEmitter<string>();
  submitted = false
  buttonLabel: String | undefined;
  trainTypes = ['GOODS', 'EXPRESS', 'PASSENGER', 'SUPER-FAST']
  
  trainForm = new FormGroup({
    name: new FormControl('', Validators.required),
    trainType: new FormControl('', Validators.required),
    avgSpeed: new FormControl('', Validators.required),
    depStation: new FormControl('', Validators.required),
    curStation: new FormControl('', Validators.required),
    eta: new FormControl('', Validators.required),

  });
  visible: boolean = false;


  constructor(private httpService: HttpService) {

  }
  ngOnInit(): void {
    switch (this.formType) {
      case 'ADD':
        this.buttonLabel = 'Add Train'
        break;
      case 'EDIT':

        this.buttonLabel = 'Edit Train';
        this.trainForm.get('name')?.setValue(this.trainData.name)
        this.trainForm.get('trainType')?.setValue(this.trainData.trainType)
        this.trainForm.get('avgSpeed')?.setValue(this.trainData.avgSpeed)
        this.trainForm.get('depStation')?.setValue(this.trainData.depStation)
        this.trainForm.get('curStation')?.setValue(this.trainData.curStation)
        this.trainForm.get('eta')?.setValue( this.trainData.eta)

        break;


    }
  }
  showDialog() {
    this.visible = true;
  }

  saveForm() {
    this.submitted = true
    let requestObj = { trainId: this.trainData?._id, ...this.trainForm.value }
    let route = '/api/trains/create'

    if (this.formType === 'EDIT') {
      route = '/api/trains/update'
    }

    this.httpService.sendRequest(route, requestObj).subscribe(
      (res) => {
      },
      () => {
      },
      () => {
        this.visible = false;
        this.submitted = false
        this.trainForm.reset();
        this.refreshListEvent.emit();

      }
    );
  }
  cancelForm() {
    this.visible = false;
  }
}
