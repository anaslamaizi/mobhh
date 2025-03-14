import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsoService {
  private apiUrl = 'http://localhost:5050'; // Remplacez par l'URL de votre serveur Flask

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer le fichier JSON
  processFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Le nom de 'file' doit correspondre à celui utilisé dans Flask pour récupérer le fichier

    return this.http.post(`${this.apiUrl}/uploadpso`, formData);
  }

  // Méthode pour récupérer les résultats du serveur Flask
  getResult(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getresultpso`);
  }
}
