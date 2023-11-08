import { Profile } from "../profile/profile";
import { Project } from "../project/project";

export class Team {
 id: number;
 proyecto: Project;
 nombre: string;
 perfil: Profile; // La propiedad 'perfil' es ahora del tipo 'Profile'
 cantidad: number = 0;

 constructor(data: any) {
    this.id = data.id;
    this.proyecto = new Project(data.proyecto.id, data.proyecto.nombre, data.proyecto.descripcion);
    this.nombre = data.nombre;
    this.perfil = new Profile(data.perfil.id, data.perfil.nombre); // El objeto 'Profile' se crea a partir de los datos recibidos
    this.cantidad = data.cantidad;
 }
}