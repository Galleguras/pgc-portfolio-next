export type Locale = 'es' | 'en';
export type Version = 'editorial' | 'clasico';
export type Job = {
  slug: string;
  locale: string;
  empresa: string;
  puesto: string;
  clientes: string;
  eht: string;
  funcion: string;
  fechaInicio: string;
  fechaFin?: string | null;
  imagen: { url: string; filename: string };
};
export type Course = {
  locale: string;
  descripcion: string;
  fechaRealizacion: string;
  horas: number;
  imagen: { url: string; filename: string };
};
