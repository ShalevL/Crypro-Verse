import { createSlice, configureStore } from "@reduxjs/toolkit";

const currentCryptoSlice = createSlice({
  name: "currentCryptoSlice",
  initialState: { coins: [], stats: {} },
  reducers: {
    updateCryptoData(state, action) {
      state.coins = action.payload.data.coins;
      state.stats = action.payload.data.stats;
    },
  },
});

const currentNewsSlice = createSlice({
  name: "currentNewsSlice",
  initialState: { value: [] },
  reducers: {
    updateNewsData(state, action) {
      state.value = action.payload.value;
    },
  },
});

const store = configureStore({
  reducer: {
    currentCryptoSlice: currentCryptoSlice.reducer,
    currentNewsSlice: currentNewsSlice.reducer,
  },
});

export function fetchCryptoData(count) {
  return function (dispatch) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        "X-RapidAPI-Key": "",
      },
    };
    fetch(
      `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=${
        count || 50
      }&offset=0`,
      options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        dispatch(currentCryptoSliceActions.updateCryptoData(data));
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}

export function fetchNewsData(searchByCryptoCoin) {
  return function (dispatch) {
    const options = {
      method: "GET",
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        "X-RapidAPI-Key": "",
      },
    };

    fetch(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=${searchByCryptoCoin}&cc=US&freshness=Day&textFormat=Raw&safeSearch=Off`,
      options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        dispatch(currentNewsSliceActions.updateNewsData(data));
      })
      .catch((err) => console.error(err));
  };
}

export const currentCryptoSliceActions = currentCryptoSlice.actions;
export const currentNewsSliceActions = currentNewsSlice.actions;

export default store;
