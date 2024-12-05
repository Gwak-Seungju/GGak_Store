import { useQuery } from '@tanstack/react-query';
import { getShoppingData } from './ApiDetail';

const useSearchItem = (product) => {
  return useQuery({
    queryKey: ['shoppingData', product],
    queryFn: () => getShoppingData(product),
  });
};

export default useSearchItem;
