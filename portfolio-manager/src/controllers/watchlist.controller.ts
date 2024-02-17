import prisma from "../config/db.ts";
import { Request, Response } from "express";
import { asyncHandler, AsyncHandlerReturnValue } from "../utils/asyncHandler.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts"; 

export const getWatchlistById: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const watchlistId: string = req.params.id;
    const watchlist = await prisma.watchlist.findUnique({
        where: {
            watchlistId: watchlistId
        }
    })

    if(!watchlist) throw new ApiError(401, "Watchlist not found!")

    return res.send(200).json(
        new ApiResponse(200, watchlist, "Watchlist retrieved successfully!")
    )
})