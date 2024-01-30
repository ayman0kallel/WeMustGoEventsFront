import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

import './carte.css';
import "leaflet/dist/leaflet.css";

const carte = () => (
  <div className="carte section__padding" id="carte">
    <div className="carte-image">
      <MapContainer center={[51.505, -0.09]} zoom={13} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
    <div className="carte-content">
      <h1 className="gradient__text">Explorez les Événements  <br /> en Temps Réel</h1>
      <p>Découvrez l&apos;effervescence des événements à travers le monde avec notre carte interactive en temps réel. Que vous soyez à la recherche d&apos;une soirée musicale en plein air, d&apos;un match palpitant ou d&apos;une exposition artistique captivante, laissez-vous guider par notre carte interactive.</p>
      {/* <h4>Request Early Access to Get Started</h4> */}
    </div>
  </div>
);

export default carte;
