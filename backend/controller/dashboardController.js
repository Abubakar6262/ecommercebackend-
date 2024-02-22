const userModel = require('../models/userModel')
const productModel = require('../models/ProductModel')
const asynchandler = require('express-async-handler');
const path = require('path');
const fs = require('fs').promises;

const manageDashboard = asynchandler(async (req, res) => {
    // HandleTotal count for user SignIn in website
    try {
        const userCount = await userModel.countDocuments();
        // console.log(`Total number of users: ${userCount}`);
        res.status(200).json({ totalUsers: userCount })
    } catch (error) {
        console.error('Error counting users:', error);
    }
    // finally {
    //     mongoose.connection.close(); // Close the connection when done
    // }

})



// Read All products
const readproduct = asynchandler(async (req, res) => {

    try {
        const proData = await productModel.find({});
        res.status(200).json(proData)

    } catch (error) {
        console.log('Error in getting product data ===>', error)
    }

})


// Delete prodcut data
const deleteproduct = asynchandler(async (req, res) => {
    const { productId } = req.params
    console.log('This is delete product API and product id =>', productId)

    try {
        const deletedProduct = await productModel.findOneAndDelete({ _id: productId });

        const imageName = deletedProduct.image;
        // console.log(imageName)
        // const imagePath = path.join(__dirname, 'uploads', imageName);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete associated image from the 'uploads' folder
        const imagePath = `uploads/${imageName}`;
        await fs.unlink(imagePath);
        return res.json({ message: 'Product deleted successfully', deletedProduct });





    } catch (error) {
        console.log('Error in Deleting product data ===>', error)
    }

})


module.exports = {
    manageDashboard,
    readproduct,
    deleteproduct,
}