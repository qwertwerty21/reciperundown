import axios from 'axios';
import { browserHistory } from 'react-router';
//recipepost constants
export const GET_RECIPEPOSTS = 'GET_RECIPEPOSTS';
export const GET_RECIPEPOSTS_LOAD = 'GET_RECIPEPOSTS_LOAD';
export const GET_RECIPEPOSTS_SUCCESS = 'GET_RECIPEPOSTS_SUCCESS';
export const GET_RECIPEPOSTS_FAIL = 'GET_RECIPEPOSTS_FAIL';

export const GET_RECIPEPOST_LOAD = 'GET_RECIPEPOST_LOAD';
export const GET_RECIPEPOST_SUCCESS = 'GET_RECIPEPOST_SUCCESS';
export const GET_RECIPEPOST_FAIL = 'GET_RECIPEPOST_FAIL';

export const CREATE_RECIPEPOST = 'CREATE_RECIPEPOST';
export const CREATE_RECIPEPOST_LOAD = 'CREATE_RECIPEPOST_LOAD';
export const CREATE_RECIPEPOST_SUCCESS = 'CREATE_RECIPEPOST_SUCCESS';
export const CREATE_RECIPEPOST_FAIL = 'CREATE_RECIPEPOST_FAIL';

export const GET_REDDITPOSTS = 'GET_REDDITPOSTS';
export const GET_REDDITPOSTS_LOAD = 'GET_REDDITPOSTS_LOAD';
export const GET_REDDITPOSTS_SUCCESS = 'GET_REDDITPOSTS_SUCCESS';
export const GET_REDDITPOSTS_FAIL = 'GET_REDDITPOSTS_FAIL';

export const GET_REDDITPOST = 'GET_REDDITPOST';
export const GET_REDDITPOST_LOAD = 'GET_REDDITPOST_LOAD';
export const GET_REDDITPOST_SUCCESS = 'GET_REDDITPOST_SUCCESS';
export const GET_REDDITPOST_FAIL = 'GET_REDDITPOST_FAIL';

//user constants
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_LOAD = 'REGISTER_USER_LOAD';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

//API config

const ROOT_URL = 'http://localhost:3000';


//CLEAN ALL THIS UP WRITE IT ALL USING REDUX THUNKS

export function getRecipePosts( id = '' ){
	if( id ){
		return (dispatch) => {
			dispatch(getRecipePostLoad());
			axios.get(`${ROOT_URL}/api/recipeposts/${id}`).then(
				//recipepost arg = array of recipeposts returned from axios get 
				recipepost => {
					dispatch(getRecipePostSuccess(recipepost));
				},
				error => {
					console.log('error in action getrecipepost', error);
					dispatch(getRecipePostFail('We can\'t get this Recipe from our servers right now.'));
				}
			);//end .then()
		}//end thunk 
	}
	else{
		return (dispatch) => {
			dispatch(getRecipePostsLoad());
			axios.get(`${ROOT_URL}/api/recipeposts/`).then(
				//recipeposts arg = array of recipeposts returned from axios get 
				recipeposts => {
					dispatch(getRecipePostsSuccess(recipeposts));
				},
				error => {
					console.log('error in action getrecipeposts', error);
					dispatch(getRecipePostsFail('We can\'t get Recipes from our servers right now.'));
				}
			);//end .then()
		}//end thunk 
	}
	
	
}

function getRecipePostLoad(){
	return{
		type: GET_RECIPEPOST_LOAD
	}
}

function getRecipePostSuccess(recipepost){
	return{
		type: GET_RECIPEPOST_SUCCESS,
		payload: recipepost
	}
}

function getRecipePostFail(errMessage){
	return {
		type: GET_RECIPEPOST_FAIL,
		payload: errMessage
	}
}

function getRecipePostsLoad(){
	return{
		type: GET_RECIPEPOSTS_LOAD
	}
}

function getRecipePostsSuccess(recipeposts){
	return {
		type: GET_RECIPEPOSTS_SUCCESS,
		payload: recipeposts
	}
}

function getRecipePostsFail(errMessage){
	return {
		type: GET_RECIPEPOSTS_FAIL,
		payload: errMessage
	}
}

const REDDITPOSTS_URL_1 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000';
const REDDITPOSTS_URL_2 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_5oq1xk';
const REDDITPOSTS_URL_3 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_5lbr33';
const REDDITPOSTS_URL_4 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_5hdrvb';
const REDDITPOSTS_URL_5 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_5eavch';
const REDDITPOSTS_URL_6 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_59srgp';
const REDDITPOSTS_URL_7 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_54568v';
const REDDITPOSTS_URL_8 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_4y24c1';
const REDDITPOSTS_URL_9 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_4y24c1';
const REDDITPOSTS_URL_10 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_4uwus7';
const REDDITPOSTS_URL_11 = 'https://www.reddit.com/r/GifRecipes/new.json?limit=1000&after=t3_4s8mon';

function getRedditUrl1(){
	return axios.get(`${REDDITPOSTS_URL_1}`);
}
function getRedditUrl2(){
	return axios.get(`${REDDITPOSTS_URL_2}`);
}
function getRedditUrl3(){
	return axios.get(`${REDDITPOSTS_URL_3}`);
}
function getRedditUrl4(){
	return axios.get(`${REDDITPOSTS_URL_4}`);
}
function getRedditUrl5(){
	return axios.get(`${REDDITPOSTS_URL_5}`);
}
function getRedditUrl6(){
	return axios.get(`${REDDITPOSTS_URL_6}`);
}
function getRedditUrl7(){
	return axios.get(`${REDDITPOSTS_URL_7}`);
}
function getRedditUrl8(){
	return axios.get(`${REDDITPOSTS_URL_8}`);
}
function getRedditUrl9(){
	return axios.get(`${REDDITPOSTS_URL_9}`);
}
function getRedditUrl10(){
	return axios.get(`${REDDITPOSTS_URL_10}`);
}
function getRedditUrl11(){
	return axios.get(`${REDDITPOSTS_URL_11}`);
}


//GET REDDIT POSTS
export function getRedditPosts(){
	return (dispatch) => {
		dispatch(getRedditPostsLoad());

		axios.all([getRedditUrl1(), getRedditUrl2()]).then(
			//redditpots arg = array of redditposts returned from axios get
			axios.spread(
				(redditposts1, redditposts2) =>{
					console.log(redditposts1, redditposts2)
					let allredditposts = [...redditposts1.data.data.children, ...redditposts2.data.data.children]
					dispatch(getRedditPostsSuccess(allredditposts));
				}
			)//end spread
		).catch((err)=>{ //end then
			console.log('error in action getredditposts', err);
			dispatch(getRedditPostsFail('We can\'t get Recipes from Reddit right now.'));
		});//end .catch()
	}//end thunk 
	
}

function getRedditPostsLoad(){
	return{
		type: GET_REDDITPOSTS_LOAD
	}
}

function getRedditPostsSuccess(redditposts){
	return {
		type: GET_REDDITPOSTS_SUCCESS,
		payload: redditposts
	}
}

function getRedditPostsFail(errMessage){
	return {
		type: GET_REDDITPOSTS_FAIL,
		payload: errMessage
	}
}

//GET SINGLE REDDIT POST

const REDDITPOST_URL = 'https://www.reddit.com/r/GifRecipes/comments/';

export function getRedditPost(id){
	if(id){
		return (dispatch)=>{
			let fullRedditUrl = `${REDDITPOST_URL}${id}.json`;

			dispatch(getRedditPostLoad());
			
			axios.get(`${fullRedditUrl}`).then(
				redditpost=>{
					dispatch(getRedditPostSuccess(redditpost));
				},
				err=>{
					console.log('error in action getredditpost', err);
					dispatch(getRedditPostFail('We can\'t get the data for this Recipe from Reddit right now.'));
				}
			);//end then()
		}//end dispatch
	}//end if id
}

function getRedditPostLoad(){
	return{
		type: GET_REDDITPOST_LOAD
	}
}

function getRedditPostSuccess(redditpost){
	return {
		type: GET_REDDITPOST_SUCCESS,
		payload: redditpost
	}
}

function getRedditPostFail(errMessage){
	return{
		type: GET_REDDITPOST_FAIL,
		payload: errMessage
	}
}

//for loading
export function createRecipePost( data ){
	//return dispatch (this is redux thunk format of writing action creators--allows you to return functions instead of pure actions)
	return (dispatch) => {
		dispatch(createRecipePostLoad());
		axios.post(`${ROOT_URL}/api/recipeposts`, data).then(
			//on sucessful post, change route and dispatch the success action to reducer
			newRecipePost =>{
				browserHistory.push('/');
				dispatch(createRecipePostSuccess(newRecipePost))
			},
			//on failed psot, catch response adn dispatch failed action to reducer
			error=>{
				console.log('error in action createRecipePost', error)
				dispatch(createRecipePostFail('It seems there was a problem with our servers. We can\'t create your Recipe right now.'));
			}//end error promise handler function
		);//end .then()
	};//end thunk dispatch function
	
	
}//end createRecipePost

function createRecipePostLoad(){
	return{
		type: CREATE_RECIPEPOST_LOAD
	}
}

//for successful creation of recipepost
function createRecipePostSuccess(newRecipePost){
	return {
		type: CREATE_RECIPEPOST_SUCCESS,
		payload: newRecipePost
	}
}

function createRecipePostFail(errMessage){
	return {
		type: CREATE_RECIPEPOST_FAIL,
		payload: errMessage
	}
}

//register user acitons
export function registerUser( userData ){
	return (dispatch) => {
		dispatch(registerUserLoad());
		axios.post(`${ROOT_URL}/api/register`, userData).then(
			//on successful creation of user register, redirect to login page and dispatch sucess actoin to reducer
			newUserData=>{
				browserHistory.push('/login');
				dispatch(registerUserSuccess(newUserData));
			},
			error=>{
				console.log('error in action registerUser', error)
				dispatch(registerUserFail('It seems there was a problem with our servers. We can\'t Register your Account right now.'));
			}
			
		);//end then()
	}//end thunk dispatch
}//end register user

function registerUserLoad(){
	return{
		type: REGISTER_USER_LOAD
	}
}

function registerUserSuccess(newUserData){
	return{
		type: REGISTER_USER_SUCCESS,
		payload: newUserData
	}
}

function registerUserFail(errMessage){
	return{
		type: REGISTER_USER_FAIL,
		payload: errMessage
	}
}



























