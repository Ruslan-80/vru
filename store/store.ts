import { create } from "zustand";
import axios from "axios";
import { Category, Product } from "@prisma/client";

// Типизация состояния для категорий
type StateCategory = {
    catalogData: Category[] | null;
    fetchCatalog: () => Promise<void>;
};

// Создание хранилища для категорий
export const useStoreCategory = create<StateCategory>(set => ({
    catalogData: null,
    fetchCatalog: async () => {
        try {
            const response = await axios.get("/api/catalog");
            const { category } = response.data;
            set({ catalogData: category });
        } catch (error) {
            console.error("Ошибка при получении категорий:", error);
        }
    },
}));

// Типизация состояния для продуктов
type StateProduct = {
    productData: Product[] | null;
    fetchProduct: () => Promise<void>;
};

// Создание хранилища для продуктов
export const useStoreProduct = create<StateProduct>(set => ({
    productData: null,
    fetchProduct: async () => {
        try {
            const response = await axios.get("/api/products");
            const { products } = response.data;
            set({ productData: products });
        } catch (error) {
            console.error("Ошибка при получении продуктов:", error);
        }
    },
}));
