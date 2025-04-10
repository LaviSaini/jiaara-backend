import { createSlice } from "@reduxjs/toolkit";


const loaderSlice = createSlice({
    name: "loaderdata",
    initialState: false,
    reducers: {
        add(state, action) {
            return action.payload

        },
        clear() {
            return false;
        }
    }
});


export const loaderData = loaderSlice.actions;
export default loaderSlice.reducer;