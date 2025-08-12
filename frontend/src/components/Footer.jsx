import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PeopleIcon from "@mui/icons-material/People";
import LoginIcon from "@mui/icons-material/Login";
import LinkIcon from "@mui/icons-material/Link";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2 className="logo">LunasAI</h2>
          <p className="tagline">
            From symptoms to strategy, intelligent, risk-aware care guidance.
          </p>
        </div>
        <div className="contact-block">
          <div className="contact-item">
            <EmailIcon className="icon" />
            <div>
              <div className="label">Main Email</div>
              <div className="value">support@lunasai.health</div>
            </div>
          </div>
          <div className="contact-item">
            <EmailIcon className="icon" />
            <div>
              <div className="label">Inquiries</div>
              <div className="value">info@lunasai.health</div>
            </div>
          </div>
          <div className="contact-item">
            <PhoneIcon className="icon" />
            <div>
              <div className="label">Office</div>
              <div className="value">+254 11 252 90 19</div>
            </div>
          </div>
          <div className="contact-item">
            <PhoneIcon className="icon" />
            <div>
              <div className="label">Mobile</div>
              <div className="value">+254 11 252 90 19</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-widgets">
        <div className="widget">
          <h3>About</h3>
          <p>
            Lunas AI streamlines patient presentation into interpretable
            diagnostics and actionable care plans with clarity and speed.
          </p>
          <div className="mini-contact">
            <LocationOnIcon className="small-icon" />
            <span>123 Health Ave, Nairobi, KE</span>
          </div>
        </div>

        <div className="widget">
          <h3>Services</h3>
          <ul>
            <li>
              <DescriptionIcon className="list-icon" />
              Patient Assessment
            </li>
            <li>
              <ArticleIcon className="list-icon" />
              Differential Diagnosis
            </li>
            <li>
              <HelpOutlineIcon className="list-icon" />
              Risk Stratification
            </li>
            <li>
              <PeopleIcon className="list-icon" />
              Management Planning
            </li>
          </ul>
        </div>

        <div className="widget">
          <h3>Useful Links</h3>
          <ul>
            <li>
              <LinkIcon className="list-icon" />
              How It Works
            </li>
            <li>
              <LinkIcon className="list-icon" />
              API Docs
            </li>
            <li>
              <LinkIcon className="list-icon" />
              Integrations
            </li>
            <li>
              <LinkIcon className="list-icon" />
              Support
            </li>
          </ul>
        </div>

        <div className="widget subscribe">
          <h3>Subscribe</h3>
          <p>Get clinical insight updates and product news.</p>
          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          <small>Unsubscribe anytime.</small>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} LunasAI. All rights reserved.</span>
        <div className="bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
