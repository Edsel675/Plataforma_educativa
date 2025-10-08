import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Crear usuario de prueba (estudiante)
  const testUser = await prisma.user.upsert({
    where: { email: 'estudiante@test.com' },
    update: {},
    create: {
      email: 'estudiante@test.com',
      password: '$2b$10$YourHashedPasswordHere',
      role: 'STUDENT',
      student: {
        create: {
          firstName: 'María',
          lastName: 'González',
          age: 10,
          grade: '5to',
          profile: {
            create: {
              personalityType: 'ENFP',
              learningStyle: ['visual', 'kinesthetic'],
              interests: ['animales', 'espacio', 'matemáticas'],
              preferredCharacter: 'robot-profesor',
              preferredTheme: 'espacio',
            },
          },
        },
      },
    },
  })

  console.log('✅ Usuario de prueba creado:', testUser.email)

  // Crear curriculum de matemáticas
  const mathSubject = await prisma.subject.upsert({
    where: { name: 'Matemáticas' },
    update: {},
    create: {
      name: 'Matemáticas',
      description: 'Matemáticas para educación primaria',
      grade: '4to-6to',
      topics: {
        create: [
          {
            name: 'Fracciones',
            description: 'Introducción a fracciones',
            orderIndex: 1,
            concepts: {
              create: [
                {
                  name: 'Concepto de fracción',
                  description: 'Entender qué es una fracción',
                  difficulty: 1,
                  prerequisites: [],
                },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('✅ Curriculum de matemáticas creado')
  console.log('🎉 Seed completado exitosamente')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
