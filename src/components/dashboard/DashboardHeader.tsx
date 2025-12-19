import { useState } from "react";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo_2.png";
import hamburger from "../../assets/hamburger.png";
import { ConnectWallet } from "../connectButton";
export default function DashboardHeader() {
  const [activeLink, setActiveLink] = useState("home");

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveLink(targetId);

    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // start closed on mobile
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navClassName = ``;
  const links = [
    { id: "Dashboard", label: "Dashboard" },
    { id: "My circle", label: "About" },
    { id: "Activity", label: "Security" },
    { id: "Docs", label: "Docs" },
  ];
  return (
    <header className="w-full px-4 md:px-8 py-4 md:py-6">
      <div className="max-w-7xl mx-auto  flex items-center bg-[#FFFFFF2B] sm:bg-transparent justify-between gap-4  rounded-[90px] sm:rounded-none">
        <div className="invisible sm:visible sm:flex-1">
          <img
            src={logo}
            alt="trust-circle logo"
            className="w-10 md:w-36 h-auto object-contain shrink-0  "
          />
        </div>
        <img
          src={logo2}
          alt="trust-circle logo"
          className="w-10 md:w-36 h-auto object-contain shrink-0 sm:hidden -ml-67 "
        />

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 flex-2 justify-between ">
          <ul className="flex items-center gap-6 bg-transparent text-white">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-xs sm:text-sm md:text-base whitespace-nowrap px-4 py-2 rounded-[90px] transition-colors ${
                  activeLink === link.id
                    ? "bg-[linear-gradient(181.71deg,#373737_-39.78%,#FF9B7D_-8.23%,#FF3E00_106.05%)] text-white"
                    : "bg-transparent text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </ul>

          <ConnectWallet />
        </nav>

        {/* Mobile controls */}
        <div className="sm:hidden flex items-center w-fit justify-between  px-4 py-2 ">
          <button
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            className="p-2 bg-transparent"
          >
            <img src={hamburger} alt="menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`sm:hidden mt-3 px-4 transition-all duration-200 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-[#FFFFFF2B] backdrop-blur-2xl w-full rounded-lg p-3 flex flex-col gap-3 text-white">
          <div className="flex items-center gap-3 justify-between">
            <img
              src={logo2}
              alt="trust-circle logo"
              className="w-7 h-auto object-contain shrink-0"
            />
            {/* Close button to explicitly close the mobile nav */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex flex-col justify-center items-center p-[11.6591px] gap-[11.66px] w-[32.65px] h-[29.15px] bg-[#FC5016] rounded-full cursor-pointer"
            >
              x
            </button>
          </div>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                handleNavClick(e, link.id);
                setIsOpen(false);
              }}
              className="block text-sm w-full text-left px-3 py-2 rounded-[20px] transition-colors "
            >
              {link.label}
            </a>
          ))}

         <ConnectWallet />
        </div>
      </div>
    </header>
  );
}
