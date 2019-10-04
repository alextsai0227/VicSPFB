const mongoose = require('mongoose');

const empCurrAboSchema = new mongoose.Schema({
    supplier_id: {type: mongoose.Schema.Types.ObjectId, ref:'Supplier', required: true},
    emp_role: {type:String, required:true},
    emp_year: {type:String, required:true},
    company_name: String,
});

module.exports = {
	model: mongoose.model('EmpCurrAbo', empCurrAboSchema),
	schema: empCurrAboSchema
}
