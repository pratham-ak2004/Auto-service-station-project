import React from "react";
import Webcam from "react-webcam";

export default function AddData() {
  const [image, setImage] = React.useState();
  const webcamRef = React.useRef();
  const [cams, setCams] = React.useState([]);
  const [selectedDevice, setSelectedDevice] = React.useState();
  const [captureError , setCaptureError] = React.useState(false);

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
    if (image !== undefined) {
      return;
    }
    const img = webcamRef.current.getScreenshot();
    setImage(img);
  };

  const clearImage = (e) => {
    e.preventDefault();
    setImage(undefined);
  };

  // Camera selection
  const handleCameraChange = (e) => {
    e.preventDefault();
    setSelectedDevice(e.target.value);
    console.log(selectedDevice);
  };

  // Detect cameras
  React.useEffect(() => {
    async function getCamera() {
      try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        //const devices = [] ;
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
       setCams(videoDevices);

      }catch(error){
        setCaptureError(true);
        console.log(captureError);
      }
      /*
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const devices = stream.getVideoTracks();
          console.log(devices.map((device) => device.label));
          setCams(devices);
          // You can extract information about the devices from the tracks
        })
        .catch((error) => {
          console.error("Error accessing user media:", error);
        });*/
    }
    getCamera();
  }, [cams]);

  // Tensorflow object detection
  const detectLabels = async (e) => {
    e.preventDefault();
    await fetch(``, {
      method: "POST",
      headers: {
        "Content-Type": "imgae/png",
      },
      body: JSON.stringify(image),
    }).then((Response) => console.log(Response));
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
            <div className="min-h-32 max-h-96 aspect-square mx-auto bg-lime-300">
              {/* <CameraUtility videoConstraints={videoConstraints} camRef={[webcamRef]} capError={[captureError,setCaptureError]} /> */}
              {image ? (
                <img src={image} alt="" />
              ) : (
                <Webcam
                  className=""
                  ref={webcamRef}
                  audio={false}
                  imageSmoothing={true}
                  screenshotQuality={1}
                  screenshotFormat="image/png"
                  videoConstraints={videoConstraints}
                />
              )}
            </div>
          </div>
          {/* Image buttons */}
          <div className="flex flex-row">
            <div className="basis-2/3 flex-row">
              <button
                className="bg-lime-600 m-1 rounded-md w-24 h-10"
                onClick={(e) => captureImage(e)}
              >
                Capture
              </button>
              <button
                className="bg-red-600 m-1 rounded-md w-24 h-10"
                onClick={(e) => clearImage(e)}
              >
                Clear
              </button>
            </div>
            <div className="basis-1/3 flex flex-row-reverse">
              <button
                className="bg-lime-500 m-1 rounded-md w-24 h-10"
                onClick={detectLabels}
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
