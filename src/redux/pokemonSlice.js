import {createSlice } from '@reduxjs/toolkit'

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    showModal: false,
    paidModal: false,
    selectedCardList: [],
    type: '',
    set: '',
    rarity: '',
    cardName: '',
  },
  reducers: {
    showModalUpdate(state, action) {
        state.showModal = action.payload;
    },
    paidModalUpdate(state, action) {
      if(action.payload) {

        // It's paid and remove from the card
        state.selectedCardList = [];
        state.showModal = false;
      }
      state.paidModal = action.payload;
    },
    cardAdd(state, action){
      state.selectedCardList.push(action.payload);
    },
    cardRemove(state, action){
      const index = state.selectedCardList.findIndex((card) => card.id === action.payload.id);

      if(index > -1) {
        state.selectedCardList.splice(index, 1); // deleting
      }
    },    
    clearCardList(state) {
      state.selectedCardList = [];
    },

    increaseCardCount(state, action) {
      const countIndex = state.selectedCardList.findIndex((card) => card.id === action.payload);
      if(countIndex > -1) {
        state.selectedCardList[countIndex].count += 1; 
      }
    },

    decreaseCardCount(state, action) {
      const countIndex = state.selectedCardList.findIndex((card) => card.id === action.payload);
      if(countIndex > -1) {
        state.selectedCardList[countIndex].count -= 1; 
      }
    },

    changeType(state, action) {
      state.type = action.payload;
    },

    changeSet(state, action) {
      state.set = action.payload;
    },

    changeRarity(state, action) {
      state.rarity = action.payload;
    },

    changeCardName(state, action) {
      state.cardName = action.payload;
    },



  },
})
export const {showModalUpdate, paidModalUpdate, cardAdd, cardRemove, clearCardList, increaseCardCount, decreaseCardCount, 
  changeType, changeSet, changeRarity, changeCardName,
} = pokemonSlice.actions

export default pokemonSlice.reducer

export const selectType = (type, types) => type === '' ? true : types.includes(type);
export const selectSet = (stateSet, set) => stateSet === '' ? true : stateSet === set;
export const selectRarity = (stateRarity, rarity) => stateRarity === '' ? true : stateRarity === rarity;
export const selectCardName = (stateCardName, name) => stateCardName === '' ? true : name.includes(stateCardName);

