import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Logo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleClick() {
    navigate("/");
  }

  return (
    <div onClick={handleClick} className="text-white me-5">
      {t("system.project")}
    </div>
  );
};

export default Logo;
