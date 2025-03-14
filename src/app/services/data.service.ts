import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000/upload'; // l'URL de ton serveur Flask

  file: File | null = null;
  method: string = 'dijkstra'; // valeur par défaut
  startPoint: string = '22'; // valeur par défaut
  endPoint: string = '323'; // valeur par défaut
  public formData: any = {};

  constructor(private http: HttpClient) { }

  setFile(file: File): void {
    this.file = file;
    if (this.file) {
      console.log("file uploaded");
    }
    
  }

  setMethod(method: string): void {
    this.method = method;
    console.log("method uploaded" + method);
  }
  
  getMethod(): string {
    return this.method;
  }

  setStart(startPoint: string): void {
    this.startPoint = startPoint;
    console.log("startPoint uploaded" + startPoint);
  }


  setArrival(endPoint: string): void {
    this.endPoint = endPoint;
    console.log("endPoint uploaded" + endPoint);
  }

  setData(key: string, value: any): void {
    console.log(`donnee formulaire  ${key}: ${value}`);  
    this.formData[key] = value;
    console.log(`current donnee formulaire  ${key}:`, this.formData);
  }
 
  getData(key: string): any {
    console.log(`Récuperer les donnees ${key}: ${this.formData[key]}`);  
    return this.formData[key];
  }
 
 
  fetchResults(): Observable<any> {
    return new Observable(observer => {
      const result = this.getData('result');
      if (result) {
        observer.next(result);
        observer.complete();
      } else {
        observer.error('No result found in DataService');
      }
    });
  }
  clearData(): void {
    this.formData = {};
  }

  upload(): Observable<any> {
    if (!this.file) {
      throw new Error('File or method not set');
    }

    const formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('method', this.method);
    formData.append('startPoint', this.startPoint);
    formData.append('endPoint', this.endPoint);

    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response && event.body) {
          console.log('Response from backend:', event.body);
          this.setData('result', event.body);
         
          console.log('Data saved in service:', this.formData);
        }
      }));
  }
}
