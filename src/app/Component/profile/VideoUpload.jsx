"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFile, setUploading, setProgress, setError, clearUpload } from "@/store/slices/videoUploadSlice";

/**
 * Video upload form for the user.
 * Uses global Redux state for best scalability.
 */
const VideoUpload = () => {
  const dispatch = useDispatch();
  const { file, uploading, progress, error } = useSelector((state) => state.videoUpload);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    dispatch(setFile(selected));
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    dispatch(setUploading(true));
    // TODO: Integrate with backend or Supabase storage
    setTimeout(() => {
      dispatch(setProgress(100));
      dispatch(setUploading(false));
      alert("Video uploaded! (Integrate backend logic)");
      dispatch(clearUpload());
      setPreview(null);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <label className="w-full flex flex-col items-center px-4 py-6 bg-primary-50 text-primary-700 rounded-lg shadow-button tracking-wide uppercase border border-primary-200 cursor-pointer hover:bg-primary-100">
        <span className="mt-2 text-base leading-normal">Select a video to upload</span>
        <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
      </label>
      {preview && (
        <video src={preview} controls className="w-full max-w-xs rounded-lg shadow-modal" />
      )}
      {uploading && <div className="text-primary-600">Uploading... {progress}%</div>}
      {error && <div className="text-error">{error}</div>}
      <button
        type="submit"
        disabled={!file || uploading}
        className="bg-primary-600 text-white px-6 py-2 rounded-button font-medium transition-all duration-button ease-button hover:bg-primary-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
};

export default VideoUpload;
