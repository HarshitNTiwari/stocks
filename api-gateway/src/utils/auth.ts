import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken"

export const hashPassword = async(password: string) => {
    return await bcyrpt.hash(password, 10);
}

export const checkPasswords = async(password: string, hashedPassword: string) => {
    return await bcyrpt.compare(password, hashedPassword);
}

const generateAccessToken = async(user: {id: string, email: string, name: string}) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name
        },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
            expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}`
        }
    )
}

const generateRefreshToken = async(user: {id: string, email: string, name: string}) => {
    return jwt.sign(
        {
            id: user.id,
        },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        {
            expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY}`
        }
    )
}

export const generateAccessAndRefreshTokens = async(user: {id: string, email: string, name: string}) => {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { accessToken, refreshToken };
}