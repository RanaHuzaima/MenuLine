import { Request as ExpressRequest } from "express";
import { verifyToken, CustomError, } from "../utils";

export interface Request extends ExpressRequest {
    profile?: any;
}

export const expressAuthentication = async (request: Request): Promise<any> => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return Promise.reject(new CustomError(401, "No token provided"));
    }
    try {
        const oAuthToken = authHeader.split(" ")[1];
        const decoded = verifyToken(oAuthToken);
        request.profile = decoded;
        return Promise.resolve(decoded);
    } catch (error) {
        return Promise.reject(new CustomError(401, "Invalid or expired token"));
    }
};
