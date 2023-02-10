import { News } from './../../../../typings.d';
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  newsData: [] as News[],
  isLoading: false,
};

export const fetchNews = createAsyncThunk('news/fetchNews', async (_, thunkAPI) => {
  try {
    const {
      data: { Data },
    } = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');

    const newsData: News[] = Data.map((news: News) => {
      const formattedDate = new Date(news.published_on * 1000)
        .toString()
        .split(' ')
        .splice(1, 2)
        .join(' ');

      return {
        newsOutlet: news.source_info.name,
        date: formattedDate,
        title: news.title,
        imageUrl: news.imageurl,
        url: news.url,
      };
    }).slice(0, 20);

    return newsData;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong!');
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newsData = action.payload;
      }),
      builder.addCase(fetchNews.rejected, (state) => {
        state.isLoading = false;
        state.newsData = [];
      });
  },
});

export default newsSlice.reducer;
