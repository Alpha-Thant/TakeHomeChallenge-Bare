import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";


const store = configureStore({
    reducer: {
        pokemon: pokemonSlice,
    }
});

export default store;