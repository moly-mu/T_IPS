import { BloodType, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // 1. Create Roles (10 additional)
  const roleNames = ["Especialista", "Paciente"];

  const roles = await Promise.all(
    roleNames.map((name) =>
      prisma.rol.upsert({
        where: { rol_name: name },
        update: {},
        create: { rol_name: name },
      })
    )
  );

  // 2. Create Admins (10 additional)
  const adminData = [
    { username: "admin", password: "admin123" },
    { username: "admin_sistema", password: "sistema123" },
    { username: "admin_clinico", password: "clinico123" },
    { username: "admin_financiero", password: "finanzas123" },
    { username: "admin_rrhh", password: "rrhh123" },
    { username: "admin_it", password: "tech123" },
    { username: "admin_calidad", password: "calidad123" },
    { username: "admin_legal", password: "legal123" },
    { username: "admin_marketing", password: "marketing123" },
    { username: "admin_compras", password: "compras123" },
  ];
  const bloodTypeMap: Record<string, BloodType> = {
  'A+': BloodType.A_POS,
  'A-': BloodType.A_NEG,
  'B+': BloodType.B_POS,
  'B-': BloodType.B_NEG,
  'AB+': BloodType.AB_POS,
  'AB-': BloodType.AB_NEG,
  'O+': BloodType.O_POS,
  'O-': BloodType.O_NEG,
};
  const admins = await Promise.all(
    adminData.map(async (adminInfo) => {
      const hashedPassword = await hash(adminInfo.password, 12);
      return prisma.admin.upsert({
        where: { username: adminInfo.username },
        update: {},
        create: {
          username: adminInfo.username,
          password: hashedPassword,
        },
      });
    })
  );

  // 3. Create Specialties (10 additional)
  const specialtyData = [
    {
      name: "Cardiología",
      price: 120000,
      service: "Consulta cardiológica",
      duration: 45,
    },
    {
      name: "Dermatología",
      price: 90000,
      service: "Consulta dermatológica",
      duration: 30,
    },
    {
      name: "Pediatría",
      price: 80000,
      service: "Consulta pediátrica",
      duration: 30,
    },
    {
      name: "Neurología",
      price: 150000,
      service: "Consulta neurológica",
      duration: 60,
    },
    {
      name: "Ginecología",
      price: 100000,
      service: "Consulta ginecológica",
      duration: 40,
    },
    {
      name: "Ortopedia",
      price: 130000,
      service: "Consulta ortopédica",
      duration: 45,
    },
    {
      name: "Psiquiatría",
      price: 140000,
      service: "Consulta psiquiátrica",
      duration: 50,
    },
    {
      name: "Oftalmología",
      price: 95000,
      service: "Consulta oftalmológica",
      duration: 35,
    },
    {
      name: "Otorrinolaringología",
      price: 110000,
      service: "Consulta ORL",
      duration: 40,
    },
    {
      name: "Endocrinología",
      price: 125000,
      service: "Consulta endocrinológica",
      duration: 45,
    },
  ];

  const specialties = await Promise.all(
    specialtyData.map((spec) =>
      prisma.specialty.create({
        data: {
          name: spec.name,
          status: "Activo",
          price: spec.price,
          service: spec.service,
          duration: spec.duration,
          workStartSchedule: new Date('2025-01-01T08:00:00Z'),
          workEndSchedule: new Date('2025-01-01T16:00:00Z'),
        },
      })
    )
  );

  // 4. Create Credential Users (10 additional for patients and 10 for specialists)
  const credentialData = [
    // Patients
    {
      document: 123456789,
      email: "paciente@example.com",
      password: "patient123",
    },
    {
      document: 234567890,
      email: "maria.rodriguez@email.com",
      password: "maria123",
    },
    {
      document: 345678901,
      email: "carlos.martinez@email.com",
      password: "carlos123",
    },
    { document: 456789012, email: "ana.lopez@email.com", password: "ana123" },
    {
      document: 567890123,
      email: "pedro.gonzalez@email.com",
      password: "pedro123",
    },
    {
      document: 678901234,
      email: "lucia.fernandez@email.com",
      password: "lucia123",
    },
    {
      document: 789012345,
      email: "diego.sanchez@email.com",
      password: "diego123",
    },
    {
      document: 890123456,
      email: "sofia.ramirez@email.com",
      password: "sofia123",
    },
    {
      document: 901234567,
      email: "miguel.torres@email.com",
      password: "miguel123",
    },
    {
      document: 112345678,
      email: "carmen.ruiz@email.com",
      password: "carmen123",
    },
    // Specialists
    {
      document: 987654321,
      email: "especialista@example.com",
      password: "specialist123",
    },
    {
      document: 876543210,
      email: "dr.garcia@hospital.com",
      password: "garcia123",
    },
    {
      document: 765432109,
      email: "dra.morales@clinica.com",
      password: "morales123",
    },
    {
      document: 654321098,
      email: "dr.jimenez@medico.com",
      password: "jimenez123",
    },
    {
      document: 543210987,
      email: "dra.herrera@salud.com",
      password: "herrera123",
    },
    {
      document: 432109876,
      email: "dr.vargas@hospital.com",
      password: "vargas123",
    },
    {
      document: 321098765,
      email: "dra.castro@clinica.com",
      password: "castro123",
    },
    {
      document: 210987654,
      email: "dr.mendoza@medico.com",
      password: "mendoza123",
    },
    { document: 109876543, email: "dra.silva@salud.com", password: "silva123" },
    {
      document: 198765432,
      email: "dr.reyes@hospital.com",
      password: "reyes123",
    },
  ];

  const credentials = await Promise.all(
    credentialData.map(async (cred) => {
      const hashedPassword = await hash(cred.password, 12);
      return prisma.credentialUser.create({
        data: {
          document: cred.document,
          email: cred.email,
          password: hashedPassword,
        },
      });
    })
  );

  // 5. Create Users (10 patients and 10 specialists)
  const patientUserData = [
    {
      firstname: "Juan",
      lastname: "Pérez",
      age: 35,
      gender: "Masculino",
      phone: "3001234567",
    },
    {
      firstname: "María",
      lastname: "Rodríguez",
      age: 28,
      gender: "Femenino",
      phone: "3012345678",
    },
    {
      firstname: "Carlos",
      lastname: "Martínez",
      age: 45,
      gender: "Masculino",
      phone: "3023456789",
    },
    {
      firstname: "Ana",
      lastname: "López",
      age: 32,
      gender: "Femenino",
      phone: "3034567890",
    },
    {
      firstname: "Pedro",
      lastname: "González",
      age: 58,
      gender: "Masculino",
      phone: "3045678901",
    },
    {
      firstname: "Lucía",
      lastname: "Fernández",
      age: 41,
      gender: "Femenino",
      phone: "3056789012",
    },
    {
      firstname: "Diego",
      lastname: "Sánchez",
      age: 26,
      gender: "Masculino",
      phone: "3067890123",
    },
    {
      firstname: "Sofía",
      lastname: "Ramírez",
      age: 39,
      gender: "Femenino",
      phone: "3078901234",
    },
    {
      firstname: "Miguel",
      lastname: "Torres",
      age: 52,
      gender: "Masculino",
      phone: "3089012345",
    },
    {
      firstname: "Carmen",
      lastname: "Ruiz",
      age: 47,
      gender: "Femenino",
      phone: "3090123456",
    },
  ];

  const specialistUserData = [
    {
      firstname: "María",
      lastname: "Gómez",
      age: 42,
      gender: "Femenino",
      phone: "3109876543",
    },
    {
      firstname: "Roberto",
      lastname: "García",
      age: 38,
      gender: "Masculino",
      phone: "3119876544",
    },
    {
      firstname: "Elena",
      lastname: "Morales",
      age: 45,
      gender: "Femenino",
      phone: "3129876545",
    },
    {
      firstname: "Fernando",
      lastname: "Jiménez",
      age: 51,
      gender: "Masculino",
      phone: "3139876546",
    },
    {
      firstname: "Patricia",
      lastname: "Herrera",
      age: 39,
      gender: "Femenino",
      phone: "3149876547",
    },
    {
      firstname: "Andrés",
      lastname: "Vargas",
      age: 44,
      gender: "Masculino",
      phone: "3159876548",
    },
    {
      firstname: "Claudia",
      lastname: "Castro",
      age: 37,
      gender: "Femenino",
      phone: "3169876549",
    },
    {
      firstname: "Ricardo",
      lastname: "Mendoza",
      age: 48,
      gender: "Masculino",
      phone: "3179876550",
    },
    {
      firstname: "Alejandra",
      lastname: "Silva",
      age: 41,
      gender: "Femenino",
      phone: "3189876551",
    },
    {
      firstname: "Gustavo",
      lastname: "Reyes",
      age: 46,
      gender: "Masculino",
      phone: "3199876552",
    },
  ];

  const patientUsers = await Promise.all(
    patientUserData.map((userData, index) =>
      prisma.user.create({
        data: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          age: userData.age,
          gender: userData.gender,
          sex: userData.gender === "Masculino" ? "Hombre" : "Mujer",
          language: "Español",
          document_type: "Cédula",
          phone: userData.phone,
          credential_users_idcredential_users: credentials[index].id,
          rol_idrol: roles[1].id, // Paciente role
          status: "Activo",
        },
      })
    )
  );

  const specialistUsers = await Promise.all(
    specialistUserData.map((userData, index) =>
      prisma.user.create({
        data: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          age: userData.age,
          gender: userData.gender,
          sex: userData.gender === "Masculino" ? "Hombre" : "Mujer",
          language: "Español",
          document_type: "Cédula",
          phone: userData.phone,
          credential_users_idcredential_users: credentials[index + 10].id,
          rol_idrol: roles[0].id, // Especialista role
          status: "Activo",
        },
      })
    )
  );

  // 6. Create PacData (10 records)
  const pacDataInfo = [
    {
      history: "Historia médica de ejemplo",
      direction: "Calle 123 #45-67",
      blood: "O+",
      allergies: "Penicilina, Mariscos",
      emergency: "Laura Pérez - 3201234567",
    },
    {
      history: "Hipertensión controlada",
      direction: "Carrera 45 #23-89",
      blood: "A+",
      allergies: "Ninguna",
      emergency: "José Rodríguez - 3201234568",
    },
    {
      history: "Diabetes tipo 2",
      direction: "Avenida 68 #12-34",
      blood: "B+",
      allergies: "Aspirina",
      emergency: "Carmen Martínez - 3201234569",
    },
    {
      history: "Asma bronquial",
      direction: "Calle 78 #56-12",
      blood: "AB+",
      allergies: "Polen, Ácaros",
      emergency: "Luis López - 3201234570",
    },
    {
      history: "Artritis reumatoide",
      direction: "Carrera 12 #89-45",
      blood: "O-",
      allergies: "Antiinflamatorios",
      emergency: "Rosa González - 3201234571",
    },
    {
      history: "Migraña crónica",
      direction: "Avenida 23 #67-90",
      blood: "A-",
      allergies: "Chocolate, Vino",
      emergency: "Mario Fernández - 3201234572",
    },
    {
      history: "Gastritis crónica",
      direction: "Calle 34 #12-78",
      blood: "B-",
      allergies: "Picante",
      emergency: "Ana Sánchez - 3201234573",
    },
    {
      history: "Hipotiroidismo",
      direction: "Carrera 56 #34-21",
      blood: "AB-",
      allergies: "Yodo",
      emergency: "Carlos Ramírez - 3201234574",
    },
    {
      history: "Osteoporosis",
      direction: "Avenida 78 #45-67",
      blood: "O+",
      allergies: "Lactosa",
      emergency: "Marta Torres - 3201234575",
    },
    {
      history: "Anemia ferropénica",
      direction: "Calle 90 #23-45",
      blood: "A+",
      allergies: "Mariscos",
      emergency: "Pedro Ruiz - 3201234576",
    },
  ];

  const pacDataRecords = await Promise.all(
    pacDataInfo.map((info) =>
      prisma.pacData.create({
        data: {
          medical_history: Buffer.from(info.history),
          Direction: info.direction,
          bloodType: bloodTypeMap[info.blood],
          allergies: info.allergies,
          emergency_contact: info.emergency,
        },
      })
    )
  );

  // 7. Create Patients (10 records)
  const patients = await Promise.all(
    patientUsers.map((user, index) =>
      prisma.patient.create({
        data: {
          pac_data_idpac_data: pacDataRecords[index].id,
          User_idUser: user.id,
          User_credential_users_idcredential_users:
            user.credential_users_idcredential_users,
          User_rol_idrol: user.rol_idrol,
        },
      })
    )
  );

  // 8. Create SpecData (10 records)
  const specDataInfo = [
    {
      bio: "Cardióloga con 15 años de experiencia",
      exp: "Hospital Central, Clínica del Corazón",
      years: "15 años",
    },
    {
      bio: "Neurólogo especializado en epilepsia",
      exp: "Hospital Universitario, Centro Neurológico",
      years: "12 años",
    },
    {
      bio: "Dermatóloga experta en cáncer de piel",
      exp: "Instituto de Dermatología, Clínica Estética",
      years: "10 años",
    },
    {
      bio: "Pediatra con enfoque en crecimiento",
      exp: "Hospital Infantil, Clínica Pediátrica",
      years: "18 años",
    },
    {
      bio: "Ginecóloga especialista en fertilidad",
      exp: "Centro de Fertilidad, Clínica Mujer",
      years: "14 años",
    },
    {
      bio: "Traumatólogo deportivo",
      exp: "Clínica Deportiva, Hospital Ortopédico",
      years: "16 años",
    },
    {
      bio: "Psiquiatra infantil",
      exp: "Hospital Mental, Centro Psiquiátrico",
      years: "11 años",
    },
    {
      bio: "Oftalmólogo cirujano",
      exp: "Instituto Oftalmológico, Clínica Visión",
      years: "20 años",
    },
    {
      bio: "ORL especialista en audición",
      exp: "Centro Auditivo, Hospital ENT",
      years: "13 años",
    },
    {
      bio: "Endocrinólogo diabetólogo",
      exp: "Centro de Diabetes, Hospital Metabólico",
      years: "17 años",
    },
  ];

  const specDataRecords = await Promise.all(
    specDataInfo.map((info, index) =>
      prisma.specData.create({
        data: {
          biography: info.bio,
          picture: Buffer.from(`imagen_perfil_${index + 1}`),
          cv: Buffer.from(`curriculum_vitae_${index + 1}`),
          exp_lab: info.exp,
          educational_certificates: Buffer.from(`certificados_${index + 1}`),
          degrees: Buffer.from(`diplomas_${index + 1}`),
          working_experience: info.years,
          consultations: Math.floor(Math.random() * 500) + 50,
        },
      })
    )
  );

  // 9. Create Specialists (10 records)
  const specialists = await Promise.all(
    specialistUsers.map((user, index) =>
      prisma.specialist.create({
        data: {
          spec_data_idspec_data: specDataRecords[index].id,
          User_idUser: user.id,
          User_credential_users_idcredential_users:
            user.credential_users_idcredential_users,
          User_rol_idrol: user.rol_idrol,
        },
      })
    )
  );

  // 10. Associate Specialists with Specialties (10 records)
  const specialistSpecialtyAssociations = await Promise.all(
    specialists.map((specialist, index) =>
      prisma.specialistHasSpecialty.create({
        data: {
          Specialist_idEspecialista: specialist.id,
          Specialist_spec_data_idspec_data: specialist.spec_data_idspec_data,
          Specialist_User_idUser: specialist.User_idUser,
          Specialist_User_credential_users_idcredential_users:
            specialist.User_credential_users_idcredential_users,
          Specialist_User_rol_idrol: specialist.User_rol_idrol,
          specialty_idspecialty: specialties[index].id,
        },
      })
    )
  );

  // 11. Create Medical Histories (10 records)
  const medicalHistories = await Promise.all(
    patients.map((patient, index) =>
      prisma.medicalHistory.create({
        data: {
          patient_idPaciente: patient.id,
          patient_pac_data_idpac_data: patient.pac_data_idpac_data,
          patient_User_idUser: patient.User_idUser,
          patient_User_credential_users_idcred:
            patient.User_credential_users_idcredential_users,
          patient_User_rol_idrol: patient.User_rol_idrol,
          email: credentials[index].email,
          eps_type: [
            "Sura",
            "EPS Sanitas",
            "Compensar",
            "Famisanar",
            "Salud Total",
          ][index % 5],
          emergency_contact:
            pacDataRecords[index].emergency_contact || "DEFAULT_VALUE",
          contact_phone: patientUsers[index].phone,
        },
      })
    )
  );

  // 12. Create Medical Consultations (10 records)
  const consultationReasons = [
    "Dolor en el pecho",
    "Dolor de cabeza persistente",
    "Erupción cutánea",
    "Fiebre en niño",
    "Dolor abdominal",
    "Dolor en rodilla",
    "Ansiedad",
    "Visión borrosa",
    "Dolor de oído",
    "Fatiga extrema",
  ];

  const consultations = await Promise.all(
    medicalHistories.map((history, index) => {
      const startDate = new Date(2023, 4, 15 + index, 10 + index, 0, 0);
      const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // 45 minutes later

      return prisma.medicalConsultation.create({
        data: {
          medicalHistoryId: history.id,
          startTime: startDate,
          endTime: endDate,
          reason: consultationReasons[index],
          medicalNote: `Paciente presenta ${consultationReasons[
            index
          ].toLowerCase()}...`,
          vitalSigns: `TA: ${110 + index * 2}/${70 + index}, FC: ${70 + index}`,
          consultationMode: index % 2 === 0 ? "Presencial" : "Virtual",
          location: `Consultorio ${201 + index}`,
          summary: `Se recomienda tratamiento específico para ${consultationReasons[
            index
          ].toLowerCase()}`,
        },
      });
    })
  );

  // 13. Create Diagnoses (10 records)
  const diagnosisCodes = [
    { code: "I20.9", symptom: "Dolor torácico anginoso" },
    { code: "G43.9", symptom: "Migraña sin especificar" },
    { code: "L20.9", symptom: "Dermatitis atópica" },
    { code: "J06.9", symptom: "Infección respiratoria alta" },
    { code: "K59.0", symptom: "Estreñimiento" },
    { code: "M25.50", symptom: "Dolor articular" },
    { code: "F41.9", symptom: "Trastorno de ansiedad" },
    { code: "H52.4", symptom: "Presbicia" },
    { code: "H66.9", symptom: "Otitis media" },
    { code: "R53", symptom: "Malestar y fatiga" },
  ];

  const diagnoses = await Promise.all(
    medicalHistories.map((history, index) =>
      prisma.diagnosis.create({
        data: {
          medicalHistoryId: history.id,
          cie10Code: diagnosisCodes[index].code,
          symptomDesc: diagnosisCodes[index].symptom,
          duration: `${index + 1} semanas`,
          evolution: ["Estable", "Mejoría", "Empeoramiento"][index % 3],
          diagnosisType: index % 2 === 0 ? "Presuntivo" : "Definitivo",
          isPrincipal: true,
          diagnosisDate: new Date(2023, 4, 15 + index, 10 + index, 45, 0),
        },
      })
    )
  );

  // 14. Create Medical Backgrounds (10 records)
  const backgroundTypes = [
    "Familiares",
    "Personales",
    "Quirúrgicos",
    "Alérgicos",
    "Farmacológicos",
  ];
  const backgroundDescs = [
    "Padre con cardiopatía isquémica",
    "Hipertensión desde hace 5 años",
    "Apendicectomía en 2015",
    "Alergia a penicilina",
    "Toma losartán 50mg",
    "Madre con diabetes",
    "Fumador durante 10 años",
    "Colecistectomía en 2018",
    "Alergia a mariscos",
    "Toma metformina 850mg",
  ];

  const backgrounds = await Promise.all(
    medicalHistories.map((history, index) =>
      prisma.medicalBackground.create({
        data: {
          medicalHistoryId: history.id,
          type: backgroundTypes[index % backgroundTypes.length],
          description: backgroundDescs[index],
        },
      })
    )
  );

  // 15. Create Prescriptions (10 records)
  const medicineData = [
    {
      medicine: "Aspirina",
      dosage: "100 mg",
      frequency: "1 vez al día",
      duration: "30 días",
    },
    {
      medicine: "Sumatriptán",
      dosage: "50 mg",
      frequency: "Al dolor",
      duration: "10 días",
    },
    {
      medicine: "Hidrocortisona",
      dosage: "1%",
      frequency: "2 veces al día",
      duration: "7 días",
    },
    {
      medicine: "Amoxicilina",
      dosage: "500 mg",
      frequency: "3 veces al día",
      duration: "7 días",
    },
    {
      medicine: "Simeticona",
      dosage: "40 mg",
      frequency: "3 veces al día",
      duration: "15 días",
    },
    {
      medicine: "Ibuprofeno",
      dosage: "600 mg",
      frequency: "3 veces al día",
      duration: "5 días",
    },
    {
      medicine: "Alprazolam",
      dosage: "0.5 mg",
      frequency: "2 veces al día",
      duration: "30 días",
    },
    {
      medicine: "Lágrimas artificiales",
      dosage: "1 gota",
      frequency: "4 veces al día",
      duration: "30 días",
    },
    {
      medicine: "Amoxicilina/Ácido clavulánico",
      dosage: "875/125 mg",
      frequency: "2 veces al día",
      duration: "10 días",
    },
    {
      medicine: "Complejo B",
      dosage: "1 tableta",
      frequency: "1 vez al día",
      duration: "30 días",
    },
  ];

  const prescriptions = await Promise.all(
    medicalHistories.map((history, index) =>
      prisma.prescription.create({
        data: {
          medicalHistoryId: history.id,
          medicine: medicineData[index].medicine,
          dosage: medicineData[index].dosage,
          frequency: medicineData[index].frequency,
          duration: medicineData[index].duration,
          indications: "Tomar con alimentos",
          issuedAt: new Date(2023, 4, 15 + index, 10 + index, 45, 0),
          sentBy: `Dr. ${specialistUsers[index].firstname} ${specialistUsers[index].lastname}`,
        },
      })
    )
  );

  // 16. Create Appointments (10 records)
  const appointmentStates = [
    "Completada",
    "Pendiente",
    "Cancelada",
    "En curso",
    "Reagendada",
  ];

  const appointments = await Promise.all(
    patients.map((patient, index) => {
      const startDate = new Date(2023, 4, 15 + index, 10 + index, 0, 0);
      const endDate = new Date(
        startDate.getTime() + specialties[index].duration * 60 * 1000
      );

      return prisma.appointment.create({
        data: {
          state: appointmentStates[index % appointmentStates.length],
          appoint_specialtyId: specialties[index].id,
          Paciente_idPaciente: patient.id,
          Paciente_pac_data_idpac_data: patient.pac_data_idpac_data,
          Paciente_User_idUser: patient.User_idUser,
          Paciente_User_credential_users_idcredential_users:
            patient.User_credential_users_idcredential_users,
          Paciente_User_rol_idrol: patient.User_rol_idrol,
          Specialist_idEspecialista: specialists[index].id,
          Specialist_spec_data_idspec_data:
            specialists[index].spec_data_idspec_data,
          Specialist_User_idUser: specialists[index].User_idUser,
          Specialist_User_credential_users_idcredential_users:
            specialists[index].User_credential_users_idcredential_users,
          Specialist_User_rol_idrol: specialists[index].User_rol_idrol,
          appoint_init: startDate,
          appoint_finish: endDate,
          linkZoom: `https://zoom.us/j/12345678${index}`,
        },
      });
    })
  );

  // 17. Create User Reviews (10 records)
  const reviewComments = [
    "Excelente atención, muy profesional",
    "Muy buen doctor, explica claramente",
    "Atención rápida y eficiente",
    "Doctor muy empático y comprensivo",
    "Excelente diagnóstico y tratamiento",
    "Muy profesional en su consulta",
    "Buena atención pero algo apresurada",
    "Doctor muy preparado y actualizado",
    "Excelente seguimiento del caso",
    "Muy satisfecho con la consulta",
  ];

  const userReviews = await Promise.all(
    patientUsers.map((patient, index) =>
      prisma.userReview.create({
        data: {
          reviewer_id: patient.id,
          reviewer_cred_id: patient.credential_users_idcredential_users,
          reviewer_rol_id: patient.rol_idrol,
          reviewed_id: specialistUsers[index].id,
          reviewed_cred_id:
            specialistUsers[index].credential_users_idcredential_users,
          reviewed_rol_id: specialistUsers[index].rol_idrol,
          rating: 4.0 + (index % 10) * 0.1,
          comment: reviewComments[index],
          createdAt: new Date(2023, 4, 15 + index, 11, 0, 0),
        },
      })
    )
  );

  const reviewCommentsFromSpecialists = [
    "Paciente muy cooperativo",
    "Buena comunicación",
    "Seguimiento adecuado",
    "Muy puntual",
    "Paciente educado",
    "Participación activa",
    "Respetuoso y atento",
    "Fácil de tratar",
    "Paciente comprometido",
    "Buena actitud",
  ];

  const specialistToPatientReviews = await Promise.all(
    specialistUsers.map((specialist, index) =>
      prisma.userReview.create({
        data: {
          reviewer_id: specialist.id,
          reviewer_cred_id: specialist.credential_users_idcredential_users,
          reviewer_rol_id: specialist.rol_idrol,
          reviewed_id: patientUsers[index].id,
          reviewed_cred_id:
            patientUsers[index].credential_users_idcredential_users,
          reviewed_rol_id: patientUsers[index].rol_idrol,
          rating: 4.5 - (index % 5) * 0.3,
          comment: reviewCommentsFromSpecialists[index],
          createdAt: new Date(2023, 5, 15 + index, 10, 0, 0),
        },
      })
    )
  );

  // 18. Create Specialty Reviews (10 records)
  const specialtyComments = [
    "Muy buen servicio de cardiología",
    "Excelente atención neurológica",
    "Dermatología muy profesional",
    "Pediatría con mucho cariño",
    "Ginecología con mucha experiencia",
    "Ortopedia muy especializada",
    "Psiquiatría muy comprensiva",
    "Oftalmología con tecnología moderna",
    "ORL muy detallada",
    "Endocrinología muy actualizada",
  ];

  const specialtyReviews = await Promise.all(
    patientUsers.map((patient, index) =>
      prisma.specialtyReview.create({
        data: {
          user_id: patient.id,
          user_cred_id: patient.credential_users_idcredential_users,
          user_rol_id: patient.rol_idrol,
          specialty_id: specialties[index].id,
          rating: 4.5 + (index % 6) * 0.1,
          comment: specialtyComments[index],
          createdAt: new Date(2023, 4, 15 + index, 11, 5, 0),
        },
      })
    )
  );

  // 19. Create Consents (10 records)
  const consents = await Promise.all(
    patients.map((patient, index) =>
      prisma.consent.create({
        data: {
          patient_idPaciente: patient.id,
          patient_pac_data_idpac_data: patient.pac_data_idpac_data,
          patient_User_idUser: patient.User_idUser,
          patient_User_credential_users_idcred:
            patient.User_credential_users_idcredential_users,
          patient_User_rol_idrol: patient.User_rol_idrol,
          especialidad_id: specialties[index].id,
          fecha_firma: new Date(2023, 4, 10 + index, 0, 0, 0),
          firmado_por: `${patientUsers[index].firstname} ${patientUsers[index].lastname}`,
          relacion_con_paciente:
            index % 3 === 0
              ? "Titular"
              : index % 3 === 1
              ? "Representante legal"
              : "Familiar",
          documento_identidad: credentials[index].document.toString(),
          consentimiento_texto: `Consiento el tratamiento médico para ${specialties[
            index
          ].name.toLowerCase()}...`,
          firmado: true,
        },
      })
    )
  );

  // 20. Create Invoices (10 records)
  const paymentMethods = [
    "Tarjeta crédito",
    "Tarjeta débito",
    "Efectivo",
    "Transferencia",
    "PSE",
  ];
  const paymentStatuses = ["Pagado", "Pendiente", "Vencido", "Parcial"];

  const invoices = await Promise.all(
    appointments.map((appointment, index) =>
      prisma.invoice.create({
        data: {
          appointmentId: appointment.id,
          patient_idPaciente: patients[index].id,
          patient_pac_data_idpac_data: patients[index].pac_data_idpac_data,
          patient_User_idUser: patients[index].User_idUser,
          patient_User_credential_users_idcred:
            patients[index].User_credential_users_idcredential_users,
          patient_User_rol_idrol: patients[index].User_rol_idrol,
          amount: specialties[index].price,
          paymentMethod: paymentMethods[index % paymentMethods.length],
          paymentStatus: paymentStatuses[index % paymentStatuses.length],
          issuedDate: new Date(2023, 4, 15 + index, 11, 0, 0),
          paidDate:
            index % 4 === 0 ? new Date(2023, 4, 15 + index, 11, 30, 0) : null,
        },
      })
    )
  );

  // 21. Create Appointment Receipts (10 records)
  const appointmentReceipts = await Promise.all(
    appointments.map((appointment, index) =>
      prisma.appointmentReceipt.create({
        data: {
          appointmentId: appointment.id,
          patient_idPaciente: patients[index].id,
          patient_pac_data_idpac_data: patients[index].pac_data_idpac_data,
          patient_User_idUser: patients[index].User_idUser,
          patient_User_credential_users_idcred:
            patients[index].User_credential_users_idcredential_users,
          patient_User_rol_idrol: patients[index].User_rol_idrol,
          issuedAt: new Date(2023, 4, 15 + index, 10, 45, 0),
          receiptUrl: `https://storage.example.com/receipts/${123 + index}.pdf`,
          notes: `Consulta de ${specialties[
            index
          ].name.toLowerCase()} completada`,
        },
      })
    )
  );

  // 22. Create Medical Orders (10 records)
  const orderDescriptions = [
    "Orden para ECG y análisis de sangre",
    "Orden para resonancia magnética cerebral",
    "Orden para biopsia cutánea",
    "Orden para análisis de sangre pediátrico",
    "Orden para ecografía pélvica",
    "Orden para radiografía de rodilla",
    "Orden para pruebas psicológicas",
    "Orden para campimetría visual",
    "Orden para audiometría",
    "Orden para prueba de tolerancia a glucosa",
  ];

  const orderInstructions = [
    "Ayunas de 8 horas para los análisis",
    "No usar objetos metálicos",
    "No aplicar cremas 24h antes",
    "Acompañar al menor durante el proceso",
    "Vejiga llena para el examen",
    "No realizar ejercicio previo",
    "Descansar bien la noche anterior",
    "No usar gotas oftálmicas",
    "Evitar ruidos fuertes antes",
    "Ayunas de 12 horas",
  ];

  const medicalOrders = await Promise.all(
    appointments.map((appointment, index) =>
      prisma.medicalOrder.create({
        data: {
          appointmentId: appointment.id,
          specialist_idEspecialista: specialists[index].id,
          specialist_spec_data_idspec_data:
            specialists[index].spec_data_idspec_data,
          specialist_User_idUser: specialists[index].User_idUser,
          specialist_User_credential_users_idcred:
            specialists[index].User_credential_users_idcredential_users,
          specialist_User_rol_idrol: specialists[index].User_rol_idrol,
          patient_idPaciente: patients[index].id,
          patient_pac_data_idpac_data: patients[index].pac_data_idpac_data,
          patient_User_idUser: patients[index].User_idUser,
          patient_User_credential_users_idcred:
            patients[index].User_credential_users_idcredential_users,
          patient_User_rol_idrol: patients[index].User_rol_idrol,
          issuedAt: new Date(2023, 4, 15 + index, 10, 45, 0),
          description: orderDescriptions[index],
          instructions: orderInstructions[index],
          status: ["Pendiente", "En proceso", "Completado", "Cancelado"][
            index % 4
          ],
        },
      })
    )
  );

  // 23. Create Diagnostic Files (10 records)
  const fileTypes = ["PDF", "JPG", "PNG", "DICOM", "DOC"];
  const fileNames = [
    "ECG_20230515.pdf",
    "RM_Cerebral_20230516.jpg",
    "Biopsia_20230517.png",
    "Laboratorio_20230518.pdf",
    "Ecografia_20230519.jpg",
    "RX_Rodilla_20230520.pdf",
    "Test_Psico_20230521.doc",
    "Campimetria_20230522.pdf",
    "Audiometria_20230523.pdf",
    "Glucemia_20230524.pdf",
  ];

  const diagnosticFiles = await Promise.all(
    medicalHistories.map((history, index) =>
      prisma.diagnosticFile.create({
        data: {
          medicalHistoryId: history.id,
          fileName: fileNames[index],
          fileType: fileTypes[index % fileTypes.length],
          file: Buffer.from(`resultado_${index + 1}`),
          studyDate: new Date(2023, 4, 16 + index, 0, 0, 0),
          specialty: specialties[index].name,
          status: ["Completado", "En proceso", "Pendiente"][index % 3],
        },
      })
    )
  );

  // 24. Create Specialist Requests (10 records)
  const requestSpecialties = [
    "Neurología",
    "Oncología",
    "Nefrología",
    "Neumología",
    "Reumatología",
    "Hematología",
    "Gastroenterología",
    "Urología",
    "Anestesiología",
    "Radiología",
  ];

  const educationUniversities = [
    "Universidad Nacional",
    "Universidad Javeriana",
    "Universidad del Rosario",
    "Universidad de los Andes",
    "Universidad CES",
    "Universidad del Norte",
    "Universidad Pontificia Bolivariana",
    "Universidad de Antioquia",
    "Universidad del Valle",
    "Universidad Militar",
  ];

  const workExperiences = [
    "Hospital General, Clínica Neuro",
    "Instituto Nacional de Cancerología",
    "Hospital San Ignacio, Centro Renal",
    "Hospital Central, Unidad Pulmonar",
    "Clínica Reumatológica, Hospital Militar",
    "Centro de Hematología",
    "Hospital Gastroenterológico",
    "Clínica Urológica Especializada",
    "Centro Anestesiológico",
    "Instituto de Radiología",
  ];

  const languages = [
    "Español, Inglés",
    "Español, Francés",
    "Español, Italiano",
    "Español, Alemán",
    "Español, Portugués",
    "Español, Inglés, Francés",
    "Español",
    "Español, Inglés",
    "Español, Italiano, Inglés",
    "Español, Alemán, Inglés",
  ];

  const skills = [
    "Neurología clínica, EEG, EMG",
    "Oncología médica, Quimioterapia",
    "Nefrología, Hemodiálisis",
    "Neumología, Broncoscopia",
    "Reumatología, Artroscopia",
    "Hematología, Citometría",
    "Gastroenterología, Endoscopia",
    "Urología, Laparoscopia",
    "Anestesiología, Bloqueos",
    "Radiología, Tomografía",
  ];

  const specialistRequests = await Promise.all(
    Array.from({ length: 10 }, (_, index) =>
      prisma.specialistRequest.create({
        data: {
          userId: patientUsers[index].id,
          biography: `Médico con ${10 + index} años de experiencia en ${
            requestSpecialties[index]
          }`,
          specialty: requestSpecialties[index],
          price: 100000 + index * 10000,
          graduationYear: 2005 + index,
          workExperience: workExperiences[index],
          languages: languages[index],
          education: educationUniversities[index],
          skills: skills[index],
          references: JSON.stringify([
            `Dr. Carlos ${index}`,
            `Dra. Ana ${index}`,
          ]),
          documentInfo: JSON.stringify({
            type: "Cédula",
            number: credentials[index].document.toString(),
          }),
          personalInfo: JSON.stringify({
            address: pacDataRecords[index].Direction,
            phone: patientUsers[index].phone,
          }),
          status: ["pendiente", "aprobado", "rechazado"][index % 3],
        },
      })
    )
  );

  console.log("Database seeding completed successfully!");
  console.log("Records created:");
  console.log(`- Roles: ${roles.length}`);
  console.log(`- Admins: ${admins.length}`);
  console.log(`- Specialties: ${specialties.length}`);
  console.log(`- Credentials: ${credentials.length}`);
  console.log(`- Patient Users: ${patientUsers.length}`);
  console.log(`- Specialist Users: ${specialistUsers.length}`);
  console.log(`- PacData: ${pacDataRecords.length}`);
  console.log(`- Patients: ${patients.length}`);
  console.log(`- SpecData: ${specDataRecords.length}`);
  console.log(`- Specialists: ${specialists.length}`);
  console.log(
    `- Specialist-Specialty Associations: ${specialistSpecialtyAssociations.length}`
  );
  console.log(`- Medical Histories: ${medicalHistories.length}`);
  console.log(`- Medical Consultations: ${consultations.length}`);
  console.log(`- Diagnoses: ${diagnoses.length}`);
  console.log(`- Medical Backgrounds: ${backgrounds.length}`);
  console.log(`- Prescriptions: ${prescriptions.length}`);
  console.log(`- Appointments: ${appointments.length}`);
  console.log(`- User Reviews: ${userReviews.length}`);
  console.log(`- Specialist Reviews: ${specialistToPatientReviews.length}`);
  console.log(`- Specialty Reviews: ${specialtyReviews.length}`);
  console.log(`- Consents: ${consents.length}`);
  console.log(`- Invoices: ${invoices.length}`);
  console.log(`- Appointment Receipts: ${appointmentReceipts.length}`);
  console.log(`- Medical Orders: ${medicalOrders.length}`);
  console.log(`- Diagnostic Files: ${diagnosticFiles.length}`);
  console.log(`- Specialist Requests: ${specialistRequests.length}`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });  