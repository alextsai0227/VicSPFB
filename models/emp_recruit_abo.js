const mongoose = require('mongoose');

const empRecruitAboSchema = new mongoose.Schema({
	supplier_id: {type: mongoose.Schema.Types.ObjectId, ref:'Supplier'},
	recruit_role: {type: String, required:true},
	recruit_year: {type: String, required: true},
	company_name: String,
});

module.exports = {
	model: mongoose.model('EmpRecruitAbo', empRecruitAboSchema),
	schema: empRecruitAboSchema
}
