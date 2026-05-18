import { Recipe } from '@models/Recipe';
import {
  LOAD_RECIPES_REQUEST,
  LOAD_RECIPES_SUCCESS,
  LOAD_RECIPES_FAILURE,
  ADD_RECIPE_REQUEST,
  UPDATE_RECIPE_REQUEST,
  DELETE_RECIPE_REQUEST,
} from '@store/actions/recipeActions';

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
};

export default function recipeReducer(
  state = initialState,
  action: any,
): RecipeState {
  switch (action.type) {
    case LOAD_RECIPES_REQUEST:
    case ADD_RECIPE_REQUEST:
    case UPDATE_RECIPE_REQUEST:
    case DELETE_RECIPE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };
    case LOAD_RECIPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
