// src/scripts/seed.ts

// !EJECUTAR EL SCRIPT UNICAMENTE EN UN ENTORNO DE PRUEBAS

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type SpecialistSeed = {
  name: string;
  specialty: string;
  experience: string;
  status: string;
  education: string;
  certifications: string[];
  consultations: number;
  joinDate: string;
};

type PatientSeed = {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  consultations: number;
  lastConsultation: string;
  status: string;
  rating: number;
  joinDate: string;
};

async function main() {
  //Crear especialidades
  const specialtiesData = [
    "Pediatría",
    "Cardiología",
    "Medicina General",
    "Dermatología",
    "Neurología",
    "Ginecología",
    "Psiquiatría",
    "Endocrinología",
  ];

  const specialtyMap: Record<string, number> = {};

  for (const name of specialtiesData) {
    const existing = await prisma.specialty.findUnique({ where: { name } });
    const specialty =
      existing ??
      (await prisma.specialty.create({
        data: {
          name,
          status: "Activo",
          price: 50000,
          service: `Consulta de ${name}`,
          duration: 30,
        },
      }));
    specialtyMap[name] = specialty.id;
  }

  const rol = await prisma.rol.upsert({
    where: { rol_name: "profesional" },
    update: {},
    create: { rol_name: "profesional" },
  });

  const rolPaciente = await prisma.rol.upsert({
    where: { rol_name: "paciente" },
    update: {},
    create: { rol_name: "paciente" },
  });

  const specialists: SpecialistSeed[] = [
    {
      name: "Dr. Miguel Rodríguez",
      specialty: "Cardiología",
      experience: "8 años experiencia",
      status: "Pendiente",
      education: "Universidad Nacional",
      certifications: ["Cardiología Intervencionista", "Ecocardiografía"],
      consultations: 234,
      joinDate: "2024-06-10",
    },
    {
      name: "Dra. Sofía Martínez",
      specialty: "Pediatría",
      experience: "12 años experiencia",
      status: "Activo",
      education: "Universidad de los Andes",
      certifications: ["Pediatría General", "Neonatología"],
      consultations: 456,
      joinDate: "2024-06-08",
    },
    {
      name: "Dr. Luis García",
      specialty: "Medicina General",
      experience: "6 años experiencia",
      status: "Inactivo",
      education: "Universidad Javeriana",
      certifications: ["Medicina Familiar"],
      consultations: 189,
      joinDate: "2024-06-12",
    },
    {
      name: "Dra. Camila Ortega",
      specialty: "Dermatología",
      experience: "10 años experiencia",
      status: "Pendiente",
      education: "Universidad del Rosario",
      certifications: ["Dermatología Clínica", "Tratamientos Estéticos"],
      consultations: 315,
      joinDate: "2024-06-11",
    },
    {
      name: "Dr. Sebastián Herrera",
      specialty: "Neurología",
      experience: "15 años experiencia",
      status: "Activo",
      education: "Universidad de Antioquia",
      certifications: ["Neurociencia Clínica", "Electroencefalografía"],
      consultations: 510,
      joinDate: "2024-06-05",
    },
    {
      name: "Dra. Laura Pérez",
      specialty: "Ginecología",
      experience: "9 años experiencia",
      status: "Inactivo",
      education: "Universidad CES",
      certifications: ["Ginecología Oncológica", "Obstetricia"],
      consultations: 270,
      joinDate: "2024-06-09",
    },
    {
      name: "Dr. Andrés Ramírez",
      specialty: "Psiquiatría",
      experience: "7 años experiencia",
      status: "Activo",
      education: "Universidad del Valle",
      certifications: ["Terapia Cognitivo Conductual", "Psicofarmacología"],
      consultations: 198,
      joinDate: "2024-06-06",
    },
    {
      name: "Dra. Natalia Torres",
      specialty: "Endocrinología",
      experience: "11 años experiencia",
      status: "Pendiente",
      education: "Universidad de Caldas",
      certifications: ["Diabetes y Metabolismo", "Trastornos Tiroideos"],
      consultations: 342,
      joinDate: "2024-06-07",
    },
  ];

  for (const [index, specialist] of specialists.entries()) {
    const [firstname, ...rest] = specialist.name
      .replace("Dr. ", "")
      .replace("Dra. ", "")
      .split(" ");
    const lastname = rest.join(" ");

    const document = 20010000 + index;

    const credentialUser = await prisma.credentialUser.create({
      data: {
        document,
        email: `especialista${index + 1}@demo.com`,
        password: "123456",
      },
    });

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        age: 40,
        gender: "Otro",
        sex: "Otro",
        languaje: "Español",
        document_type: "CC",
        phone: "3000000000",
        credential_users_idcredential_users: credentialUser.id,
        rol_idrol: rol.id,
        status: specialist.status as any,
      },
    });

    const profData = await prisma.profData.create({
      data: {
        biography: `${specialist.specialty} con ${specialist.experience}.`,
        picture: Buffer.from(""),
        cv: Buffer.from(""),
        exp_lab: "Hospital Central",
        educational_certificates: Buffer.from(
          specialist.certifications.join(", ")
        ),
        degrees: Buffer.from(specialist.education),
        working_experience: specialist.experience,
        consultations: specialist.consultations,
        joinDate: new Date(specialist.joinDate),
      },
    });

    const profesional = await prisma.profesional.create({
      data: {
        User_idUser: user.id,
        User_credential_users_idcredential_users: credentialUser.id,
        User_rol_idrol: rol.id,
        prof_data_idprof_data: profData.id,
      },
    });

    await prisma.profesionalHasSpecialty.create({
      data: {
        Profesional_idProfesional: profesional.id,
        Profesional_prof_data_idprof_data: profData.id,
        Profesional_User_idUser: user.id,
        Profesional_User_credential_users_idcredential_users: credentialUser.id,
        Profesional_User_rol_idrol: rol.id,
        specialty_idspecialty: specialtyMap[specialist.specialty],
      },
    });
  }

  const patients: PatientSeed[] = [
    {
      name: "Ana María García",
      email: "ana.garcia@email.com",
      phone: "+57 301 234 5678",
      age: 32,
      gender: "Femenino",
      consultations: 15,
      lastConsultation: "2025-06-10",
      status: "Activo",
      rating: 4.8,
      joinDate: "2024-03-15",
    },
    {
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      phone: "+57 312 987 6543",
      age: 45,
      gender: "Masculino",
      consultations: 28,
      lastConsultation: "2025-06-12",
      status: "Activo",
      rating: 4.6,
      joinDate: "2024-01-20",
    },
    {
      name: "María Elena Pérez",
      email: "maria.perez@email.com",
      phone: "+57 320 456 7890",
      age: 29,
      gender: "Femenino",
      consultations: 8,
      lastConsultation: "2025-05-28",
      status: "Inactivo",
      rating: 4.9,
      joinDate: "2024-08-10",
    },
    {
      name: "José Luis Martínez",
      email: "jose.martinez@email.com",
      phone: "+57 315 123 4567",
      age: 38,
      gender: "Masculino",
      consultations: 22,
      lastConsultation: "2025-06-11",
      status: "Activo",
      rating: 4.7,
      joinDate: "2024-05-05",
    },
  ];

  for (const [i, patient] of patients.entries()) {
    const [firstname, ...rest] = patient.name.split(" ");
    const lastname = rest.join(" ");

    const documentNumber = 10010001 + i;
    const cleanedPhoneStr = patient.phone.replace(/\D/g, "");
    const cleanedPhone = parseInt(cleanedPhoneStr.slice(-10), 10);

    const credential = await prisma.credentialUser.create({
      data: {
        document: documentNumber,
        email: patient.email,
        password: "123456",
      },
    });

    await prisma.user.create({
      data: {
        firstname,
        lastname,
        age: patient.age,
        gender: patient.gender,
        sex: patient.gender,
        languaje: "Español",
        document_type: "CC",
        phone: isNaN(cleanedPhone) ? "0" : cleanedPhone.toString(),
        credential_users_idcredential_users: credential.id,
        rol_idrol: rolPaciente.id,
        status: patient.status as any,
        Paciente: {
          create: {
            pac_data: {
              create: {
                medical_history: Buffer.from("Sin antecedentes importantes"),
              },
            },
          },
        },
      },
    });
  }

  console.log("Especialistas y pacientes insertados exitosamente.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
