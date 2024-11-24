import { JsonValue } from "@prisma/client/runtime/library";

export interface CreateRestaurantDTO {
    name: string;
    address: string;
    phone?: string | null;
    hours: hours[];
  }

  export interface hours {
    dayOfWeek: string; 
    openTime: string; 
    closeTime: string 
  }
  
  export interface RestaurantResponseDTO {
    id: number;
    name: string;
    address: string;
    phone?: string | null;
    twilioPhone?: string | null;
    hours: hours[];
  }

  export interface GetRestaurantByIdResponseDTO extends RestaurantResponseDTO {
    locations: LocationResponseDTO[];
    specialHours: SpecialHourResponseDTO[];
  }

  export interface CreateSpecialHourDTO {
    restaurantId: number;
    locationId?: number;
    date: string; // Format: YYYY-MM-DD
    openTime?: string;
    closeTime?: string;
    reason: string;
    isClosed: boolean;
  }

  export interface SpecialHourResponseDTO {
    id: number;
    restaurantId: number;
    locationId?: number;
    date: Date;
    openTime?: string;
    closeTime?: string;
    reason: string;
    isClosed: boolean;
  }

  export interface CreateLocationDTO {
    restaurantId: number;
    address: string;
    phoneNumber: string;
  }
  
  export interface LocationResponseDTO {
    id: number;
    restaurantId: number;
    address: string;
    phoneNumber: string;
  }
  
  