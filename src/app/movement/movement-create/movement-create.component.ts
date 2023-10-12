import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Movement } from '../movement';
import { MovementService } from '../movement.service';

@Component({
  selector: 'app-movement-create',
  templateUrl: './movement-create.component.html'
})
export class MovementCreateComponent implements OnInit {

  movementForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
   private toastr: ToastrService, private movementService: MovementService  ) { }

    createMovement(movement: Movement){
    this.movementService.createMovement(movement).subscribe(author=>{    
        console.info("The movement was created: ", movement)
        this.toastr.success("Confirmation", "Movement created")
        this.movementForm.reset();
        });
    }
    
    cancelCreation(){
    this.movementForm.reset();
    }

  ngOnInit(): void {
      this.movementForm = this.formBuilder.group({
     name: ["", [Validators.required, Validators.minLength(2)]],
     description: ["", [Validators.required, Validators.minLength(5),Validators.maxLength(500) ]],
     countryOfOrigin: ["", [Validators.required, Validators.minLength(2)]],
     activeYears: ["", [Validators.required, Validators.minLength(1)]]
    });

    }
}