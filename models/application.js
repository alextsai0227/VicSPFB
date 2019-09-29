const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
	supplier_id: {type: mongoose.Schema.Types.ObjectId, ref:'Supplier', required: true},
	emp_recruit_abo: [],
	emp_curr_abo: [],
	emp_cohorts: [],
	social_benefit: [],
	readiness_act: [],
	status: {type: String, default: 'Unverified'},
	created_date: Date
});

applicationSchema.methods.getData = function() {
	return {
	  _id: this._id,
	  supplier_id: this.supplier_id,
	  emp_recruit_abo: this.emp_recruit_abo,
	  emp_curr_abo: this.emp_curr_abo,
	  emp_cohorts:  this.emp_cohorts,
	  social_benefit:  this.social_benefit,
	  readiness_act:  this.readiness_act,
	};
};

module.exports = {
	model: mongoose.model('Application', applicationSchema),
	schema: applicationSchema
}
