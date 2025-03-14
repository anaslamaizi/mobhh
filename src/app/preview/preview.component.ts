import { Component, AfterViewInit, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: number;
  x?: number;
  y?: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: number | Node;
  target: number | Node;
}

@Component({
  selector: 'app-preview',
  standalone: true,
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements AfterViewInit, OnChanges {

  private points: Node[] = [];
  private links: Link[] = [];
  private departNodeId: number | null = null;
  private arriveeNodeId: number | null = null;
  messageInfo: string = "You need to import an Excel file to obtain the representation and choose the starting and ending points."

  @Input() nodeData: any[] = [];
  @Input() arcData: any[] = [];
  @Output() statusDepatArrivee = new EventEmitter<boolean>();
  @Output() startPointChange = new EventEmitter<number>();
  @Output() endPointChange = new EventEmitter<number>();

  constructor(private router: Router, private el: ElementRef) {}

  return() {
    this.router.navigateByUrl('/');
  }

  submit() {
    this.router.navigateByUrl('/results');
  }

  ngAfterViewInit(): void {
    this.createGraph();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nodeData']) {
      console.log('Node data changed:', changes['nodeData'].currentValue);
    }
    if (changes['arcData']) {
      console.log('Arc data changed:', changes['arcData'].currentValue);
    }
    if (this.arcData.length > 0 && this.nodeData.length > 0) {
      this.messageInfo = "Please enter the start and end points.";
      this.createGraph();
    }    
  }

  createGraph(): void {
    this.points = this.nodeData;
    this.links = this.arcData;

    if (!Array.isArray(this.points) || !Array.isArray(this.links)) {
      console.error('Parsed data is not in expected format.');
      return;
    }

    const container = this.el.nativeElement.querySelector('#trajectoryGraph');
    const width =  800;
    const height =  800;

    d3.select(container).selectAll('*').remove();

    const svg = d3.select(container)
      .append('svg')
     // .attr('width', width)
     // .attr('height', height)
     .attr("viewBox", `0 0 800 800`)
     // .style('border', '1px solid black');

    const gridSize = Math.ceil(Math.sqrt(this.points.length));
    const nodeSize = Math.min(width, height) / gridSize;

    this.points.forEach((point, index) => {
      point.x = (index % gridSize) * nodeSize + nodeSize / 2;
      point.y = Math.floor(index / gridSize) * nodeSize + nodeSize / 2;
    });

    const link = svg.selectAll('.link')
      .data(this.links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#aaa');

    const node = svg.selectAll('.node')
      .data(this.points)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    node.append('circle')
      .attr('r', 5)
      .attr('fill', 'blue');

    node.append('text')
      .text(d => d.id)
      .attr('x', 6)
      .attr('y', 3);

    const that = this;

    link
      .attr('x1', d => getCoordinate(d.source, 'x'))
      .attr('y1', d => getCoordinate(d.source, 'y'))
      .attr('x2', d => getCoordinate(d.target, 'x'))
      .attr('y2', d => getCoordinate(d.target, 'y'));

    function getCoordinate(sourceOrTarget: number | Node, coord: 'x' | 'y'): number {
      if (typeof sourceOrTarget === 'number') {
        const node = that.points.find(p => p.id === sourceOrTarget);
        return node ? node[coord] ?? 0 : 0;
      } else {
        return sourceOrTarget[coord] ?? 0;
      }
    }
  }

  onInputChange(inputId: string): void {
    const departInputElement = this.el.nativeElement.querySelector('#depart');
    const arriveeInputElement = this.el.nativeElement.querySelector('#arrivee');
    const errorMessageElement = this.el.nativeElement.querySelector('#errorMessage');

    const departInputValue = departInputElement.value;
    const arriveeInputValue = arriveeInputElement.value;

    console.log(departInputValue);
    console.log(arriveeInputValue);

    const departNodeId = parseInt(departInputValue, 10);
    const arriveeNodeId = parseInt(arriveeInputValue, 10);

    let errorMessages = [];

    const departInvalid = isNaN(departNodeId);
    const arriveeInvalid = isNaN(arriveeNodeId);

    if (departInvalid && arriveeInvalid) {
      errorMessages.push('The departure and arrival node numbers are invalid.');
    } else {
      if (departInvalid) {
        errorMessages.push('The departure node number is invalid.');
      }
    
      if (arriveeInvalid) {
        errorMessages.push('The arrival node number is invalid.');
      }
    }
    

    if (errorMessages.length > 0) {
      this.statusDepatArrivee.emit(false);
      errorMessageElement.textContent = errorMessages.join(' ');
      return;
    }

    const departNode = this.points.find(p => p.id === departNodeId);
    const arriveeNode = this.points.find(p => p.id === arriveeNodeId);

    if (!departNode && !arriveeNode) {
      errorMessages.push(`The departure and arrival nodes with IDs ${departNodeId} and ${arriveeNodeId} do not exist. Please choose from the following nodes: ${this.points.map(p => p.id).join(', ')}.`);
    } else {
      if (!departNode) {
        errorMessages.push(`The departure node with ID ${departNodeId} does not exist. Please choose from the following nodes: ${this.points.map(p => p.id).join(', ')}.`);
      }
    
      if (!arriveeNode) {
        errorMessages.push(`The arrival node with ID ${arriveeNodeId} does not exist. Please choose from the following nodes: ${this.points.map(p => p.id).join(', ')}.`);
      }
    }
    

    if (errorMessages.length > 0) {
      this.statusDepatArrivee.emit(false);
      errorMessageElement.textContent = errorMessages.join(' ');
      return;
    }

    errorMessageElement.textContent = '';

    this.departNodeId = departNodeId;
    this.arriveeNodeId = arriveeNodeId;
    this.startPointChange.emit(this.departNodeId);
    this.endPointChange.emit(this.arriveeNodeId);

    this.statusDepatArrivee.emit(true);

    this.updateNodeColors();
  }

  updateNodeColors(): void {
    const svg = d3.select(this.el.nativeElement.querySelector('#trajectoryGraph svg'));

    svg.selectAll<SVGGElement, Node>('.node')
      .select('circle')
      .style('fill', d => {
        if (d.id === this.departNodeId) {
          return 'red';
        } else if (d.id === this.arriveeNodeId) {
          return 'GreenYellow';
        } else {
          return 'blue';
        }
      })
      .attr('r', d => {
        if (d.id === this.departNodeId) {
          return 8;  // increased size for departure node
        } else if (d.id === this.arriveeNodeId) {
          return 8;  // increased size for arrival node
        } else {
          return 5;   // default size for other nodes
        }
      });
  }
}
