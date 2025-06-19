import React, { useRef, useState, useEffect } from "react";

export default function AvatarInput({
  value,
  onChange,
  size = 96, // default 24x24 (Tailwind w-24 h-24)
  className = "",
  placeholder = "/default-avatar.png",
}) {
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (typeof value === "string" && value) {
      setPreview(value);
    } else if (!value) {
      setPreview("");
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange && onChange(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`relative rounded-full overflow-hidden border-1 border-primary-600 cursor-pointer group`}
        style={{ width: size, height: size }}
        onClick={handleAvatarClick}
      >
        <img
          src={preview || placeholder}
          alt="Profile"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <span className="text-white text-xs font-semibold">Change</span>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
