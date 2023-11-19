import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BancoPreguntasService } from '../banco-preguntas.service';
import { BancoPreguntas } from '../banco-preguntas';
import { Categoria } from '../categoria';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banco-preguntas-create',
  templateUrl: './banco-preguntas-create.component.html',
  styleUrls: ['./banco-preguntas-create.component.css']
})
export class BancoPreguntasCreateComponent implements OnInit {

  bancoPreguntasForm!: FormGroup;
  bancoPreguntas!: BancoPreguntas;
  valueNames = '';
  valueDescription = '';
  listaCategorias: Array<Categoria> = [];
  bancoPreguntasId: number | null = null;
  listaPreguntasVisible = false;
  private routeSub: Subscription | undefined;


  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private bancoPreguntasService: BancoPreguntasService,
    private route: ActivatedRoute,
    private router: Router) { }

    createBancoPreguntas(bancoPreguntas: BancoPreguntas):void{
      bancoPreguntas.id = this.bancoPreguntasId;
      this.bancoPreguntasService.createBancoPreguntas(bancoPreguntas).subscribe(response=>{
        this.bancoPreguntasService.bancoPreguntasCreated();
        this.toastr.success("Confirmation", "Questions Bank created");
        this.router.navigateByUrl('/banco-preguntas/create/' + response.id)
      });
    }
    cancelCreation():void{this.bancoPreguntasForm.reset();}
    getListaCategorias(): void {
      this.bancoPreguntasService.getCategorias().subscribe((listaCategorias) => {
        this.listaCategorias = listaCategorias;
        console.table(this.listaCategorias);
      });
    }

    ngOnInit():void {
      this.routeSub = this.route.params.subscribe(params => {
        this.bancoPreguntasId = Number(params['id?']);
        if (this.bancoPreguntasId !== null && !isNaN(this.bancoPreguntasId)){
          this.bancoPreguntasService.getBancoPreguntas(this.bancoPreguntasId).subscribe((bancoPreguntas) =>{
            this.bancoPreguntas = bancoPreguntas;
            this.listaPreguntasVisible = true;
            this.bancoPreguntasForm = this.formBuilder.group({
              tipoBanco: [this.bancoPreguntas?.tipoBanco ?? "", [Validators.required, Validators.minLength(2)]],
              categoria: [this.bancoPreguntas?.categoria ?? "", [Validators.required]],
            });
          })
        } else {
          this.listaPreguntasVisible = false;
        }
      });
      this.getListaCategorias();
      this.bancoPreguntasForm = this.formBuilder.group({
        tipoBanco: ["", [Validators.required, Validators.minLength(2)]],
        categoria: ["", [Validators.required]],
      });
    }
    ngOnDestroy() {
      this.routeSub?.unsubscribe();
    }

}
