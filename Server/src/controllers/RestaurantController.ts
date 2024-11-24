import { Controller, Post, Body, Route, Tags, Res, TsoaResponse, Get, Path } from "tsoa";
import { RestaurantDAL } from "../dal/RestaurantDAL";
import { CreateLocationDTO, CreateRestaurantDTO, CreateSpecialHourDTO, GetRestaurantByIdResponseDTO, RestaurantResponseDTO } from "../dto/RestaurantDTO";
import { assignPhoneNumberToRestaurant } from "../utils/twilio";
import { Location, SpecialHour } from "@prisma/client";

const restaurantDAL = new RestaurantDAL();

@Route("api/v1/restaurants")
@Tags("Restaurant")
export class RestaurantController extends Controller {

  @Post("/")
  public async createRestaurant(
    @Body() body: CreateRestaurantDTO,
    @Res() successResponse: TsoaResponse<200, { message: string; restaurant: RestaurantResponseDTO }>,
    @Res() errorResponse: TsoaResponse<400, { message: string }>
  ): Promise<void> {
    try {
      const { hours, ...rest } = body
      const restaurant = await restaurantDAL.createRestaurant(rest);
      await restaurantDAL.createRestaurantHours(restaurant.id, hours);
      const twilioPhoneNumber = await assignPhoneNumberToRestaurant(restaurant.id);
      await restaurantDAL.updateRestaurantPhoneNumber(restaurant.id, twilioPhoneNumber);
      return successResponse(200, {
        message: "Restaurant created and phone number assigned successfully",
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          address: restaurant.address,
          phone: restaurant.phone,
          twilioPhone: twilioPhoneNumber,
          hours: body.hours,
        }
      });

    } catch (error: any) {
      return errorResponse(400, { message: error.message });
    }
  }

  @Get("/{id}")
  public async getRestaurant(
    @Path() id: number,
    @Res() successResponse: TsoaResponse<200, { restaurant: GetRestaurantByIdResponseDTO }>,
    @Res() errorResponse: TsoaResponse<404, { message: string }>
  ): Promise<void> {
    try {
      const restaurant = await restaurantDAL.getRestaurantById(id);
      if (!restaurant) {
        return errorResponse(404, { message: "Restaurant not found" });
      }

      return successResponse(200, {
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          address: restaurant.address,
          phone: restaurant.phone,
          twilioPhone: restaurant.twilioPhone,
          hours: restaurant.hours,
          locations: restaurant.locations,
          specialHours: restaurant.specialHours,
        }
      });
    } catch (error: any) {
      return errorResponse(404, { message: error.message });
    }
  }

  @Post("/special-hours")
  public async addSpecialHour(
    @Body() body: CreateSpecialHourDTO,
    @Res() successResponse: TsoaResponse<200, { message: string; specialHour: SpecialHour }>,
    @Res() errorResponse: TsoaResponse<400, { message: string }>
  ): Promise<void> {
    try {
      const specialHour = await restaurantDAL.createSpecialHour(body);
      return successResponse(200, {
        message: "Special hour added successfully",
        specialHour,
      });
    } catch (error: any) {
      return errorResponse(400, { message: error.message });
    }
  }

  @Post("/locations")
  public async addLocation(
    @Body() body: CreateLocationDTO,
    @Res() successResponse: TsoaResponse<200, { message: string; location: Location }>,
    @Res() errorResponse: TsoaResponse<400, { message: string }>
  ): Promise<void> {
    try {
      const location = await restaurantDAL.createLocation(body);
      return successResponse(200, {
        message: "Location added successfully",
        location,
      });
    } catch (error: any) {
      return errorResponse(400, { message: error.message });
    }
  }
}
