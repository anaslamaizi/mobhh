import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
    selector: 'app-result-ga',
    templateUrl: './result-ga.component.html',
    styleUrls: ['./result-ga.component.scss'],
    standalone: false
})
export class ResultGaComponent {
  graphs = [
    { src: 'assets/Energy_50_1.png', alt: 'Energy Graph', label: 'Energy' },
    { src: 'assets/FreeTime_50_1.png', alt: 'Free Time Graph', label: 'Free Time' },
    { src: 'assets/Insert_50_1.png', alt: 'Insert Graph', label: 'Insert' },
  ];

  csvData = [
    {
      run: 1,
      permutationOpt: '1 → 3 → 2',
      clientsInserted: 25,
      finalEnergy: '100kJ',
      waitingTime: '12 mins',
      executionTime: '0.5s',
      missionList: 'Mission A, Mission B',
    },
    {
      run: 2,
      permutationOpt: '2 → 1 → 3',
      clientsInserted: 30,
      finalEnergy: '95kJ',
      waitingTime: '10 mins',
      executionTime: '0.45s',
      missionList: 'Mission C, Mission D',
    },
  ];

  currentIndex = 0;
  displayedGraphs = [this.graphs[this.currentIndex]];
  loading: boolean = false;

  nextGraph(): void {
    this.currentIndex = (this.currentIndex + 1) % this.graphs.length;
    this.updateDisplayedGraphs();
  }

  prevGraph(): void {
    this.currentIndex = (this.currentIndex - 1 + this.graphs.length) % this.graphs.length;
    this.updateDisplayedGraphs();
  }

  private updateDisplayedGraphs(): void {
    this.displayedGraphs = [this.graphs[this.currentIndex]];
  }
}


@NgModule({
  declarations: [ResultGaComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SpinnerComponent
],
  bootstrap: [ResultGaComponent]
})
export class HomeGaModule { }

platformBrowserDynamic().bootstrapModule(HomeGaModule);
