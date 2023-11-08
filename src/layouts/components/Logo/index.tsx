import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Constant } from "@/@types/enum";

const Logo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleClick() {
    navigate(Constant.INDEX_PATH);
  }

  return (
    <div onClick={handleClick} className="text-white font-bold">
      {t("system.project")}
    </div>
  );
};

export default Logo;
