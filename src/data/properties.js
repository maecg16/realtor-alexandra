/**
 * Base de datos de Propiedades - Bienes Raíces (Next.js)
 * 
 * Si deseas añadir, eliminar o modificar propiedades, puedes hacerlo en este archivo.
 * Sigue el formato de los objetos existentes.
 */

export const properties = [
  {
    id: 1,
    title: "Amplio Departamento en La Mariscal",
    description: "Espectacular y amplio departamento de venta en el sector de La Mariscal, a solo una cuadra de la Fiscalía. Ubicado en el 4to piso, cuenta con una excelente distribución que incluye sala y comedor espaciosos, amplia cocina, balcón privado, área de lavandería independiente y baño de servicio. El edificio ofrece recepción y seguridad 24 horas, y dos ascensores para mayor comodidad.",
    price: 98000,
    type: "departamento",
    transaction: "venta",
    sector: "La Mariscal",
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    image: "/properties/departamento_mariscal.png",
    tags: ["Recepción 24/7", "Balcón", "Dos Ascensores", "Lavandería", "Baño de Servicio"]
  },
  {
    id: 2,
    title: "Moderna Casa de Campo en Cumbayá",
    description: "Exclusiva residencia de estilo minimalista con detalles en madera y piedra, ubicada en una de las mejores urbanizaciones privadas de Cumbayá. Posee un amplio jardín privado, porche con chimenea exterior, amplias habitaciones con baño privado y cocina equipada de gama alta.",
    price: 320000,
    type: "casa",
    transaction: "venta",
    sector: "Cumbayá",
    area: 280,
    bedrooms: 3,
    bathrooms: 4,
    parking: 3,
    image: "/properties/casa_cumbaya.png",
    tags: ["Jardín Privado", "Porche", "Urbanización Cerrada", "Acabados de Lujo"]
  },
  {
    id: 3,
    title: "Suite Ejecutiva en González Suárez",
    description: "Elegante suite amoblada en la cotizada zona de la González Suárez. Perfecta para profesionales o parejas. Cuenta con una maravillosa vista al valle de Guápulo, cocina equipada, lavandería interna y amenidades en el edificio como piscina temperada y guardianía permanente.",
    price: 550,
    type: "departamento",
    transaction: "arriendo",
    sector: "González Suárez",
    area: 60,
    bedrooms: 1,
    bathrooms: 1.5,
    parking: 1,
    image: "/properties/suite_gonzalez.png",
    tags: ["Vista al Valle", "Amoblado", "Piscina", "Excelente Ubicación"]
  },
  {
    id: 4,
    title: "Hermosa Casa Familiar en Tumbaco",
    description: "Hermosa casa de dos plantas en conjunto residencial de Tumbaco. Disfruta de un clima cálido todo el año, seguridad integrada, patio posterior ideal para mascotas y niños, sala de estar familiar, estudio independiente y excelente conectividad a la Ruta Viva.",
    price: 245000,
    type: "casa",
    transaction: "venta",
    sector: "Tumbaco",
    area: 195,
    bedrooms: 3,
    bathrooms: 2.5,
    parking: 2,
    image: "/properties/casa_tumbaco.png",
    tags: ["Patio", "Estudio", "Cerca a Ruta Viva", "Pet Friendly"]
  },
  {
    id: 5,
    title: "Departamento Familiar en El Batán",
    description: "Espacioso departamento remodelado en el sector de El Batán. Ubicación residencial muy tranquila, cerca de centros comerciales, colegios y transporte. Tiene sala-comedor muy amplia, dormitorio máster con vestidor, baño de servicio y bodega independiente.",
    price: 165000,
    type: "departamento",
    transaction: "venta",
    sector: "El Batán",
    area: 130,
    bedrooms: 3,
    bathrooms: 2.5,
    parking: 2,
    image: "/properties/departamento_batan.png",
    tags: ["Remodelado", "Bodega", "Zona Residencial", "Ascensor"]
  },
  {
    id: 6,
    title: "Penthouse de Estilo Nórdico en Bellavista",
    description: "Exclusivo penthouse de diseño minimalista nórdico con una vista panorámica inigualable de 180 grados de la ciudad de Quito. Cuenta con una espectacular terraza privada de 30m², acabados en madera clara, ventanales de piso a techo y ascensor directo al departamento.",
    price: 980,
    type: "departamento",
    transaction: "arriendo",
    sector: "Bellavista",
    area: 115,
    bedrooms: 2,
    bathrooms: 2,
    parking: 2,
    image: "/properties/penthouse_bellavista.png",
    tags: ["Terraza Privada", "Vista Panorámica", "Estilo Nórdico", "Ascensor Directo"]
  }
];
