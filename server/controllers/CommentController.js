	const Models = require('../models');

	


	module.exports = {


														// CALLBACK FORMAT = callback(err, successResult)
		get: function( params, callback ){
			console.log('heres the req.params',params)
			
			//if ID is included in params find the one doc by ID
			if( params.id ){
				console.log('tried params id')
				Models.CommentModel.findById( params.id, function(err, doc){
					
					if(err){
						callback({'success': false, 'message': 'Failed to find a Comment with the ' + params.id + ' ID'}, null);
						return;
					}

					if( doc === null){
						callback({'success': false, 'message': 'Failed to find a Comment with the ' +  params.id + ' ID'}, null);
						return;
					}

					callback(null, doc);




				})
				return;
			}//end params.id if

			//if no params.id just return all the docs you find
			Models.CommentModel.find( {}, function( err, docs ){
				console.log('here the err', err)
				if(err){
						callback({'success': false, 'message': 'Failed to find a Comment'}, null);
						return;
				}

	
				callback( null, docs);

			} );

		},

		post: function( newCommentInfo, callback ){
			console.log('this is what the comment user infolooks like', newCommentInfo.user)
			let comment = Object.assign({}, newCommentInfo.body);
			
			comment['user'] = newCommentInfo.user;
			console.log('this is what the comment infolooks like', comment)
			Models.CommentModel.create( comment , function(err, result){
				if(err){
						callback({ 'success': false, 'message': 'Failed to save Comment. ' + err.message }, null);
						return;
				}
				console.log('herees the result', result)
				let query = {name: result.user.name}
				
				Models.UserModel.update(query, {$push: {comment_ids: result._id}}, {upsert:true},function(err, numAff ){
					if(err){
						callback({'success': false, 'message': 'Failed to update User Model comment_ids' + err.message}, null);
						return;
					}
					console.log('numaff by update to Usermodel comment ids', numAff)
					
				});
				callback(null, { 'success': true, 'result': result });
				return
			});
		},

		put: function(){},

		delete: function(){}
	}