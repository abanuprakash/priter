import { MainMenus } from "@/_const/mainMenus";
import { useState } from "react";

const LeftBar = () => {
  const [active, setActive] = useState("home");
  const menus = MainMenus.filter((menu) => menu.forWeb === true);

  return (
    <section className="p-4">
      {menus.map((menu) => (
        <div
          key={menu.id}
          className={`flex items-center cursor-pointer relative group p-1 mb-2 hover:bg-lightGreen hover:text-darkGreen  ${
            active === menu.key
              ? "bg-lightGreen text-darkGreen"
              : "text-lightBlack"
          }`}
          onClick={() => setActive(menu.key)}
        >
          <span
            className={`w-2 h-full bg-midGreen p-1 absolute left-0 group-hover:visible ${
              active === menu.key ? "visible" : "invisible"
            }`}
          ></span>

          <i className={`${menu.icon} feather mr-3 text-sm pl-3 `}></i>
          <div>{menu.label}</div>
        </div>
      ))}
    </section>
  );
};

export default LeftBar;
