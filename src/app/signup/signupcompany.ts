export class Signupcompany {
  id: number | undefined ;
  razonSocial: string;
  tipoDocumento: string;
  numDocumento: number;
  digitoVerificacion: number;
  email: string;
  password: string;

  constructor(razonSocial: string,
    tipoDocumento: string,
    numDocumento: number,
    digitoVerificacion: number,
    email: string,
    id:number,
    password: string){
      this.id = id; 
      this.razonSocial = razonSocial;
      this.tipoDocumento = tipoDocumento;
      this.numDocumento = numDocumento;
      this.digitoVerificacion = digitoVerificacion;
      this.email = email;
      this.password = password;
  }
}
