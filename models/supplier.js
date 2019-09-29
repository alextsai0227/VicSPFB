const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const supplierSchema = new Schema({
	email: {type: String, required:true, unique:true},
	hash: String,
  	salt: String,
	phone:  String,
	street:  String,
	suburb:  String,
	state:  String, 
    abn: String, 
    company_name: String,
    application_id: {type: mongoose.Schema.Types.ObjectId, ref:'Application'}
});

supplierSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

supplierSchema.methods.validatePassword = function(password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};
  
supplierSchema.methods.generateJWT = function() {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);
  
	return jwt.sign({
	  email: this.email,
	  id: this._id,
	  exp: parseInt(expirationDate.getTime() / 1000, 10),
	}, 'secret');
}
  
supplierSchema.methods.toAuthJSON = function() {
	return {
	  _id: this._id,
	  email: this.email,
	  token: this.generateJWT(),
	};
};

supplierSchema.methods.getData = function() {
	return {
	  _id: this._id,
	  email: this.email,
	  token: this.generateJWT(),
	  phone: this.phone,
	  street:  this.street,
	  suburb:  this.suburb,
	  state:  this.state, 
      abn: this.abn, 
      company_name: this.company_name,
	};
};

module.exports = {
	model: mongoose.model('Supplier', supplierSchema),
	schema: supplierSchema
}