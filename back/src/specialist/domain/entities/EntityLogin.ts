export class Specialist {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly status: "Activo" | "Inactivo" | "Pendiente"
  ) {}
}