import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductFilterer {
  currentPage: number;
  limit: number;
}

const initialState: IProductFilterer = {
  currentPage: 1,
  limit: 5,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductTable: (state: any, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProductTable } = productSlice.actions;

export default productSlice.reducer;
