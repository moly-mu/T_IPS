// src/admin/specialties/controllers/specialties.controller.ts

import { Request, Response } from "express";
import { GetAllSpecialtiesService } from "@adminSpecialties/application/use-cases/specialty";
//import { GetAllSpecialtyPrismaRepository } from "../../infrastructure/repositories/";
import { HttpStatus, Message, ErrorCode } from "@constants"


export const ListAllSpecialtiesController = async(_req: Request, res: Response)=>{
    try{
        const repository = new GetAllSpecialtyPrismaRepository();
        const useCase = new GetAllSpecialtiesService(repository);
        const specialties = await useCase.execute();
        res.status(HttpStatus.OK).json(specialties);
    } catch (error){
        console.error("Error getting specialties: ", error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: Message.SERVER_ERROR, error: ErrorCode.UNKNOWN});
    }
};