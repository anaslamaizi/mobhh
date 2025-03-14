import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  listOfAlgorithms: any = [];
  preview: any;
  results: any;

  constructor() { }

  // Get the list of Algorithms availables 
  getListOfAlgorithms(): any {
    this.listOfAlgorithms = [
      {
        id: 1,
        name: "A-star"
      },
      {
        id: 2,
        name: "Djikstra"
      },
    ]
    return this.listOfAlgorithms;
  }

  // Get the preview of the simulation from the input matrix 
  getPreview(): any {
    return this.preview;
  }

  // Get the shortest path results
  getResults(): any {
    return this.results;
  }


}
