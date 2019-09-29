const mongoose = require('mongoose');

const socialBenefitSchema = new mongoose.Schema({
	company_name: {type:String, required:true},
	service_name: {type:String, required:true},
	value: {type:mongoose.Types.Decimal128, required:true},
	permission_name: {type:String, ref: 'Permission'},
});

module.exports = {
	model: mongoose.model('SocialBenefit', socialBenefitSchema),
	schema: socialBenefitSchema
}
