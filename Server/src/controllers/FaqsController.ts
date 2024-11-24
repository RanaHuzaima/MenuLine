import { Controller, Post, Body, Route, Tags, Res, TsoaResponse, Get, Path, Query, Put, Delete } from "tsoa";
import { FaqsDAL } from "../dal/FaqsDAL";
import { CreateFaqDTO, FaqResponseDTO, UpdateFaqDTO } from "../dto/FaqDTO";

const faqsDAL = new FaqsDAL();

@Route("api/v1/faqs")
@Tags("FAQs")
export class FaqController extends Controller {
    @Post("/")
    public async addFaq(
        @Body() body: CreateFaqDTO,
        @Res() successResponse: TsoaResponse<200, { message: string; faq: FaqResponseDTO }>,
        @Res() errorResponse: TsoaResponse<400, { message: string }>
    ): Promise<void> {
        try {
            const faq = await faqsDAL.createFaq(body);
            return successResponse(200, {
                message: "FAQ added successfully",
                faq,
            });
        } catch (error: any) {
            return errorResponse(400, { message: error.message });
        }
    }

    @Get("/")
    public async getFaqs(
        @Query() restaurantId: number,
        @Res() successResponse: TsoaResponse<200, { faqs: FaqResponseDTO[] }>,
        @Res() errorResponse: TsoaResponse<400, { message: string }>
    ): Promise<void> {
        try {
            const faqs = await faqsDAL.getFaqsByRestaurantId(restaurantId);
            if (faqs.length === 0) {
                return errorResponse(400, { message: "No FAQs found for this restaurant." });
            }
            return successResponse(200, { faqs });
        } catch (error: any) {
            return errorResponse(400, { message: error.message });
        }
    }

    @Put("/{faqId}")
    public async updateFaq(
        faqId: number,
        @Body() body: UpdateFaqDTO,
        @Res() successResponse: TsoaResponse<200, { message: string; faq: FaqResponseDTO }>,
        @Res() errorResponse: TsoaResponse<400, { message: string }>
    ): Promise<void> {
        try {
            const faq = await faqsDAL.updateFaq(faqId, body);
            return successResponse(200, {
                message: "FAQ updated successfully",
                faq,
            });
        } catch (error: any) {
            return errorResponse(400, { message: error.message });
        }
    }

    @Delete("/{faqId}")
    public async deleteFaq(
        faqId: number,
        @Res() successResponse: TsoaResponse<200, { message: string }>,
        @Res() errorResponse: TsoaResponse<400, { message: string }>
    ): Promise<void> {
        try {
            await faqsDAL.deleteFaq(faqId);
            return successResponse(200, { message: "FAQ deleted successfully" });
        } catch (error: any) {
            return errorResponse(400, { message: error.message });
        }
    }
}
