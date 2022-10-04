import React, { useState } from "react";
import { Card } from "reactstrap";
import FeatherIcons from "feather-icons-react";
//css
import inputstyles from "assets/css/inputimage.module.css";
import ImageRequests from "api/image.requests";

const InputImage = ({ images, updateImages }) => {
  //maintain track of the latest images
  const [loading, setLoading] = useState(false);
  const [localImages, setLocalImages] = useState(images || []);

  //upload an image on every file upload
  const handleChange = async (e) => {
    let file = e.target.files[0];
    setLoading(true);
    //prepare the form data
    const data = new FormData();
    data.append("myImage", file);

    try {
      const response = await ImageRequests.postOne(data);
      //update our local images
      setLocalImages((prev) => {
        return [
          ...prev,
          {
            imageurl: response.image.path,
          },
        ];
      });
      //use callback to keep track of the new image urls
      updateImages(response.image.path);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  //handle updates and deletes
  const handleDelete = async (url) => {
    //find the url's id
    const imageToDelete = localImages.find((image) => image.imageurl === url);
    if (!imageToDelete) return;

    //if the image is local, filter it out
    if (!("imageid" in imageToDelete)) {
      setLocalImages((prev) => prev.filter((image) => image.imageurl !== url));
      return;
    }

    //if it has an id then we will delete from database
    try {
      await ImageRequests.deleteOne(imageToDelete.imageid);
      //remove the image from the state
      setLocalImages((prev) =>
        prev.filter((image) => image.imageid !== imageToDelete.imageid)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={inputstyles.container}>
      {/**Create label for styling */}
      <div className={inputstyles.imagecontainer}>
        {/**Show preview of the images if provided */}
        {loading && <Card className={inputstyles.imagebox}>Loading</Card>}
        {localImages &&
          localImages.map((image, index) => {
            return index < 5 ? (
              <Card key={index} className={inputstyles.imagebox}>
                <button
                  onClick={() => handleDelete(image.imageurl)}
                  type="button"
                  className={inputstyles.closecircle}
                >
                  <FeatherIcons icon="x-circle" />
                </button>
                <img
                  className="img-fluid"
                  src={image.imageurl}
                  alt="red sneakers"
                />
              </Card>
            ) : null;
          })}
      </div>
      <div>
        <label htmlFor="fileupload" className={inputstyles.customfileupload}>
          Add image
        </label>
        <input
          name="myImage"
          id="fileupload"
          type="file"
          onChange={handleChange}
          className={inputstyles.fileinput}
        />
      </div>
    </div>
  );
};

export default InputImage;
