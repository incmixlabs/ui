import { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";

const useRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const recorderRef = useRef<RecordRTC | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;

      const recorder = new RecordRTC(stream, {
        type: "video",
      });
      recorderRef.current = recorder;

      recorder.startRecording();
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current?.getBlob();
        if (blob) {
          const url = URL.createObjectURL(blob);
          setVideoURL(url);
        }
        recorderRef.current?.destroy();
        recorderRef.current = null;
        setRecording(false);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      });
    }
  };

  const resetVideo = () => {
    setVideoURL(null);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    recording,
    videoURL,
    startRecording,
    stopRecording,
    resetVideo,
  };
};

export default useRecorder;
