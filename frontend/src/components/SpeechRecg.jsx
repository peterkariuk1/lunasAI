import "../styles/presenting.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

const SpeechRecg = () => {
  const { transcript, listening,resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [continuous, setContinuous] = useState(true);

  useEffect(() => {
    if (!listening && continuous) {
      setContinuous(false);
    }
  }, [listening, continuous]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser doesn’t support speech recognition.</p>;
  }
  const handleListen = () => {
    setContinuous(true);
    SpeechRecognition.startListening({ continuous: true });
  };
  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setContinuous(false);
  };

  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      <button onClick={listening ? handleStopListening : handleListen}>
        {listening ? <MicOffIcon /> : <MicIcon />}
      </button>
    </div>
  );
};
export default SpeechRecg;
