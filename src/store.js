import { createStore } from 'redux';

// definir le type d'action qui permet au reducer d'ajouter une nouvelle ville dans searchlocations 
const ADD_LOCATION = 'ADD_LOCATION';

// Création d'une action avec le type ADD_LOCATION
export const addLocation = (location) => ({
  type: ADD_LOCATION,
  payload: location,
});

// Initial State : pour stocker les locations ajoutées par l'action "ADD_LOCATION". 
const initialState = {
  searchlocations: [],
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return {
        ...state,
        searchlocations: [...state.searchlocations, action.payload],
      };
    default:
      return state;
  }
};

// Create Store
const store = createStore(rootReducer);

export default store;


















































































