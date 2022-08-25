import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserComponent } from './components/user/user.component';
import { UserDetailsComponent } from './components/user/details/details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TitreProfessionnelComponent } from './components/titre-professionnel/titre-professionnel.component';
import { CreateComponent } from './components/titre-professionnel/create/create.component';
import { TitreProDetailsComponent } from './components/titre-professionnel/details/details.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainComponent } from './pages/main/main.component'; 
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { TitreProModifyComponent } from './components/titre-professionnel/titre-pro-modify/titre-pro-modify.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { UserModifyComponent } from './components/user/modify/modify.component';
import { UserCreateComponent } from './components/user/create/create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { EtudiantCreateComponent } from './components/etudiant/etudiant-create/etudiant-create.component';
import { EtudiantModifyComponent } from './components/etudiant/etudiant-modify/etudiant-modify.component';
import { EtudiantDetailsComponent } from './components/etudiant/etudiant-details/etudiant-details.component';
import { MatDialogModule} from '@angular/material/dialog';
import { SupprimerElementDialogComponent } from './components/dialogs/supprimer-element-dialog/supprimer-element-dialog.component';
import { BlocCompetencesComponent } from './components/bloc-competences/bloc-competences.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { PromotionCreateComponent } from './components/promotions/promotion-create/promotion-create.component';
import { VillePipe } from './_pipes/ville.pipe';
import { TitreProPipe } from './_pipes/titre-pro.pipe';
import { PromotionDetailsComponent } from './components/promotions/promotion-details/promotion-details.component';
import { PromotionService } from './_services/promotion.service';
import { VilleService } from './_services/ville.service';
import { TitreProfessionnelService } from './_services/titre-professionnel.service';
import { PromotionModifyComponent } from './components/promotions/promotion-modify/promotion-modify.component';
import { BoutonRetourComponent } from './components/bouton-retour/bouton-retour.component';
import { Ville } from './_models/ville';
import { TitreProfessionnel } from './_models/titre-professionnel';
import { BlocDetailsComponent } from './components/bloc-competences/bloc-details/bloc-details.component';
import { BlocModifyComponent } from './components/bloc-competences/bloc-modify/bloc-modify.component';

import { FormatTitreProPipe } from './_pipes/format-titre-pro.pipe';
import { ModifierCompetenceDialogComponent } from './components/dialogs/modifier-competence-dialog/modifier-competence-dialog.component';
import { FormationComponent } from './components/formation/formation.component';
import { FormationDetailsComponent } from './components/formation/formation-details/formation-details.component';
import { EpreuveComponent } from './components/epreuve/epreuve.component';
import { AjouterEvalDialogComponent } from './components/dialogs/ajouter-eval-dialog/ajouter-eval-dialog.component';
import { ModifEpreuveDialogComponent } from './components/dialogs/modif-epreuve-dialog/modif-epreuve-dialog.component';
import { ModifEvalDialogComponent } from './components/dialogs/modif-eval-dialog/modif-eval-dialog.component';
import { ModifOuAjoutTitreProDialogComponent } from './components/dialogs/modif-ou-ajout-titre-pro-dialog/modif-ou-ajout-titre-pro-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UserDetailsComponent,
    TitreProfessionnelComponent,
    CreateComponent,
    TitreProDetailsComponent,
    SidebarComponent,
    NavigationComponent,
    MainComponent,
    TitreProModifyComponent,
    ForbiddenComponent,
    UserModifyComponent,
    UserCreateComponent,
    EtudiantComponent,
    EtudiantCreateComponent,
    EtudiantModifyComponent,
    EtudiantDetailsComponent,
    SupprimerElementDialogComponent,
    BlocCompetencesComponent,
    PromotionsComponent,
    PromotionCreateComponent,
    VillePipe,
    TitreProPipe,
    PromotionDetailsComponent,
    PromotionModifyComponent,
    BoutonRetourComponent,
    BlocDetailsComponent,
    BlocModifyComponent,
    FormatTitreProPipe,
    ModifierCompetenceDialogComponent,
    FormationComponent,
    FormationDetailsComponent,
    EpreuveComponent,
    AjouterEvalDialogComponent,
    ModifEpreuveDialogComponent,
    ModifEvalDialogComponent,

    ModifOuAjoutTitreProDialogComponent,
 


 


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDialogModule,

  ],
  // on fournit l'intercepteur Jwt pour qu'il ajoute le token a nos requetes
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(
    villeService:VilleService,
    titreProService:TitreProfessionnelService
  ){
  }

  
 }
