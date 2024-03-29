import prisma from "../config/db";
import e, { Request, Response } from "express";
import { asyncHandler, AsyncHandlerReturnValue, ApiError, ApiResponse } from "../utils/index";
import { hashPassword, checkPasswords } from "../utils/auth";
import { generateAccessAndRefreshTokens } from "../utils/auth";

const selectOptions = {
    id: true,
    email: true,
    name: true
}

const cookieOptions = {
    httpOnly: true,
    secure: true
}

export const loginUser: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const {email, password}: {email: string, password: string} = req.body

    if([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!")
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(!user) throw new ApiError(409, "User does not exist!")

    const isPasswordCorrect = checkPasswords(password, user.password);
    if(!isPasswordCorrect) throw new ApiError(401, "Invalid user credentials!");

    const {accessToken, refreshToken}: {accessToken: string, refreshToken: string} = await generateAccessAndRefreshTokens(user);

    const loggedInUser = await prisma.user.update({
        where: {
            email: user.email
        },
        data: {
            refreshToken: refreshToken
        },
        select: selectOptions
    })

    return res.status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully!"
        )
    )
})

export const registerUser: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, demat_account, depository, depository_participant, is_active }: {name: string, email: string, password: string, demat_account: number, depository: string, depository_participant: string, is_active: boolean} = req.body;

    if([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!")
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(existingUser) throw new ApiError(409, "User with email already exists!");
    
    const createdUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: await hashPassword(password),
            demat_account: demat_account,
            depository: depository,
            depository_participant: depository_participant,
            is_active: is_active
        }, 
        select: selectOptions
    })

    if(!createdUser) throw new ApiError(401, "User could not be created!")
    
    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully!")
    )
})

export const logoutUser: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response) => {

    await prisma.user.update({
        where: {
            id: req.body.user.id
        },
        data:{
            refreshToken: null
        }
    })

    return res.status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully!"))
})