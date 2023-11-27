import { Component, OnInit } from '@angular/core';
import { Applicantskills } from '../applicantskills';
import { ApplicantService } from '../applicant.service';
import { Applicant } from '../applicant';
import { ToastrService } from 'ngx-toastr';
import { CandidatoHabilidades } from '../../../app/principal/candidato-habilidades';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-applicant-skills',
  templateUrl: './applicant-skills.component.html',
  styleUrls: ['./applicant-skills.component.css']
})
export class ApplicantSkillsComponent implements OnInit  {

  tehnicalskills: Array<Applicantskills> = [];
  softability: Array<Applicantskills> = [];
  spefifications: Array<Applicantskills> = [];
  isEnglish:boolean = false;
  selectedOptionstehnical: Array<Applicantskills> = [];
  selectedOptionssof: Array<Applicantskills> = [];
  selectedOptionsspefifications: Array<Applicantskills> = [];
  selectedOptionstehnicalModel: Array<Applicantskills> = [];
  selectedOptionssoftModel: Array<Applicantskills> = [];
  selectedOptionsspefificationsModel: Array<Applicantskills> = [];
  applicant!: Applicant;
  savedskills: CandidatoHabilidades[] = [];
  translate2!: TranslateService;

  constructor(private applicantService: ApplicantService,
    private toastr: ToastrService,
    private router: Router,
    public translate: TranslateService) {
      this.translate2 = translate;
    }

  getSkills ():void{
    this.applicantService.getSoftSkills().subscribe((softs)=> {
      this.softability = softs;
    });

    this.applicantService.getTechnicalSkills().subscribe((technical)=> {
      this.tehnicalskills = technical;
    });

    this.applicantService.getProfessionalSkills().subscribe((professional)=> {
      this.spefifications = professional;
    });
  }

  onNgModelChange($event: any){
    console.log($event);
    this.selectedOptionstehnical = $event;
  }

  onNgModelChange2($event: any){
    console.log($event);
    this.selectedOptionssof = $event;
  }

  onNgModelChange3($event: any){
    console.log($event);
    this.selectedOptionsspefifications = $event;
  }

  getApplicant(){
    this.applicantService.getApplicant().subscribe({
      next: (applicantp) => {
        this.applicant = applicantp;
      },
      error: () => {
        this.translate2.get('HEADER.PROFILEGETERROR').subscribe((res: string) => {
          this.toastr.error(res);
        });
      }
    });
  }

  saveSkills(){

    for(const skill of this.selectedOptionstehnical){
      const candidatoHabilidades: CandidatoHabilidades = {id: 0, candidato: this.applicant, habilidad: skill };

      this.applicantService.createcandidatohabilidades(candidatoHabilidades).subscribe({
        next: (candidatoHabilidadesp) => {
          console.info("The candidatoHabilidad was created: ", candidatoHabilidadesp);
        },
        error: () => {
          this.translate2.get('APPLICANT_SKILLS.ERRORSAVESKILLS').subscribe((res: string) => {
            this.toastr.error(res);
          });
        }
      });
    }

    for(const skill of this.selectedOptionssof){
      const candidatoHabilidades: CandidatoHabilidades = {id: 0, candidato: this.applicant, habilidad: skill };

      this.applicantService.createcandidatohabilidades(candidatoHabilidades).subscribe({
        next: (candidatoHabilidadesp) => {
          console.info("The candidatoHabilidad was created: ", candidatoHabilidadesp);
        },
        error: () => {
          this.translate2.get('APPLICANT_SKILLS.ERRORSAVESKILLS').subscribe((res: string) => {
            this.toastr.error(res);
          });
        }
      });
    }

    for(const skill of this.selectedOptionsspefifications){
      const candidatoHabilidades: CandidatoHabilidades = {id: 0, candidato: this.applicant, habilidad: skill };

      this.applicantService.createcandidatohabilidades(candidatoHabilidades).subscribe({
        next: (candidatoHabilidadesp) => {
          console.info("The candidatoHabilidad was created: ", candidatoHabilidadesp);
        },
        error: () => {
          this.translate2.get('APPLICANT_SKILLS.ERRORSAVESKILLS').subscribe((res: string) => {
            this.toastr.error(res);
          });
        }
      });
    }
    this.translate2.get('APPLICANT_SKILLS.SUCCESSSAVESKILLS').subscribe((res: string) => {
      this.toastr.success(res);
    });
  }

  getSaveSkills(){
    this.applicantService.getcandidatohabilidadesByCandidato().subscribe((savedskillsp)=> {
      this.savedskills = savedskillsp;
    });
  }

  isCheck(id:number):boolean{

    for(const saved of this.savedskills){
      if(saved.habilidad.id === id){
        return true;
      }
    }
    return false;
  }

  isButtonDisabled():boolean{
    if(this.selectedOptionstehnical.length > 0 || this.selectedOptionssof.length > 0
      || this.selectedOptionsspefifications.length > 0){
        return false;
    }
    else{
      return true;
    }
  }

  ngOnInit() {
    this.getSkills();
    this.getApplicant();
    this.getSaveSkills();

    if(localStorage.getItem("lang") === null || localStorage.getItem("lang")?.toString() === 'en'){
      this.isEnglish = true;
    }
    else{
      this.isEnglish = false;
    }
  }
}
