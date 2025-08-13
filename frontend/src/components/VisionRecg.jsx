import { useRef } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const VisionRecg = () => {
  const fileInputRef = useRef();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Prepare the file for backend upload
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("OCR Result:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="vision-comp">
      <button onClick={openFilePicker}>
        <AddAPhotoIcon />
      </button>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default VisionRecg;
