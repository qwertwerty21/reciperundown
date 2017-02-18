import { combineReducers } from 'redux';
import RecipePostsReducer from './recipeposts_reducer';
import UsersReducer from './users_reducer';

const rootReducer = combineReducers({
	recipeposts: RecipePostsReducer,
	users: UsersReducer
});

export default rootReducer;