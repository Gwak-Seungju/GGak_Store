import axios from 'axios';

const ClientID = import.meta.env.VITE_CLIENT_ID;
const ClientSecret = import.meta.env.VITE_CLIENT_SECRET;
const URL = '/v1/search/shop.json';

export const getShoppingData = async (product) => {
  const response = await axios.get(URL, {
    params: {
      query: product,
      display: 100,
    },
    headers: {
      'X-Naver-Client-Id': ClientID,
      'X-Naver-Client-Secret': ClientSecret,
    },
  });

  return response.data.items;
};
