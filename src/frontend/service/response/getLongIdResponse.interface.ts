import { Response } from "./response.interface";

export interface LongIdResponse extends Response {
   longId?: string;
}