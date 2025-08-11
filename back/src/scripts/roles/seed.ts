import { Gender, Language, DocumentType, Eps, UserStatus, SpecialtyStatus, Sex, BloodType, stateAppointment, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // 1. Create Roles
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

  // 2. Create Admins
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

  // 3. Create Specialties
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
      prisma.specialty.upsert({
        where: { name: spec.name },
        update: {
          status: SpecialtyStatus.Activo,
          price: spec.price,
          service: spec.service,
          duration: spec.duration,
        },
        create: {
          name: spec.name,
          status: SpecialtyStatus.Activo,
          price: spec.price,
          service: spec.service,
          duration: spec.duration,
        },
      })
    )
  );

  // 4. Create Credential Users
  const credentialData = [
    // Patients (15 credentials)
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
    {
      document: 113456789,
      email: "alberto.vega@email.com",
      password: "alberto123",
    },
    {
      document: 114567890,
      email: "isabel.moreno@email.com",
      password: "isabel123",
    },
    {
      document: 115678901,
      email: "raul.castro@email.com",
      password: "raul123",
    },
    {
      document: 116789012,
      email: "patricia.delgado@email.com",
      password: "patricia123",
    },
    {
      document: 117890123,
      email: "fernando.ortiz@email.com",
      password: "fernando123",
    },
    // Specialists (13 credentials)
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
    {
      document: 187654321,
      email: "dra.paredes@clinica.com",
      password: "paredes123",
    },
    {
      document: 176543210,
      email: "dr.navarro@medico.com",
      password: "navarro123",
    },
    {
      document: 165432109,
      email: "dra.rojas@salud.com",
      password: "rojas123",
    },
  ];

  const credentials = await Promise.all(
    credentialData.map(async (cred) => {
      const hashedPassword = await hash(cred.password, 12);
      return prisma.credentialUser.upsert({
        where: { document: cred.document },
        update: {
          email: cred.email,
          password: hashedPassword,
        },
        create: {
          document: cred.document,
          email: cred.email,
          password: hashedPassword,
        },
      });
    })
  );

  // 5. Create Users
  const patientUserData = [
    {
      firstname: "Juan",
      lastname: "Pérez",
      gender: Gender.Masculino,
      phone: "3001234567",
    },
    {
      firstname: "María",
      lastname: "Rodríguez",
      gender: Gender.Femenino,
      phone: "3012345678",
    },
    {
      firstname: "Carlos",
      lastname: "Martínez",
      gender: Gender.Masculino,
      phone: "3023456789",
    },
    {
      firstname: "Ana",
      lastname: "López",
      gender: Gender.Femenino,
      phone: "3034567890",
    },
    {
      firstname: "Pedro",
      lastname: "González",
      gender: Gender.Masculino,
      phone: "3045678901",
    },
    {
      firstname: "Lucía",
      lastname: "Fernández",
      gender: Gender.Femenino,
      phone: "3056789012",
    },
    {
      firstname: "Diego",
      lastname: "Sánchez",
      gender: Gender.Masculino,
      phone: "3067890123",
    },
    {
      firstname: "Sofía",
      lastname: "Ramírez",
      gender: Gender.Femenino,
      phone: "3078901234",
    },
    {
      firstname: "Miguel",
      lastname: "Torres",
      gender: Gender.Masculino,
      phone: "3089012345",
    },
    {
      firstname: "Carmen",
      lastname: "Ruiz",
      gender: Gender.Femenino,
      phone: "3090123456",
    },
    {
      firstname: "Alberto",
      lastname: "Vega",
      gender: Gender.Masculino,
      phone: "3091234567",
    },
    {
      firstname: "Isabel",
      lastname: "Moreno",
      gender: Gender.Femenino,
      phone: "3092345678",
    },
    {
      firstname: "Raúl",
      lastname: "Castro",
      gender: Gender.Masculino,
      phone: "3093456789",
    },
    {
      firstname: "Patricia",
      lastname: "Delgado",
      gender: Gender.Femenino,
      phone: "3094567890",
    },
    {
      firstname: "Fernando",
      lastname: "Ortiz",
      gender: Gender.Masculino,
      phone: "3095678901",
    },
  ];

  const specialistUserData = [
    {
      firstname: "María",
      lastname: "Gómez",
      gender: Gender.Femenino,
      phone: "3109876543",
    },
    {
      firstname: "Roberto",
      lastname: "García",
      gender: Gender.Masculino,
      phone: "3119876544",
    },
    {
      firstname: "Elena",
      lastname: "Morales",
      gender: Gender.Femenino,
      phone: "3129876545",
    },
    {
      firstname: "Fernando",
      lastname: "Jiménez",
      gender: Gender.Masculino,
      phone: "3139876546",
    },
    {
      firstname: "Patricia",
      lastname: "Herrera",
      gender: Gender.Femenino,
      phone: "3149876547",
    },
    {
      firstname: "Andrés",
      lastname: "Vargas",
      gender: Gender.Masculino,
      phone: "3159876548",
    },
    {
      firstname: "Claudia",
      lastname: "Castro",
      gender: Gender.Femenino,
      phone: "3169876549",
    },
    {
      firstname: "Ricardo",
      lastname: "Mendoza",
      gender: Gender.Masculino,
      phone: "3179876550",
    },
    {
      firstname: "Alejandra",
      lastname: "Silva",
      gender: Gender.Femenino,
      phone: "3189876551",
    },
    {
      firstname: "Gustavo",
      lastname: "Reyes",
      gender: Gender.Masculino,
      phone: "3199876552",
    },
    {
      firstname: "Daniela",
      lastname: "Paredes",
      gender: Gender.Femenino,
      phone: "3200123456",
    },
    {
      firstname: "Sergio",
      lastname: "Navarro",
      gender: Gender.Masculino,
      phone: "3201234567",
    },
    {
      firstname: "Valentina",
      lastname: "Rojas",
      gender: Gender.Femenino,
      phone: "3202345678",
    },
  ];

  // Create patients with recent join dates
  const patientUsers = await Promise.all(
    patientUserData.map((userData, index) => {
      const today = new Date();
      const daysAgo = Math.floor(Math.random() * 180);
      const joinDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 10, 0, 0);
      const birthYear = 1970 + Math.floor(Math.random() * 40);
      
      return prisma.user.create({
        data: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          second_firstname: userData.firstname,
          second_lastname: userData.lastname,
          gender: userData.gender,
          sex: userData.gender === Gender.Masculino ? Sex.Masculino : Sex.Femenino,
          language: Language.Espanol,
          document_type: DocumentType.CC,
          phone: userData.phone,
          credential_users_idcredential_users: credentials[index].id,
          rol_idrol: roles[1].id, // Paciente role
          status: UserStatus.Activo,
          birthdate: new Date(birthYear, 0, 1),
          joinDate: joinDate,
        },
      });
    })
  );

  // Create specialists with recent join dates
  const specialistUsers = await Promise.all(
    specialistUserData.map((userData, index) => {
      const today = new Date();
      const daysAgo = Math.floor(Math.random() * 365);
      const joinDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 10, 0, 0);
      const birthYear = 1965 + Math.floor(Math.random() * 25);
      
      return prisma.user.create({
        data: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          second_firstname: userData.firstname,
          second_lastname: userData.lastname,
          gender: userData.gender,
          sex: userData.gender === Gender.Masculino ? Sex.Masculino : Sex.Femenino,
          language: Language.Espanol,
          document_type: DocumentType.CC,
          phone: userData.phone,
          credential_users_idcredential_users: credentials[index + patientUserData.length].id,
          rol_idrol: roles[0].id, // Especialista role
          status: UserStatus.Activo,
          birthdate: new Date(birthYear, 0, 1),
          joinDate: joinDate,
        },
      });
    })
  );

  // 6. Create PacData
  const pacDataInfo = [
    {
      history: "Historia médica de ejemplo",
      direction: "Calle 123 #45-67",
      blood: "O+",
      allergies: "Penicilina, Mariscos",
      emergency: "Laura Pérez - 3201234567",
      profession: "Ingeniero",
      ethnicgroup: "Mestizo",
      eps: Eps.Sura,
    },
    {
      history: "Hipertensión controlada",
      direction: "Carrera 45 #23-89",
      blood: "A+",
      allergies: "Ninguna",
      emergency: "José Rodríguez - 3201234568",
      profession: "Contador",
      ethnicgroup: "Afrocolombiano",
      eps: Eps.Sanitas,
    },
    {
      history: "Diabetes tipo 2",
      direction: "Avenida 68 #12-34",
      blood: "B+",
      allergies: "Aspirina",
      emergency: "Carmen Martínez - 3201234569",
      profession: "Profesor",
      ethnicgroup: "Indígena",
      eps: Eps.Compensar,
    },
    {
      history: "Asma bronquial",
      direction: "Calle 78 #56-12",
      blood: "AB+",
      allergies: "Polen, Ácaros",
      emergency: "Luis López - 3201234570",
      profession: "Chef",
      ethnicgroup: "Mestizo",
      eps: Eps.Famisanar,
    },
    {
      history: "Artritis reumatoide",
      direction: "Carrera 12 #89-45",
      blood: "O-",
      allergies: "Antiinflamatorios",
      emergency: "Rosa González - 3201234571",
      profession: "Médico",
      ethnicgroup: "Palenquero",
      eps: Eps.SaludTotal,
    },
    {
      history: "Migraña crónica",
      direction: "Avenida 23 #67-90",
      blood: "A-",
      allergies: "Chocolate, Vino",
      emergency: "Mario Fernández - 3201234572",
      profession: "Diseñador",
      ethnicgroup: "Raizal",
      eps: Eps.NuevaEps,
    },
    {
      history: "Gastritis crónica",
      direction: "Calle 34 #12-78",
      blood: "B-",
      allergies: "Picante",
      emergency: "Ana Sánchez - 3201234573",
      profession: "Abogado",
      ethnicgroup: "Gitano",
      eps: Eps.Coosalud,
    },
    {
      history: "Hipotiroidismo",
      direction: "Carrera 56 #34-21",
      blood: "AB-",
      allergies: "Yodo",
      emergency: "Carlos Ramírez - 3201234574",
      profession: "Psicólogo",
      ethnicgroup: "Negro",
      eps: Eps.MutualSer,
    },
    {
      history: "Osteoporosis",
      direction: "Avenida 78 #45-67",
      blood: "O+",
      allergies: "Lactosa",
      emergency: "Marta Torres - 3201234575",
      profession: "Técnico en sistemas",
      ethnicgroup: "Otro",
      eps: Eps.Otra,
    },
    {
      history: "Anemia ferropénica",
      direction: "Calle 90 #23-45",
      blood: "A+",
      allergies: "Mariscos",
      emergency: "Pedro Ruiz - 3201234576",
      profession: "Estudiante",
      ethnicgroup: "Mestizo",
      eps: Eps.Ninguna,
    },
    {
      history: "Hipertensión arterial",
      direction: "Carrera 15 #30-50",
      blood: "B+",
      allergies: "Sulfa",
      emergency: "Elena Vega - 3201234577",
      profession: "Arquitecto",
      ethnicgroup: "Mestizo",
      eps: Eps.Sura,
    },
    {
      history: "Rinitis alérgica",
      direction: "Calle 50 #20-30",
      blood: "O-",
      allergies: "Polen, Polvo",
      emergency: "Roberto Moreno - 3201234578",
      profession: "Enfermero",
      ethnicgroup: "Afrocolombiano",
      eps: Eps.Sanitas,
    },
    {
      history: "Lumbalgia crónica",
      direction: "Avenida 40 #15-25",
      blood: "A-",
      allergies: "Ninguna",
      emergency: "Gloria Castro - 3201234579",
      profession: "Fisioterapeuta",
      ethnicgroup: "Indígena",
      eps: Eps.Compensar,
    },
    {
      history: "Síndrome de colon irritable",
      direction: "Calle 60 #35-40",
      blood: "AB+",
      allergies: "Lactosa, Gluten",
      emergency: "Mario Delgado - 3201234580",
      profession: "Nutricionista",
      ethnicgroup: "Mestizo",
      eps: Eps.Famisanar,
    },
    {
      history: "Depresión leve",
      direction: "Carrera 25 #40-55",
      blood: "O+",
      allergies: "Ninguna",
      emergency: "Sandra Ortiz - 3201234581",
      profession: "Trabajador Social",
      ethnicgroup: "Palenquero",
      eps: Eps.SaludTotal,
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
          eps_type: info.eps,
          profession: info.profession,
          ethnicgroup: info.ethnicgroup,
        },
      })
    )
  );

  // 7. Create Patients
  const patients = await Promise.all(
    patientUsers.map((user, index) =>
      prisma.patient.create({
        data: {
          pac_data_idpac_data: pacDataRecords[index].id,
          User_idUser: user.id,
          User_credential_users_idcredential_users: user.credential_users_idcredential_users,
          User_rol_idrol: user.rol_idrol,
        },
      })
    )
  );

  // 8. Create SpecData
  const specDataInfo = [
    {
      bio: "Cardióloga con 15 años de experiencia",
      exp: "Hospital Central",
      years: "15 años",
    },
    {
      bio: "Neurólogo especializado en epilepsia",
      exp: "Hospital Universitario",
      years: "12 años",
    },
    {
      bio: "Dermatóloga experta en cáncer de piel",
      exp: "Instituto de Dermatología",
      years: "10 años",
    },
    {
      bio: "Pediatra con enfoque en crecimiento",
      exp: "Hospital Infantil",
      years: "18 años",
    },
    {
      bio: "Ginecóloga especialista en fertilidad",
      exp: "Centro de Fertilidad",
      years: "14 años",
    },
    {
      bio: "Traumatólogo deportivo",
      exp: "Clínica Deportiva",
      years: "16 años",
    },
    {
      bio: "Psiquiatra infantil",
      exp: "Hospital Mental",
      years: "11 años",
    },
    {
      bio: "Oftalmólogo cirujano",
      exp: "Instituto Oftalmológico",
      years: "20 años",
    },
    {
      bio: "ORL especialista en audición",
      exp: "Centro Auditivo",
      years: "13 años",
    },
    {
      bio: "Endocrinólogo diabetólogo",
      exp: "Centro de Diabetes",
      years: "17 años",
    },
    {
      bio: "Anestesióloga con especialización en dolor",
      exp: "Clínica del Dolor",
      years: "9 años",
    },
    {
      bio: "Radiólogo intervencionista",
      exp: "Instituto de Radiología",
      years: "14 años",
    },
    {
      bio: "Oncóloga clínica especializada en mama",
      exp: "Instituto Nacional de Cáncer",
      years: "16 años",
    },
  ];

  const specDataRecords = await Promise.all(
    specDataInfo.map((info, index) => {
      const today = new Date();
      const workStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0);
      const workEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0, 0);
      
      return prisma.specData.create({
        data: {
          biography: info.bio,
          picture: Buffer.from(`imagen_perfil_${index + 1}`),
          cv: Buffer.from(`curriculum_vitae_${index + 1}`),
          exp_lab: info.exp,
          educational_certificates: Buffer.from(`certificados_${index + 1}`),
          degrees: Buffer.from(`diplomas_${index + 1}`),
          working_experience: info.years,
          consultations: Math.floor(Math.random() * 500) + 50,
          workStartSchedule: workStart,
          workEndSchedule: workEnd,
        },
      });
    })
  );

  // 9. Create Specialists
  const specialists = await Promise.all(
    specialistUsers.map((user, index) =>
      prisma.specialist.create({
        data: {
          spec_data_idspec_data: specDataRecords[index].id,
          User_idUser: user.id,
          User_credential_users_idcredential_users: user.credential_users_idcredential_users,
          User_rol_idrol: user.rol_idrol,
        },
      })
    )
  );

  // 10. Associate Specialists with Specialties
  const specialistSpecialtyAssociations = await Promise.all(
    specialists.map((specialist, index) =>
      prisma.specialistHasSpecialty.create({
        data: {
          Specialist_idEspecialista: specialist.id,
          Specialist_spec_data_idspec_data: specialist.spec_data_idspec_data,
          Specialist_User_idUser: specialist.User_idUser,
          Specialist_User_credential_users_idcredential_users: specialist.User_credential_users_idcredential_users,
          Specialist_User_rol_idrol: specialist.User_rol_idrol,
          specialty_idspecialty: specialties[index % specialties.length].id,
        },
      })
    )
  );

  // 11. Create Medical Histories
  const medicalHistories = await Promise.all(
    patients.map((patient, index) =>
      prisma.medicalHistory.create({
        data: {
          patient_idPaciente: patient.id,
          patient_pac_data_idpac_data: patient.pac_data_idpac_data,
          patient_User_idUser: patient.User_idUser,
          patient_User_credential_users_idcred: patient.User_credential_users_idcredential_users,
          patient_User_rol_idrol: patient.User_rol_idrol,
          email: credentials[index].email,
          emergency_contact: pacDataRecords[index].emergency_contact || "DEFAULT_VALUE",
          contact_phone: patientUsers[index].phone,
        },
      })
    )
  );

  // 12. Create Appointments
  const appointmentStates = [
    stateAppointment.Completada,
    stateAppointment.Pendiente,
    stateAppointment.Cancelada,
    stateAppointment.EnCurso,
    stateAppointment.Reagendada,
  ];

  const allAppointments = [];
  
  // Appointments for today (5 appointments)
  for (let i = 0; i < 5; i++) {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8 + i * 2, 0, 0);
    const endDate = new Date(startDate.getTime() + specialties[i % specialties.length].duration * 60 * 1000);
    
    allAppointments.push({
      state: i < 3 ? stateAppointment.Completada : stateAppointment.Pendiente,
      appoint_specialtyId: specialties[i % specialties.length].id,
      patient: patients[i % patients.length],
      specialist: specialists[i % specialists.length],
      appoint_init: startDate,
      appoint_finish: endDate,
      linkZoom: `https://zoom.us/j/1234567${i}`,
    });
  }

  // Appointments for this week (10 appointments)
  for (let i = 0; i < 10; i++) {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 7);
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 9 + (i % 8), 0, 0);
    const endDate = new Date(startDate.getTime() + specialties[i % specialties.length].duration * 60 * 1000);
    
    allAppointments.push({
      state: appointmentStates[i % appointmentStates.length],
      appoint_specialtyId: specialties[i % specialties.length].id,
      patient: patients[i % patients.length],
      specialist: specialists[i % specialists.length],
      appoint_init: startDate,
      appoint_finish: endDate,
      linkZoom: `https://zoom.us/j/12345${100 + i}`,
    });
  }

  // Appointments for this month (15 appointments)
  for (let i = 0; i < 15; i++) {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 8 + (i % 10), 0, 0);
    const endDate = new Date(startDate.getTime() + specialties[i % specialties.length].duration * 60 * 1000);
    
    allAppointments.push({
      state: appointmentStates[i % appointmentStates.length],
      appoint_specialtyId: specialties[i % specialties.length].id,
      patient: patients[i % patients.length],
      specialist: specialists[i % specialists.length],
      appoint_init: startDate,
      appoint_finish: endDate,
      linkZoom: `https://zoom.us/j/12345${200 + i}`,
    });
  }

  // Appointments for this year (20 appointments)
  for (let i = 0; i < 20; i++) {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 365);
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 8 + (i % 10), 0, 0);
    const endDate = new Date(startDate.getTime() + specialties[i % specialties.length].duration * 60 * 1000);
    
    allAppointments.push({
      state: appointmentStates[i % appointmentStates.length],
      appoint_specialtyId: specialties[i % specialties.length].id,
      patient: patients[i % patients.length],
      specialist: specialists[i % specialists.length],
      appoint_init: startDate,
      appoint_finish: endDate,
      linkZoom: `https://zoom.us/j/12345${300 + i}`,
    });
  }

  const appointments = await Promise.all(
    allAppointments.map((appointmentData) =>
      prisma.appointment.create({
        data: {
          state: appointmentData.state,
          appoint_specialtyId: appointmentData.appoint_specialtyId,
          Paciente_idPaciente: appointmentData.patient.id,
          Paciente_pac_data_idpac_data: appointmentData.patient.pac_data_idpac_data,
          Paciente_User_idUser: appointmentData.patient.User_idUser,
          Paciente_User_credential_users_idcredential_users: appointmentData.patient.User_credential_users_idcredential_users,
          Paciente_User_rol_idrol: appointmentData.patient.User_rol_idrol,
          Specialist_idEspecialista: appointmentData.specialist.id,
          Specialist_spec_data_idspec_data: appointmentData.specialist.spec_data_idspec_data,
          Specialist_User_idUser: appointmentData.specialist.User_idUser,
          Specialist_User_credential_users_idcredential_users: appointmentData.specialist.User_credential_users_idcredential_users,
          Specialist_User_rol_idrol: appointmentData.specialist.User_rol_idrol,
          appoint_init: appointmentData.appoint_init,
          appoint_finish: appointmentData.appoint_finish,
          linkZoom: appointmentData.linkZoom,
        },
      })
    )
  );

  // 13. Create User Reviews (with appointmentId)
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
    "Puntual y organizado",
    "Instalaciones muy limpias",
    "Personal muy amable",
    "Tiempo de espera razonable",
    "Explicaciones muy claras",
  ];

  const completedAppointments = appointments.filter(apt => apt.state === stateAppointment.Completada);
  
  const userReviews = await Promise.all(
    completedAppointments.slice(0, Math.min(15, completedAppointments.length)).map(async (appointment, index) => {
      const today = new Date();
      const daysAgo = Math.floor(Math.random() * 60);
      const reviewDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 10 + (index % 12), 0, 0);
      const rating = 3.5 + (Math.random() * 1.5);
      
      // Get patient and specialist from the appointment
      const patient = patients.find(p => p.id === appointment.Paciente_idPaciente);
      const specialist = specialists.find(s => s.id === appointment.Specialist_idEspecialista);
      
      if (!patient || !specialist) return null;
      
      const patientUser = patientUsers.find(u => u.id === patient.User_idUser);
      const specialistUser = specialistUsers.find(u => u.id === specialist.User_idUser);
      
      if (!patientUser || !specialistUser) return null;
      
      return prisma.userReview.create({
        data: {
          appointmentId: appointment.id,
          reviewer_id: patientUser.id,
          reviewer_cred_id: patientUser.credential_users_idcredential_users,
          reviewer_rol_id: patientUser.rol_idrol,
          reviewed_id: specialistUser.id,
          reviewed_cred_id: specialistUser.credential_users_idcredential_users,
          reviewed_rol_id: specialistUser.rol_idrol,
          rating: Math.round(rating * 10) / 10,
          comment: reviewComments[index % reviewComments.length],
          createdAt: reviewDate,
        },
      });
    })
  );

  // Filter out null values
  const validUserReviews = userReviews.filter(review => review !== null);

  // 14. Create Consents
  const consents = await Promise.all(
    patients.slice(0, 10).map((patient, index) =>
      prisma.consent.create({
        data: {
          patient_idPaciente: patient.id,
          patient_pac_data_idpac_data: patient.pac_data_idpac_data,
          patient_User_idUser: patient.User_idUser,
          patient_User_credential_users_idcred: patient.User_credential_users_idcredential_users,
          patient_User_rol_idrol: patient.User_rol_idrol,
          especialidad_id: specialties[index % specialties.length].id,
          fecha_firma: new Date(2023, 4, 10 + index, 0, 0, 0),
          firmado_por: `${patientUsers[index].firstname} ${patientUsers[index].lastname}`,
          relacion_con_paciente: index % 3 === 0 ? "Titular" : index % 3 === 1 ? "Representante legal" : "Familiar",
          documento_identidad: credentials[index].document.toString(),
          consentimiento_texto: `Consiento el tratamiento médico para ${specialties[index % specialties.length].name.toLowerCase()}...`,
          firmado: true,
        },
      })
    )
  );

  // 15. Create Invoices
  const paymentMethods = ["Tarjeta crédito", "Tarjeta débito", "Efectivo", "Transferencia", "PSE"];
  const paymentStatuses = ["pagado", "pendiente", "vencido", "parcial"];

  const invoices = await Promise.all(
    appointments.map((appointment, index) => {
      const baseAmount = 80000;
      const variableAmount = Math.floor(Math.random() * 100000) + 50000;
      const finalAmount = baseAmount + variableAmount;
      
      let paidDate = null;
      const status = paymentStatuses[index % paymentStatuses.length];
      if (status === "pagado") {
        const appointmentDate = new Date(appointment.appoint_init);
        paidDate = new Date(appointmentDate.getTime() + (Math.random() * 5 + 1) * 24 * 60 * 60 * 1000);
      }

      return prisma.invoice.create({
        data: {
          appointmentId: appointment.id,
          patient_idPaciente: appointment.Paciente_idPaciente,
          patient_pac_data_idpac_data: appointment.Paciente_pac_data_idpac_data,
          patient_User_idUser: appointment.Paciente_User_idUser,
          patient_User_credential_users_idcred: appointment.Paciente_User_credential_users_idcredential_users,
          patient_User_rol_idrol: appointment.Paciente_User_rol_idrol,
          amount: finalAmount,
          paymentMethod: paymentMethods[index % paymentMethods.length],
          paymentStatus: status,
          issuedDate: appointment.appoint_init,
          paidDate: paidDate,
        },
      });
    })
  );

  // 16. Create Appointment Receipts
  const appointmentReceipts = await Promise.all(
    appointments.map((appointment, index) =>
      prisma.appointmentReceipt.create({
        data: {
          appointmentId: appointment.id,
          patient_idPaciente: appointment.Paciente_idPaciente,
          patient_pac_data_idpac_data: appointment.Paciente_pac_data_idpac_data,
          patient_User_idUser: appointment.Paciente_User_idUser,
          patient_User_credential_users_idcred: appointment.Paciente_User_credential_users_idcredential_users,
          patient_User_rol_idrol: appointment.Paciente_User_rol_idrol,
          issuedAt: new Date(appointment.appoint_init),
          receiptUrl: `https://storage.example.com/receipts/${123 + index}.pdf`,
          notes: `Consulta de ${specialties[index % specialties.length].name.toLowerCase()} completada`,
        },
      })
    )
  );

  // 17. Create Medical Orders
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
    appointments.slice(0, 20).map((appointment, index) =>
      prisma.medicalOrder.create({
        data: {
          appointmentId: appointment.id,
          specialist_idEspecialista: appointment.Specialist_idEspecialista,
          specialist_spec_data_idspec_data: appointment.Specialist_spec_data_idspec_data,
          specialist_User_idUser: appointment.Specialist_User_idUser,
          specialist_User_credential_users_idcred: appointment.Specialist_User_credential_users_idcredential_users,
          specialist_User_rol_idrol: appointment.Specialist_User_rol_idrol,
          patient_idPaciente: appointment.Paciente_idPaciente,
          patient_pac_data_idpac_data: appointment.Paciente_pac_data_idpac_data,
          patient_User_idUser: appointment.Paciente_User_idUser,
          patient_User_credential_users_idcred: appointment.Paciente_User_credential_users_idcredential_users,
          patient_User_rol_idrol: appointment.Paciente_User_rol_idrol,
          issuedAt: new Date(appointment.appoint_init),
          description: orderDescriptions[index % orderDescriptions.length],
          instructions: orderInstructions[index % orderInstructions.length],
          status: [UserStatus.Pendiente, UserStatus.Activo, UserStatus.Inactivo][index % 3],
        },
      })
    )
  );

  // 18. Create Medical Consultations
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
      const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);
      const reasonIndex = index % consultationReasons.length;

      return prisma.medicalConsultation.create({
        data: {
          medicalHistoryId: history.id,
          startTime: startDate,
          endTime: endDate,
          reason: consultationReasons[reasonIndex],
          medicalNote: `Paciente presenta ${consultationReasons[reasonIndex].toLowerCase()}...`,
          vitalSigns: `TA: ${110 + index * 2}/${70 + index}, FC: ${70 + index}`,
          consultationMode: index % 2 === 0 ? "Presencial" : "Virtual",
          location: `Consultorio ${201 + index}`,
          summary: `Se recomienda tratamiento específico para ${consultationReasons[reasonIndex].toLowerCase()}`,
        },
      });
    })
  );

  // 19. Create Diagnoses
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
    medicalHistories.map((history, index) => {
      const diagnosisIndex = index % diagnosisCodes.length;
      return prisma.diagnosis.create({
        data: {
          medicalHistoryId: history.id,
          cie10Code: diagnosisCodes[diagnosisIndex].code,
          symptomDesc: diagnosisCodes[diagnosisIndex].symptom,
          duration: `${index + 1} semanas`,
          evolution: ["Estable", "Mejoría", "Empeoramiento"][index % 3],
          diagnosisType: index % 2 === 0 ? "Presuntivo" : "Definitivo",
          isPrincipal: true,
          diagnosisDate: new Date(2023, 4, 15 + index, 10 + index, 45, 0),
        },
      });
    })
  );

  // 20. Create Medical Backgrounds
  const backgroundTypes = ["Familiares", "Personales", "Quirúrgicos", "Alérgicos", "Farmacológicos"];
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
          description: backgroundDescs[index % backgroundDescs.length],
        },
      })
    )
  );

  // 21. Create Prescriptions
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
          medicine: medicineData[index % medicineData.length].medicine,
          dosage: medicineData[index % medicineData.length].dosage,
          frequency: medicineData[index % medicineData.length].frequency,
          duration: medicineData[index % medicineData.length].duration,
          indications: "Tomar con alimentos",
          issuedAt: new Date(2023, 4, 15 + index, 10 + index, 45, 0),
          sentBy: `Dr. ${specialistUsers[index % specialistUsers.length].firstname} ${specialistUsers[index % specialistUsers.length].lastname}`,
        },
      })
    )
  );

  // 22. Create Diagnostic Files
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
          fileName: fileNames[index % fileNames.length],
          fileType: fileTypes[index % fileTypes.length],
          file: Buffer.from(`resultado_${index + 1}`),
          studyDate: new Date(2023, 4, 16 + index, 0, 0, 0),
          specialty: specialties[index % specialties.length].name,
          status: ["Completado", "En proceso", "Pendiente"][index % 3],
        },
      })
    )
  );

  // 23. Create Specialist Requests
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
          biography: `Médico con ${10 + index} años de experiencia en ${requestSpecialties[index]}`,
          specialty: requestSpecialties[index],
          price: 100000 + index * 10000,
          graduationYear: 2005 + index,
          workExperience: workExperiences[index],
          language: Language.Ingles,
          education: educationUniversities[index],
          skills: skills[index],
          references: JSON.stringify([`Dr. Carlos ${index}`, `Dra. Ana ${index}`]),
          documentInfo: JSON.stringify({
            type: "Cédula",
            number: credentials[index].document.toString(),
          }),
          personalInfo: JSON.stringify({
            address: pacDataRecords[index].Direction,
            phone: patientUsers[index].phone,
          }),
          status: [UserStatus.Activo, UserStatus.Pendiente, UserStatus.Inactivo][index % 3],
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
  console.log(`- Specialist-Specialty Associations: ${specialistSpecialtyAssociations.length}`);
  console.log(`- Medical Histories: ${medicalHistories.length}`);
  console.log(`- Appointments: ${appointments.length} (distributed across different time periods)`);
  console.log(`- User Reviews: ${validUserReviews.length} (with recent dates and varied ratings)`);
  console.log(`- Consents: ${consents.length}`);
  console.log(`- Invoices: ${invoices.length} (with varied amounts and payment statuses)`);
  console.log(`- Appointment Receipts: ${appointmentReceipts.length}`);
  console.log(`- Medical Orders: ${medicalOrders.length}`);
  console.log(`- Medical Consultations: ${consultations.length}`);
  console.log(`- Diagnoses: ${diagnoses.length}`);
  console.log(`- Medical Backgrounds: ${backgrounds.length}`);
  console.log(`- Prescriptions: ${prescriptions.length}`);
  console.log(`- Diagnostic Files: ${diagnosticFiles.length}`);
  console.log(`- Specialist Requests: ${specialistRequests.length}`);
  
  console.log("\n🎯 Dashboard Optimization:");
  console.log("✅ Added appointments for today, this week, this month, and this year");
  console.log("✅ Added varied invoice amounts (50k-250k range)");
  console.log("✅ Added recent user join dates for active user metrics");
  console.log("✅ Added user reviews with varied ratings (3.5-5.0)");
  console.log("✅ Added realistic payment statuses and dates");
  console.log("✅ Increased total users for better demographic data");
  console.log("\n🚀 Your dashboard should now display comprehensive data across all time periods!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });