const express = require('express');
const multer = require('multer');
const router = express.Router()
const productModel = require('../models/ProductModel')
const { manageDashboard, readproduct,deleteproduct } = require('../controller/dashboardController')


//All Dashboard Routes
router.get('/', manageDashboard) // Route for Dashboard Management
router.get('/readproduct', readproduct) // Getting product data
router.get('/deleteprodcut/:productId', deleteproduct) // Deleting product data



// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); //cd ==> colback function
    },
});

const upload = multer({ storage });

router.post('/addproduct', upload.single('imageurl'), async (req, res) => {
    // try {
    // console.log('req.file =====>', req)

    const { title, category, description, price, color, size, stock, createdBy, createAt } = req.body
    const imagePath = req.file.filename;

    console.log('My req file =====>', imagePath);


    const addproduct = await productModel.create({
        title, category, price, description, color, size, stock, createdBy, createAt,
        image: imagePath,
    })
    // console.log(addproduct)

    if (addproduct) {
        res.status(200).json({ message: 'product added' })
    } else {
        res.status(400).json({ message: 'product does not added' })
    }
    // } catch (error) {
    //     console.log('Error in uploading product data =>', error)
    // }

})

module.exports = router