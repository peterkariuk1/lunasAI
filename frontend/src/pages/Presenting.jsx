import "../styles/presenting.css";
import VisionRecg from "../components/VisionRecg";
import SpeechRecg from "../components/SpeechRecg";
import TypeIn from "../components/TypeIn";
import Header from "../components/Header";
import { useSpeechRecognition } from "react-speech-recognition";

const Presenting = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const handleResetTranscript = resetTranscript;

  return (
    <>
      <Header />
      <div className="presenting-page">
        <div className="presenting-methods">
          <VisionRecg />
          <div className="">
            <SpeechRecg transcript={transcript} listening={listening} />
            <button
              className={`reset-transcript-button ${
                transcript !== "" ? "live" : ""
              }`}
              onClick={handleResetTranscript}
            >
              Reset
            </button>
          </div>
          <TypeIn />
        </div>
        <div className="text-area-field">
          <textarea value={transcript} />
        </div>
      </div>
    </>
  );
};

export default Presenting;
