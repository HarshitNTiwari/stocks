import prisma from "../config/db.ts";
import { Request, Response } from "express";
import { asyncHandler, AsyncHandlerReturnValue, ApiError, ApiResponse } from "../utils/index.ts";


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

export const createWatchlist: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {

    const {userId, watchlistname, stocks}: {userId: string, watchlistname: string, stocks: string[]} = req.body;
    
    // stocks array shouldn't be empty
    if(stocks.length === 0) { throw new ApiError(401, "Atleast one stock needs to be added!!") }

    const createdWatchlist = await prisma.watchlist.create({
        data: {
            userId: userId,
            name: watchlistname,
            stocks: stocks
        }
    })

    if(!createdWatchlist) throw new ApiError(401, "Watchlist could not be created!")

    return res.send(200).json(
        new ApiResponse(200, createdWatchlist, "Watchlist created successfully!")
    )
}) 

export const updateWatchlist: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const watchlistId: string = req.params.id

    const { watchlistname, stocks }: {watchlistname: string, stocks: string[]} = req.body;

    // stocks array shouldn't be empty
    if(stocks.length === 0) { throw new ApiError(401, "Atleast one stock needs to be added!!") }

    const updatedWatchlist = await prisma.watchlist.update({
        where: {
            watchlistId: watchlistId
        },
        data: {
            name: watchlistname,
            stocks: stocks
        }
    })

    if(!updatedWatchlist) throw new ApiError(401, "Watchlist could not be updated!")

    return res.send(200).json(
        new ApiResponse(200, updatedWatchlist, "Watchlist updated successfully!")
    )
})

export const deleteWatchlistById: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const watchlistId: string  = req.params.id

    const deletedWatchlist = await prisma.watchlist.delete({
        where: {
            watchlistId: watchlistId
        }
    })

    if(!deletedWatchlist) throw new ApiError(401, "Watchlist could not be deleted!")

    return res.send(200).json(
        new ApiResponse(200, deletedWatchlist, "Watchlist deleted successfully!")
    )
})