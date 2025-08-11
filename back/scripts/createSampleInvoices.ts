import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createSampleInvoices() {
  try {
    console.log("🔍 Iniciando creación de facturas de ejemplo...");

    // Obtener todas las citas existentes
    const appointments = await prisma.appointment.findMany({
      include: {
        Specialty: true,
      },
    });

    console.log(`📋 Encontradas ${appointments.length} citas`);

    if (appointments.length === 0) {
      console.log("⚠️ No hay citas en la base de datos. Creando datos de ejemplo...");
      return;
    }

    // Crear facturas para cada cita
    const invoices = [];
    const now = new Date();
    
    for (const appointment of appointments) {
      // Generar fechas aleatorias en los últimos 2 meses
      const randomDaysAgo = Math.floor(Math.random() * 60); // 0-60 días atrás
      const issuedDate = new Date(now);
      issuedDate.setDate(issuedDate.getDate() - randomDaysAgo);

      // Determinar si la factura está pagada (80% probabilidad)
      const isPaid = Math.random() > 0.2;
      const paidDate = isPaid ? new Date(issuedDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000) : null; // Pagada entre 0-7 días después

      // Calcular monto basado en la especialidad
      const baseAmount = appointment.Specialty?.price || 100000;
      const amount = baseAmount + (Math.random() * 20000 - 10000); // ±10k variación

      try {
        const invoice = await prisma.invoice.create({
          data: {
            appointmentId: appointment.id,
            patient_idPaciente: appointment.Paciente_idPaciente,
            patient_pac_data_idpac_data: appointment.Paciente_pac_data_idpac_data,
            patient_User_idUser: appointment.Paciente_User_idUser,
            patient_User_credential_users_idcred: appointment.Paciente_User_credential_users_idcredential_users,
            patient_User_rol_idrol: appointment.Paciente_User_rol_idrol,
            amount: Math.round(amount),
            paymentMethod: Math.random() > 0.5 ? "Tarjeta de crédito" : "Transferencia bancaria",
            paymentStatus: isPaid ? "pagado" : "pendiente",
            issuedDate: issuedDate,
            paidDate: paidDate,
          },
        });

        invoices.push(invoice);
        console.log(`💰 Factura creada: $${amount.toLocaleString()} para ${appointment.Specialty?.name}`);
      } catch (error) {
        console.error(`❌ Error creando factura para cita ${appointment.id}:`, error);
      }
    }

    console.log(`✅ Se crearon ${invoices.length} facturas de ejemplo`);

    // Mostrar resumen total
    const totalInvoices = await prisma.invoice.count();
    const totalAmount = await prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
    });

    console.log("📊 Resumen total:");
    console.log(`Total facturas: ${totalInvoices}`);
    console.log(`Monto total: $${totalAmount._sum.amount?.toLocaleString() || 0}`);

  } catch (error) {
    console.error("❌ Error creando facturas de ejemplo:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleInvoices();
