import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      bucket: [],
      setBucket: (data) => set({ bucket: data }),
      addItem: (item) => set((state) => ({ bucket: [...state.bucket, item] })),
      removeItem: (productId) =>
        set((state) => ({ bucket: state.bucket.filter((item) => item.productId !== productId) })),
      clearBucket: () => set({ bucket: [] }),

      visitedProduct: [],
      addVisitedProduct: (item) => {
        const { visitedProduct } = get();
        const existingIndex = visitedProduct.findIndex((i) => i.title === item.title);

        if (existingIndex !== -1) {
          // 이미 방문한 상품인 경우, 해당 상품을 배열의 맨 앞으로 이동
          const updatedVisitedProduct = [
            visitedProduct[existingIndex],
            ...visitedProduct.slice(0, existingIndex),
            ...visitedProduct.slice(existingIndex + 1),
          ];
          set({ visitedProduct: updatedVisitedProduct });
        } else {
          // 새로운 상품인 경우, 배열의 맨 앞에 추가
          set({ visitedProduct: [item, ...visitedProduct] });
        }
      },

      clearVisitedProduct: () => set({ visitedProduct: [] }),
    }),
    {
      name: 'storage-key',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
