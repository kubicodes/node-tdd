import { User } from "../../src/entities/User";

declare global {
  namespace Express {
    interface Request {
      validationErrors: Record<string, string>;
    }
  }
}
