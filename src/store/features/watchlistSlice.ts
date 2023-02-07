import { AsyncThunkAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Coin from '../../../models/Coin';
import { getCoinData } from '../../utils/fetchCoins';

export type WatchlistState = {
  watchListData: Coin[];
  isLoading: boolean;
};

const initialState: WatchlistState = {
  watchListData: [],
  isLoading: true,
};

export const fetchCoinData: any = createAsyncThunk(
  'watchlist/fetchCoinData',
  async (_, thunkAPI) => {
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

      return coinData;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,

  reducers: {
    updateCoinData: (state, action) => {
      state.watchListData = action.payload;
    },
  },
  extraReducers: {
    [fetchCoinData.pending]: (state: WatchlistState) => {
      state.isLoading = false;
    },
    [fetchCoinData.fulfilled]: (state: WatchlistState, action) => {
      state.isLoading = true;
      state.watchListData = action.payload;
    },
    [fetchCoinData.rejected]: (state: WatchlistState) => {
      state.isLoading = false;
    },
  },
});

export const { updateCoinData } = watchlistSlice.actions;

export default watchlistSlice.reducer;
