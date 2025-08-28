import { PrismaClient } from "@prisma/client";
import { SpecialistRepository } from "../../../domain/repositories/LoginSpecialist.Repository";
import { Specialist } from "../../../domain/entities/EntityLogin";

const prisma = new PrismaClient();

export class LoginSpecialistPrismaRepository implements SpecialistRepository {
  async findByEmail(email: string): Promise<Specialist | null> {
    try {
      const credential = await prisma.credentialUser.findUnique({
        where: { email },
        include: {
          User: {
            include: {
              Especialista: {
                select: {
                  User_idUser: true,
                  spec_data: true,
                }
              },
              rol: true
            },
          },
        },
      });

      console.log('Credential found:', JSON.stringify(credential, null, 2));

      if (!credential) {
        console.log('No credential found for email:', email);
        return null;
      }

      if (!credential.User || (Array.isArray(credential.User) && credential.User.length === 0)) {
        console.log('No user found for credential:', email);
        return null;
      }

      // Prisma genera User como un array si la relación es 1:N, pero en tu modelo parece ser 1:1, así que puede ser objeto
      const user = Array.isArray(credential.User) ? credential.User[0] : credential.User;

      // Verificar que el usuario tenga rol de "Especialista"
      if (!user.rol || user.rol.rol_name !== "Especialista") {
        console.log('User does not have Especialista role:', user.rol?.rol_name);
        return null;
      }

      // Verificar que el usuario tenga un registro de especialista
      if (!user.Especialista || user.Especialista.length === 0) {
        console.log('User does not have Especialista record');
        return null;
      }

      const especialista = user.Especialista[0];

      return new Specialist(
        especialista.User_idUser,
        credential.email,
        user.status,
        credential.password
      );
    } catch (error) {
      console.error('Error in findByEmail:', error);
      return null;
    }
  }
  
}

export default LoginSpecialistPrismaRepository