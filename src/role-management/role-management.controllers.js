const { success, error } = require("../helper/CommonResponse");
const role = require("./role.management.services");

const getAllRoleListController = async (req, res) => {
    try {
        const result = await role.list({});
        if (!result || result.length === 0) {
            return success(res, "No roles available", 204, []);
        }
        return success(res, "Roles retrieved successfully", 200, result);
    } catch (err) {
        return error(res, "Failed to retrieve roles", 500);
    }
};

const createRoleController = async (req, res) => {
    const { roleName = "user", create = false, read = false, update = false, delete: deleteAccess = false } = req.body;

    if (!roleName || typeof roleName !== "string" || roleName.trim() === "") {
        return error(res, "Valid Role Name is required", 400);
    }

    try {
        const payload = {
            roleName,
            create,
            read,
            update,
            delete: deleteAccess
        };
        const result = await role.add(payload);
        if (!result) {
            return error(res, "Role creation failed", 400);
        }
        return success(res, "Role created successfully", 201, result);
    } catch (err) {
        return error(res, err.message, 500);
    }
};

const updateRoleController = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return error(res, "Role ID is required", 400);
    }

    try {
        const updatedData = req.body;
        const result = await role.update(id, updatedData);
        if (!result) {
            return error(res, "Role update failed", 400);
        }
        return success(res, "Role updated successfully", 200, result);
    } catch (err) {
        return error(res, err.message, 500);
    }
};

const deleteRoleController = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return error(res, "Role ID is required", 400);
    }

    try {
        const result = await role.delete(id);
        if (!result) {
            return error(res, "Role deletion failed", 400);
        }
        return success(res, "Role deleted successfully", 200, []);
    } catch (err) {
        return error(res, err.message, 500);
    }
};

module.exports = {
    getAllRoleListController,
    createRoleController,
    updateRoleController,
    deleteRoleController
};
