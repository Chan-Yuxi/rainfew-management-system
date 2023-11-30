import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Constant } from "@/@types/enum";

import { AliwangwangOutlined } from "@ant-design/icons";

const Logo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleClick() {
    navigate(Constant.INDEX_PATH);
  }

  return (
    <div onClick={handleClick} className="text-white font-bold">
      <AliwangwangOutlined className="text-xl text-blue-500" />
      <span className="ml-2">{t("system.project")}</span>
    </div>
  );
};

export default Logo;
