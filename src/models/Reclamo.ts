import { TipoReclamo } from "./TipoReclamo";

export class Reclamo {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: Date;
    tipo_reclamo_id: number;
    
    tipo_reclamo: TipoReclamo;

    constructor() { 
        this.tipo_reclamo = new TipoReclamo();
    }
}

  