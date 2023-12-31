export class Login {
  id: number;
  email: string;
  password: string;
  token: string | undefined;
  constructor(id: number, email: string, password: string, token: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.token = token;
  }
}
