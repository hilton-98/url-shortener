import axios from "axios";
import { ShortIdResponse } from "./response/getShortIdResponse.interface";
import { LongIdResponse } from "./response/getLongIdResponse.interface";

async function post<Req, Res>(req: Req, route: string): Promise<Res & { success: boolean }> {
   try {
     const response = await axios.post<Res>(`/api/${route}`, req, {
       headers: {
         "Content-Type": "application/json",
       },
     });
 
     const data = response.data;
     return {
       ...data,
       success: response.status === 200,
     };
   } catch (error) {
     return {
       success: false,
       ...{} as Res,
     };
   }
 }

export async function getShortId(longId: string): Promise<ShortIdResponse> {
   return await post({longId}, 'getShortId');
}

export async function getLongId(shortId: string): Promise<LongIdResponse> {
   return post({shortId}, 'getLongId');
 }