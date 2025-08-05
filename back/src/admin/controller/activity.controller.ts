import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCitas = async (req: Request, res: Response) => {
  const result = await prisma.appointment.findMany({
    include: {
      Paciente: { include: { User: { include: { credential_users: true } } } },
      Specialist: {
        include: { User: { include: { credential_users: true } } },
      },
      Specialty: true,
      Invoice: true,
      MedicalOrder: true,
    },
    orderBy: { appoint_init: "desc" },
    take: 100,
  });
  res.json(
    result.map((a) => ({
      id: a.id,
      paciente: `${a.Paciente.User.firstname} ${a.Paciente.User.lastname}`,
      documento: a.Paciente.User.credential_users.document,
      especialista: `${a.Specialist.User.firstname} ${a.Specialist.User.lastname}`,
      documentoE: a.Specialist.User.credential_users.document,
      fecha: a.appoint_init.toISOString().slice(0, 10),
      hora: a.appoint_init.toISOString().slice(11, 16),
      estado: a.state,
      tipo: a.Specialty.service,
    }))
  );
};

export const getPagos = async (req: Request, res: Response) => {
  const pagos = await prisma.invoice.findMany({
    include: {
      Patient: { include: { User: { include: { credential_users: true } } } },
      Appointment: { include: { Specialty: true } },
    },
    orderBy: { issuedDate: "desc" },
    take: 100,
  });
  res.json(
    pagos.map((p) => ({
      id: p.id,
      paciente: `${p.Patient.User.firstname} ${p.Patient.User.lastname}`,
      documento: p.Patient.User.credential_users.document,
      monto: p.amount,
      fecha: p.issuedDate.toISOString().slice(0, 10),
      metodo: p.paymentMethod,
      concepto: p.Appointment.Specialty.service,
      estado: p.paymentStatus,
    }))
  );
};

export const getRegistros = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: { credential_users: true, rol: true },
    orderBy: { joinDate: "desc" },
    take: 100,
  });
  res.json(
    users.map((u) => ({
      id: u.id,
      usuario: `${u.firstname} ${u.lastname}`,
      documento: u.credential_users.document,
      email: u.credential_users.email,
      telefono: u.phone,
      fecha: u.joinDate.toISOString().slice(0, 10),
      estado: u.status,
    }))
  );
};

export const getRatings = async (req: Request, res: Response) => {
  const reviews = await prisma.userReview.findMany({
    include: {
      reviewer: { include: { credential_users: true } },
      reviewed: { include: { credential_users: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  res.json(
    reviews.map((r) => ({
      id: r.id,
      paciente: `${r.reviewer.firstname} ${r.reviewer.lastname}`,
      documento: r.reviewer.credential_users.document,
      especialista: `${r.reviewed.firstname} ${r.reviewed.lastname}`,
      documentoE: r.reviewed.credential_users.document,
      rating: r.rating,
      fecha: r.createdAt.toISOString().slice(0, 10),
      comentario: r.comment ?? "",
    }))
  );
};

export const getHistorias = async (req: Request, res: Response) => {
  const files = await prisma.diagnosticFile.findMany({
    include: {
      medicalHistory: {
        include: {
          Patient: {
            include: { User: { include: { credential_users: true } } },
          },
        },
      },
    },
    orderBy: { studyDate: "desc" },
    take: 100,
  });
  res.json(
    files.map((f) => ({
      id: f.id,
      paciente: `${f.medicalHistory.Patient.User.firstname} ${f.medicalHistory.Patient.User.lastname}`,
      documento: f.medicalHistory.Patient.User.credential_users.document,
      especialista: "-", // o extraer si está registrado en diagnóstico
      documentoE: "",
      tipo: f.fileType,
      fecha: f.studyDate.toISOString().slice(0, 10),
      archivo: f.fileName,
    }))
  );
};
