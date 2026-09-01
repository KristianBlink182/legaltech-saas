export interface Case {
  id: string;
  user_id?: string;
  expediente_numero: string;
  distrito_judicial: string;
  juzgado?: string;
  materia?: string;
  demandante?: string;
  demandado?: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'PAUSED';
  created_at?: string;
}

export interface Resolution {
  id: string;
  case_id: string;
  nro_resolucion?: string;
  fecha_resolucion?: string;
  acto?: string;
  sumilla?: string;
  documento_url?: string;
  resumen_ia?: string;
}

export interface Deadline {
  id: string;
  case_id: string;
  titulo: string;
  dias_plazo: number;
  tipo_dias: 'HABILES' | 'CALENDARIO';
  fecha_inicio: string;
  fecha_vencimiento: string;
  estado: 'PENDING' | 'COMPLETED' | 'EXPIRED';
}