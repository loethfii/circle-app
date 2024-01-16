import { v2 as cloudinary } from "cloudinary";

export default new (class ClaudinaryConfig {
  upload() {
    // dotenv.config();
    cloudinary.config({
      //   cloud_name: process.env.CLOUD_NAME,
      //   api_key: process.env.API_KEY,
      //   api_secret: process.env.API_SECRET,
      //   secure: true,
      cloud_name: "dp3rsk2xa",
      api_key: "316429343428374",
      api_secret: "PZXc988PSjpqnRf1iZPPCXc-upg",
      secure: true,
    });
  }

  async destination(image: any) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        "src/uploads/" + image
      );
      return cloudinaryResponse.secure_url;
    } catch (error) {
      throw error;
    }
  }
})();
