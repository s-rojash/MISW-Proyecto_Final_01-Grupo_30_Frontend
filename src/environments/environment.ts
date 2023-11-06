// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const baseUrl = 'https://ms-candidatos.azurewebsites.net';
// const baseUrlCom = 'https://ms-empresas.azurewebsites.net';

// const baseUrlProyectos = 'https://ms-proyectos.azurewebsites.net';
// const baseUrlBancoPreguntas = 'https://ms-bancopreguntas.azurewebsites.net';

const baseUrlCom = 'http://localhost:3000';
const baseUrl = 'http://localhost:3001';

const baseUrlProyectos = 'http://localhost:3002';
const baseUrlEntrevistas = 'http://localhost:3003';
const baseUrlBancoPreguntas = 'http://localhost:3004';

const idMuseum = "";

export const environment = {
  production: false,
  baseUrl,
  baseUrlCom,
  baseUrlProyectos,
  baseUrlEntrevistas,
  baseUrlBancoPreguntas,
  idMuseum
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
