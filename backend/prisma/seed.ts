import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  /** =========================
   *  Datos base fijos
   *  ========================= */
  const tipo_tareas = [
    { tipo_nombre: 'Académico' },
    { tipo_nombre: 'Personal' },
    { tipo_nombre: 'Recordatorio' },
  ];

  const estado_tareas = [
    { estado_nombre: 'Pendiente' },
    { estado_nombre: 'En Progreso' },
    { estado_nombre: 'Completado' },
    { estado_nombre: 'Cancelada' },
  ];

  const prioridad_tareas = [
    { prioridad_nombre: 'Baja' },
    { prioridad_nombre: 'Media' },
    { prioridad_nombre: 'Alta' },
    { prioridad_nombre: 'Crítica' },
  ];

  /** =========================
   *  Inserciones
   *  ========================= */
  await prisma.tipoTarea.createMany({ data: tipo_tareas });
  await prisma.estadoTarea.createMany({ data: estado_tareas });
  await prisma.prioridadTarea.createMany({ data: prioridad_tareas });

  console.log('✅ Datos base insertados correctamente.');
}

// Ejecutar el seed
main()
  .then(() => {
    console.log('✅ Seed completado.');
  })
  .catch((e) => {
    console.error('❌ Error al ejecutar el seed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

