import instance from "./axios.custom";

//classes for our product requests
class ImageRequests {
  static postOne = async (file) => {
    try {
      const response = await instance.post("/images", file);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };
  static deleteOne = async (id) => {
    try {
      const response = await instance.delete(`/images/${id}`);
      return response.data;
    } catch (err) {
      throw err.response.message;
    }
  };
}

export default ImageRequests;
