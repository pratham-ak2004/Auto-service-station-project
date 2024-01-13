import React from "react";
import Webcam from "react-webcam";
import { drawRect } from "./DrawCountour";

export default function AddData() {
  const [cams, setCams] = React.useState([]);
  const [selectedDevice, setSelectedDevice] = React.useState();

  const [image, setImage] = React.useState(undefined);

  const [timeLimit, setTimeLimit] = React.useState(100);

  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  // Camera contraints
  const videoConstraints = {
    height: 720,
    width: 720,
    aspectRatio: 1,
    deviceId: selectedDevice,
  };

  // Button functions
  const captureImage = (e) => {
    e.preventDefault();
    const img = webcamRef.current.getScreenshot();
    setImage(img);
  };

  const clearImage = (e) => {
    e.preventDefault();
    setImage(undefined);
  };

  const handleCaptureButton = (e) => {
    e.preventDefault();

    const ctx = canvasRef.current.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    if (image === undefined) {
      captureImage(e);
    } else {
      clearImage(e);
    }
  };

  // Camera selection
  const handleCameraChange = (e) => {
    e.preventDefault();
    setSelectedDevice(e.target.value);
  };

  // Detect cameras
  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();

      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      setCams(videoDevices);
      if (cams.length !== 0) {
        setTimeLimit(5000);
      } else {
        setTimeLimit(0);
      }
    }, [timeLimit]);

    return () => clearInterval(intervalId);
  }, [cams, timeLimit]);

  // Tensorflow object detection
  //Detect from image
  const detectLabels = async (e) => {
    e.preventDefault();

    await fetch(
      `https://9889-2409-40f2-a-5d68-b1e9-41b8-de2f-beaa.ngrok-free.app/detect`,
      {
        method: "POST",
        headers: {
          "Content-Type": "image/png",
        },
        body: image,
      }
    )
      .then((Response) => {
        const dataPromise = Response.json();

        dataPromise.then((data) => {
          console.log("Resolved Response from Flask :", data);
          // draw countours
          requestAnimationFrame(() => {
            drawRect(
              data.data,
              canvasRef.current.getContext("2d"),
              canvasRef.current.width,
              canvasRef.current.height
            );
          });
        });
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  // Return function
  return (
    <>
      <div className="w-full bg-slate-200 max-w-screen-lg min-w-60 mt-8 rounded-md">
        <form action="" className="mt-4 mb-4 mr-2 ml-2 grid grid-flow-row">
          {/* Camera selection*/}
          <div>
            <select
              name="camera"
              id="camera"
              className="h-10 w-28 pl-2 rounded-md bg-slate-400 flex"
              onChange={handleCameraChange}
            >
              {cams &&
                cams.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
            </select>
          </div>
          {/* Image display */}
          <div className="mt-4 mb-4">
            <div className="min-h-32 max-h-96 aspect-square mx-auto relative">
              {image === undefined ? (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  imageSmoothing={true}
                  screenshotQuality={1}
                  screenshotFormat="image/png"
                  videoConstraints={videoConstraints}
                  className="absolute"
                  style={{ zIndex: "1" }}
                />
              ) : (
                <img
                  className="w-full h-full object-cover absolute"
                  style={{ zIndex: "2" }}
                  src={image}
                  alt=""
                />
              )}
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover absolute"
                height={720}
                width={720}
                style={{ zIndex: "3" }}
              />
            </div>
          </div>
          {/* Image buttons */}
          <div className="flex flex-row">
            <div className="basis-2/3 flex-row">
              <button
                className={
                  image === undefined
                    ? "bg-lime-600 m-1 rounded-md w-24 h-10"
                    : "bg-red-600 m-1 rounded-md w-24 h-10"
                }
                onClick={(e) => handleCaptureButton(e)}
              >
                {image === undefined ? "Capture" : "Clear"}
              </button>
            </div>
            <div className="basis-1/3 flex flex-row-reverse">
              <button
                className="bg-lime-500 m-1 rounded-md w-24 h-10 disabled:opacity-50"
                onClick={detectLabels}
                disabled={image === undefined}
              >
                OK
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
