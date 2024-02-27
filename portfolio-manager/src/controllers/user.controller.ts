import prisma from "../config/db";
import { Request, Response } from "express";
import { asyncHandler, AsyncHandlerReturnValue, ApiError, ApiResponse } from "../utils/index";

const selectOptions = {
    id: true,
    name: true,
    email: true,
    demat_account: true,
    depository: true,
    depository_participant: true,
    is_active: true,
    watchlists: true
}

export const getUserDetails: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.body.user.id;

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: selectOptions
    })

    if(!user) throw new ApiError(401, "User not found!");

    return res.status(200).json(
        new ApiResponse(200, user, "User found Successfully!")
    )
})

export const deleteUser: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.body.user.id;

    const user = await prisma.user.delete({
        where: {
            id: userId
        }
    })

    return res.status(200).json(
        new ApiResponse(200, user, "User deleted Successfully!")
    )
})