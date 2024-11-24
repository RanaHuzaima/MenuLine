export interface CreateMenuItemDTO {
  restaurantId: number;
  name: string;
  price: number;
  category: string;
  available: boolean;
}

export interface MenuItemResponseDTO {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  category: string;
  available: boolean;
}
