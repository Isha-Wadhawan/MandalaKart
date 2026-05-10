import { v2 as cloudinary } from "cloudinary";

export const uploadMandala = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.json({ success: false, message: "No image provided" });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "mandala_custom",
      resource_type: "image"
    });

    res.json({
      success: true,
      url: result.secure_url
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};