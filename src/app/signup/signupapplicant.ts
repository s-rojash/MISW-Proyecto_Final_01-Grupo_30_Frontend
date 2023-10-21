export class Signupapplicant {
  id: number;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numDocumento: number;
  celular: string;
  email: string;
  password: string;

  constructor(id: number, nombres: string, apellidos: string, tipoDocumento: string, numDocumento: number, celular: string,
    email: string, password: string) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.tipoDocumento = tipoDocumento;
    this.numDocumento = numDocumento;
    this.celular= celular;
    this.email = email;
    this.password= password;
  }
}
