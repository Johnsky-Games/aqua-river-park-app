// ✅ Archivo: /src/pages/Home.jsx
import React, { useState } from "react";
import { FaSwimmer, FaTree, FaUtensils, FaShieldAlt, FaTicketAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState({
    invoiceNumber: "",
    amount: "",
    date: ""
  });

  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(currentInvoice)
      });

      if (!response.ok) throw new Error("Error al registrar la factura");

      const data = await response.json();
      setInvoices([...invoices, data]);
      setCurrentInvoice({ invoiceNumber: "", amount: "", date: "" });
      toast.success("✅ Factura registrada exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("❌ Hubo un error al registrar la factura");
    }
  };

  const getFreeTickets = () => Math.floor(invoices.length / 5);

  const benefits = [
    { icon: <FaShieldAlt className="text-4xl text-[var(--color-primary)]" />, title: "Seguridad Primero", description: "Medidas de seguridad de vanguardia." },
    { icon: <FaSwimmer className="text-4xl text-[var(--color-secondary)]" />, title: "Diversión Asegurada", description: "Entretenimiento sin fin para todas las edades." },
    { icon: <FaTree className="text-4xl text-[var(--color-accent2)]" />, title: "Naturaleza", description: "Rodeado de paisajes exuberantes." },
    { icon: <FaUtensils className="text-4xl text-[var(--color-accent1)]" />, title: "Comida", description: "Opciones culinarias para todos los gustos." }
  ];

  const attractions = [
    { name: "Piscinas", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7", description: "Piscinas olímpicas y familiares." },
    { name: "Toboganes", image: "https://images.unsplash.com/photo-1562204839-c264b63f0bdd", description: "Toboganes para todas las edades." },
    { name: "Bosque Jurásico", image: "https://images.unsplash.com/photo-1582728810357-5c15d21de3df", description: "Una aventura entre dinosaurios." },
    { name: "Zona Infantil", image: "https://images.unsplash.com/photo-1590056792628-84c449b3a41b", description: "Diversión segura para los más pequeños." }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bgLight)] text-[var(--color-textDark)] dark:bg-[var(--color-bgDark)] dark:text-[var(--color-textLight)] transition-colors duration-700">
      <div className="relative h-screen">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
          <source src="https://your-video-url.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)]">
              Bienvenido a Aqua River Park
            </motion.h1>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] text-white font-bold py-3 px-8 rounded-full transform transition hover:scale-105">
              Reserva tu aventura
            </motion.button>
          </div>
        </div>
      </div>

      {/* Register Invoices */}
      <section className="py-20 px-4 bg-white dark:bg-[var(--color-bgDark)]">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-8">Registra tus facturas</h2>
          <div className="bg-[var(--color-bgLight)] dark:bg-[var(--color-bgLight)/10] p-6 rounded-xl shadow-lg">
            <form onSubmit={handleInvoiceSubmit} className="space-y-4">
              <input type="text" placeholder="Número de Factura" value={currentInvoice.invoiceNumber} onChange={(e) => setCurrentInvoice({ ...currentInvoice, invoiceNumber: e.target.value })} className="w-full p-3 border rounded-lg" required />
              <input type="number" placeholder="Monto" value={currentInvoice.amount} onChange={(e) => setCurrentInvoice({ ...currentInvoice, amount: e.target.value })} className="w-full p-3 border rounded-lg" required />
              <input type="date" value={currentInvoice.date} onChange={(e) => setCurrentInvoice({ ...currentInvoice, date: e.target.value })} className="w-full p-3 border rounded-lg" required />
              <button type="submit" className="w-full bg-[var(--color-accent2)] text-white py-3 rounded-lg hover:bg-[var(--color-primary)] transition">Registrar factura</button>
            </form>
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-[var(--color-secondary)]">
                <FaTicketAlt /> <span>{getFreeTickets()} Boletos Gratis</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Registra 5 facturas y gana un boleto gratis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-[var(--color-bgLight)] dark:bg-[var(--color-bgLight)/10]">
        <h2 className="text-4xl font-bold text-center mb-16">¿Por qué elegirnos?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} className="bg-white dark:bg-[var(--color-bgDark)] border dark:border-gray-700 p-8 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300 group">
              <div className="mb-4 group-hover:text-[var(--color-accent1)]">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-accent1)]">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-white">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Attractions */}
      <section className="py-20 bg-white dark:bg-[var(--color-bgDark)]">
        <h2 className="text-4xl font-bold text-center mb-16">Atracciones</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {attractions.map((attraction, index) => (
            <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.2 }} className="relative group overflow-hidden rounded-xl shadow-md">
              <img src={attraction.image} alt={attraction.name} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[var(--color-accent2)] bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                  <p>{attraction.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
