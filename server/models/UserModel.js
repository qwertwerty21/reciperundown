const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//schema 
const UserSchema = mongoose.Schema({
	name: {type: String, trim: true, default: 'Anon', unique: true},
	password: String,
	comment_ids: [{ type : mongoose.Schema.ObjectId, ref: 'Comment' }], //array of comment ids of comments made by user
	recipepost_ids: [{ type : mongoose.Schema.ObjectId, ref: 'RecipePost' }] //array of recipe ids of recipe post made by user
});

// UserSchema.methods.validPassword = function(password) {
//   return ( this.password === password );
// };



let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	let saltRound = 10;
	bcrypt.genSalt( saltRound, function(err, salt ){
		bcrypt.hash( newUser.password, salt, function(err, hash){
			//store hash in passowrd db
			newUser.password = hash;
			console.log('heres te return from the uder model yo', newUser)
			User.create(newUser,callback);
		});
	});
}

module.exports.comparePassword = function(attemptedPassword, hash, callback){
	bcrypt.compare( attemptedPassword, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	})
}
// module.exports.saveURL = function( newURL, callback ){
// 	newURL.save(callback)
// }

// module.exports.getUserByName = function(name, callback){
// 	let query = {name: name};
// 	User.findOne(query, callback);
// }