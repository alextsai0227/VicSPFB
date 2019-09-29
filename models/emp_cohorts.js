const mongoose = require('mongoose');

const empCohortSchema = new mongoose.Schema({
    group_name: {type:String, required:true},
    permission_name: {type:String, ref: 'Permission'},
	curr_emp: {type:Number, required:true},
	future_emp: {type:Number, required:true},
	
});

module.exports = {
	model: mongoose.model('EmpCohort', empCohortSchema),
	schema: empCohortSchema
}
