import React, { useRef, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from 'axios';

const VisionRecg = () => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [ocrResult, setOcrResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setOcrResult(""); // Clear previous result
  };

  const processImage = async () => {
    if (!selectedFile) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.data;
      console.log(data);
      
      setOcrResult(data.detected_text || JSON.stringify(data));
    } catch (error) {
      console.error("Error uploading image:", error);
      setOcrResult("Error processing image.");
    } finally {
      setLoading(false);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="vision-comp" style={{ textAlign: "center" }}>
      <button onClick={openFilePicker}>
        <AddAPhotoIcon />
      </button>

      {/* Hidden input for picking or capturing image */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Image Preview */}
      {previewUrl && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      {/* Process Button */}
      {selectedFile && (
        <button
          onClick={processImage}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {loading ? "Processing..." : "Process Image"}
        </button>
      )}

      {/* OCR Result */}
      {ocrResult && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            background: "#f9f9f9",
            maxWidth: "300px",
            marginInline: "auto",
          }}
        >
          <strong>OCR Result:</strong>
          <p>{ocrResult}</p>
        </div>
      )}
    </div>
  );
};

export default VisionRecg;
