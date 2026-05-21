import type { JwtPayload } from "../interfaces/jwtpayload.interface";


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}