import people from '../../assets/people.png';
import ai from '../../assets/homeImg.jpg';
import './header.css';

const Header = () => (
  <div className="header section__padding" id="home">
    <div className="header-content">
      <h1 className="gradient__text">Bienvenue sur WeMustGo Events</h1>
      <p>Découvrez l&apos;excitation de l&apos;événementiel avec WeMustGo ! Que vous soyez passionné par la musique, le sport, l&apos;art ou d&apos;autres expériences uniques, notre plateforme vous connecte aux événements incontournables à travers le monde.</p>

      <div className="header-content__input">
        <input type="email" placeholder="Votre Adresse Email" />
        <button type="button">Commencer</button>
      </div>

      <div className="header-content__people">
        <img src={people} />
        <p>1 600 personnes ont rendu visite au cours des dernières 24h</p>
      </div>
    </div>

    <div className="header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
