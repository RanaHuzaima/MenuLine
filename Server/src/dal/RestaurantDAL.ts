import { PrismaClient, Restaurant } from "@prisma/client";
import { CreateLocationDTO, CreateSpecialHourDTO } from "../dto/RestaurantDTO";

const prisma = new PrismaClient();

export class RestaurantDAL {
  // Create a new restaurant
  async createRestaurant(data: { name: string; address: string; phone?: string | null }): Promise<Restaurant> {
    return prisma.restaurant.create({
      data,
    });
  }

  async createRestaurantHours(restaurantId: number, hours: { dayOfWeek: string; openTime: string; closeTime: string }[]): Promise<any> {
    const hoursData = hours.map(hour => ({
      restaurantId,
      dayOfWeek: hour.dayOfWeek,
      openTime: hour.openTime,
      closeTime: hour.closeTime
    }));
    return prisma.restaurantHour.createMany({
      data: hoursData,
    });
  }

  async updateRestaurantPhoneNumber(id: number, twilioPhoneNumber: string): Promise<Restaurant> {
    return prisma.restaurant.update({
      where: { id },
      data: { twilioPhone: twilioPhoneNumber },
    });
  }

  async getRestaurantById(id: number): Promise<any> {
    return prisma.restaurant.findUnique({
      where: { id },
      include: {
        menu: true,
        faqs: true,
        hours: true,
        locations: true,
        specialHours: true,
      },
    });
  }

  async createSpecialHour(data: CreateSpecialHourDTO): Promise<any> {
    return prisma.specialHour.create({
      data: {
        restaurantId: data.restaurantId,
        locationId: data.locationId || null,
        date: new Date(data.date),
        openTime: data?.openTime,
        closeTime: data?.closeTime,
        reason: data.reason,
        isClosed: data.isClosed,
      },
    });
  }

  async createLocation(data: CreateLocationDTO): Promise<any> {
    return prisma.location.create({
      data: {
        restaurantId: data.restaurantId,
        address: data.address,
        phoneNumber: data.phoneNumber,
      },
    });
  }
}
