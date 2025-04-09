import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloseIcon from "@mui/icons-material/Close";

function ImageUploader({ open, handleClose, value, onFileChange }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile); // ✅ Updates KYC Form State
    }
  };

  const handleUpload = () => {
    if (file) {
      setLoading(true);
      setTimeout(() => {
        const uploadedFileUrl = URL.createObjectURL(file);
        onFileChange(uploadedFileUrl); // ✅ Updates state with uploaded file URL
        setLoading(false);
        handleClose();
      }, 1000);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Upload GST Certificate</DialogTitle>
      <DialogContent className="flex flex-col justify-center items-center">
        <Button component="label" variant="contained" className="mt-4">
          {file ? (
            <img src={URL.createObjectURL(file)} alt="Preview" style={{ height: "80px", borderRadius: "8px" }} />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <DriveFolderUploadIcon className="mb-2" />
              <p>Choose PDF</p>
            </div>
          )}
          <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
        </Button>

        {/* Show Uploaded File */}
        {typeof value === "string" && value.includes("imagekit.io") && (
          <div className="mt-2 text-xs text-blue-600 underline">
            <a href={value} target="_blank" rel="noopener noreferrer">
              View Uploaded File
            </a>
          </div>
        )}

        <div className="flex justify-end mt-6 w-full">
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="ml-4"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageUploader;
