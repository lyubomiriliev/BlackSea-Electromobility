import { useNavigate } from "react-router-dom";
import { HeroSectionCar, heroSectionLogo } from "../assets";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToStations = () => {
    navigate("/stations");
  };

  return (
    <div className="w-full flex flex-col px-5 md:px-0 justify-center items-center md:w-2/3 relative">
      {/* Title */}
      <div className="w-full justify-start flex lg:absolute -top-2 -left-3 select-none">
        <img
          className="w-full lg:w-1/3"
          src={heroSectionLogo}
          alt="BSEM-Logo"
        />
      </div>

      {/* Subheading and Description */}
      <div className="w-full justify-center items-center md:items-start md:absolute md:left-0 md:w-1/2 flex flex-col text-left">
        <div className="flex items-center mt-10 md:mt-0 mb-5">
          <h2 className="w-full text-secondary text-2xl md:text-3xl font-bold font-heading">
            {t("home.subheading")}
          </h2>
        </div>
        <p className="md:w-3/5 font-body font-light text-lg">
          {t("home.publicStations")}
        </p>
      </div>

      {/* Image */}
      <div className="w-full flex justify-center md:justify-end mt-5">
        <img
          onClick={navigateToStations}
          className="w-full md:w-2/3 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          src={HeroSectionCar}
          alt="Car Charging"
        />
      </div>
    </div>
  );
};

export default HeroSection;
