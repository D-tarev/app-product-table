import { nanoid } from "nanoid";
import { create } from "zustand";

import { persist } from "zustand/middleware";

export const useProducts = create(
  persist(
    (set) => ({
      products: [],
      filterLiked: false,
      addProduct: (productData) =>
        set((state) => {
          const newProduct = {
            id: nanoid(),
            quantity: productData.quantity || "Unknown",
            brand: productData.brand || "No Brand",
            imgUrl: productData.imgUrl || "https://via.placeholder.com/50",
            imgLargeUrl: "https://via.placeholder.com/50",
            liked: false,
          };
          return { products: [newProduct, ...state.products] };
        }),

      fetchProducts: async () => {
        const response = await fetch(
          "https://ru.openfoodfacts.org/products.json"
        );
        const data = await response.json();

        const transformedProducts = data.products.map((product) => ({
          key: product.id,
          id: product.id ? product.id : nanoid(),
          quantity: product.quantity
            ? product.quantity.replace(/\s+/g, "")
            : "100g",
          brand: product.brands || "Unknown",
          imgUrl:
            product.image_front_small_url || "https://via.placeholder.com/50",
          imgLargeUrl: product.image_front_url,
          categories: product.categories_tags,
          liked: false,
        }));

        set({ products: transformedProducts });
      },

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      toggleLike: (id) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, liked: !product.liked } : product
          ),
        })),
      toggleFilterLiked: () =>
        set((state) => ({
          filterLiked: !state.filterLiked, 
        })),
    }),
    {
      name: "products-storage",
      getStorage: () => localStorage,
    }
  )
);
