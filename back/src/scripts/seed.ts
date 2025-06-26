// src/scripts/seed.ts

// !EJECUTAR EL SCRIPT UNANICAMENTE EN UN ENTORNO DE PRUEBAS


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type SpecialistSeed = {
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  status: string;
  education: string;
  certifications: string[];
  consultations: number;
  joinDate: string;
};

// SCRIPT DE PRUEBA

async function main() {
  // Borrar datos existentes (solo en entorno de prueba)
  // await prisma.profesionalHasSpecialty.deleteMany();
  // await prisma.profesional.deleteMany();
  // await prisma.profData.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.rol.deleteMany();
  // await prisma.credentialUser.deleteMany();
  // await prisma.specialty.deleteMany();

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
    const specialty = existing ?? await prisma.specialty.create({ data: { name } });
    specialtyMap[name] = specialty.id;
  }

  const credentialUser = await prisma.credentialUser.upsert({
    where: { email: "demo@demo.com" },
    update: {},
    create: {
      document: "123456789",
      email: "demo@demo.com",
      password: "123456",
    },
  });

  const rol = await prisma.rol.upsert({
    where: { rol_name: "profesional" },
    update: {},
    create: { rol_name: "profesional" },
  });

  const specialists: SpecialistSeed[] = [
    {
      name: "Dr. Miguel Rodríguez",
      specialty: "Cardiología",
      experience: "8 años experiencia",
      rating: 4.8,
      status: "pending",
      education: "Universidad Nacional",
      certifications: ["Cardiología Intervencionista", "Ecocardiografía"],
      consultations: 234,
      joinDate: "2024-06-10",
    },
    {
      name: "Dra. Sofía Martínez",
      specialty: "Pediatría",
      experience: "12 años experiencia",
      rating: 4.9,
      status: "approved",
      education: "Universidad de los Andes",
      certifications: ["Pediatría General", "Neonatología"],
      consultations: 456,
      joinDate: "2024-06-08",
    },
    {
      name: "Dr. Luis García",
      specialty: "Medicina General",
      experience: "6 años experiencia",
      rating: 4.6,
      status: "rejected",
      education: "Universidad Javeriana",
      certifications: ["Medicina Familiar"],
      consultations: 189,
      joinDate: "2024-06-12",
    },
    {
      name: "Dra. Camila Ortega",
      specialty: "Dermatología",
      experience: "10 años experiencia",
      rating: 4.7,
      status: "pending",
      education: "Universidad del Rosario",
      certifications: ["Dermatología Clínica", "Tratamientos Estéticos"],
      consultations: 315,
      joinDate: "2024-06-11",
    },
    {
      name: "Dr. Sebastián Herrera",
      specialty: "Neurología",
      experience: "15 años experiencia",
      rating: 5.0,
      status: "approved",
      education: "Universidad de Antioquia",
      certifications: ["Neurociencia Clínica", "Electroencefalografía"],
      consultations: 510,
      joinDate: "2024-06-05",
    },
    {
      name: "Dra. Laura Pérez",
      specialty: "Ginecología",
      experience: "9 años experiencia",
      rating: 4.5,
      status: "rejected",
      education: "Universidad CES",
      certifications: ["Ginecología Oncológica", "Obstetricia"],
      consultations: 270,
      joinDate: "2024-06-09",
    },
    {
      name: "Dr. Andrés Ramírez",
      specialty: "Psiquiatría",
      experience: "7 años experiencia",
      rating: 4.3,
      status: "approved",
      education: "Universidad del Valle",
      certifications: ["Terapia Cognitivo Conductual", "Psicofarmacología"],
      consultations: 198,
      joinDate: "2024-06-06",
    },
    {
      name: "Dra. Natalia Torres",
      specialty: "Endocrinología",
      experience: "11 años experiencia",
      rating: 4.9,
      status: "pending",
      education: "Universidad de Caldas",
      certifications: ["Diabetes y Metabolismo", "Trastornos Tiroideos"],
      consultations: 342,
      joinDate: "2024-06-07",
    },
  ];

  for (const [index, specialist] of specialists.entries()) {
    const [firstname, ...rest] = specialist.name.replace("Dr. ", "").replace("Dra. ", "").split(" ");
    const lastname = rest.join(" ");

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        age: 40,
        gender: "Otro",
        sex: "Otro",
        languaje: "Español",
        document: 10000000 + index,
        document_type: "CC",
        credential_users_idcredential_users: credentialUser.id,
        rol_idrol: rol.id,
      },
    });

    const profData = await prisma.profData.create({
      data: {
        biography: `${specialist.specialty} con ${specialist.experience}.`,
        picture: Buffer.from(""),
        cv: Buffer.from(""),
        mppc: specialist.rating,
        exp_lab: "Hospital Central",
        educational_certificates: Buffer.from(specialist.certifications.join(", ")),
        degrees: Buffer.from(specialist.education),
        working_experience: specialist.experience,
        consultations: specialist.consultations,
      },
    });

    const profesional = await prisma.profesional.create({
      data: {
        status: specialist.status,
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

  console.log("Especialistas insertados exitosamente.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
