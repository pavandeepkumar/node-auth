const { default: mongoose } = require("mongoose");

const roleManagementSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
    },
    create: {
        type: Boolean,
        required: true,
        default: false,
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
    delete: {
        type: Boolean,
        required: true,
        default: false,
    },
    update: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

const RoleManagement = mongoose.model('RoleManagement', roleManagementSchema);

module.exports = RoleManagement;
