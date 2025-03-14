import { Component, AfterViewInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Chart, ChartType } from 'chart.js/auto';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-ga',
    templateUrl: './home-ga.component.html',
    styleUrls: ['./home-ga.component.scss'],
    standalone: false
})
export class HomeGaComponent implements AfterViewInit {
  // État des fichiers uploadés
  isInstanceFileUploaded: boolean = false;
  isTimeMatrixFileUploaded: boolean = false;

  rangeValue: number = 50;
  max: number = 800;

  //ranges:number[][]= [[0,100], [100, 200], [200, 300], [300,400], [400, 500], [500, 600], [600,700],  [700,800]];
  ranges:number[][]= [];

  // Graphiques pour chaque fichier
  instanceCharts: Chart[] = [];
  timeMatrixCharts: Chart[] = [];

  // Indices pour la navigation
  currentInstanceChartIndex: number = 0;
  currentTimeMatrixChartIndex: number = 0;

  chartTypes: ChartType[] = ['bar', 'line', 'pie', 'radar']; // Types de graphiques
  loading: boolean = false;
  formValid: any;

  constructor( private router: Router) {}

  // Gestion de l'upload du fichier Instance
  onInstanceFileUploadedChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isInstanceFileUploaded = true;
      this.readFile(file, 'instance');
    }
  }

  // Gestion de l'upload du fichier Time Matrix
  onTimeMatrixFileUploadedChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isTimeMatrixFileUploaded = true;
      this.readFile(file, 'timeMatrix');
    }
  }

  readFile(file: File, type: 'instance' | 'timeMatrix') {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      if (type === 'timeMatrix') {
      this.parseCSVDataTimeMatrix(text);
      } else {
      this.parseCSVData(text, type);
      }
      console.log(text);
    };
    reader.readAsText(file);
  }


  parseCSVDataTimeMatrix(data: string) {
    let timeMatrixDatas: number[] = [];
    let timeMatrixDatasMin: number[] = [];
    let timeMatrixDatasMax: number[] = [];
    let timeMatrixDatasAverage: number[] = [];

    const rows = data.split('\n').map(row => row.trim()).filter(row => row); // Ignore empty lines

    const values = rows.map(row => row.split(',').map(cell => cell.trim())); 

    let k=1;
    for (let i=1; i<values.length; i++) {
      //convert row to number
      let rowNumberValues = values[i].map(value => parseFloat(value)).filter(val => !isNaN(val));
      for (let j=k; j<rowNumberValues.length; j++) {
          timeMatrixDatas.push(rowNumberValues[j]);
      }
      timeMatrixDatasMax.push(Math.max(...rowNumberValues));
      timeMatrixDatasMin.push(Math.min(...rowNumberValues.filter(item => item!=0)));
      timeMatrixDatasAverage.push(timeMatrixDatas.reduce((sum, currentValue) => sum + currentValue, 0) / timeMatrixDatas.length);
      k++;
    }

    let countTimeMatrixDatas = this.countInRange(timeMatrixDatas, this.ranges);
    let countTimeMatrixDatasMax = this.countInRange(timeMatrixDatasMax, this.ranges);
    let countTimeMatrixDatasMin = this.countInRange(timeMatrixDatasMin, this.ranges);
    let countTimeMatrixDatasAverage = this.countInRange(timeMatrixDatasAverage, this.ranges);

    console.log("this.timeMatrixDatas");
    console.log(timeMatrixDatas);
    console.log(countTimeMatrixDatas);


    console.log("this.timeMatrixDatasMax");
    console.log(timeMatrixDatasMax);
    console.log(countTimeMatrixDatasMax);

    
    console.log("this.timeMatrixDatasMin");
    console.log(timeMatrixDatasMin);
    console.log(countTimeMatrixDatasMin);


    console.log("this.timeMatrixDatasAverage");
    console.log(timeMatrixDatasAverage);
    console.log(countTimeMatrixDatasAverage);

    let dataCharts:any[] = [];
    dataCharts.push(
    {
      label: "Distance",
      data: countTimeMatrixDatas

    });
    dataCharts.push({
      label: "Max",
      data: countTimeMatrixDatasMax

    });
    dataCharts.push({
      label: "Min",
      data: countTimeMatrixDatasMin
    });
    dataCharts.push({
      label: "Average",
      data: countTimeMatrixDatasAverage

    });

    this.renderChartsTimeMatrix(dataCharts, 'time-matrix-chart-container', this.timeMatrixCharts);
  }


  countInRange(values:number[], ranges:number[][]):any[] {
    let counts:any[]=ranges.map(([min, max]) => ({range: `${min}-${max}`, count:0}));

    values.forEach(item => {
      ranges.forEach(([min, max], index) => {
        if (item>=min && item<max) 
            counts[index].count++;
        
      });
      
    });
    return counts;
  }


  parseCSVData(data: string, type: 'instance' | 'timeMatrix') {
    const rows = data.split('\n').map(row => row.trim()).filter(row => row); // Ignore empty lines

    console.log("rows");
    console.log(rows);
    const headers = rows[0].split(',').map(header => header.trim()); // Extract headers

    console.log("headers");
    console.log(headers);

    const values = rows.map(row => row.split(',').map(cell => cell.trim())); // Extract up to 10 rows

    console.log("values");
    console.log(values);

    const csvData = headers.map((header, index) => {
      const columnData = values.map(row => parseFloat(row[index])).filter(val => !isNaN(val)); // Convert to numbers
      return {
        label: header,
        data: columnData
      };
    });

    if (type === 'instance') {
      this.renderCharts(csvData, 'instance-chart-container', this.instanceCharts);
    } else {
    //  this.renderChartsTimeMatrix(csvData, 'time-matrix-chart-container', this.timeMatrixCharts);
    }
  }

  ngAfterViewInit() {
    // Placeholder until files are uploaded
    let nb: number = this.max/this.rangeValue;

    
    for (let i:number = 0; i<nb; i++ ) {
      let range:number[]=[];
      range.push(i*this.rangeValue);
      range.push((i+1)*this.rangeValue);
      this.ranges.push(range);
    }
  }


renderChartsTimeMatrix(datacharts: any[],  containerId: string, chartsArray: Chart[]) {

  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = ''; // Clear existing charts
    datacharts.forEach((chartData, index) => {
      if (chartData.data.length > 0) {
        const chartCanvas = document.createElement('canvas');
        chartCanvas.id = `${containerId}-chart-${index}`;
        chartCanvas.style.display = 'none'; // Initially hide all charts
        container.appendChild(chartCanvas);

        const chartType = 'bar'; 

        let labels: string[] = [];
        let datas: number[] = [];
        chartData.data.forEach((element: { range: string; count: number}) => {
          labels.push(element.range);
          datas.push(element.count);
        });
        const chart = new Chart(chartCanvas, {
          type: chartType,
          data: {
            labels: labels,
            datasets: [
              {
                label: chartData.label,
                data: datas,
                backgroundColor: this.getRandomColors(chartData.data.length),
                borderColor: 'rgba(60, 105, 255, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true }
            }
          }
        });

        chartsArray.push(chart);
      }
    });

    this.updateChartVisibility(chartsArray, containerId);
  }
}

  renderCharts(csvData: any[], containerId: string, chartsArray: Chart[]) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = ''; // Clear existing charts
      csvData.forEach((chartData, index) => {
        if (chartData.data.length > 0) {
          const chartCanvas = document.createElement('canvas');
          chartCanvas.id = `${containerId}-chart-${index}`;
          chartCanvas.style.display = 'none'; // Initially hide all charts
          container.appendChild(chartCanvas);

          const chartType = this.chartTypes[index % this.chartTypes.length]; // Cycle through chart types
          console.log("----------");
          console.log(chartData.label);
          console.log(chartData.data);
          const chart = new Chart(chartCanvas, {
            type: chartType,
            data: {
              labels: Array.from({ length: chartData.data.length }, (_, i) => `Row ${i + 1}`),
              datasets: [
                {
                  label: chartData.label,
                  data: chartData.data,
                  backgroundColor: this.getRandomColors(chartData.data.length),
                  borderColor: 'rgba(60, 105, 255, 1)',
                  borderWidth: 1
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: true }
              }
            }
          });

          chartsArray.push(chart);
        }
      });

      this.updateChartVisibility(chartsArray, containerId);
    }
  }

  getRandomColors(count: number): string[] {
    return Array.from({ length: count }, () =>
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
    );
  }

  updateChartVisibility(chartsArray: Chart[], containerId: string) {
    chartsArray.forEach((chart, index) => {
      const chartElement = document.getElementById(`${containerId}-chart-${index}`) as HTMLElement;
      chartElement.style.display =
        index === (containerId === 'instance-chart-container' ? this.currentInstanceChartIndex : this.currentTimeMatrixChartIndex)
          ? 'block'
          : 'none';
    });
  }

  nextInstanceChart() {
    if (this.currentInstanceChartIndex < this.instanceCharts.length - 1) {
      this.currentInstanceChartIndex++;
      this.updateChartVisibility(this.instanceCharts, 'instance-chart-container');
    }
  }

  prevInstanceChart() {
    if (this.currentInstanceChartIndex > 0) {
      this.currentInstanceChartIndex--;
      this.updateChartVisibility(this.instanceCharts, 'instance-chart-container');
    }
  }

  nextTimeMatrixChart() {
    if (this.currentTimeMatrixChartIndex < this.timeMatrixCharts.length - 1) {
      this.currentTimeMatrixChartIndex++;
      this.updateChartVisibility(this.timeMatrixCharts, 'time-matrix-chart-container');
    }
  }

  prevTimeMatrixChart() {
    if (this.currentTimeMatrixChartIndex > 0) {
      this.currentTimeMatrixChartIndex--;
      this.updateChartVisibility(this.timeMatrixCharts, 'time-matrix-chart-container');
    }
  }

  processFile() {
    this.loading = true;
    this.router.navigateByUrl('/result-ga');
    
  }
}

@NgModule({
  declarations: [HomeGaComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  bootstrap: [HomeGaComponent]
})
export class HomeGaModule {}
