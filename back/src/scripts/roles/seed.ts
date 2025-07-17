import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // 1. Create Roles
  const [specialistRole, patientRole] = await Promise.all([
    prisma.rol.upsert({
      where: { rol_name: "Especialista" },
      update: {},
      create: { rol_name: "Especialista" },
    }),
    prisma.rol.upsert({
      where: { rol_name: "Paciente" },
      update: {},
      create: { rol_name: "Paciente" },
    })
  ]);

  // 2. Create Admin
  const hashedAdminPassword = await hash('admin123', 12);
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedAdminPassword
    }
  });

  // 3. Create Specialties
  const specialties = await Promise.all([
    prisma.specialty.create({
      data: {
        name: "Cardiología",
        status: "Activo",
        price: 120000,
        service: "Consulta cardiológica",
        duration: 45
      }
    }),
    prisma.specialty.create({
      data: {
        name: "Dermatología",
        status: "Activo",
        price: 90000,
        service: "Consulta dermatológica",
        duration: 30
      }
    }),
    prisma.specialty.create({
      data: {
        name: "Pediatría",
        status: "Activo",
        price: 80000,
        service: "Consulta pediátrica",
        duration: 30
      }
    })
  ]);

  // 4. Create Credential Users (for patients and specialists)
  const patientCredential = await prisma.credentialUser.create({
    data: {
      document: 123456789,
      email: "paciente@example.com",
      password: await hash('patient123', 12)
    }
  });

  const specialistCredential = await prisma.credentialUser.create({
    data: {
      document: 987654321,
      email: "especialista@example.com",
      password: await hash('specialist123', 12)
    }
  });

  // 5. Create Users (Patient and Specialist)
  const patientUser = await prisma.user.create({
    data: {
      firstname: "Juan",
      lastname: "Pérez",
      age: 35,
      gender: "Masculino",
      sex: "Hombre",
      language: "Español",
      document_type: "Cédula",
      phone: "3001234567",
      credential_users_idcredential_users: patientCredential.id,
      rol_idrol: patientRole.id,
      status: "Activo"
    }
  });

  const specialistUser = await prisma.user.create({
    data: {
      firstname: "María",
      lastname: "Gómez",
      age: 42,
      gender: "Femenino",
      sex: "Mujer",
      language: "Español",
      document_type: "Cédula",
      phone: "3109876543",
      credential_users_idcredential_users: specialistCredential.id,
      rol_idrol: specialistRole.id,
      status: "Activo"
    }
  });

  // 6. Create PacData (Patient medical data)
  const pacData = await prisma.pacData.create({
    data: {
      medical_history: Buffer.from("Historia médica de ejemplo"),
      Direction: "Calle 123 #45-67",
      Blod_type: "O+",
      allergies: "Penicilina, Mariscos",
      emergency_contact: "Laura Pérez - 3201234567"
    }
  });

  // 7. Create Patient
  const patient = await prisma.patient.create({
    data: {
      pac_data_idpac_data: pacData.id,
      User_idUser: patientUser.id,
      User_credential_users_idcredential_users: patientUser.credential_users_idcredential_users,
      User_rol_idrol: patientUser.rol_idrol
    }
  });

  // 8. Create SpecData (Specialist professional data)
  const specData = await prisma.specData.create({
    data: {
      biography: "Cardióloga con 15 años de experiencia...",
      picture: Buffer.from("imagen_de_perfil"),
      cv: Buffer.from("curriculum_vitae"),
      exp_lab: "Hospital Central, Clínica del Corazón",
      educational_certificates: Buffer.from("certificados"),
      degrees: Buffer.from("diplomas"),
      working_experience: "15 años",
      consultations: 0,
    }
  });

  // 9. Create Specialist
  const specialist = await prisma.specialist.create({
    data: {
      spec_data_idspec_data: specData.id,
      User_idUser: specialistUser.id,
      User_credential_users_idcredential_users: specialistUser.credential_users_idcredential_users,
      User_rol_idrol: specialistUser.rol_idrol,
      
    }
  });

  // 10. Associate Specialist with Specialty
  await prisma.specialistHasSpecialty.create({
    data: {
      Specialist_idEspecialista: specialist.id,
      Specialist_spec_data_idspec_data: specialist.spec_data_idspec_data,
      Specialist_User_idUser: specialist.User_idUser,
      Specialist_User_credential_users_idcredential_users: specialist.User_credential_users_idcredential_users,
      Specialist_User_rol_idrol: specialist.User_rol_idrol,
      specialty_idspecialty: specialties[0].id // Cardiología
    }
  });

  // 11. Create Medical History for Patient
  const medicalHistory = await prisma.medicalHistory.create({
    data: {
      patient_idPaciente: patient.id,
      patient_pac_data_idpac_data: patient.pac_data_idpac_data,
      patient_User_idUser: patient.User_idUser,
      patient_User_credential_users_idcred: patient.User_credential_users_idcredential_users,
      patient_User_rol_idrol: patient.User_rol_idrol,
      email: "paciente@example.com",
      eps_type: "Sura",
      emergency_contact: "Laura Pérez - 3201234567",
      contact_phone: "3201234567"
    }
  });

  // 12. Create Medical Consultation
  const consultation = await prisma.medicalConsultation.create({
    data: {
      medicalHistoryId: medicalHistory.id,
      startTime: new Date('2023-05-15T10:00:00Z'),
      endTime: new Date('2023-05-15T10:45:00Z'),
      reason: "Dolor en el pecho",
      medicalNote: "Paciente presenta dolor intermitente...",
      vitalSigns: "TA: 120/80, FC: 78",
      consultationMode: "Presencial",
      location: "Consultorio 201",
      summary: "Se recomienda ECG y análisis de sangre"
    }
  });

  // 13. Create Diagnosis
  const diagnosis = await prisma.diagnosis.create({
    data: {
      medicalHistoryId: medicalHistory.id,
      cie10Code: "I20.9",
      symptomDesc: "Dolor torácico anginoso",
      duration: "2 semanas",
      evolution: "Estable",
      diagnosisType: "Presuntivo",
      isPrincipal: true,
      diagnosisDate: new Date('2023-05-15T10:45:00Z')
    }
  });

  // 14. Create Medical Background
  const background = await prisma.medicalBackground.create({
    data: {
      medicalHistoryId: medicalHistory.id,
      type: "Familiares",
      description: "Padre con cardiopatía isquémica"
    }
  });

  // 15. Create Prescription
  const prescription = await prisma.prescription.create({
    data: {
      medicalHistoryId: medicalHistory.id,
      medicine: "Aspirina",
      dosage: "100 mg",
      frequency: "1 vez al día",
      duration: "30 días",
      indications: "Tomar con alimentos",
      issuedAt: new Date('2023-05-15T10:45:00Z'),
      sentBy: "Dr. María Gómez"
    }
  });

  // 16. Create Appointment
  const appointment = await prisma.appointment.create({
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
      appoint_init: new Date('2023-05-15T10:00:00Z'),
      appoint_finish: new Date('2023-05-15T10:45:00Z'),
      linkZoom: "https://zoom.us/j/123456789"
    }
  });

  // 17. Create User Review
  const userReview = await prisma.userReview.create({
    data: {
      reviewer_id: patientUser.id,
      reviewer_cred_id: patientUser.credential_users_idcredential_users,
      reviewer_rol_id: patientUser.rol_idrol,
      reviewed_id: specialistUser.id,
      reviewed_cred_id: specialistUser.credential_users_idcredential_users,
      reviewed_rol_id: specialistUser.rol_idrol,
      rating: 4.5,
      comment: "Excelente atención, muy profesional",
      createdAt: new Date('2023-05-15T11:00:00Z')
    }
  });

  // 18. Create Specialty Review
  const specialtyReview = await prisma.specialtyReview.create({
    data: {
      user_id: patientUser.id,
      user_cred_id: patientUser.credential_users_idcredential_users,
      user_rol_id: patientUser.rol_idrol,
      specialty_id: specialties[0].id, // Cardiología
      rating: 4.8,
      comment: "Muy buen servicio de cardiología",
      createdAt: new Date('2023-05-15T11:05:00Z')
    }
  });

  // 19. Create Consent
  const consent = await prisma.consent.create({
    data: {
      patient_idPaciente: patient.id,
      patient_pac_data_idpac_data: patient.pac_data_idpac_data,
      patient_User_idUser: patient.User_idUser,
      patient_User_credential_users_idcred: patient.User_credential_users_idcredential_users,
      patient_User_rol_idrol: patient.User_rol_idrol,
      especialidad_id: specialties[0].id, // Cardiología
      fecha_firma: new Date('2023-05-10T00:00:00Z'),
      firmado_por: "Juan Pérez",
      relacion_con_paciente: "Titular",
      documento_identidad: "123456789",
      consentimiento_texto: "Consiento el tratamiento...",
      firmado: true
    }
  });

  // 20. Create Invoice
  const invoice = await prisma.invoice.create({
    data: {
      appointmentId: appointment.id,
      patient_idPaciente: patient.id,
      patient_pac_data_idpac_data: patient.pac_data_idpac_data,
      patient_User_idUser: patient.User_idUser,
      patient_User_credential_users_idcred: patient.User_credential_users_idcredential_users,
      patient_User_rol_idrol: patient.User_rol_idrol,
      amount: specialties[0].price,
      paymentMethod: "Tarjeta crédito",
      paymentStatus: "Pagado",
      issuedDate: new Date('2023-05-15T11:00:00Z'),
      paidDate: new Date('2023-05-15T11:30:00Z')
    }
  });

  // 21. Create Appointment Receipt
  const appointmentReceipt = await prisma.appointmentReceipt.create({
    data: {
      appointmentId: appointment.id,
      patient_idPaciente: patient.id,
      patient_pac_data_idpac_data: patient.pac_data_idpac_data,
      patient_User_idUser: patient.User_idUser,
      patient_User_credential_users_idcred: patient.User_credential_users_idcredential_users,
      patient_User_rol_idrol: patient.User_rol_idrol,
      issuedAt: new Date('2023-05-15T10:45:00Z'),
      receiptUrl: "https://storage.example.com/receipts/123.pdf",
      notes: "Consulta de cardiología completada"
    }
  });

  // 22. Create Medical Order
  const medicalOrder = await prisma.medicalOrder.create({
    data: {
      appointmentId: appointment.id,
      specialist_idEspecialista: specialist.id,
      specialist_spec_data_idspec_data: specialist.spec_data_idspec_data,
      specialist_User_idUser: specialist.User_idUser,
      specialist_User_credential_users_idcred: specialist.User_credential_users_idcredential_users,
      specialist_User_rol_idrol: specialist.User_rol_idrol,
      patient_idPaciente: patient.id,
      patient_pac_data_idpac_data: patient.pac_data_idpac_data,
      patient_User_idUser: patient.User_idUser,
      patient_User_credential_users_idcred: patient.User_credential_users_idcredential_users,
      patient_User_rol_idrol: patient.User_rol_idrol,
      issuedAt: new Date('2023-05-15T10:45:00Z'),
      description: "Orden para ECG y análisis de sangre",
      instructions: "Ayunas de 8 horas para los análisis",
      status: "Pendiente"
    }
  });

  // 23. Create Diagnostic File
  const diagnosticFile = await prisma.diagnosticFile.create({
    data: {
      medicalHistoryId: medicalHistory.id,
      fileName: "ECG_20230515.pdf",
      fileType: "PDF",
      file: Buffer.from("resultados_ecg"),
      studyDate: new Date('2023-05-16T00:00:00Z'),
      specialty: "Cardiología",
      status: "Completado"
    }
  });

  // 24. Create Specialist Request
  const specialistRequest = await prisma.specialistRequest.create({
    data: {
      userId: patientUser.id,
      biography: "Médico con 10 años de experiencia...",
      specialty: "Neurología",
      price: 150000,
      graduationYear: 2010,
      workExperience: "Hospital General, Clínica Neuro",
      languages: "Español, Inglés",
      education: "Universidad Nacional",
      skills: "Neurología clínica, EEG, EMG",
      references: JSON.stringify(["Dr. Carlos Rojas", "Dra. Ana Martínez"]),
      documentInfo: JSON.stringify({ type: "Cédula", number: "123456789" }),
      personalInfo: JSON.stringify({ address: "Calle 123", phone: "3001234567" }),
      status: "pendiente"
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });