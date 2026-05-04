import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  lastCountrySearch: string;
  lastWeatherSearch: string;
}

const initialState: SearchState = {
  lastCountrySearch: '',
  lastWeatherSearch: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (
      state,
      action: PayloadAction<{ category: 'country' | 'weather'; query: string }>
    ) => {
      const { category, query } = action.payload;
      if (!query.trim()) return;

      if (category === 'country') {
        state.lastCountrySearch = query;
      } else if (category === 'weather') {
        state.lastWeatherSearch = query;
      }
    },
  },
});

export const { addSearch } = searchSlice.actions;
export default searchSlice.reducer;
