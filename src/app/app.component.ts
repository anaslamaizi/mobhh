import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatButtonModule, HeaderComponent, FooterComponent, CommonModule, SidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'my-app';

  ngOnInit(): void {
  }
}
