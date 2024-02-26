import prisma from "../config/db";
import { Request, Response } from "express";
import { asyncHandler, AsyncHandlerReturnValue, ApiError, ApiResponse } from "../utils/index";

export const getHoldingById: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const holdingId: string = req.params.id;

    const holding = await prisma.holding.findUnique({
        where: {
            id: holdingId
        }
    })

    if(!holding) throw new ApiError(401, "Holding not found!");

    return res.send(200).json(
        new ApiResponse(200, holding, "Holding found successfully!")
    )
})