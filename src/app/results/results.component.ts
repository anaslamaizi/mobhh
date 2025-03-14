import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterContentChecked, HostListener  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from "../spinner/spinner.component";
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'app-results',
    imports: [
        MatButtonModule,
        CommonModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule,
        SpinnerComponent,
        RouterModule
    ],
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, AfterContentChecked{
  @ViewChild('editor', { static: false }) editor!: ElementRef<HTMLIFrameElement>;
  algorithm: string =  this.dataService.getMethod();
  distance: any;
  time: any;
  solution: any;
  consumption: any;
  risk: any;
  result: any;
  iframeUrl: string = 'http://localhost:5000/spp.png';
  iframeLoaded: boolean = false;
  loading: boolean = true;
  divStyle = "green";
  errorMessage: string | null = null;
  retryInterval: number = 3000; // Temps de réessai en millisecondes (3 secondes)
  safeUrl: SafeResourceUrl;
  //editor: ElementRef<HTMLElement>;
  
  @HostListener('window:resize', ['$event'])
    sizeChange(event: any) {
    console.log('size changed.', event);
    //this.cdr.detach();
    this.cdr.detectChanges();
    //this.loadIframe();
    
    const iframe = document.getElementById('editor') as HTMLIFrameElement;
    const message = {
      type: 'css',
      content: `
        .main-svg .gtitle {
          stroke-width: 2;
          fill: red;
        }
        
      `,
      id: 'unique-css-message' // Ajoutez un identifiant unique
    };
    console.log('Envoi du message apres resizz :', message);
    if (iframe && iframe.contentWindow) {
      //iframe.contentWindow.postMessage('resize', 'http://localhost:5000');
      console.log(iframe.contentWindow.location);
      
    }
    

  }

  constructor(private router: Router, private http: HttpClient, public dataService: DataService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000');
  }

  loadIframe(){
    const iframe = document.getElementById('editor') as HTMLIFrameElement;
    console.log("load iframe  ");
    
            //const titleMap = document.getElementsByClassName("gtitle")[0];
            
            
            if (iframe) {
              console.log(iframe); // Accéder à l'élément DOM natif de l'iframe
              iframe.onload = () => {
                if (iframe.contentWindow) {
                  const message = {
                    type: 'css',
                    content: `
                      .main-svg .gtitle {
                        stroke-width: 2;
                        fill: red;
                      }
                      
                    `,
                    id: 'unique-css-message' // Ajoutez un identifiant unique
                  };
                  console.log('Envoi du message :', message);
                  iframe.contentWindow.postMessage(message, 'http://localhost:5000'); 
                } else {
                  console.error('iframe.contentWindow is null');
                }
              };
            }
  }

  ngAfterViewInit() {
    this.loading = true;
    this.divStyle = "white";
    this.checkIframeUrl();
    this.dataService.fetchResults().subscribe(
      (result: any) => {
        console.log(`Result in results:`, result);
        this.result = result;
        if (this.result) {
          this.loading = false;
          this.distance = this.result.distance;
          this.time = this.result.time_taken;
          this.consumption = this.result.consumption;
          this.risk = this.result.risk;
          this.solution = this.result.route;
          if (this.editor) {
            console.log("editor =>" + this.editor.nativeElement); // Accéder à l'élément DOM natif de l'iframe
          }
          console.log(`Distance in results: ${this.distance}`);
          console.log(`Time in results: ${this.time}`);
          console.log(`Consumption in results: ${this.consumption}`);
          console.log(`Risk in results: ${this.risk}`);
        }
      },
      (error: any) => {
        console.error('Error fetching results:', error);
        this.loading = false;
      }
    );
  }

  checkIframeUrl() {
    console.log("check!!!!!!!!!!!!!!!!");
    this.http.head(this.iframeUrl, { observe: 'response' })
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.iframeLoaded = true;
            this.loading = false;
            this.cdr.detectChanges(); // Forcer la détection des changements
          } else {
            this.retryCheckIframeUrl();
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.retryCheckIframeUrl();
          } else {
            this.errorMessage = 'Une erreur est survenue.';
            this.loading = false;
          }
        }
      });
  }

  retryCheckIframeUrl() {
    setTimeout(() => {
      this.checkIframeUrl();
    }, this.retryInterval);
  }

  return() {
    this.router.navigateByUrl('/home');
  }

  submit() {
    this.router.navigateByUrl('/');
  }

  applyStyle(iframeDoc : any){
    const customStyles = `
      .gtitle {
        fill: green;
      }
    `;
    // create a style tag inside the iframe
    const style = iframeDoc.createElement('style');

    // add styles to the style tag
    style.appendChild(iframeDoc.createTextNode(customStyles));

    // append the newly created style tag to the iframe's head tag
    iframeDoc.head.appendChild(style);
  }


  ngOnInit() {
    this.detectDivChanges();
    
  }

  detectDivChanges() {
    // const div = document.getElementById('editor') as HTMLIFrameElement;
    // const config = { attributes: true, childList: true, subtree: true };
    // const observer = new MutationObserver((mutation) => {
    //   console.log("div style changed");
    // })
    // observer.observe(div, config);

  }
  ngAfterContentChecked() {
    console.log('Le contenu externe du composant a été vérifié !');
    this.loadIframe();
  }

  fullscreen() {
    console.log("--------------------");
    const test= document.getElementById("editor");
    if (test!=null)
    test.requestFullscreen();
  }
}
