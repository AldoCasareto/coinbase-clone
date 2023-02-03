import { getCoinData } from './../../utils/fetchCoins';
import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { CombinedState } from 'redux';
import { AnyAction } from 'redux';
import Coin from '../../../models/Coin';
import { WatchlistState } from '../reducers/watchlist';

export const SET_WATCHLIST_DATA = 'SET_WATCHLIST_DATA';

export const fetchCoinData = (): ThunkAction<
  Promise<void>,
  CombinedState<{ watchlist: WatchlistState }>,
  undefined,
  AnyAction
> => {
  return async (
    dispatch: ThunkDispatch<CombinedState<{ watchlist: WatchlistState }>, undefined, AnyAction>
  ) => {
    const coins = ['BTC', 'ETH', 'XRP', 'DOGE', 'SHIB', 'MANA'];

    try {
      const cryptoResponse = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      );
      const cryptoResponseData = await cryptoResponse.data;

      const coinData: Coin[] = [];

      const coinsDetails = coins.map((coin) => cryptoResponseData.RAW[coin].USD);
      for (const coinDetail of coinsDetails) {
        const cmpDetails = (await getCoinData()).data.find(
          (coindtl: Coin) => coindtl.symbol === coinDetail.FROMSYMBOL
        );

        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'N/A';

        const coin = {
          id: coinID,
          name: coinName,
          symbol: coinDetail.FROMSYMBOL,
          price: coinDetail.CHANGEPCT24HOUR,
          percentChange: coinDetail.PRICE,
        };

        coinData.push(coin);
      }

      console.log(`foo = `, coinData);

      dispatch({ type: SET_WATCHLIST_DATA, payload: coinData });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatedCoinData = (newData: Coin[]) => {
  return async (dispatch: ThunkDispatch<WatchlistState, void, Action>) => {
    dispatch({
      type: SET_WATCHLIST_DATA,
      coinData: newData,
    });
  };
};
