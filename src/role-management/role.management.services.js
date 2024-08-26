const RoleManagement = require("./role-management.model");



class role {
    /**
     * add
     */
    static async add(reqBody) {
        return await new RoleManagement(reqBody).save();
    }

    /**
     * Get
     */
    static async get(id) {
        return await RoleManagement.findOne({ _id: id }).sort({ created_at: -1 }).lean();
    }
    /**
     * Get
     */
    static async getOneByQuery(query) {
        return await RoleManagement.findOne(query).sort({ created_at: -1 }).lean();
    }
    /**
     * List
     */
    static async list(query) {
        return await RoleManagement.find(query).sort({ createdAt: -1 }).lean();
    }

    /**
     * update
     */
    static async update(id, reqBody) {
        return await RoleManagement.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    /**
     * Delete
     */
    static async delete(id) {
        return await RoleManagement.findByIdAndDelete({ _id: id }).lean();
    }
}
module.exports = role
