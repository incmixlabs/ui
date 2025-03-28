import React from "react";
import { Button } from "@components/button/button";
import useRecorder from "./use-recorder";

const RecorderComponent = () => {
  const { recording, videoURL, startRecording, stopRecording, resetVideo } =
    useRecorder();

  return (
    <div>
      {!videoURL ? (
        <>
          <Button onClick={startRecording} disabled={recording}>
            {recording ? "Recording..." : "Start Recording"}
          </Button>
          <Button onClick={stopRecording} disabled={!recording && !videoURL}>
            Stop Recording
          </Button>
        </>
      ) : (
        <>
          <video src={videoURL} controls width="640" height="360" />
          <Button onClick={resetVideo}>Record Again</Button>
        </>
      )}
    </div>
  );
};

export default RecorderComponent;
