export interface Reserva {
    codigo?: number;
    id_usuario: number;
    id_tour: number;
    tour: string;
    nombre: string;
    correo: string;
    telefono: string;
    num_personas: number;
    total: number;
    fecha: Date;
    hora: Date;
}