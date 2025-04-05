import {
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-accent2)] text-white py-16">
      <div
        className="
            container mx-auto px-4 
            flex flex-col items-center justify-center text-center 
            md:grid md:grid-cols-4 md:text-left md:items-start md:justify-items-center gap-8
            transition-all duration-300 ease-in-out
          "
      >
        {/* Logo y descripción */}
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="../public/ARP logo.png"
              alt="Aqua River Park Logo"
              className="h-20 mb-4 drop-shadow-xl"
            />
          </Link>
          <p className="text-sm opacity-90 max-w-xs">
            Un parque acuático temático con diversión para toda la familia.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-[var(--color-accent1)]">
            Enlaces Rápidos
          </h3>
          <ul className="space-y-2">
            {[
              { href: "#inicio", text: "Inicio" },
              { href: "#atracciones", text: "Atracciones" },
              { href: "#horarios", text: "Horarios" },
              { href: "#promociones", text: "Promociones" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-[var(--color-accent1)]">
            Contacto
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="mr-2 text-[var(--color-secondary)]" />
              Calle Principal 123, Ciudad
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaClock className="mr-2 text-[var(--color-secondary)]" />
              9:00 AM - 5:00 PM
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-[var(--color-accent1)]">
            Redes Sociales
          </h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="#"
              className="transition-all transform hover:scale-110"
              title="Facebook"
              style={{
                color: "var(--color-facebook)",
                textShadow: "0 0 6px var(--color-facebook)",
              }}
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="transition-all transform hover:scale-110"
              title="Instagram"
              style={{
                color: "var(--color-instagram)",
                textShadow: "0 0 6px var(--color-instagram)",
              }}
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="transition-all transform hover:scale-110"
              title="Whatsapp"
              style={{
                color: "var(--color-whatsapp)",
                textShadow: "0 0 6px var(--color-whatsapp)",
              }}
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href="#"
              className="transition-all transform hover:scale-110"
              title="TikTok"
              style={{
                color: "var(--color-tiktok)",
                textShadow: "0 0 6px var(--color-tiktok)",
              }}
            >
              <FaTiktok size={24} />
            </a>
            <a
              href="#"
              className="transition-all transform hover:scale-110"
              title="YouTube"
              style={{
                color: "var(--color-youtube)",
                textShadow: "0 0 6px var(--color-youtube)",
              }}
            >
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
