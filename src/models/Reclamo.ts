import { TipoReclamo } from "./TipoReclamo";
import { User } from "./User";
import { Ubicacion } from "./Ubicacion";

export class Reclamo {
    id: number;
    imagen: string;
    titulo: string;
    descripcion: string;
    fecha: Date;
    ubicacion_id: number;
    tipo_reclamo_id: number;
    user_id: number;
    
    ubicacion: Ubicacion;
    tipo_reclamo: TipoReclamo;
    user: User;

    constructor() { 
        this.ubicacion = new Ubicacion();
        this.tipo_reclamo = new TipoReclamo();
        this.user = new User();
    }
}

  