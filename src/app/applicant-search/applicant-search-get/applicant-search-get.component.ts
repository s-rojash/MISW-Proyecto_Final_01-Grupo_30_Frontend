import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/signup/signup.service';
import { Signupapplicant } from 'src/app/signup/signupapplicant';
import { ApplicantSearchService } from 'src/app/applicant-search/applicant-search.service';
import { Habilidades } from '../habilidades';
import { FormBuilder, FormControl } from '@angular/forms';
import { Habilidadescandidato } from '../habilidadesCandidato';
import { TranslateService } from '@ngx-translate/core';

interface UniqueApplicant {
  nombres: string;
  apellidos: string;
}

@Component({
  selector: 'app-applicant-search-get',
  templateUrl: './applicant-search-get.component.html',
  styleUrls: ['./applicant-search-get.component.css']
})
export class ApplicantSearchGetComponent implements OnInit {

  uniqueApplicants: UniqueApplicant[] = [];
  selectedApplicants: Signupapplicant[] = [];
  habilidadescandidato: Habilidadescandidato[] = [];
  softability: Habilidades[] = [];
  softSkills: FormControl = new FormControl();
  tehnicalskills: Habilidades[] = [];
  techSkills: FormControl = new FormControl();
  spefifications: Habilidades[] = [];
  profiles: FormControl = new FormControl();
  showApplicantInfo: boolean = false;
  applicants: UniqueApplicant[] = [];

  constructor(
    private applicantSearchService: ApplicantSearchService ,public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.applicantSearchService.getHabilidadesBlandas().subscribe(softability => {
      this.softability = softability;
    });
  
    this.applicantSearchService.getHabilidadesTecnicas().subscribe(tehnicalskills => {
      this.tehnicalskills = tehnicalskills;
    });
  
    this.applicantSearchService.getHabilidadesProfesionales().subscribe(spefifications => {
      this.spefifications = spefifications;
    });
  }


  getSkillTranslation(skill: any): string {
       return localStorage.getItem("lang") === 'es' ? skill.habilidad : skill.habilidad_en;
  }

  toggleSelection(applicant: Signupapplicant) {
    if (this.isSelected(applicant)) {
      this.selectedApplicants = this.selectedApplicants.filter((a) => a !== applicant);
    } else {
      this.selectedApplicants.push(applicant);
    }
  }

  isSelected(applicant: Signupapplicant): boolean {
    return this.selectedApplicants.includes(applicant);
  }

  showApplicantDetails() {
    const techSkillIds = this.techSkills.value ? this.techSkills.value.join(',') : '';
    const softSkillIds = this.softSkills.value ? this.softSkills.value.join(',') : '';
    const profileIds = this.profiles.value ? this.profiles.value.join(',') : '';
    const filtros = [techSkillIds, softSkillIds, profileIds].filter(Boolean).join(',');
  
    this.applicantSearchService.getCandidatoHabilidades(filtros).subscribe(habilidadescandidato => {
      this.habilidadescandidato = habilidadescandidato;
      this.uniqueApplicants = this.extractUniqueApplicantsInfo(habilidadescandidato);
      this.applicants = this.uniqueApplicants; 
      console.log('GetCandidadto:', this.uniqueApplicants);
    });
    this.showApplicantInfo = true;
  }

  extractUniqueApplicantsInfo(habilidadescandidato: Habilidadescandidato[]): UniqueApplicant[] {
    const uniqueApplicantIds = new Set<number>();
    const uniqueApplicants: UniqueApplicant[] = [];
  
    habilidadescandidato.forEach(entry => {
      if (!uniqueApplicantIds.has(entry.candidato.id)) {
        uniqueApplicantIds.add(entry.candidato.id);
        const applicantInfo: UniqueApplicant = {
          nombres: entry.candidato.nombres,
          apellidos: entry.candidato.apellidos
        };

      

        uniqueApplicants.push(applicantInfo);
      }
    });
    console.log('uniqueApplicants:', uniqueApplicants);
    return uniqueApplicants;
  }
}
