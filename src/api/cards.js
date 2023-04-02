import axios from "axios"
const API_URL = 'https://api.pokemontcg.io/v2/cards?page=1&pageSize=12';
const Rarities_URL = 'https://api.pokemontcg.io/v2/rarities';
const Sets_URL = 'https://api.pokemontcg.io/v2/sets';
const Types_URL = 'https://api.pokemontcg.io/v2/types';

export async function getCards() {
  const res = await axios
    .get(API_URL);
  return res.data;
}

export async function getCardsPaginated(page) {
  const res = await axios
    .get(API_URL, {
      params: { page: page, pageSize: 12},
    });
  return {
    cards: res.data,
  };
}

export async function getRarities() {
  const res = await axios.get(Rarities_URL);
  let rarityArray = [{label: 'All', value: ''}];
  for(let rarity of res.data.data) {
    rarityArray.push({
      label: rarity,
      value: rarity,
    })
  }
  return rarityArray;
}

export async function getSets() {
  const res = await axios.get(Sets_URL);
  let setArray = [{id: '', name: 'All'}];
  for(let set of res.data.data) {
    setArray.push({
      id: set.id,
      name: set.name,
    })
  }
  return setArray;
}

export async function getTypes() {
  const res = await axios.get(Types_URL);
    let typeArray = [{label: 'All', value: ''}];
    for(let type of res.data.data) {
      typeArray.push({
        label: type,
        value: type,
      })
    }
  return typeArray;
}
