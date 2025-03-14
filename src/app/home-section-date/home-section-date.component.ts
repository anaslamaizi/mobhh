import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-home-section-date',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './home-section-date.component.html',
    styleUrl: './home-section-date.component.scss'
})
export class HomeSectionDateComponent {

  @Input() nextDate: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}


}
