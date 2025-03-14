import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PsoService } from '../services/pso.service';

interface Solution {
  ListJobs: number[][];
  t: number[];
  xa: number[];
  xb: number[];
  OF: number;
}

@Component({
    selector: 'app-result-pso',
    templateUrl: './result-pso.component.html',
    styleUrls: ['./result-pso.component.scss'],
    standalone: false
})
export class ResultPsoComponent implements AfterViewInit {

  solution: Solution | undefined;
  timeTotal: number = 0;
  listJobs: any;
  expandedJobs: boolean[];

  constructor(private http: HttpClient,
    private psoService: PsoService,
  ) {
    this.expandedJobs = [];
  }

  ngAfterViewInit(): void {
    this.loadSolution();
  }

  toggleJob(index: number) {
    this.expandedJobs[index] = !this.expandedJobs[index];
  }

  downloadJSON(): void {
    if (this.solution) {
      const jsonData = JSON.stringify(this.solution, null, 2); // Transforme les données en JSON avec un format lisible
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = 'solution.json';
      link.click();
  
      window.URL.revokeObjectURL(url); // Libère la mémoire
    } else {
      console.error('Aucune solution disponible à télécharger.');
    }
  }

  private loadSolution(): void {
    this.psoService.getResult().subscribe(
      data => {
        this.solution = data[0].Solution;
        this.listJobs = data[0].Solution['List jobs'];
        this.timeTotal = data[0].Time;
      },
      error => {
        console.error('Erreur lors de la récupération des données de solution', error);
      }
    );
  }
}
