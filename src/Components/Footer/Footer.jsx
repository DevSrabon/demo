import { Link } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <div className="bg_footer_sm">
      <div className="container-footer">
        <small>
          © {new Date().getFullYear()}{' '}
          <Link
            href="https://canopus-lab.com"
            className="company-link company-name"
          >
            {/* <div className="company-name"> */}
            <span className="text_blue_light_gradient">Canopus</span>{' '}
            <span className="text-red-gradient">Lab</span>
            {/* </div> */}
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Footer;
