const mongoose = require('mongoose');

const empDisabilitySchema = new mongoose.Schema({
	supplier_id: {type: mongoose.Schema.Types.ObjectId, ref:'Supplier', required: true},
    permission_name: {type:String, ref: 'Permission'},
	curr_emp: {type:Number, required:true},
	future_emp: {type:Number, required:true},
});

module.exports = {
	model: mongoose.model('EmpDisability', empDisabilitySchema),
	schema: empDisabilitySchema
}
