import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BancoPreguntasService } from '../banco-preguntas.service';
import { Pregunta } from '../pregunta';

@Component({
  selector: 'app-modal-preguntas-save',
  templateUrl: './modal-preguntas-save.component.html',
  styleUrls: ['./modal-preguntas-save.component.css']
})
export class ModalPreguntasSaveComponent implements OnInit {

  preguntaForm!: FormGroup;
  valueNames = '';
  valueDescription = '';

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalPreguntasSaveComponent>,
    private toastr: ToastrService,
    private bancoPreguntasService: BancoPreguntasService,
    private route: ActivatedRoute,
    private router: Router){}

    onNoClick(): void {
      this.dialogRef.close();
    }
    createPregunta(pregunta: Pregunta):void{
      this.bancoPreguntasService.createPregunta(pregunta).subscribe(response=>{
        this.bancoPreguntasService.bancoPreguntasCreated();
        this.toastr.success("Confirmation", "Question created");
        this.router.navigateByUrl('/banco-preguntas/create/' + response.id)
      });
    }

    ngOnInit():void {
      this.preguntaForm = this.formBuilder.group({
        pregunta: ["", [Validators.required, Validators.minLength(2)]],
      });
    }
}
