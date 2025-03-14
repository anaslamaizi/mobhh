import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { GuideComponent } from '../guide/guide.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-choice',
    imports: [GuideComponent, CommonModule],
    templateUrl: './home-choice.component.html',
    styleUrls: ['./home-choice.component.scss']
})
export class HomeChoiceComponent {
  showGuidePopup = false;

  constructor(private router: Router) {}

  navigateTo(choice: string) {
    this.router.navigate([choice]);
  }

  openGuide() {
    this.showGuidePopup = true;
  }

  closeGuide() {
    this.showGuidePopup = false;
  }
}
