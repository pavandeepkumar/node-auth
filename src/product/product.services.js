const Product = require("./product.model");




class product {
    /**
     * add
     */
    static async add(reqBody) {
        return await new Product(reqBody).save();
    }

    /**
     * Get
     */
    static async get(id) {
        return await Product.findOne({ _id: id }).sort({ created_at: -1 }).lean();
    }
    /**
     * Get
     */
    static async getOneByQuery(query) {
        return await Product.findOne(query).sort({ created_at: -1 }).lean();
    }
    /**
     * List
     */
    static async list({ id, query, resultsPerPage, skipCount, sortByCreatedAt, sortByName }) {
        return await Product.find({
            userId: id, "$or": [
                {
                    "name": {
                        $regex: query
                    },

                },
                {
                    "description": {
                        $regex: query
                    }
                },
                {
                    "productDetails": {
                        $regex: query
                    }
                }
            ]
        })
            .select('-image ')
            .limit(resultsPerPage)
            .skip(skipCount)
            .sort({ createdAt: sortByCreatedAt })
            .lean();

    }

    /**
     * update
     */
    static async update(id, reqBody) {
        return await Product.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    /**
     * Delete
     */
    static async delete(id) {
        return await Product.findByIdAndDelete({ _id: id }).lean();
    }
    /**
   * count Document
   */
    static async count(id) {
        return await Product.countDocuments({ userId: id }).lean();
    }
}
module.exports = product
