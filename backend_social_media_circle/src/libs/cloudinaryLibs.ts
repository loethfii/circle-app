import { v2 } from "cloudinary";

export default new (class CloudinaryConfig2 {
  upload() {
    v2.config({
      cloud_name: "dp3rsk2xa",
      api_key: "316429343428374",
      api_secret: "PZXc988PSjpqnRf1iZPPCXc-upg",
      secure: true,
    });
  }

  async destination(image: string) {
    try {
      const cloudinary = await v2.uploader.upload("src/uploads/" + image);
      return cloudinary.secure_url;
    } catch (error) {
      throw error;
    }
  }
})();
