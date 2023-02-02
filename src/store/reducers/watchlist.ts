import { AnyAction } from 'redux';
import Coin from '../../../models/Coin';
import { SET_WATCHLIST_DATA } from '../actions/watchlist';

export type WatchlistState = {
  watchListData: Coin[];
};

const initialState: WatchlistState = {
  watchListData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_WATCHLIST_DATA:
      return {
        watchlistData: action.coinData,
      };
    default:
      return state;
  }
};
