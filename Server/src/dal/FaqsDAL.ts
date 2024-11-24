import { PrismaClient } from "@prisma/client";
import { CreateFaqDTO } from "../dto/FaqDTO";

const prisma = new PrismaClient();

export class FaqsDAL {
    async createFaq(data: CreateFaqDTO): Promise<any> {
        return prisma.faq.create({
            data: {
                restaurantId: data.restaurantId,
                question: data.question,
                answer: data.answer,
            },
            select: {
                id: true,
                restaurantId: true,
                question: true,
                answer: true,
            },
        });
    }

    async getFaqsByRestaurantId(restaurantId: number): Promise<any> {
        return prisma.faq.findMany({
            where: {
                restaurantId: restaurantId,
            },
            select: {
                id: true,
                restaurantId: true,
                question: true,
                answer: true,
            },
        });
    }
    
    async updateFaq(faqId: number, data: any): Promise<any> {
        return prisma.faq.update({
            where: {
                id: faqId,
            },
            data: {
                question: data.question,
                answer: data.answer,
            },
            select: {
                id: true,
                restaurantId: true,
                question: true,
                answer: true,
            },
        });
    }

    async deleteFaq(faqId: number): Promise<void> {
        await prisma.faq.delete({
            where: {
                id: faqId,
            },
        });
    }
}
