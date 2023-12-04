import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancoPreguntas } from 'src/app/banco-preguntas/banco-preguntas';
import { Conjuntoprueba } from '../conjuntoprueba';
import { ConjuntoPruebasService } from '../conjunto-pruebas.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-conjunto-pruebas-edit',
  templateUrl: './conjunto-pruebas-edit.component.html',
  styleUrls: ['./conjunto-pruebas-edit.component.css']
})
export class ConjuntoPruebasEditComponent implements OnInit {

  listaBancopreguntas: BancoPreguntas[] = [];
  conjuntoPruebasForm! : FormGroup;
  idConjuntoPruebas:number = 0;
  translate2!: TranslateService;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private conjuntopruebasService: ConjuntoPruebasService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private router: Router) {
      this.translate2 = translate;
     }

  getConjuntoPruebasById(idConjuntoPruebas:number){
    this.conjuntopruebasService.getConjuntoPruebasById(idConjuntoPruebas).subscribe({
      next: (conjuntoPruebasp) => {
        this.conjuntoPruebasForm.patchValue({
          id: conjuntoPruebasp.id,
          nombre: conjuntoPruebasp.nombre,
          descripcion: conjuntoPruebasp.descripcion
        });
        console.log(conjuntoPruebasp.bancosPreguntas);

        this.conjuntopruebasService.getAllBancoPreguntas().subscribe(listaBancopreguntasp => {
          this.listaBancopreguntas = listaBancopreguntasp;
          console.log("listaBancopreguntas",  this.listaBancopreguntas );

          if(conjuntoPruebasp.bancosPreguntas != null){
            for(let banco of conjuntoPruebasp.bancosPreguntas){
              for(const element of this.listaBancopreguntas){
                if(element.id == banco.id){
                  element.selected = true;
                }
              }
            }
          }
        });
      },
      error: () => {
        this.translate2.get('TEST_GROUP.TESTGROUPGETERROR').subscribe((res: string) => {
          this.toastr.error(res);
        });
      }
    });
  }

  editConjuntoPruebas(conjuntopruebas: Conjuntoprueba){

    const selectedPreguntas = this.listaBancopreguntas
      .filter((pregunta) => pregunta.selected);
      //.map((pregunta) => ({ id: pregunta.id }));
      //.filter((obj): obj is { id: number } => obj.id !== null);

      const conjuntoprueba: Conjuntoprueba = {
        id: this.idConjuntoPruebas,
        nombre: this.conjuntoPruebasForm.get('nombre')!.value,
        descripcion: this.conjuntoPruebasForm.get('descripcion')!.value,
        bancosPreguntas: selectedPreguntas
      };

      console.log("el objeto a crear",conjuntoprueba);

      this.conjuntopruebasService.createConjuntoPruebas(conjuntoprueba).subscribe(response=>{
        this.translate2.get('TEST_GROUP.EDITGROUP').subscribe((res: string) => {
          this.toastr.success(res);
        });
    });
    this.router.navigate(["/conjunto-pruebas/list"]);
  }

  selectBancoPregunta(bancoPregunta: BancoPreguntas): void {
    console.log(bancoPregunta);
    bancoPregunta.selected = !bancoPregunta.selected;

     this.conjuntoPruebasForm.patchValue({
      bancopregunta: bancoPregunta
    });
  }

  ngOnInit() {
    this.conjuntoPruebasForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      descripcion: ["", [Validators.required]],
      bancopregunta: [null, [Validators.required]]
    });

    this.route.params.subscribe((params) => {
      this.idConjuntoPruebas = params['id'];
      this.getConjuntoPruebasById(this.idConjuntoPruebas);
    });
  }

}
