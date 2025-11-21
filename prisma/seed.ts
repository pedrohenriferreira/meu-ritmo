const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')
  
  // Criar usuário admin
  const adminPassword = await bcrypt.hash('Admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: adminPassword,
    },
  })

  console.log('✅ Usuário admin criado:', admin.email)
  console.log('📧 Email: admin@example.com')
  console.log('🔑 Senha: Admin123')
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
