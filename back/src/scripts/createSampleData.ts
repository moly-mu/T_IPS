import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createSampleData = async () => {
  try {
    console.log("🔍 Creando datos de prueba...");

    // 1. Crear especialidades
    console.log("📋 Creando especialidades...");
    const specialties = await Promise.all([
      prisma.specialty.upsert({
        where: { name: "Cardiología" },
        update: {},
        create: {
          name: "Cardiología",
          status: "Activo",
          price: 150000,
          service: "Consulta Cardiológica",
          duration: 45,
        },
      }),
      prisma.specialty.upsert({
        where: { name: "Neurología" },
        update: {},
        create: {
          name: "Neurología",
          status: "Activo",
          price: 180000,
          service: "Consulta Neurológica",
          duration: 60,
        },
      }),
      prisma.specialty.upsert({
        where: { name: "Dermatología" },
        update: {},
        create: {
          name: "Dermatología",
          status: "Activo",
          price: 120000,
          service: "Consulta Dermatológica",
          duration: 30,
        },
      }),
    ]);

    console.log("✅ Especialidades creadas:", specialties.length);

    // 2. Crear usuarios de credenciales para pacientes
    console.log("👥 Creando usuarios...");
    
    const credential1 = await prisma.credentialUser.upsert({
      where: { email: "paciente1@test.com" },
      update: {},
      create: {
        document: 12345678,
        email: "paciente1@test.com",
        password: "$2b$10$hashedpassword1", // password hasheado
      },
    });

    const credential2 = await prisma.credentialUser.upsert({
      where: { email: "especialista1@test.com" },
      update: {},
      create: {
        document: 87654321,
        email: "especialista1@test.com",
        password: "$2b$10$hashedpassword2",
      },
    });

    // 3. Crear usuarios (paciente y especialista)
    const paciente = await prisma.user.create({
      data: {
        firstname: "Juan",
        lastname: "Pérez",
        birthdate: new Date("1985-06-15"),
        gender: "Masculino",
        sex: "Masculino",
        language: "Espanol",
        document_type: "CC",
        phone: "3001234567",
        credential_users_idcredential_users: credential1.id,
        rol_idrol: 1, // Paciente
        status: "Activo",
      },
    });

    const especialistaUser = await prisma.user.create({
      data: {
        firstname: "Dra. María",
        lastname: "González",
        birthdate: new Date("1980-03-20"),
        gender: "Femenino",
        sex: "Femenino",
        language: "Espanol",
        document_type: "CC",
        phone: "3007654321",
        credential_users_idcredential_users: credential2.id,
        rol_idrol: 2, // Especialista
        status: "Activo",
      },
    });

    // 4. Crear datos del paciente
    const pacData = await prisma.pacData.create({
      data: {
        medical_history: Buffer.from("Historial médico básico"),
        Direction: "Calle 123 #45-67, Bogotá",
        bloodType: "O_POS",
        allergies: "Ninguna conocida",
        emergency_contact: "Ana Pérez - 3009876543",
        eps_type: "Sura",
        profession: "Ingeniero",
        ethnicgroup: "Mestizo",
      },
    });

    const patient = await prisma.patient.create({
      data: {
        pac_data_idpac_data: pacData.id,
        User_idUser: paciente.id,
        User_credential_users_idcredential_users: paciente.credential_users_idcredential_users,
        User_rol_idrol: paciente.rol_idrol,
      },
    });

    // 5. Crear datos del especialista
    const specData = await prisma.specData.create({
      data: {
        biography: "Especialista en cardiología con 10 años de experiencia",
        picture: Buffer.from("imagen_doctor"),
        cv: Buffer.from("cv_doctor"),
        exp_lab: "10 años",
        educational_certificates: Buffer.from("certificados"),
        degrees: Buffer.from("diplomas"),
        working_experience: "Hospital Central",
        consultations: 0,
        workStartSchedule: new Date("2024-01-01T08:00:00"),
        workEndSchedule: new Date("2024-01-01T17:00:00"),
      },
    });

    const specialist = await prisma.specialist.create({
      data: {
        spec_data_idspec_data: specData.id,
        User_idUser: especialistaUser.id,
        User_credential_users_idcredential_users: especialistaUser.credential_users_idcredential_users,
        User_rol_idrol: especialistaUser.rol_idrol,
      },
    });

    // 6. Crear citas y facturas de los últimos 2 meses
    console.log("📅 Creando citas y facturas...");
    
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 15); // Día 15 de este mes
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 10); // Día 10 del mes pasado

    // Cita del mes pasado
    const appointment1 = await prisma.appointment.create({
      data: {
        state: "Completada",
        appoint_specialtyId: specialties[0].id, // Cardiología
        Paciente_idPaciente: patient.id,
        Paciente_pac_data_idpac_data: patient.pac_data_idpac_data,
        Paciente_User_idUser: patient.User_idUser,
        Paciente_User_credential_users_idcredential_users: patient.User_credential_users_idcredential_users,
        Paciente_User_rol_idrol: patient.User_rol_idrol,
        Specialist_idEspecialista: specialist.id,
        Specialist_spec_data_idspec_data: specialist.spec_data_idspec_data,
        Specialist_User_idUser: specialist.User_idUser,
        Specialist_User_credential_users_idcredential_users: specialist.User_credential_users_idcredential_users,
        Specialist_User_rol_idrol: specialist.User_rol_idrol,
        appoint_init: lastMonth,
        appoint_finish: new Date(lastMonth.getTime() + 45 * 60000), // +45 minutos
        linkZoom: "https://zoom.us/j/123456789",
      },
    });

    // Cita de este mes
    const appointment2 = await prisma.appointment.create({
      data: {
        state: "Completada",
        appoint_specialtyId: specialties[0].id, // Cardiología
        Paciente_idPaciente: patient.id,
        Paciente_pac_data_idpac_data: patient.pac_data_idpac_data,
        Paciente_User_idUser: patient.User_idUser,
        Paciente_User_credential_users_idcredential_users: patient.User_credential_users_idcredential_users,
        Paciente_User_rol_idrol: patient.User_rol_idrol,
        Specialist_idEspecialista: specialist.id,
        Specialist_spec_data_idspec_data: specialist.spec_data_idspec_data,
        Specialist_User_idUser: specialist.User_idUser,
        Specialist_User_credential_users_idcredential_users: specialist.User_credential_users_idcredential_users,
        Specialist_User_rol_idrol: specialist.User_rol_idrol,
        appoint_init: thisMonth,
        appoint_finish: new Date(thisMonth.getTime() + 45 * 60000),
        linkZoom: "https://zoom.us/j/987654321",
      },
    });

    // Factura del mes pasado
    await prisma.invoice.create({
      data: {
        appointmentId: appointment1.id,
        patient_idPaciente: patient.id,
        patient_pac_data_idpac_data: patient.pac_data_idpac_data,
        patient_User_idUser: patient.User_idUser,
        patient_User_credential_users_idcred: patient.User_credential_users_idcredential_users,
        patient_User_rol_idrol: patient.User_rol_idrol,
        amount: 150000, // $150,000
        paymentMethod: "Tarjeta de crédito",
        paymentStatus: "pagado",
        issuedDate: lastMonth,
        paidDate: lastMonth,
      },
    });

    // Factura de este mes
    await prisma.invoice.create({
      data: {
        appointmentId: appointment2.id,
        patient_idPaciente: patient.id,
        patient_pac_data_idpac_data: patient.pac_data_idpac_data,
        patient_User_idUser: patient.User_idUser,
        patient_User_credential_users_idcred: patient.User_credential_users_idcredential_users,
        patient_User_rol_idrol: patient.User_rol_idrol,
        amount: 180000, // $180,000 (incremento)
        paymentMethod: "Efectivo",
        paymentStatus: "pagado",
        issuedDate: thisMonth,
        paidDate: thisMonth,
      },
    });

    console.log("✅ Datos de prueba creados exitosamente!");
    console.log("📊 Resumen:");
    console.log("- 3 especialidades creadas");
    console.log("- 1 paciente y 1 especialista creados");
    console.log("- 2 citas completadas");
    console.log("- 2 facturas pagadas");
    console.log("- Mes pasado: $150,000");
    console.log("- Este mes: $180,000");
    console.log("- Crecimiento esperado: +20%");

  } catch (error) {
    console.error("❌ Error creando datos de prueba:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createSampleData();
