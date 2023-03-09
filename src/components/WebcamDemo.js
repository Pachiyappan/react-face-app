/* eslint-disable react-hooks/exhaustive-deps */
import Webcam from "react-webcam";
import React, { useState } from "react";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const WebcamDemo = () => {
  const [picture, setPicture] = useState("");
  const { webcamRef, boundingBox, isLoading, detected, facesDetected } =
    useFaceDetection({
      faceDetectionOptions: {
        model: "short",
      },
      faceDetection: new FaceDetection.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      }),
      camera: ({ mediaSrc, onFrame, width, height }) =>
        new Camera(mediaSrc, {
          onFrame,
          width,
          height,
        }),
    });

  const capture = () => {
    const pictureSrc =
      webcamRef && webcamRef.current && webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  };
  return (
    <div>
      {/* <p>{`Loading: ${isLoading}`}</p>
      <p>{`Face Detected: ${detected}`}</p>
      <p>{`Number of faces detected: ${facesDetected}`}</p> */}
      <div style={{ width: "100%", height: "500px", position: "relative" }}>
        {/* {boundingBox.map((box, index) => (
          <div
            key={`${index + 1}`}
            style={{
              border: "4px solid red",
              position: "absolute",
              top: `${box.yCenter * 100}%`,
              left: `${box.xCenter * 100}%`,
              width: `${box.width * 100}%`,
              height: `${box.height * 100}%`,
              zIndex: 1,
            }}
          />
        ))} */}
        {picture == "" ? (
          // <Webcam
          //   ref={webcamRef}
          //   forceScreenshotSourceSize
          //   style={{
          //     height: "100%",
          //     width: "100%",
          //     // objectFit: 'cover',
          //     position: "absolute",
          //   }}
          // />
          <Webcam
            audio={false}
            ref={webcamRef}
            forceScreenshotSourceSize
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} height={400} width={400} />
        )}
        {detected && (
          <div>
            {picture != "" ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPicture("");
                }}
                style={{
                  margin: "2rem",
                  height: "2rem",
                  width: "8rem",
                  fontSize: "18px",
                  backgroundColor: "gray",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Retake
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  capture(e);
                }}
                style={{
                  margin: "2rem",
                  height: "2rem",
                  width: "8rem",
                  fontSize: "18px",
                  backgroundColor: "gray",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Capture
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamDemo;
