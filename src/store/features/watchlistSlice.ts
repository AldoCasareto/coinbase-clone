import { AsyncThunkAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cmpData from '../../../data/marketData';
import Coin from '../../../models/Coin';

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
      const coins = ['BTC', 'ETH', 'XRP', 'DOGE', 'SHIB', 'MANA'];
      const responses = await Promise.all(
        coins.map((coin) =>
          axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=USD`)
        )
      );

      const coinData: Coin[] = [];
      for (const [index, response] of responses.entries()) {
        const coinDetails = response.data.RAW[coins[index]].USD;
        const cmpDetails = cmpData.data.find((cmp) => coinDetails.FROMSYMBOL === cmp.symbol);
        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'N/A';

        coinData.push({
          id: coinID,
          name: coinName,
          symbol: coinDetails.FROMSYMBOL,
          price: coinDetails.PRICE,
          percentChange: coinDetails.CHANGEPCT24HOUR,
        });
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
  extraReducers: (builder) => {
    builder.addCase(fetchCoinData.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchCoinData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchListData = action.payload;
      }),
      builder.addCase(fetchCoinData.rejected, (state) => {
        state.isLoading = false;
        state.watchListData = [];
      });
  },
});

export const { updateCoinData } = watchlistSlice.actions;

export default watchlistSlice.reducer;
