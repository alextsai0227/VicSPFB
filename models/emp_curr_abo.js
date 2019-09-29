const mongoose = require('mongoose');

const empCurrAboSchema = new mongoose.Schema({
    emp_role: {type:String, required:true},
    emp_year: {type:String, required:true},
    permission_name: {type:String, ref: 'Permission'},
});

module.exports = {
	model: mongoose.model('EmpCurrAbo', empCurrAboSchema),
	schema: empCurrAboSchema
}
