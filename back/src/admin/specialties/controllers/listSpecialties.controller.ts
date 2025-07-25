// src/admin/specialties/controllerr/specialties.controller.ts

import { Request, Response } from "express";
import { getAllSpecialtiesService } from "@adminSpecialties/services/";
import { HttpStatus, Message, ErrorCode } from "@constants"


export const getAllSpecialtiesController = async(_req: Request, res: Response)=>{
    try{
        const specialties = await getAllSpecialtiesService();
        res.status(HttpStatus.OK).json(specialties);
    } catch (error){
        console.error("Error getting specialties: ", error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: Message.SERVER_ERROR, error: ErrorCode.UNKNOWN});
    }
};