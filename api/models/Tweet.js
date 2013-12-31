/**
 * Tweet
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	schema: true,

  attributes: {
  	
  	text:"string",
  	lat: "float",
  	lng: "float",
  	twitter_id: "string",
  	twitter_createdAt: "string"
    
  }

};
