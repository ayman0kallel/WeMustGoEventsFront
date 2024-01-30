import logo from '../../assets/WeMustGoLogo.png';
import './footer.css';

const Footer = () => (
  <div className="footer ">
    <div className="footer-links">
      <div className="footer-links_logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="footer-links_div">
        <h4>Contact</h4>
        <p>Aymen KALLEL</p>
        <p>07-50-50-73-74</p>
        <p>ayman0kallel@gmail.com</p>
      </div>
    </div>

    <div className="footer-copyright">
      <p>@2024 WeMustGoEvents. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
