import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-guide',
    imports: [CommonModule],
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.scss']
})
export class GuideComponent {
  showGuide = false;
  solution: string | null = null;

  questions = [
    {
      text: 'Quelle est la nature de votre problème de planification ?',
      options: [
        'Transport de passagers avec contraintes de temps et de capacité (DARP)',
        'Trouver le chemin le plus court dans un réseau (SPP)',
        'Trouver le chemin le plus court avec des contraintes de temps spécifiques (TRSP)',
      ],
    },
    {
      text: 'Le problème implique-t-il des restrictions temporelles strictes ?',
      options: [
        'Oui, les horaires sont critiques (TRSP)',
        'Non, les temps ne sont pas une contrainte majeure (SPP)',
        'Partiellement, des fenêtres de temps doivent être respectées (DARP)',
      ],
    },
    {
      text: 'Est-ce que la capacité des véhicules ou des ressources est une contrainte ?',
      options: [
        'Oui, les véhicules ont une capacité limitée (DARP)',
        'Non, il n’y a pas de contraintes de capacité (SPP, TRSP)',
      ],
    },
    {
      text: 'Cherchez-vous une solution qui doit être adaptée dynamiquement en temps réel ?',
      options: [
        'Oui, les conditions peuvent changer (DARP, TRSP)',
        'Non, les conditions sont fixes (SPP)',
      ],
    },
  ];

  answers: string[] = new Array(this.questions.length).fill(null);

  onSelectAnswer(questionIndex: number, answer: string) {
    this.answers[questionIndex] = answer;
  }

  submitAnswers() {
    // Logique de décision pour choisir une solution en fonction des réponses
    if (
      this.answers.includes('Transport de passagers avec contraintes de temps et de capacité (DARP)') ||
      this.answers.includes('Partiellement, des fenêtres de temps doivent être respectées (DARP)') ||
      this.answers.includes('Oui, les véhicules ont une capacité limitée (DARP)')
    ) {
      this.solution = 'GA for DARP';
    } else if (
      this.answers.includes('Trouver le chemin le plus court dans un réseau (SPP)') ||
      this.answers.includes('Non, les temps ne sont pas une contrainte majeure (SPP)') ||
      this.answers.includes('Non, les conditions sont fixes (SPP)')
    ) {
      this.solution = 'LLP A-STAR for SPP';
    } else if (
      this.answers.includes('Trouver le chemin le plus court avec des contraintes de temps spécifiques (TRSP)') ||
      this.answers.includes('Oui, les horaires sont critiques (TRSP)') ||
      this.answers.includes('Oui, les conditions peuvent changer (DARP, TRSP)')
    ) {
      this.solution = 'PSO for TRSP';
    }
  }
}
