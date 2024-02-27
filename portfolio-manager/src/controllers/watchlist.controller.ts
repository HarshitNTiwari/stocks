import prisma from "../config/db";
import { Request, Response } from "express";
import { asyncHandler, AsyncHandlerReturnValue, ApiError, ApiResponse } from "../utils/index";


export const getWatchlistById: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const watchlistId: string = req.params.id;
    const watchlist = await prisma.watchlist.findUnique({
        where: {
            watchlistId: watchlistId
        }
    })

    if(!watchlist) throw new ApiError(401, "Watchlist not found!")

    return res.status(200).json(
        new ApiResponse(200, watchlist, "Watchlist retrieved successfully!")
    )
})

export const createWatchlist: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const { watchlistname, stocks} : { watchlistname: string, stocks: string[]} = req.body;
    
    // stocks array shouldn't be empty
    if(stocks.length === 0) { throw new ApiError(401, "Atleast one stock needs to be added!!") }

    const createdWatchlist = await prisma.watchlist.create({
        data: {
            userId: req.body.user.id,
            name: watchlistname,
            stocks: stocks
        }
    })

    if(!createdWatchlist) throw new ApiError(401, "Watchlist could not be created!")

    return res.status(200).json(
        new ApiResponse(200, createdWatchlist, "Watchlist created successfully!")
    )
}) 

export const getWatchlistsByUser: AsyncHandlerReturnValue = asyncHandler(async(req: Request, res: Response) => {
    console.log("Inside here")
    const userId: string = req.body.user.id;
    const watchlists = await prisma.watchlist.findMany({
        where: {
            userId: userId
        }
    })

    if(!watchlists) throw new ApiError(401, "Watchlists not found!")

    return res.status(200).json(
        new ApiResponse(200, watchlists, "Watchlists retrieved successfully!")
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

    return res.status(200).json(
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

    return res.status(200).json(
        new ApiResponse(200, deletedWatchlist, "Watchlist deleted successfully!")
    )
})