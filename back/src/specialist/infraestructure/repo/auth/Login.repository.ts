import prisma from "../../prisma/client";
import { SpecialistRepository } from "../../../domain/repositories/LoginSpecialist.Repository";
import { Specialist } from "../../../domain/entities/EntityLogin";

export class LoginSpecialistPrismaRepository implements SpecialistRepository {
  async findByEmail(email: string): Promise<Specialist | null> {
    const credential = await prisma.credentialUser.findUnique({
      where: { email },
      include: {
        User: {
          include: {
            Especialista: true,
            rol: true,
          },
        },
      },
    });

    if (!credential || !credential.User?.[0]?.Especialista?.[0]) return null;

    const especialista = credential.User[0].Especialista[0];

    return new Specialist(
      especialista.id,
      credential.email,
      credential.User[0].status
    );
  }
  
}

export default LoginSpecialistPrismaRepository