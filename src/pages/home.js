import fond from "./home.jpg";
import "./home.css";

export const Home = () => {
  return (
    <>
      <div className="d-flex flex-row bd-highlight homePage">
        <img src={fond} alt="fond" className="image" />
        <div className="description">
          <p>SHIGUMA (Saint-Anne)</p>
          <p>Fermé l&#39;après-midi 15H00-17H30</p>
          <p>
            32 Bis Rue Saint-Anne
            <br />
            75001 Paris
          </p>
          <p>Tel : 01 47 03 38 59 Métro : Pyramides</p>
          Fermé le : 14 Juillet, 25 Décembre, 1 Janvier
        </div>
      </div>
    </>
  );
};
