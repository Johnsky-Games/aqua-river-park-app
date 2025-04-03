import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "../context/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/auth-context";


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<"mas" | "servicios" | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const { isLoggedIn, logout, userRole } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        navRef.current &&
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

  const dropdownItems = {
    client: [
      { label: "Perfil", path: "/perfil" },
      { label: "Ajustes", path: "/ajustes" },
      { label: "Compras", path: "/compras" },
    ],
    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Perfil", path: "/perfil" },
      { label: "Ajustes", path: "/ajustes" },
    ],
  };

  return (
    <header className="bg-primary text-textLight shadow-md sticky top-0 z-50 dark:bg-bgDark dark:text-textLight transition-colors duration-700 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="../public/ARP logo.png"
              alt="Aqua River Park Logo"
              className="h-12 w-auto drop-shadow-xl"
            />
          </Link>
          <button
            aria-label={mobileMenuOpen ? "Cerrar menú móvil" : "Abrir menú móvil"}
            className="md:hidden text-textLight focus:outline-none"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <nav
          ref={navRef}
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:static absolute left-0 top-full w-full md:w-auto bg-primary dark:bg-bgDark md:bg-transparent md:flex md:items-center md:gap-6 text-sm md:text-base transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-auto px-4 md:px-0 py-4 md:py-0 gap-3 md:gap-4 text-center">
            <Link to="/" className="hover:text-textDark/80 transition-colors duration-400">
              Inicio
            </Link>
            <Link to="/precios" className="hover:text-textDark/80 transition-colors duration-400">
              Precios
            </Link>

            {/** Dropdowns con hover y animación */}
            {["mas", "servicios"].map((menuKey) => (
              <div
                key={menuKey}
                className="relative group"
                onMouseEnter={() => setHoveredMenu(menuKey)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="flex items-center gap-1 font-medium hover:text-textDark/80 capitalize">
                  {menuKey} <ChevronDownIcon className="h-5 w-5" />
                </button>
                <AnimatePresence>
                  {hoveredMenu === menuKey && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 transform -translate-x-1/2 top-full z-50 mt-2 w-56 max-h-[70vh] overflow-y-auto backdrop-blur-md bg-bgLight/80 dark:bg-bgDark/40 text-textDark dark:text-textLight rounded-xl shadow-xl ring-1 ring-bgLight/25"
                    >
                      {(menuKey === "mas"
                        ? ["galeria", "horarios", "eventos", "blog", "reserva"]
                        : ["Piscinas y Tobogán", "Bosque Perdido de los Dinosaurios", "Botes y Juegos de Mesa", "Zona VIP", "Restaurantes"]
                      ).map((label, idx) => (
                        <Link
                          key={idx}
                          to={`/${menuKey}#${label.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm text-accent2 font-bold hover:bg-bgLight hover:text-accent1 dark:hover:bg-bgLight/80 dark:hover:text-textDark/90"
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {!isLoggedIn ? (
              <Link to="/login" className="bg-secondary hover:bg-hoverSecondary hover:text-textDark px-4 py-2 rounded-md text-textLight transition-colors duration-400">
                Iniciar sesión / Registrarse
              </Link>
            ) : (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center">
                  <FaUserCircle className="text-3xl hover:text-accent1 transition-colors" />
                </MenuButton>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-bgDark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <div className="py-1">
                      {(dropdownItems[userRole] || []).map((item, idx) => (
                        <MenuItem key={idx}>
                          {({ active }) => (
                            <Link
                              to={item.path}
                              className={`block px-4 py-2 text-sm ${
                                active ? "bg-gray-100 text-accent2 dark:bg-gray-800" : "text-textDark dark:text-textLight"
                              }`}
                            >
                              {item.label}
                            </Link>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                    <div className="py-1 border-t border-gray-300 dark:border-gray-700">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              active ? "bg-red-100 text-red-600" : "text-red-500"
                            }`}
                          >
                            Cerrar sesión
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Menu>
            )}
          </div>
        </nav>

        <div className="relative ml-4">
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
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
