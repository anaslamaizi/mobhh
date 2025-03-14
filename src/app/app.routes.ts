import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './preview/preview.component';
import { ResultsComponent } from './results/results.component';
import { HomePsoComponent } from './home-pso/home-pso.component';;
import { ResultPsoComponent } from './result-pso/result-pso.component';
import { HomeChoiceComponent } from './home-choice/home-choice.component';
import { SolutionPsoComponent } from './solution-pso/solution-pso.component';
import { HomeGaComponent } from './home-ga/home-ga.component';
import { ResultGaComponent } from './result-ga/result-ga.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { SignupComponent } from './signup/signup.component';
import { MapFullscreenComponent } from './map-fullscreen/map-fullscreen.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full'   
    },
    { 
        path: 'signup', 
        component: SignupComponent 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: '', 
        component: LayoutComponent,
        children: [
            { 
                path: 'home-choice',
                component:HomeChoiceComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'preview',
                component:PreviewComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'home',
                component:HomeComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'results',
                component:ResultsComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'map_fullscreen',
                component:MapFullscreenComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'home-pso',
                component:HomePsoComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'result-pso',
                component:ResultPsoComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'solution-pso',
                component:SolutionPsoComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'user-profile-page',
                component:UserProfilePageComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'user-profile-form',
                component:UserProfileFormComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'home-ga',
                component:HomeGaComponent,
                canActivate: [authGuard] 
            },
            { 
                path: 'result-ga',
                component:ResultGaComponent,
                canActivate: [authGuard] 
            },
        ]
    }
    
];
