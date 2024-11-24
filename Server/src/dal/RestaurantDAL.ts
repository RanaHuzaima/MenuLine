// src/dal/restaurantDAL.ts
import { PrismaClient, Restaurant } from "@prisma/client";

const prisma = new PrismaClient();

export class RestaurantDAL {
  // Create a new restaurant
  async createRestaurant(data: { name: string; address: string; phone: string; hours: any }): Promise<Restaurant> {
    return prisma.restaurant.create({
      data,
    });
  }

  // Update the restaurant's phone number after it's been assigned
  async updateRestaurantPhoneNumber(id: number, phoneNumber: string): Promise<Restaurant> {
    return prisma.restaurant.update({
      where: { id },
      data: { phone: phoneNumber },
    });
  }

  // Get restaurant by ID
  async getRestaurantById(id: number): Promise<Restaurant | null> {
    return prisma.restaurant.findUnique({
      where: { id },
      include: {
        menu: true,
        faqs: true,
      },
    });
  }
}
