import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaMoon, FaSun } from "react-icons/fa";
import { useRef, useEffect, Fragment, useState } from "react";
import { useTheme } from "../context/useTheme";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        navRef.current &&
        navRef.current.contains &&
        !navRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-primary text-textLight shadow-md sticky top-0 z-50 dark:bg-bgDark dark:text-textLight transition-colors duration-700 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4 transition-all duration-700 ease-in-out">
        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="../public/ARP logo.png"
              alt="Aqua River Park Logo"
              className="h-12 w-auto drop-shadow-xl"
            />
          </Link>
          {/* <span className="font-bold text-xl block md:hidden dark:text-accent1">
            Aqua River Park
          </span> */}
          <button
            aria-label={
              mobileMenuOpen ? "Cerrar menú móvil" : "Abrir menú móvil"
            }
            className="md:hidden text-textLight focus:outline-none dark:text-textLight"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <nav
          ref={navRef}
          className={`md:static absolute left-0 top-full w-full md:w-auto bg-primary dark:bg-bgDark md:bg-transparent transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "block opacity-100" : "hidden opacity-0"
          } md:opacity-100 md:pointer-events-auto md:flex md:items-center md:gap-6 text-sm md:text-base`}
        >
          <div className="transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center justify-center w-full md:w-auto px-4 md:px-0 py-4 md:py-0 gap-3 md:gap-4 text-center">
            <Link
              to="/"
              className="hover:text-textDark/80 transition-colors duration-400"
            >
              Inicio
            </Link>
            <Link
              to="/precios"
              className="hover:text-textDark/80 transition-colors duration-400"
            >
              Precios
            </Link>

            <Menu
              as="div"
              className="relative w-full md:w-auto flex flex-col items-center"
            >
              <MenuButton className="flex items-center gap-1 font-medium hover:text-textDark/80">
                Más <ChevronDownIcon className="h-5 w-5" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition-all duration-300 ease-in-out"
                enterFrom="opacity-0 scale-y-75"
                enterTo="opacity-100 scale-y-100"
                leave="transition-all duration-300 ease-in-out"
                leaveFrom="opacity-100 scale-y-100"
                leaveTo="opacity-0 scale-y-75"
              >
                <MenuItems className="absolute left-1/2 transform -translate-x-1/2 top-full z-50 mt-2 w-56 max-h-[70vh] overflow-y-auto backdrop-blur-md bg-bgLight/80 dark:bg-bgDark/40 text-textDark dark:text-textLight rounded-xl shadow-xl ring-1 ring-bgLight/25">
                  {["galeria", "horarios", "eventos", "blog", "reserva"].map(
                    (label, idx) => (
                      <MenuItem key={idx}>
                        {({ active }) => (
                          <Link
                            to={`/mas#${label
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className={`block px-4 py-2 text-sm ${
                              active
                                ? "bg-bgLight text-accent2 font-black dark:bg-bgLight/80 dark:text-textDark/90"
                                : "text-accent2 font-bold dark:text-textLight"
                            }`}
                          >
                            {label}
                          </Link>
                        )}
                      </MenuItem>
                    )
                  )}
                </MenuItems>
              </Transition>
            </Menu>

            <Menu
              as="div"
              className="relative w-full md:w-auto flex flex-col items-center"
            >
              <MenuButton className="flex items-center gap-1 font-medium hover:text-textDark/80">
                Servicios <ChevronDownIcon className="h-5 w-5" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition-all duration-300 ease-in-out"
                enterFrom="opacity-0 scale-y-75"
                enterTo="opacity-100 scale-y-100"
                leave="transition-all duration-300 ease-in-out"
                leaveFrom="opacity-100 scale-y-100"
                leaveTo="opacity-0 scale-y-75"
              >
                <MenuItems className="absolute left-1/2 transform -translate-x-1/2 top-full z-50 mt-2 w-56 max-h-[70vh] overflow-y-auto backdrop-blur-md bg-bgLight/80 dark:bg-bgDark/40 text-textDark dark:text-textLight rounded-xl shadow-xl ring-1 ring-bgLight/25">
                  {[
                    "Piscinas y Tobogán",
                    "Bosque Perdido de los Dinosaurios",
                    "Botes y Juegos de Mesa",
                    "Zona VIP",
                    "Restaurantes",
                  ].map((label, idx) => (
                    <MenuItem key={idx}>
                      {({ active }) => (
                        <Link
                          to={`/servicios#${label
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-bgLight text-accent2 font-black dark:bg-bgLight/80 dark:text-textDark/90"
                              : "text-accent2 font-bold dark:text-textLight"
                          }`}
                        >
                          {label}
                        </Link>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Transition>
            </Menu>

            {isLoggedIn ? (
              <>
                <Link
                  to="/admin"
                  className="bg-secondary hover:bg-hoverSecondary hover:text-textDark px-4 py-2 rounded-md text-textLight transition-colors duration-400"
                >
                  Panel Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-secondary hover:bg-red-700 px-4 py-2 rounded-md text-textLight transition-colors duration-400"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-secondary hover:bg-hoverSecondary hover:text-textDark px-4 py-2 rounded-md text-textLight transition-colors duration-400"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </nav>

        <div className="relative ml-4">
          <button
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
            className="w-15 h-8 flex items-center rounded-full transition-all duration-700 ease-in-out p-1"
            style={{
              backgroundColor: darkMode ? "var(--color-accent2)" : "#d1d5db",
              justifyContent: darkMode ? "flex-end" : "flex-start",
            }}
          >
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-700 ease-in-out">
              {darkMode ? (
                <FaMoon className="text-accent2 text-lg transition-all duration-700" />
              ) : (
                <FaSun className="text-accent1 text-lg transition-all duration-700" />
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
