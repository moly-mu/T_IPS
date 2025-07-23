import {Request, Response} from "express";
import * as specialtyService from "@adminSpecialties/services/specialty.service";

export const getAllSpecialties = async(req: Request, res: Response)=>{
    try{
        const specialties = await specialtyService.getAllSpecialties();
        res.status(200).json(specialties);
    } catch (error){
        console.error("Error getting specialties: ", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};