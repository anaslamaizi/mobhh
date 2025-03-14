# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.
Ce projet Angular est conçu pour fournir une interface utilisateur permettant de visualiser des données de réseau, de choisir des algorithmes de traitement, de définir des points de départ et d'arrivée, et de visualiser les résultats sous forme de graphes.


# Installation

1) Download nodeJs (latest version) from "Portail d'entreprise" application 
2) To check the version, open a cmd and run `npm -v` & `node -v`
3) Install angular by running the following: `npm install -g @angular/cli`
4) Update system environment variable PATH  and add the following url (replace "nom_utilisateur" by your username):
    `C:\Users\nom_utilisateur\AppData\Roaming\npm` 
    `C:\Users\nom_utilisateur\AppData\Roaming\npm\node_modules\@angular\cli\bin`
5) In a new terminal, run `ng version`

6) Downloag repository: git clone `https://gitlab.engine.capgemini.com/software-engineering/france/internal/ri-mobheel/ri-mobheel.git`
7) Checkout on dev branch `git checkout -b dev`
8) Pull the latest version of dev branch `git pull origin dev`
9) Navigate inside my-app folder `cd ri-mobheel/Demonstrateur/IHM/my-app`
10) Run `ng serve` to start the server and the app.
11) Open http://localhost:4200 in your browser to see the app.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## ## ## ## ## ## ## ##
## Structure du Code ##
## ## ## ## ## ## ## ##

## Composants Principaux ##

## HomeComponent
`Chemin` : src/app/home/home.component.ts
`Description` : Composant principal de l'application qui regroupe différentes sections pour l'import de fichiers, la sélection d'algorithmes, et la configuration des paramètres de calcul.
`Fonctionnalités` :
Gestion des formulaires pour l'import de fichiers et la sélection d'algorithmes.
Envoi des données saisies à un service pour traitement.
Affichage d'un spinner pendant le chargement des données.*

## PreviewComponent
`Chemin` : src/app/preview/preview.component.ts
`Description` : Composant pour l'affichage des données sous forme de graphes en utilisant D3.js.
`Fonctionnalités` :
Visualisation des noeuds et arcs du réseau.
Sélection des points de départ et d'arrivée.

## ResultsComponent
`Chemin` : src/app/results/results.component.ts
`Description` : Composant pour l'affichage des résultats après le traitement des données.
`Fonctionnalités` :
Affichage des résultats de l'algorithme sélectionné.
Gestion de l'état de chargement et des erreurs.


## Services ##

## DataService
`Chemin` : src/app/services/data.service.ts
`Description` : Service pour gérer les appels HTTP et le traitement des données.
`Fonctionnalités` :
Méthodes pour définir et obtenir les paramètres d'optimisation (fichier, méthode, points de départ et d'arrivée).
Méthode upload() pour uploader les données au serveur et sauvegarder les résultats dans le service.
Méthode fetchResults() pour récupérer les résultats sauvegardés.


## Utilisation ##

Accéder à l'application:
Ouvrir un navigateur et aller à `http://localhost:4200`
# Uploader un fichier de réseau (fichier .xlsx):
Utiliser la section `Network File` pour uploader un fichier Excel contenant les données de votre réseau.
# Sélectionner les paramètres d'optimisation:
Choisir l'algorithme, les points de départ et d'arrivée, et les autres paramètres nécessaires.
# Soumettre le formulaire:
Cliquer sur "Next" pour soumettre les données et lancer l'optimisation.
# Voir les résultats:
Une fois l'optimisation terminée, naviguer vers la page des résultats pour voir les détails de l'optimisation.# mobhh
