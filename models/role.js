const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    permission_id: {type: mongoose.Schema.Types.ObjectId, ref:'Permission', required: true}
});

module.exports = {
	model: mongoose.model('Role', roleSchema),
	schema: roleSchema
}
