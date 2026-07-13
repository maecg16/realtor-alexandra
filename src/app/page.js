"use client";

import { useState, useEffect } from "react";
import { properties } from "@/data/properties";
import { supabase } from "@/lib/supabase";

export default function Home() {
  // Estados para filtros
  const [searchType, setSearchType] = useState("todos");
  const [searchSector, setSearchSector] = useState("todos");
  const [searchTransaction, setSearchTransaction] = useState("todos");
  const [searchPrice, setSearchPrice] = useState("todos");
  
  // Estado para la pestaña de filtro rápido (Todos, Arriendo, Venta)
  const [activeTab, setActiveTab] = useState("todos");

  // Lista final de propiedades filtradas
  const [filteredList, setFilteredList] = useState(properties);

  // Propiedad seleccionada para el modal
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Estados del Formulario de Contacto
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función unificada para aplicar los filtros (Buscador + Pestañas)
  const applyFilters = () => {
    let result = properties;

    // Filtro por Tipo (Casa / Departamento)
    if (searchType !== "todos") {
      result = result.filter(p => p.type === searchType);
    }

    // Filtro por Sector
    if (searchSector !== "todos") {
      result = result.filter(p => p.sector === searchSector);
    }

    // Filtro por Transacción (Buscador)
    if (searchTransaction !== "todos") {
      result = result.filter(p => p.transaction === searchTransaction);
    }

    // Filtro por Pestaña Rápida (Arriendo / Venta)
    if (activeTab !== "todos") {
      result = result.filter(p => p.transaction === activeTab);
    }

    // Filtro por Precio Máximo
    if (searchPrice !== "todos") {
      const maxPrice = parseInt(searchPrice, 10);
      result = result.filter(p => p.price <= maxPrice);
    }

    setFilteredList(result);
  };

  // Volver a filtrar cuando cambian los inputs o la pestaña activa
  useEffect(() => {
    applyFilters();
  }, [searchType, searchSector, searchTransaction, searchPrice, activeTab]);

  // Restablecer el índice de imagen activa al cambiar de propiedad
  useEffect(() => {
    setCurrentImageIdx(0);
  }, [selectedProperty]);

  // Restablecer todos los filtros
  const handleResetFilters = () => {
    setSearchType("todos");
    setSearchSector("todos");
    setSearchTransaction("todos");
    setSearchPrice("todos");
    setActiveTab("todos");
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Map IDs to key names in formData
    const key = id.replace("form-", "");
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Enviar formulario a la base de datos de Supabase
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("contactos_landing")
        .insert([
          {
            nombre: formData.name,
            telefono: formData.phone,
            email: formData.email,
            mensaje: formData.message
          }
        ]);

      if (error) {
        throw error;
      }

      setFormSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      // Reset success message after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      console.error("Error al enviar a Supabase:", err.message);
      alert("Ocurrió un error al enviar tu mensaje. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-carbon selection:bg-brand/10 selection:text-brand">
      
      {/* --- Header / Navbar --- */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-border-warm transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#inicio" className="text-2xl font-bold font-title tracking-tight flex items-center gap-3 hover:opacity-90">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain rounded-md" />
            <span>Bienes Raíces<span className="text-brand">.</span></span>
          </a>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-[0.95rem] font-medium text-carbon/80">
              <li><a href="#inicio" className="hover:text-brand transition-colors duration-200">Inicio</a></li>
              <li><a href="#propiedades" className="hover:text-brand transition-colors duration-200">Propiedades</a></li>
              <li><a href="#nosotros" className="hover:text-brand transition-colors duration-200">Nosotros</a></li>
              <li><a href="#contacto" className="hover:text-brand transition-colors duration-200">Contacto</a></li>
            </ul>
          </nav>
          <div>
            <a href="#contacto" className="hidden sm:inline-flex px-5 py-2.5 rounded-lg border border-carbon text-carbon hover:bg-carbon hover:text-white text-[0.9rem] font-medium transition-all duration-300">
              Agendar Cita
            </a>
          </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section id="inicio" className="relative pt-20 pb-28 md:pt-32 md:pb-40 bg-[url('/properties/hero_banner.png')] bg-cover bg-center overflow-hidden">
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-brand brightness-125 uppercase tracking-widest text-[0.8rem] font-bold block mb-4 animate-fade-in-up">
              Agente Inmobiliario Betty Guerrero
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title tracking-tight text-white leading-[1.1] mb-6 animate-fade-in-up">
              Encuentra tu próxima vivienda en Quito
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto animate-fade-in-up">
              Te ayudamos a comprar, vender o arrendar tu próxima propiedad en Quito y los valles.
            </p>
          </div>

          {/* Buscador Integrado */}
          <div className="bg-white rounded-2xl shadow-xl shadow-carbon/5 border border-border-warm p-6 max-w-4xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="search-type" className="text-[0.75rem] font-bold uppercase tracking-wider text-warm-gray">Tipo</label>
                <select 
                  id="search-type" 
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-cream border border-border-warm rounded-lg px-4 py-2.5 text-[0.9rem] focus:border-brand focus:ring-3 focus:ring-brand/10 transition-all duration-200 outline-none text-carbon"
                >
                  <option value="todos">Todos los tipos</option>
                  <option value="departamento">Departamento</option>
                  <option value="casa">Casa</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="search-sector" className="text-[0.75rem] font-bold uppercase tracking-wider text-warm-gray">Sector</label>
                <select 
                  id="search-sector" 
                  value={searchSector}
                  onChange={(e) => setSearchSector(e.target.value)}
                  className="w-full bg-cream border border-border-warm rounded-lg px-4 py-2.5 text-[0.9rem] focus:border-brand focus:ring-3 focus:ring-brand/10 transition-all duration-200 outline-none text-carbon"
                >
                  <option value="todos">Todos los sectores</option>
                  <option value="La Mariscal">La Mariscal</option>
                  <option value="Cotocollao">Cotocollao</option>
                  <option value="Quito Tenis">Quito Tenis</option>
                  <option value="El Bosque">El Bosque</option>
                  <option value="Redondel del Ciclista">Redondel del Ciclista</option>
                  <option value="Monteserrín">Monteserrín</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="search-transaction" className="text-[0.75rem] font-bold uppercase tracking-wider text-warm-gray">Transacción</label>
                <select 
                  id="search-transaction" 
                  value={searchTransaction}
                  onChange={(e) => setSearchTransaction(e.target.value)}
                  className="w-full bg-cream border border-border-warm rounded-lg px-4 py-2.5 text-[0.9rem] focus:border-brand focus:ring-3 focus:ring-brand/10 transition-all duration-200 outline-none text-carbon"
                >
                  <option value="todos">Arriendo o Venta</option>
                  <option value="arriendo">Arriendo</option>
                  <option value="venta">Venta</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="search-price" className="text-[0.75rem] font-bold uppercase tracking-wider text-warm-gray">Precio Máximo</label>
                <select 
                  id="search-price" 
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                  className="w-full bg-cream border border-border-warm rounded-lg px-4 py-2.5 text-[0.9rem] focus:border-brand focus:ring-3 focus:ring-brand/10 transition-all duration-200 outline-none text-carbon"
                >
                  <option value="todos">Sin límite</option>
                  <option value="2000">Hasta $2,000 / mes</option>
                  <option value="100000">Hasta $100,000 (Venta)</option>
                  <option value="120000">Hasta $120,000 (Venta)</option>
                  <option value="180000">Hasta $180,000 (Venta)</option>
                  <option value="400000">Hasta $400,000 (Venta)</option>
                </select>
              </div>

            </div>
            
            {/* Indicador de filtros activos */}
            {(searchType !== "todos" || searchSector !== "todos" || searchTransaction !== "todos" || searchPrice !== "todos") && (
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={handleResetFilters} 
                  className="text-xs font-semibold text-brand hover:text-brand-hover flex items-center gap-1 transition-colors"
                >
                  <i className="fa-solid fa-arrow-rotate-left"></i> Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- Catálogo de Propiedades --- */}
      <section id="propiedades" className="py-20 bg-cream">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-title tracking-tight mb-4 text-carbon">Propiedades Destacadas</h2>
            <p className="text-[0.95rem] text-warm-gray">
              Explora nuestra colección de inmuebles disponibles y filtra de acuerdo a tus necesidades específicas.
            </p>
          </div>

          {/* Barra de Filtros Rápidos */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border-warm pb-6 mb-10">
            <div className="text-[0.9rem] font-medium text-warm-gray">
              Mostrando {filteredList.length} {filteredList.length === 1 ? "propiedad" : "propiedades"}
            </div>
            <div className="flex bg-lino p-1 rounded-full border border-border-warm">
              <button 
                onClick={() => setActiveTab("todos")}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${activeTab === "todos" ? "bg-brand text-white shadow-sm" : "text-carbon/60 hover:text-carbon"}`}
              >
                Todas
              </button>
              <button 
                onClick={() => setActiveTab("arriendo")}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${activeTab === "arriendo" ? "bg-brand text-white shadow-sm" : "text-carbon/60 hover:text-carbon"}`}
              >
                Arriendos
              </button>
              <button 
                onClick={() => setActiveTab("venta")}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${activeTab === "venta" ? "bg-brand text-white shadow-sm" : "text-carbon/60 hover:text-carbon"}`}
              >
                Ventas
              </button>
            </div>
          </div>

          {/* Grid de Propiedades */}
          {filteredList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredList.map((property) => (
                <article 
                  key={property.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-border-warm transition-all duration-300 flex flex-col group"
                >
                  {/* Contenedor de Imagen */}
                  <div className="relative h-60 overflow-hidden bg-lino">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-md text-[0.75rem] font-bold uppercase tracking-wider z-10 ${property.transaction === "arriendo" ? "bg-forest text-white" : "bg-brand text-white"}`}>
                      {property.transaction === "arriendo" ? "Arriendo" : "Venta"}
                    </span>
                  </div>

                  {/* Información */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xl font-bold font-title mb-2 text-carbon">
                      ${property.price.toLocaleString("es-EC")}
                      {property.transaction === "arriendo" && <span className="text-[0.8rem] text-warm-gray font-normal"> / mes</span>}
                    </div>
                    <h3 className="text-[1.1rem] font-semibold mb-2 line-clamp-1 group-hover:text-brand transition-colors">
                      {property.title}
                    </h3>
                    <div className="text-[0.85rem] text-warm-gray flex items-center gap-1.5 mb-5">
                      <i className="fa-solid fa-location-dot text-brand/80"></i> {property.sector}, Quito
                    </div>

                    {/* Características Técnicas */}
                    <div className="grid grid-cols-4 gap-2 py-4 border-t border-b border-border-warm mb-6 text-[0.8rem] text-warm-gray">
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-ruler-combined text-brand"></i>
                        <span>{property.area} m²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-bed text-brand"></i>
                        <span>{property.bedrooms} {property.bedrooms === 1 ? "Hab" : "Habs"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-bath text-brand"></i>
                        <span>{property.bathrooms} {property.bathrooms === 1 ? "Baño" : "Baños"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-car text-brand"></i>
                        <span>{property.parking} {property.parking === 1 ? "Parq" : "Parqs"}</span>
                      </div>
                    </div>

                    {/* Pie de Tarjeta */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex gap-1 overflow-hidden max-w-[60%]">
                        {property.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="bg-lino text-[0.7rem] text-warm-gray px-2 py-1 rounded whitespace-nowrap">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setSelectedProperty(property)}
                        className="text-brand hover:text-brand-hover text-[0.85rem] font-bold flex items-center gap-1 transition-colors"
                      >
                        Ver detalles <i className="fa-solid fa-chevron-right text-[0.7rem]"></i>
                      </button>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Estado Vacío */
            <div className="text-center py-20 px-6 bg-lino rounded-2xl border border-dashed border-border-warm max-w-lg mx-auto flex flex-col items-center gap-4">
              <i className="fa-regular fa-folder-open text-4xl text-warm-gray"></i>
              <p className="text-lg text-warm-gray font-medium">No se encontraron propiedades.</p>
              <p className="text-sm text-warm-gray/80 -mt-2">Intenta modificar tus filtros de búsqueda para ver más opciones.</p>
              <button 
                onClick={handleResetFilters}
                className="mt-2 px-5 py-2 rounded-lg bg-brand text-white hover:bg-brand-hover text-[0.85rem] font-semibold transition-all duration-300"
              >
                Restablecer filtros
              </button>
            </div>
          )}

        </div>
      </section>

      {/* --- Sección Sobre Nosotros --- */}
      <section id="nosotros" className="py-20 bg-lino">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="h-[450px] rounded-2xl overflow-hidden shadow-lg border border-border-warm relative">
              <img 
                src="/quienes_somos.png" 
                alt="Quiénes Somos - Bienes Raíces Betty Guerrero" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-brand uppercase tracking-widest text-[0.8rem] font-bold block mb-4">
                Quiénes somos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-title tracking-tight text-carbon leading-[1.2] mb-6">
                10 años conectando personas con su próximo hogar en Quito
              </h2>
              <p className="text-warm-gray text-[0.95rem] leading-relaxed mb-8">
                Con más de 10 años de experiencia en arriendos y ventas en Quito y los valles, acompañamos a cada cliente de forma personalizada durante todo el proceso. Conocemos el mercado de cerca y trabajamos para que encontrar o arrendar tu propiedad sea una experiencia clara, segura y sin contratiempos.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-semibold text-[1.05rem] flex items-center gap-2 text-carbon">
                    <i className="fa-solid fa-circle-check text-brand"></i> Experiencia Comprobada
                  </h4>
                  <p className="text-warm-gray text-[0.85rem] leading-relaxed">
                    Más de una década trabajando en el mercado inmobiliario de Quito nos permite asesorarte con conocimiento real del sector, los precios y las zonas.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-semibold text-[1.05rem] flex items-center gap-2 text-carbon">
                    <i className="fa-solid fa-comments text-brand"></i> Trato Transparente
                  </h4>
                  <p className="text-warm-gray text-[0.85rem] leading-relaxed">
                    Te acompañamos en cada paso, desde la primera visita hasta la firma del contrato.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-semibold text-[1.05rem] flex items-center gap-2 text-carbon">
                    <i className="fa-solid fa-compass text-brand"></i> Enfoque en Quito y los Valles
                  </h4>
                  <p className="text-warm-gray text-[0.85rem] leading-relaxed">
                    Conocemos en profundidad cada sector: Quito norte, centro, Cumbayá, Tumbaco y los valles. Eso marca la diferencia al momento de asesorarte.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-semibold text-[1.05rem] flex items-center gap-2 text-carbon">
                    <i className="fa-solid fa-star text-brand"></i> Servicio de Calidad
                  </h4>
                  <p className="text-warm-gray text-[0.85rem] leading-relaxed">
                    Cada cliente es único. Nos tomamos el tiempo de entender lo que buscas para ofrecerte opciones que realmente se ajusten a tus necesidades y presupuesto.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Sección de Contacto --- */}
      <section id="contacto" className="py-20 bg-cream">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-lino rounded-3xl border border-border-warm shadow-md p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Información izquierda */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold font-title text-carbon tracking-tight mb-4">¿Hablamos?</h3>
                  <p className="text-warm-gray text-[0.95rem] leading-relaxed">
                    Escríbenos para agendar una visita o si deseas que te asesoremos a promocionar tu propiedad en Quito de manera profesional.
                  </p>
                </div>

                <div className="flex flex-col gap-6 my-10 lg:my-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand border border-border-warm shadow-sm">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <p className="text-[0.7rem] uppercase font-bold text-warm-gray tracking-wider">Teléfono / WhatsApp</p>
                      <p className="font-semibold text-[0.95rem]">+593 99 275 4572</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand border border-border-warm shadow-sm">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <p className="text-[0.7rem] uppercase font-bold text-warm-gray tracking-wider">Correo Electrónico</p>
                      <p className="font-semibold text-[0.95rem]">bgrealtor2000@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="text-[0.8rem] text-warm-gray/80">
                  Horario de atención:<br />
                  Lunes a Miércoles: 09:00 - 18:00<br />
                  Jueves: Sin atención<br />
                  Viernes y Sábados: 09:00 - 17:00
                </div>
              </div>

              {/* Formulario derecho */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-border-warm p-6 md:p-8">
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-xs font-bold text-warm-gray uppercase tracking-wider">Nombre Completo</label>
                    <input 
                      type="text" 
                      id="form-name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-cream border border-border-warm rounded-lg px-4 py-2.5 text-[0.9rem] focus:border-brand focus:ring-3 focus:ring-brand/10 transition-all outline-none text-carbon" 
                      placeholder="Ej. Juan Pérez" 
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-phone" className="text-xs font-bold text-warm-gray uppercase tracking-wider">Teléfono / Celular</label>
                    <input 
                      type="tel" 
                      id="form-phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-cream border border-border-warm rounded-lg px-4 py-2.5 text-[0.9rem] focus:border-brand focus:ring-3 focus:ring-brand/10 transition-all outline-none text-carbon" 
                      placeholder="Ej. 0998765432" 
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="form-email" className="text-xs font-bold text-warm-gray uppercase tracking-wider">Correo Electrónico</label>
                    <input 
                      type="email" 
                      id="form-email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-cream border border-border-warm rounded-lg px-4 py-2.5 text-[0.9rem] focus:border-brand focus:ring-3 focus:ring-brand/10 transition-all outline-none text-carbon" 
                      placeholder="Ej. juan@correo.com" 
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="form-message" className="text-xs font-bold text-warm-gray uppercase tracking-wider">¿En qué podemos ayudarte?</label>
                    <textarea 
                      id="form-message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4" 
                      className="w-full bg-cream border border-border-warm rounded-lg px-4 py-2.5 text-[0.9rem] focus:border-brand focus:ring-3 focus:ring-brand/10 transition-all outline-none text-carbon resize-none" 
                      placeholder="Escribe tu mensaje aquí..." 
                      required
                    ></textarea>
                  </div>

                  <div className="sm:col-span-2 mt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-lg font-semibold text-[0.95rem] tracking-wide transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fa-solid fa-circle-notch animate-spin"></i> Enviando...
                        </>
                      ) : (
                        "Enviar Mensaje"
                      )}
                    </button>
                  </div>

                  {formSubmitted && (
                    <div className="sm:col-span-2 bg-forest/10 border border-forest/20 text-forest text-sm font-semibold rounded-lg p-3 text-center transition-all animate-fade-in-up">
                      <i className="fa-solid fa-circle-check"></i> ¡Gracias! Tu mensaje ha sido recibido. Nos comunicaremos contigo pronto.
                    </div>
                  )}

                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-carbon text-white py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
            
            <div>
              <h3 className="text-xl font-bold font-title text-white tracking-tight mb-4 flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain rounded-md" />
                <span>Bienes Raíces<span className="text-brand">.</span></span>
              </h3>
            </div>

            <div>
              <h4 className="font-semibold text-[1.05rem] text-white mb-4">Navegación</h4>
              <ul className="flex flex-col gap-2.5 text-[0.9rem] text-white/60">
                <li><a href="#inicio" className="hover:text-brand transition-colors">Inicio</a></li>
                <li><a href="#propiedades" className="hover:text-brand transition-colors">Propiedades</a></li>
                <li><a href="#nosotros" className="hover:text-brand transition-colors">Nosotros</a></li>
                <li><a href="#contacto" className="hover:text-brand transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[1.05rem] text-white mb-4">Sectores</h4>
              <ul className="flex flex-col gap-2.5 text-[0.9rem] text-white/60">
                <li>
                  <button 
                    onClick={() => {
                      setSearchSector("La Mariscal");
                      document.getElementById("propiedades").scrollIntoView();
                    }}
                    className="hover:text-brand transition-colors cursor-pointer text-left"
                  >
                    La Mariscal
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSearchSector("Cotocollao");
                      document.getElementById("propiedades").scrollIntoView();
                    }}
                    className="hover:text-brand transition-colors cursor-pointer text-left"
                  >
                    Cotocollao
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSearchSector("Quito Tenis");
                      document.getElementById("propiedades").scrollIntoView();
                    }}
                    className="hover:text-brand transition-colors cursor-pointer text-left"
                  >
                    Quito Tenis
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSearchSector("El Bosque");
                      document.getElementById("propiedades").scrollIntoView();
                    }}
                    className="hover:text-brand transition-colors cursor-pointer text-left"
                  >
                    El Bosque
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSearchSector("Redondel del Ciclista");
                      document.getElementById("propiedades").scrollIntoView();
                    }}
                    className="hover:text-brand transition-colors cursor-pointer text-left"
                  >
                    Redondel del Ciclista
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSearchSector("Monteserrín");
                      document.getElementById("propiedades").scrollIntoView();
                    }}
                    className="hover:text-brand transition-colors cursor-pointer text-left"
                  >
                    Monteserrín
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-[0.8rem]">
            <p>&copy; {new Date().getFullYear()} Bienes Raíces. Todos los derechos reservados.</p>
            <p>Estética Minimalista Cálida</p>
          </div>
        </div>
      </footer>

      {/* --- Botón WhatsApp Flotante --- */}
      <a 
        href="https://wa.me/593992754572?text=Hola%20Bienes%20Ra%C3%ADces,%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20sus%20propiedades%20disponibles." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 active:scale-95 z-40 transition-all duration-300"
        aria-label="Contacto por WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* --- Ventana Modal (Detalles de Propiedad) --- */}
      {selectedProperty && (
        <div 
          className="fixed inset-0 bg-carbon/60 backdrop-blur-sm z-100 flex items-center justify-center p-4 transition-opacity duration-300 opacity-100"
          onClick={() => setSelectedProperty(null)}
        >
          <div 
            className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-border-warm w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button 
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 border border-border-warm flex items-center justify-center text-carbon hover:bg-carbon hover:text-white transition-all duration-200 z-10 cursor-pointer shadow-sm"
              aria-label="Cerrar modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Imagen Principal o Carrusel */}
            <div className="h-[350px] md:h-[450px] relative bg-lino group/carousel overflow-hidden">
              {/* Carrusel Controls */}
              {selectedProperty.images && selectedProperty.images.length > 1 && (
                <>
                  {/* Flecha Izquierda */}
                  <button
                    onClick={() => setCurrentImageIdx((prev) => (prev === 0 ? selectedProperty.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-carbon flex items-center justify-center shadow-md hover:scale-105 transition-all duration-200 z-20 cursor-pointer opacity-0 group-hover/carousel:opacity-100"
                    aria-label="Imagen anterior"
                  >
                    <i className="fa-solid fa-chevron-left text-sm"></i>
                  </button>
                  {/* Flecha Derecha */}
                  <button
                    onClick={() => setCurrentImageIdx((prev) => (prev === selectedProperty.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-carbon flex items-center justify-center shadow-md hover:scale-105 transition-all duration-200 z-20 cursor-pointer opacity-0 group-hover/carousel:opacity-100"
                    aria-label="Siguiente imagen"
                  >
                    <i className="fa-solid fa-chevron-right text-sm"></i>
                  </button>

                  {/* Contador */}
                  <span className="absolute top-4 left-4 bg-carbon/70 text-white text-xs px-2.5 py-1 rounded-md z-15 backdrop-blur-sm">
                    {currentImageIdx + 1} / {selectedProperty.images.length}
                  </span>
                </>
              )}

              {/* Imagen activa */}
              <img 
                src={selectedProperty.images ? selectedProperty.images[currentImageIdx] : selectedProperty.image} 
                alt={selectedProperty.title} 
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
              <span className={`absolute bottom-4 left-6 px-3.5 py-1.5 rounded-md text-[0.8rem] font-bold uppercase tracking-wider text-white z-10 ${selectedProperty.transaction === "arriendo" ? "bg-forest" : "bg-brand"}`}>
                {selectedProperty.transaction === "arriendo" ? "Arriendo" : "Venta"}
              </span>
            </div>

            {/* Miniaturas (Thumbnails) */}
            {selectedProperty.images && selectedProperty.images.length > 1 && (
              <div className="flex gap-2 p-4 bg-lino border-b border-border-warm overflow-x-auto scrollbar-thin scrollbar-thumb-brand">
                {selectedProperty.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 cursor-pointer ${currentImageIdx === idx ? "border-brand scale-98 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Cuerpo del Modal */}
            <div className="p-8">
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-title text-carbon mb-2">{selectedProperty.title}</h3>
                  <p className="text-warm-gray text-[0.9rem] flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-brand"></i> {selectedProperty.sector}, Quito, Ecuador
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-3xl font-bold font-title text-brand">
                    ${selectedProperty.price.toLocaleString("es-EC")}
                  </div>
                  <span className="text-xs font-semibold uppercase text-warm-gray tracking-wider">
                    {selectedProperty.transaction === "arriendo" ? "Monto mensual" : "Valor comercial"}
                  </span>
                </div>
              </div>

              {/* Tags / Amenidades */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProperty.tags.map((tag, idx) => (
                  <span key={idx} className="bg-lino text-warm-gray text-xs font-medium px-3 py-1.5 rounded-full border border-border-warm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Grid Características */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-t border-b border-border-warm mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lino flex items-center justify-center text-brand">
                    <i className="fa-solid fa-ruler-combined"></i>
                  </div>
                  <div>
                    <p className="text-[0.7rem] text-warm-gray font-semibold uppercase tracking-wide">Área</p>
                    <span className="font-bold text-[0.9rem]">{selectedProperty.area} m²</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lino flex items-center justify-center text-brand">
                    <i className="fa-solid fa-bed"></i>
                  </div>
                  <div>
                    <p className="text-[0.7rem] text-warm-gray font-semibold uppercase tracking-wide">Dormitorios</p>
                    <span className="font-bold text-[0.9rem]">{selectedProperty.bedrooms}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lino flex items-center justify-center text-brand">
                    <i className="fa-solid fa-bath"></i>
                  </div>
                  <div>
                    <p className="text-[0.7rem] text-warm-gray font-semibold uppercase tracking-wide">Baños</p>
                    <span className="font-bold text-[0.9rem]">{selectedProperty.bathrooms}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lino flex items-center justify-center text-brand">
                    <i className="fa-solid fa-car"></i>
                  </div>
                  <div>
                    <p className="text-[0.7rem] text-warm-gray font-semibold uppercase tracking-wide">Parqueos</p>
                    <span className="font-bold text-[0.9rem]">{selectedProperty.parking}</span>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-8">
                <h4 className="font-bold text-[1.1rem] text-carbon mb-3">Sobre esta propiedad</h4>
                <p className="text-warm-gray text-[0.95rem] leading-relaxed">{selectedProperty.description}</p>
              </div>

              {/* Tarjeta de Contacto Directo */}
              <div className="bg-lino rounded-2xl border border-border-warm p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h5 className="font-bold text-[1.05rem] text-carbon mb-1">¿Te interesa agendar una visita?</h5>
                  <p className="text-warm-gray text-xs">Conéctate al instante con un asesor para recibir información detallada.</p>
                </div>
                <a 
                  href={`https://wa.me/593992754572?text=Hola%20Bienes%20Ra%C3%ADces,%20me%20interesa%20obtener%20m%C3%A1s%20detalles%20de%20la%20propiedad:%20"${encodeURIComponent(selectedProperty.title)}"%20con%20precio%20de%20$${selectedProperty.price}.`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3 rounded-lg font-bold text-[0.9rem] flex items-center gap-2 transition-all duration-300 shadow-sm whitespace-nowrap cursor-pointer hover:scale-102"
                >
                  <i className="fa-brands fa-whatsapp text-lg"></i> Consultar por WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
