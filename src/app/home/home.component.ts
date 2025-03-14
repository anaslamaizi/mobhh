import { Component, Output, EventEmitter } from '@angular/core';
import { HomeSectionAlgorithmsComponent } from '../home-section-algorithms/home-section-algorithms.component';
import { HomeSectionDateComponent } from '../home-section-date/home-section-date.component';
import { HomeSectionNetworkFileComponent } from '../home-section-network-file/home-section-network-file.component';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { PreviewComponent } from "../preview/preview.component";
import { HttpEventType } from '@angular/common/http';
import { SpinnerComponent } from "../spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    imports: [
        HomeSectionNetworkFileComponent,
        HomeSectionAlgorithmsComponent,
        HomeSectionDateComponent,
        MatButtonModule,
        FormsModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        SpinnerComponent,
        PreviewComponent
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  myForm: FormGroup = this.fb.group({});
  loading: boolean = false;
  nodeData: any[] = [];
  arcData: any[] = [];
  @Output() dataChange = new EventEmitter<{ nodeData: any[], arcData: any[] }>();
  statusDepatArrivee: boolean = false ;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dataService: DataService
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      networkFile: [''],
      algorithm: [''],
      nextDate: [''],
      startPoint: [''],
      endPoint: [''],
      distance: [''],
      time: [''],
      consumption: [''],
      risk: ['']
    });
  }

  handleDataChange(data: { nodeData: any[], arcData: any[] }) {
    this.nodeData = data.nodeData;
    this.arcData = data.arcData;
    console.log('Node data received in HomeComponent:', this.nodeData);
    console.log('Arc data received in HomeComponent:', this.arcData);
    this.dataChange.emit(data);
  }

  onStartPointChange(startPoint: number) {
    this.myForm.get('startPoint')?.setValue(startPoint);
  }

  onEndPointChange(endPoint: number) {
    this.myForm.get('endPoint')?.setValue(endPoint);
  }

  handleStatusDepatArriveeChange(value: boolean) {
    this.statusDepatArrivee = value;
    console.log('Received boolean value:', this.statusDepatArrivee);
  }

  submit() {
    if (this.myForm.valid) {
      const formValue = this.myForm.value;
      const inputFile = formValue.networkFile;

      const algorithm = formValue.algorithm;
      const startPoint = formValue.startPoint;
      const endPoint = formValue.endPoint;

      this.dataService.setMethod(algorithm);
      this.dataService.setStart(startPoint);
      this.dataService.setArrival(endPoint);

      this.loading = true;
      this.dataService.upload().subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.loading = true;
          console.log('Upload progress: ', Math.round(100 * event.loaded / event.total));
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload complete: ', event.body);
          this.loading = false;
          this.router.navigateByUrl('/results');
        }
      }, error => {
        console.error('Upload error:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

  returnHome() {
    this.router.navigateByUrl('/');
  }
}
