import type { JwtPayload } from "../interfaces/jwtpayload.interface";

// express name space
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}