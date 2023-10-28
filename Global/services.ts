import * as cloudinary from 'cloudinary'

 const config = cloudinary.v2.config({

  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export const uploader = cloudinary.v2

