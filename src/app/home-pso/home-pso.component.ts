import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { PsoService } from '../services/pso.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
    selector: 'app-home-pso',
    templateUrl: './home-pso.component.html',
    styleUrls: ['./home-pso.component.scss'],
    standalone: false
})
export class HomePsoComponent {

  selectedFile: File | null = null;
  selectedAlgorithm: string | null = null;
  fileUploaded: boolean = false;
  formValid: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private psoService: PsoService
  ) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fileUploaded = true;
      this.checkFormValidity();
    }
  }

  checkFormValidity() {
    this.formValid = this.fileUploaded && this.selectedAlgorithm !== null;
  }

  processFile() {
    if (this.formValid && this.selectedFile && this.selectedAlgorithm) {
      this.loading = true;
      this.psoService.processFile(this.selectedFile)
        .subscribe(
          response => {
            console.log('Upload successful', response);
            this.router.navigateByUrl('/result-pso');
          },
          error => {
            console.error('Upload failed', error);
            alert('There was an error processing your request.');
          }
        );
    } else {
      alert('Please upload a file and select an algorithm.');
    }
  }
}

@NgModule({
  declarations: [HomePsoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SpinnerComponent
],
  bootstrap: [HomePsoComponent]
})
export class HomePsoModule { }

platformBrowserDynamic().bootstrapModule(HomePsoModule);
