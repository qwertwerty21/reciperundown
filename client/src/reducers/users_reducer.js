import { REGISTER_USER_LOAD, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../actions/index';

const INITIAL_STATE = {
	registeredUser: { user: null, error: null, loading: false}
};

export default function( state=INITIAL_STATE, action ){
	console.log('got a user action', action)

	let error;
	switch( action.type ){


		case REGISTER_USER_LOAD: 
			console.log('lregisterUSERLOAD')
			return Object.assign({}, state, {
				registeredUser: {
					user: null,
					error: null,
					loading: true
				}
				
			});

		case REGISTER_USER_SUCCESS:
			console.log('heres the data for REGISTER_USER_SUCCESS', action.payload.data);
			return Object.assign({}, state, {
				registeredUser: {
					user: action.payload.data,
					error: null,
					loading: false
				}
			});

		case REGISTER_USER_FAIL:
			console.log('failed register user REGISTERUSERFAAIL ', action.payload)
			error = action.payload; 
			return Object.assign({}, state, {
				registeredUser: {
					user: null,
					error: error,
					loading: false
				}
				
			});

		default: 
			return state;



	}//end switch
}//end export default function