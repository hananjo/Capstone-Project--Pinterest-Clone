// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

// const UploadPicture = () => {
//   const history = useHistory(); // so that we can redirect after the image upload is successful
//   const [image, setImage] = useState(null);
//   const [imageLoading, setImageLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     const dispatch = useDispatch();
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", image);

//     // aws uploads can be a bit slow—displaying
//     // some sort of loading message is a good idea
//     setImageLoading(true);

//     const res = await fetch("/api/pins/images/url", {
//       method: "POST",
//       body: formData,
//     });
//     if (res.ok) {
//       let url = await res.json();
//       let image = url.url;
//       setImageLoading(false);

//       await disp;
//       history.push("/");
//     } else {
//       setImageLoading(false);
//       // a real app would probably use more advanced
//       // error handling
//       console.log("error");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files[0])}
//       />
//       <button type="submit">Submit</button>
//       {imageLoading && <p>Loading...</p>}
//     </form>
//   );
// };

// export default UploadPicture;
