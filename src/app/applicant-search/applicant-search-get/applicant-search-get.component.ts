import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/signup/signup.service';
import { Signupapplicant } from 'src/app/signup/signupapplicant';

@Component({
  selector: 'app-applicant-search-get',
  templateUrl: './applicant-search-get.component.html',
  styleUrls: ['./applicant-search-get.component.css']
})
export class ApplicantSearchGetComponent implements OnInit {

  applicants: Signupapplicant[] = [];
  selectedApplicants: Signupapplicant[] = [];
  tehnicalskills = ['SQL', 'Programming', 'API', 'Python', '.NET'];
  softability = ['leadership', 'easy going', 'hard work'];
  spefifications = ['scholarship', 'master degree', 'english'];
  showApplicantInfo: boolean = false;

  constructor(private applicantService: SignupService) {}

  ngOnInit(): void {

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
    this.applicantService.getApplicant().subscribe(applicants => {
      this.applicants = applicants;
      console.log('Perfiles obtenidos:', this.applicants);
    });
    this.showApplicantInfo = true;
  }
}
