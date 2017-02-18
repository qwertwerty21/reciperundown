	const Models = require('../models');
	const fs = require('fs');
	const async = require('async');
	const gm = require('gm');

	const sendJsonResponse = function(res, status, content){
		res.status(status).json(content);
	}


	module.exports = {


	
		getPosts: function( req, res ){
	
			let params = req.params;
			//if ID is included in params find the one doc by ID
			if( params.id ){
				console.log('id present in req.params')
				Models.RecipePostModel
					.findById(params.id)
					.sort({timestamp: -1})
					.exec((err, doc)=>{
						if(err){
							sendJsonResponse(res, 400, err);
							return;
						}
						if(!doc){
							console.log('No such doc exists')
							sendJsonResponse(res, 400, err);
							return;
						}
						sendJsonResponse(res, 200, doc);
					})
					return;
			}//end params.id if

			//if no params.id just return all the docs you find
			Models.RecipePostModel
				.find({})
				.sort({timestamp:-1})
				.exec((err, docs)=>{
					if(err){
						sendJsonResponse(res, 400, err);
						return;
					}
					sendJsonResponse(res, 200, docs);
				})
				return;
				
		},
		//make a new recipepost (requires a SINGLE gif NOT an array of imgs)
		createPost: function( req, res ){
			console.log('this os the req.body',req.body)
			
			
			//copy file object and decode base64
			let file = new Buffer(req.body.recipe_gif, 'base64');
			console.log('buffer file', file)
			//copy recipe info body
			let body = Object.assign({}, req.body);
			//assign user to body( if user is null should default to 'Anon' in Model)
			body['user'] = req.user;
			
			let folderPath = '../client/build/uploads/';

			function saveFileToFolder( file, folderPath ){

				function getRandomNumberString( num ){
					return Math.floor((Math.random() * num ) + 1).toString()
				}
				//TODO CRETE A FUNCTION TO GENERATE A UNIFORM FILENAME
				function makeUniformFilename(title, folderPath){
					let titleWithoutSpacesSlashes = title.replace(/\s+|\/+|\\+/g, '');
					return folderPath + titleWithoutSpacesSlashes + getRandomNumberString(1000);
				}
				//rename file
				let filename = makeUniformFilename( body['recipe_title'], folderPath);
				let gifFilename = filename + '.gif';
				let thumbFilename = filename + '.jpg';
				console.log('heres filename', gifFilename, 'heres thumbfilename', thumbFilename)
				//assign new filename to body recipe_gif
				body['recipe_gif'] = gifFilename;
				body['recipe_thumb'] = thumbFilename;
				//save file to uploads folder on client with writeFile
				fs.writeFile( gifFilename, file, function(err){
					if(err){
						sendJsonResponse(res, 400, err);
						return;
					}
					console.log('File Saved!')
				});//end writeFile

				//save thumbnail
				gm(file, gifFilename)
					.selectFrame(0)
					.setFormat('jpg')
					.write(thumbFilename, function(err){
						if(err){
							console.log('soemthing happened', err)
							return;
						}
						console.log('thumbnail saved')
					})
	
			}//end func saveFileToFolder

			saveFileToFolder(file, folderPath);

			//save body to db
			Models.RecipePostModel.create(body, (err, result)=>{
				if(err){
					sendJsonResponse(res, 400, err);
					return;
				}
				//update userModel by pushing recipepost id to user[recipepost_ids]
				let query = {name: result.user.name};

				Models.UserModel.update(query,
					{$push: {recipepost_ids: result._id}},
					{upsert: true},
					function(err, numAff){
						if(err){
							sendJsonResponse(res, 400, err)
							return;
						}
						//sucessfully updated UserModel
						console.log('Successfully updated UserModel. Number Affected By Update: ', numAff);
					}
				);//end update
				sendJsonResponse(res, 200, result);
			
			});//end save
			
		},
		//FOR lATER REFERENCEgdf
		saveImgsToMakeGif: function( newRecipeInfos, callback ){
			console.log('this is what the post req looks like', newRecipeInfos.body)
			console.log('this is the req. file', newRecipeInfos.files)
			
			let files = [...newRecipeInfos.files]; //copy files array
			let newRecipeInfoData = Object.assign({}, newRecipeInfos.body); //copy recipe info body
			//copy global req.user info into newRecipeInfoData.user 
			newRecipeInfoData['user'] = newRecipeInfos.user;
			let folderPath = './client/public/uploads/'


			function saveFilesToFolder( files, folderPath ){

				async.each(files, function(file){

					let filename = folderPath + file.filename+'-' + file.originalname;
					addRecipeImgToNewRecipeInfo(filename);
					
					fs.readFile(file.path, function( err, data ){
						if(err){
							callback( {'success': false, 'message': 'Failed to readFile Recipe Post.' + err.message}, null );
							return;
						}
						//read file success
						fs.writeFile( filename, data, function(err){
							if(err){
								callback( {'success': false, 'message': 'Failed to writeFile Recipe Post.' + err.message}, null );
								return;
							}
							//write file success
							console.log('File saved!')
						});//end write file
					});//end read file
				});//end async each
			}

			function addRecipeImgToNewRecipeInfo(filename){
				
				if( !newRecipeInfoData.recipe_imgs ){
					newRecipeInfoData.recipe_imgs = [];
					newRecipeInfoData.recipe_imgs.push(filename);
				}
				else{
					newRecipeInfoData.recipe_imgs.push(filename);
				}
			}

			saveFilesToFolder(files, folderPath);
			

			
			//save to db
			Models.RecipePostModel.create( newRecipeInfoData , function(err, result){
				if(err){
						callback({ 'success': false, 'message': 'Failed to save Recipe Post. ' + err.message }, null);
						return;
				}

				let query = {name: result.user.name}
				
				Models.UserModel.update(query, {$push: {recipepost_ids: result._id}}, {upsert:true},function(err, numAff ){
					if(err){
						callback({'success': false, 'message': 'Failed to update User Model comment_ids' + err.message}, null);
						return;
					}
					console.log('numaff by update to Usermodel recipepost ids', numAff)
					
				});



				
				callback(null, { 'success': true, 'result': result });
				return;
			});



			


			
		},

		put: function(){},

		delete: function(){}
	}


















