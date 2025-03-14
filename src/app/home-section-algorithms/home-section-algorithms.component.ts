import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import {} from '@angular/common/http';

@Component({
    selector: 'app-home-section-algorithms',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule,
        FormsModule
    ],
    templateUrl: './home-section-algorithms.component.html',
    styleUrls: ['./home-section-algorithms.component.scss']
})
export class HomeSectionAlgorithmsComponent {

  @Input() algorithm: FormGroup = this.fb.group({});
  listOfAlgorithms: any = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

}
