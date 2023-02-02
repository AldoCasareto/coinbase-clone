import axios from 'axios';
import { REACT_APP_API_COINBASE } from '@env';

const realApi = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const dummyData = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

export const getCoinData = async () => {
  let response;
  try {
    response = await axios.get(realApi, {
      headers: {
        'X-CMC_PRO_API_KEY': REACT_APP_API_COINBASE,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
