const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    permission_name: {type: String, required: true, unique: true}
});

module.exports = {
	model: mongoose.model('Permission', permissionSchema),
	schema: permissionSchema
}
