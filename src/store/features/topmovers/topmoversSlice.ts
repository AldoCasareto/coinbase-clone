import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cmpData from '../../../../data/marketData';
import Coin from '../../../../models/Coin';

const initialState = {
  topMoversData: [] as Coin[],
  isLoading: false,
};

export const fetchTopMoversData: any = createAsyncThunk(
  'topmovers/fetchTopMoversData',
  async (_, thunkAPI) => {
    try {
      const { data: cbResponse } = await axios.get('https://api.pro.coinbase.com/products');

      const cbUSD = cbResponse.filter(
        ({ quote_currency }: { quote_currency: string }) => quote_currency === 'USD'
      );
      const availableCoins = cbUSD.map(
        ({ base_currency }: { base_currency: string }) => base_currency
      );

      const { data: cryptoResponseData } = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${availableCoins
          .slice(0, 200)
          .join()}`
      );

      const dataAsArray = Object.values(cryptoResponseData.RAW);

      dataAsArray.sort((a: any, b: any) =>
        (a.USD.CHANGEPCT24HOUR as number) < (b.USD.CHANGEPCT24HOUR as number) ? 1 : -1
      );

      const coinData = dataAsArray.map(({ USD }: any) => {
        const cmpDetails = cmpData.data.find(
          ({ symbol }: { symbol: string }) => USD.FROMSYMBOL === symbol
        );
        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'N/A';

        return {
          id: coinID,
          name: coinName,
          symbol: USD.FROMSYMBOL,
          price: USD.PRICE,
          percentChange: USD.CHANGEPCT24HOUR,
        };
      });

      return coinData.slice(0, 6);
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

const topMoversSlice = createSlice({
  name: 'topMovers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopMoversData.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchTopMoversData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topMoversData = action.payload;
      }),
      builder.addCase(fetchTopMoversData.rejected, (state) => {
        state.isLoading = false;
        state.topMoversData = [];
      });
  },
});

// export const { updateCoinData } = topMoversSlice.actions;

export default topMoversSlice.reducer;
