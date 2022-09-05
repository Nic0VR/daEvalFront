import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocCompetencesComponent } from './components/bloc-competences/bloc-competences.component';
import { BlocDetailsComponent } from './components/bloc-competences/bloc-details/bloc-details.component';
import { BlocModifyComponent } from './components/bloc-competences/bloc-modify/bloc-modify.component';
import { EpreuveListeComponent } from './components/epreuve-liste/epreuve-liste.component';
import { EpreuveComponent } from './components/epreuve/epreuve.component';
import { EtudiantDetailsComponent } from './components/etudiant/etudiant-details/etudiant-details.component';
import { EtudiantModifyComponent } from './components/etudiant/etudiant-modify/etudiant-modify.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { FormationComponent } from './components/formation/formation.component';
import { DetailsComponent } from './components/intervention/details/details.component';
import { InterventionComponent } from './components/intervention/intervention.component';
import { LoginComponent } from './components/login/login.component';
import { NiveauComponent } from './components/niveau/niveau.component';
import { PositionnementComponent } from './components/positionnement/positionnement.component';
import { PromotionDetailsComponent } from './components/promotions/promotion-details/promotion-details.component';
import { PromotionModifyComponent } from './components/promotions/promotion-modify/promotion-modify.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TitreProDetailsComponent } from './components/titre-professionnel/details/details.component';
import { TitreProModifyComponent } from './components/titre-professionnel/titre-pro-modify/titre-pro-modify.component';

import { TitreProfessionnelComponent } from './components/titre-professionnel/titre-professionnel.component';
import { UserDetailsComponent } from './components/user/details/details.component';
import { UserModifyComponent } from './components/user/modify/modify.component';
import { UserComponent } from './components/user/user.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { AdminGuard } from './_helpers/admin.guard';
import { AuthGuard } from './_helpers/auth.guard';
import { FormateurGuard } from './_helpers/formateur.guard';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  

  {
    path: 'main', component: SidebarComponent, children:
      [
        { path: 'users', component: UserComponent,  canActivate:[FormateurGuard] },
        { path: 'users/modify/:id', component: UserModifyComponent, canActivate:[AdminGuard]},
        { path: 'users/details/:id',component:UserDetailsComponent},
        { path: 'etudiant', component:EtudiantComponent},
        { path: 'etudiant/modify/:id', component:EtudiantModifyComponent},
        { path: 'etudiant/details/:id', component:EtudiantDetailsComponent},
        { path: 'titrePro', component: TitreProfessionnelComponent, },
        { path: 'titrePro/details/:id', component: TitreProDetailsComponent},
        { path: 'titrePro/modify/:id',component: TitreProModifyComponent ,},
        { path: 'promotions',component: PromotionsComponent},
        { path: 'promotions/details/:id',component: PromotionDetailsComponent},
        { path: 'promotions/modify/:id', component:PromotionModifyComponent},
        { path: 'blocComp',component:BlocCompetencesComponent},
        { path: 'blocComp/details/:id',component:BlocDetailsComponent},
        { path: 'blocComp/modify/:id',component:BlocModifyComponent},
        { path: 'epreuve', component:EpreuveListeComponent},
        { path: 'epreuve/details/:id',component:EpreuveComponent},
        { path: 'formations',component:FormationComponent},
        { path: 'interventions',component:InterventionComponent},
        { path: 'interventions/details/:id',component:DetailsComponent},
        { path: 'positionnements',component:PositionnementComponent},
        { path: 'niveaux',component:NiveauComponent},
        { path:'forbidden', component:ForbiddenComponent},
      ]
      , canActivate: [AuthGuard] 
  },
  { path:'forbidden', component:ForbiddenComponent},
  { path: '**', component: LoginComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
