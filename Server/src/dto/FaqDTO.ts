export interface CreateFaqDTO {
  restaurantId: number;
  question: string;
  answer: string;
}

export interface FaqResponseDTO {
  id: number;
  restaurantId: number;
  question: string;
  answer: string;
}
