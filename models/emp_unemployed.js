const mongoose = require('mongoose');

const empUnemployedSchema = new mongoose.Schema({
	supplier_id: {type: mongoose.Schema.Types.ObjectId, ref:'Supplier', required: true},
	curr_emp: {type:Number, required:true},
	future_emp: {type:Number, required:true},
	company_name: String,
});

module.exports = {
	model: mongoose.model('EmpUnemployed', empUnemployedSchema),
	schema: empUnemployedSchema
}
