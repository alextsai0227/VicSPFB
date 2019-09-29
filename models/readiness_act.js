const mongoose = require('mongoose');

const readinessActSchema = new mongoose.Schema({
	group_name: {type:String, required:true},
	num_people: {type:Number, required:true},
	num_hour: {type:Number, required:true},
	permission_name: {type:String, ref: 'Permission'},
});

module.exports = {
	model: mongoose.model('ReadinessAct', readinessActSchema),
	schema: readinessActSchema
}
