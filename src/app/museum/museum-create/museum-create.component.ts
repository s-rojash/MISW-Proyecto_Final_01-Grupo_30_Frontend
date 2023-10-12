import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Museum } from '../museum';
import { MuseumService } from '../museum.service';

@Component({
  selector: 'app-museum-create',
  templateUrl: './museum-create.component.html'
})
export class MuseumCreateComponent implements OnInit {

  museumForm!: FormGroup;
  
  createMuseum(museum: Museum):void{
      this.museumService.createMuseum(museum).subscribe(author=>{
            console.info("The museum was created: ", museum)
              this.toastr.success("Confirmation", "Museum created")
              this.museumForm.reset();
      });
      }
      
  cancelCreation():void{this.museumForm.reset();}
  
  constructor(private formBuilder: FormBuilder,
   private toastr: ToastrService,
   private museumService: MuseumService
  ) { }

  ngOnInit(): void {
     this.museumForm = this.formBuilder.group({
     name: ["", [Validators.required, Validators.minLength(2)]],
     description: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
     address: ["", [Validators.required, Validators.minLength(5)]],
     city: ["", [Validators.required, Validators.minLength(2)]],
     image: ["", Validators.required]
   })
      
  }

}
