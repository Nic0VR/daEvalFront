import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocCompetence } from 'src/app/_models/bloc-competence';
import { TitreProfessionnel } from 'src/app/_models/titre-professionnel';
import { BlocCompetenceService } from 'src/app/_services/bloc-competence.service';
import { TitreProfessionnelService } from 'src/app/_services/titre-professionnel.service';

@Component({
  selector: 'app-bloc-modify',
  templateUrl: './bloc-modify.component.html',
  styleUrls: ['./bloc-modify.component.css']
})
export class BlocModifyComponent implements OnInit {

  titrePros?: TitreProfessionnel[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;
  currentBloc?: BlocCompetence;
  @Output()
  annulerCreationEvent = new EventEmitter();

  modifierBlocCompetenceFormulaire: FormGroup = new FormGroup({
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    titreProId: new FormControl("", Validators.required),
  })

  constructor(
    private titreProService: TitreProfessionnelService,
    private blocCompService: BlocCompetenceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });

    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.chargerTitrePro()
      this.chargerBloc(id);
    })
  }

  submit() {
    let blocToSubmit = this.currentBloc!;
    blocToSubmit.titre = this.modifierBlocCompetenceFormulaire.value['titre'];
    blocToSubmit.description = this.modifierBlocCompetenceFormulaire.value['description'];
    blocToSubmit.titreProfessionnelId = this.modifierBlocCompetenceFormulaire.value['titreProId'];

    this.blocCompService.save(blocToSubmit).subscribe({
      next: (v) => { this.router.navigateByUrl('/main/blocComp') },
      error: (e) => {
        console.log(e);
      }
    })
  }

  chargerBloc(id: number) {
    this.blocCompService.findById(id).subscribe({
      next: (v) => {
        this.currentBloc = v;
        this.modifierBlocCompetenceFormulaire.get('titre')?.setValue(this.currentBloc?.titre);
        this.modifierBlocCompetenceFormulaire.get('description')?.setValue(this.currentBloc?.description);
        this.modifierBlocCompetenceFormulaire.get('titreProId')?.setValue(this.currentBloc?.titreProfessionnelId);

      },
      error: (e) => { console.log(e); }
    })
  }


  chargerTitrePro() {
    this.titreProService.getAllPage(this.currentPage, this.itemsPerPage, this.searchExpression).subscribe({
      next: (v) => { this.titrePros = v },
      error: (e) => { console.log(e); }

    })
  }

  rechercher() {
    this.chargerTitrePro();
  }

  annulerRechercher() {
    this.searchExpression = "";
    this.chargerTitrePro();
  }
}
