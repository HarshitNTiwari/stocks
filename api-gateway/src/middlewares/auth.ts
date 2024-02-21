import prisma from "../config/db";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { asyncHandler, ApiError, AsyncHandlerReturnValue } from "../utils/index";


interface JwtPayload {
    id: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user: {
            id: string 
            name: string
            email: string
        }
    }
}

const selectOptions = {
    id: true,
    email: true,
    name: true
}

export const checkLogin: AsyncHandlerReturnValue = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    // if accessToken not present in cookies, then the user wasn't logged in 
    if(!accessToken) throw new ApiError(401, "Unauthorized request!")

    const decodedToken = jwt.verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`) as JwtPayload;

    const user = await prisma.user.findUnique({
        where: {
            id: decodedToken?.id
        },
        select: selectOptions
    })

    if(!user) throw new ApiError(401, "Invalid access token!")

    req.user = user;
    next();
})

