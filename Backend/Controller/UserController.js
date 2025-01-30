const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User  = require('../model/user'); 
const { failed, success, failedValidation } = require('../helper/response');
require('dotenv').config();
const { Validator } = require('node-input-validator');
const upload = require('../middleware/upload');

const {
    Op
} = require("sequelize");


exports.login = async function (req, res) {
    try {
        var requests = req.body;

        if (!requests) {
            return failed(res, "Internal server error");
        }

        // Validating the incoming request
        const v = new Validator(requests, {
            email: 'required|email',
            password: 'required'
        });
        
        
        const matched = await v.check();

        if (!matched) {
            return failedValidation(res, v);
        }

        // Fetch the user from the database based on the email
        let user = await User.findOne({
            where: {
                email: requests.email
            },
            attributes: ['id', 'email', 'username','password'] 
        });

        // Check if the user exists
        if (!user) {
            return failed(res, "Invalid Email.");
        }

        
        // Compare the hashed password from the request with the stored password in the database
        const isPasswordValid = await bcrypt.compare(requests.password, user.password);
       

        if (!isPasswordValid) {
            return failed(res, "Invalid Password.");
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '5d' }
        );

        const expiresIn = 5 * 24 * 60 * 60;  // 5 days in seconds

        // Prepare the response data
        const data = {
            access_token: token,
            token_type: 'Bearer',
            expires_in: expiresIn, 
            username: user.username,
            email: user.email
        };

        // Send success response with the generated data
        return success(res, 'Success', data);
    } catch (error) {
        return failed(res, error.message);
    }
};


  exports.addUser = async function (req, res) {
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

            // Validating the incoming request
            const v = new Validator(requests, {
                email: 'required|email',
                password: 'required',
                username: 'required'
            });

            const matched = await v.check();

            if (!matched) {
                return failedValidation(res, v);
            }

            // Check if the user already exists based on the email
            const existingUser = await User.findOne({
                where: { email: requests.email },
            });

            if (existingUser) {
                return failed(res, "Email is already exists.");
            }

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(requests.password, 10);

            // If an image is uploaded, save the image path to the user data
            const profileImage = req.file ? req.file.path : null;

            // Create the new user in the database
            const newUser = await User.create({
                username: requests.username,
                email: requests.email,
                password: hashedPassword,
                profileImage: profileImage 
            });

            // Send success response with the new user data
            return success(res, 'User added successfully', {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                profileImage: newUser.profileImage 
            });
        });
    } catch (error) {
        return failed(res, error.message);
    }
 };


 exports.getUserList = async function (req, res) {
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
              username: {
                  [Op.substring]: search, 
              },
          });
      }
  
      // Declare the variable for user details
      let UserDetails;
  
      // Fetch data with pagination and search filters
      UserDetails = await User.findAndCountAll({
          where: params,
          attributes: [
              "Id",
              "email",
              "username",
              "createdAt",
              "profileImage", 
          ],
          limit: pageSize,
          offset: offset,
      });
  
      // Add the full URL for the profile image
      const users = UserDetails.rows.map(user => {
          // If profileImage exists, prepend the URL to the path
          if (user.profileImage) {
              user.profileImage = `http://localhost:8081/${user.profileImage}`;
          }
          return user;
      });
  
      // Prepare response data
      data = {
          UserDetails: {
              count: UserDetails.count,
              rows: users,
          },
      };
  
      // Success response
      return success(res, "Success", data);
    } catch (error) {
      // Error handling
      return failed(res, error.message);
    }
  };