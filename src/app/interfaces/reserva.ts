export interface Reserva {
    codigo?: number;
    id_usuario: number;
    id_tour: number;
    nombre: string;
    correo: string;
    telefono: number;
    num_personas: number;
    total: number;
    fecha: Date;
    hora: Date;
}