const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
	supplier_id: {type: mongoose.Schema.Types.ObjectId, ref:'Supplier', required: true},
	emp_abo: [],
	emp_disability: [],
	emp_refugee: [],
	emp_unemploy: [],
	status: {type: String, default: 'Unverified'},
	abo_existing_data_status: '',
	numEmp: Number,
	company_name: String,
	created_date: Date
});

applicationSchema.methods.getData = function() {
	return {
	  _id: this._id,
	  supplier_id: this.supplier_id,
	  emp_abo: this.emp_abo,
	  emp_disability:  this.emp_disability,
	  emp_refugee:  this.emp_refugee,
	  emp_unemploy:  this.emp_unemploy,
	  status: this.status,
	  numEmp: this.numEmp,
	  company_name: this.company_name,
	  abo_existing_data_status: this.abo_existing_data_status
	};
};

module.exports = {
	model: mongoose.model('Application', applicationSchema),
	schema: applicationSchema
}
