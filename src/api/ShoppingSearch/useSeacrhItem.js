import { useSuspenseQuery } from '@tanstack/react-query';
import { getShoppingData } from './ApiDetail';

const useSearchItem = (product) => {
  return useSuspenseQuery({
    queryKey: ['shoppingData', product],
    queryFn: () => getShoppingData(product),
  });
};

export default useSearchItem;
