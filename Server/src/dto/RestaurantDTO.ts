import { JsonValue } from "@prisma/client/runtime/library";

export interface CreateRestaurantDTO {
    name: string;
    address: string;
    phone: string;
    hours: JsonValue;
  }
  
  export interface RestaurantResponseDTO {
    id: number;
    name: string;
    address: string;
    phone: string;
    hours: JsonValue;
  }
  