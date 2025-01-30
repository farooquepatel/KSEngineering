
const ProductDetails  = require('../model/product_Details'); 
const { failed, success, failedValidation } = require('../helper/response');

const { Validator } = require('node-input-validator');
const upload = require('../middleware/uploadimage');


const {
    Op
} = require("sequelize");


//addproduct
 exports.addProduct = async function (req, res) {
    try {
        let data = {};

        // Use multer middleware to handle file upload
        upload(req, res, async (err) => {
            if (err) {
                return failed(res, err.message);  
            }

            const requests = req.body;  

            if (!requests) {
                return failed(res, "Internal server error");
            }

            // Validate incoming request fields
            const v = new Validator(requests, {
                name: 'required',
                price: 'required',
                brand: 'required',
                application:'required',
                power:'required',
                capacity:'required',
                material:'required',
                powerSource:'required',
                phase:'required',
                frequency:'required',
            });

            const matched = await v.check();

            if (!matched) {
                return failedValidation(res, v);  
            }

            // If an image is uploaded, save the image path
            const image = req.file ? req.file.path : null;
            
            // Create the new product in the database
            const newProduct = await ProductDetails.create({
                name: requests.name,
                application: requests.application,
                price: requests.price,
                power: requests.power,
                capacity: requests.capacity,
                material: requests.material,
                powerSource: requests.powerSource,
                phase: requests.phase,
                brand: requests.brand,
                frequency: requests.frequency,
                image: image,
                
            });

            // Send a success response with the new product data
            return success(res, 'Product added successfully',data);
        });
    } catch (error) {
        return failed(res, error.message);  
    }
 };

 //get list
 exports.getProductList = async function (req, res) {
    try {
        let data = {};
        var decryptedData = await req.query; 
  
        if (!decryptedData) {
            return failed(res, "Internal server error");
        }
  
        // Pagination values
        let pageSize = decryptedData.limit ? parseInt(decryptedData.limit) : 10;
        let page = decryptedData.page ? parseInt(decryptedData.page) : 1;
        let offset = pageSize * (page - 1);
        let search = decryptedData.search ? decryptedData.search : "";
  
        // Base params (not deleted)
        let params = {};
  
        // Add search filter if provided
        if (search) {
            params = Object.assign(params, {
                name: {
                    [Op.substring]: search, 
                },
            });
        }
  
        // Declare the variable for product details
        let ProductDetailsData;
  
        // Fetch data with pagination and search filters
        ProductDetailsData = await ProductDetails.findAndCountAll({
            where: params,
            attributes: [
                "id",
                "name",
                "application",
                "price",
                "power",
                "capacity",
                "material",
                "powerSource",
                "phase",
                "brand",
                "frequency",
                "image",
                "createdAt",
            ],
            limit: pageSize,
            offset: offset,
        });
  
        // Add the full URL for the product image
        const products = ProductDetailsData.rows.map(product => {
            // If image exists, prepend the URL to the path
            if (product.image) {
                product.image = `http://localhost:8081/${product.image}`;
            }
            return product;
        });
  
        // Prepare response data
        data = {
            ProductDetails: {
                count: ProductDetailsData.count,
                rows: products,
            },
        };
  
        // Success response
        return success(res, "Success", data);
    } catch (error) {
        // Error handling
        return failed(res, error.message);
    }
  };