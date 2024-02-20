import { Request, Response, NextFunction } from "express";

type AsyncHandlerReturnValue = (req: Request, res: Response, next: NextFunction) => void;
type AsyncHandler = (
    requestHandler: (req: Request, res: Response, next: NextFunction) => void
  ) => (req: Request, res: Response, next: NextFunction) => void;

const asyncHandler: AsyncHandler = (requestHandler: (req: Request, res: Response, next: NextFunction) => void): AsyncHandlerReturnValue => {
    return (req: Request, res: Response, next: NextFunction) => { 
        Promise.resolve(requestHandler(req, res, next)).catch(err => next(err)) 
    }
}

export { asyncHandler, AsyncHandlerReturnValue }