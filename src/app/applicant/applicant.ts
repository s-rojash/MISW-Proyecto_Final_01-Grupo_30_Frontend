export class Applicant {
  id: number;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numDocumento: number;
  celular: string;
  email: string;
  password: string;
  token: string;
  expireAt: Date;
  createdAt: Date;

  constructor(id: number, nombres: string, apellidos: string, tipoDocumento: string, numDocumento: number, celular: string,
    email: string, password: string, token: string, expireAt: Date, createdAt: Date) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.tipoDocumento = tipoDocumento;
    this.numDocumento = numDocumento;
    this.celular= celular;
    this.email = email;
    this.password= password;
    this.token = token;
    this.expireAt = expireAt;
    this.createdAt = createdAt;
  }
}
