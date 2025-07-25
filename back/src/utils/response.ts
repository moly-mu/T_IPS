import { Response } from "express";

export const succes = (
    res: Response,
    data: any,
    message: string = 'Success'
) => {
    res.status(200).json({succes: true, message, data})
};