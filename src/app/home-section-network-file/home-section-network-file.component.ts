import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import {} from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-home-section-network-file',
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule,
        CommonModule
    ],
    templateUrl: './home-section-network-file.component.html',
    styleUrls: ['./home-section-network-file.component.scss']
})
export class HomeSectionNetworkFileComponent {

  @Input() networkFile: FormGroup;
  @Output() dataChange = new EventEmitter<{ nodeData: any[], arcData: any[] }>();

  fileContent: any = null;
  jsonData: any = null;
  nodeData: Array<{ id: string, x: number, y: number }> = [];
  arcData: Array<{  source: string, target: string }> = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.networkFile = this.fb.group({
      file: [null]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.dataService.setFile(file);
      this.networkFile.patchValue({ file: file });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Retrieve the "Noeuds" sheet
        const worksheet = workbook.Sheets['Noeuds'];
        if (worksheet) {
          // Convert sheet to JSON format
          const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Extract headers and rows
          const headers = jsonSheet[0] as string[];
          const rows = jsonSheet.slice(1) as any[];

          // Map the data into the desired format
          this.nodeData = rows.map((row: any[]) => {
            return {
              id: row[0] as string,
              x: row[1] as number,
              y: row[2] as number
            };
          });
          console.log("this.nodeData");
          console.log(JSON.stringify(this.nodeData));
        } else {
          console.error('No "Noeuds" sheet found in the Excel file.');
        }


        const arcsWorksheet = workbook.Sheets['Arcs'];
        if (arcsWorksheet) {
          const arcsJson = XLSX.utils.sheet_to_json(arcsWorksheet, { header: 1 });
          const arcHeaders = arcsJson[0] as string[];
          const arcRows = arcsJson.slice(1) as any[];

          this.arcData = arcRows.map((row: any[]) => ({
            source: row[5] as string,
            target: row[6] as string
          }));
          console.log("this.arcData");
          console.log(this.arcData);
        } else {
          console.error('No "Arcs" sheet found in the Excel file.');
        }

        if ( this.nodeData.length > 0 && this.arcData.length > 0 ) {
          this.dataChange.emit({ nodeData: this.nodeData, arcData: this.arcData });
        } else {
          console.error('one of the data is missing to proceed ');
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  /*
  onUpload(): void {
    // Envoyer le JSON au back end
  }

  convertToJSON(excelData: any): any {
    const keys = excelData[0];
    keys[0] = "id";
    const result = [];
    for (let i = 1; i < excelData.length; i++) {
      const obj: any = {};
      for (let j = 0; j < keys.length; j++) {
        obj[keys[j]] = excelData[i][j];
      }
      result.push(obj);
    }
    return result;
  }
    */
}
