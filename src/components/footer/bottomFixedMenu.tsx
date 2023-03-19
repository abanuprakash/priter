import { MainMenus } from "@/_const/mainMenus";
import { useState } from "react";

const BottomFixedMenu = () => {
  const [active, setActive] = useState("home");
  const menus = MainMenus.filter((menu) => menu.forMobile === true);

  return (
    <nav className="fixed -bottom-[1px] h-16 w-full bg-white pb-1">
      <section className="p-4 pt-3 grid grid-flow-row grid-cols-5 gap-3 mb-1 justify-items-center">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className={`flex items-center outline-none justify-center cursor-pointer relative group mb-2 rounded-full p-1 w-11 h-11 hover:bg-lightGreen  ${
              active === menu.key ? "bg-lightGreen" : "text-lightBlack"
            }`}
            onClick={() => setActive(menu.key)}
          >
            <i className={`${menu.icon} feather mr-3 text-2xl pl-3 `}></i>
            
          </div>
        ))}
      </section>
    </nav>
  );
};

export default BottomFixedMenu;
