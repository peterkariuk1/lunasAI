import "../styles/hero.css";
import nurseImage from "../assets/nurselanding.png";
import MicIcon from "@mui/icons-material/Mic";
import PreviewIcon from "@mui/icons-material/Preview";
import GradingIcon from "@mui/icons-material/Grading";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Hero = () => {
  const stepCards = [
    {
      index: "one",
      cardIcon: <MicIcon sx={{ fontSize: "40px" }} />,
      title: "Input Patient Info",
      text: "Speak or type the patient’s symptoms, medical history, and general appearance for processing.",
    },
    {
      index: "two",
      cardIcon: <PreviewIcon sx={{ fontSize: 40 }} />,
      title: "View Possible Diagnoses",
      text: "Instantly receive a ranked list of likely conditions, including high-risk cases flagged for urgency.",
    },
    {
      index: "three",
      cardIcon: <GradingIcon sx={{ fontSize: 40 }} />,
      title: "Confirm Diagnosis",
      text: "Review and approve the most accurate diagnosis based on the patient’s presentation and findings.",
    },
    {
      index: "four",
      cardIcon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      title: "Get Care Plan",
      text: "Access a personalized, risk-based management plan with recommended investigations and next steps.",
    },
  ];
  return (
    <>
      <section className="hero">
        <div className="hero-top">
          <div className="left">
            <img src={nurseImage} alt="nurse" />
          </div>
          <div className="right">
            <h1>Turn Patient Symptoms Into Smart, Actionable Care Plans</h1>
            <p className="hero-desc">
              Lunas AI streamlines patient presentation into interpretable
              diagnostics and actionable care plans with clarity and speed in
              just few steps.
            </p>
            <button className="cta top">
              <p className="cta-text">Start Patient Assessment</p>
            </button>
          </div>
        </div>

        <div className="steps-cards">
          {stepCards.map((stepCard, i) => {
            return (
              <div key={i} className={`step-card  ${stepCard.index}`}>
                <div className={`step-card-icon  ${stepCard.index}`}>
                  {stepCard.cardIcon}
                </div>
                <h1>{stepCard.title}</h1>
                <p>{stepCard.text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <div className="cta-wrapper">
        <button className="cta bottom">Start Patient Assessment</button>
      </div>
    </>
  );
};

export default Hero;
