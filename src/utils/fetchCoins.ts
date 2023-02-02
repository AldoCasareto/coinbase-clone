import axios from 'axios';

const realApi = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const dummyData = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

export const getCoinData = async () => {
  let response;
  try {
    response = await axios.get(realApi, {
      headers: {
        'X-CMC_PRO_API_KEY': '2a3b675f-1ebb-4a1a-8c84-ba4ddf6b13db',
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
