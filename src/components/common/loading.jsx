import React from "react";

const Loading = ({
  message = "Loading...",
  size = "medium",
  fullScreen = false,
  overlay = false,
}) => {
  const spinnerSizes = {
    small: 20,
    medium: 32,
    large: 48,
  };

  const spinnerSize = spinnerSizes[size] || spinnerSizes.medium;

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: `${spinnerSize}px`,
          height: `${spinnerSize}px`,
          border: "4px solid #e5e7eb",
          borderTop: "4px solid #2563eb",
          borderRadius: "50%",
          animation: "ezresq-spin 0.8s linear infinite",
        }}
      />

      {message && (
        <p
          style={{
            margin: 0,
            color: "#4b5563",
            fontSize: size === "small" ? "12px" : "14px",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes ezresq-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      {content}
    </>
  );
};

export default Loading;
