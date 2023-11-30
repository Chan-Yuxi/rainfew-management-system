import { Outlet } from "react-router-dom";

const Form = () => {
  return (
    <div>
      <div className="title-deco p-5">Form</div>
      <div className="h-[1px] bg-slate-200"></div>
      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Form;
