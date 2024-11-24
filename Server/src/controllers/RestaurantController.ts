import { Controller, Post, Body, Route, Tags, Res, TsoaResponse, Get, Path } from "tsoa";
import { RestaurantDAL } from "../dal/RestaurantDAL";
import { CreateRestaurantDTO, RestaurantResponseDTO } from "../dto/RestaurantDTO";
import { assignPhoneNumberToRestaurant } from "../utils/twilio";

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
      const restaurant = await restaurantDAL.createRestaurant(body);
      const phoneNumber = await assignPhoneNumberToRestaurant(restaurant.id);
      await restaurantDAL.updateRestaurantPhoneNumber(restaurant.id, phoneNumber);
      return successResponse(200, {
        message: "Restaurant created and phone number assigned successfully",
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          address: restaurant.address,
          phone: phoneNumber,
          hours: restaurant.hours,
        }
      });

    } catch (error: any) {
      return errorResponse(400, { message: error.message });
    }
  }

  @Get("/{id}")
  public async getRestaurant(
    @Path() id: number,
    @Res() successResponse: TsoaResponse<200, { restaurant: RestaurantResponseDTO }>,
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
          hours: restaurant.hours,
        }
      });
    } catch (error: any) {
      return errorResponse(404, { message: error.message });
    }
  }
}
