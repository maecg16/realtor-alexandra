/**
 * Base de datos de Propiedades - Bienes Raíces (Next.js)
 * 
 * Este archivo contiene los 5 inmuebles reales en Quito promocionados por Betty Guerrero.
 */

export const properties = [
  {
    id: 1,
    title: "Espacioso Departamento en La Mariscal",
    description: "Espectacular y amplio departamento en venta en el sector de La Mariscal, a solo una cuadra de la Fiscalía. Ubicado en el 4to piso, cuenta con una excelente distribución que incluye 3 dormitorios, 2 baños completos, área de lavandería, balcón privado, amplia cocina, sala y comedor espaciosos, 1 parqueadero y baño de servicio. El edificio ofrece dos ascensores, recepción 24 horas y seguridad permanente. Área habitable de 150 m². Valor de venta negociable.",
    price: 98000,
    type: "departamento",
    transaction: "venta",
    sector: "La Mariscal",
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    image: "/properties/la_mariscal_1.jpeg",
    images: [
      "/properties/la_mariscal_1.jpeg",
      "/properties/la_mariscal_2.jpeg",
      "/properties/la_mariscal_3.jpeg",
      "/properties/la_mariscal_4.jpeg",
      "/properties/la_mariscal_5.jpeg",
      "/properties/la_mariscal_6.jpeg",
      "/properties/la_mariscal_7.jpeg",
      "/properties/la_mariscal_8.jpeg",
      "/properties/la_mariscal_9.jpeg",
      "/properties/la_mariscal_10.jpeg",
      "/properties/la_mariscal_11.jpeg",
      "/properties/la_mariscal_12.jpeg"
    ],
    tags: ["Recepción 24/7", "Balcón", "Dos Ascensores", "Lavandería", "Baño de Servicio"]
  },
  {
    id: 2,
    title: "Amplia Residencia de Tres Niveles en Cotocollao",
    description: "Espectacular y espaciosa casa de tres niveles en renta en el sector de Cotocollao, muy cercana a la Urbanización El Condado. Cuenta con 590 m² de construcción y 540 m² de terreno. Ofrece 7 amplias habitaciones, 2 salas grandes, jardín, área de BBQ y 2 parqueaderos cómodos. Actualmente está completamente adecuada y lista para funcionar como residencia de adultos mayores o para grandes proyectos institucionales o familiares.",
    price: 1500,
    type: "casa",
    transaction: "arriendo",
    sector: "Cotocollao",
    area: 590,
    bedrooms: 7,
    bathrooms: 5,
    parking: 2,
    image: "/properties/cotocollao_1.jpeg",
    images: [
      "/properties/cotocollao_1.jpeg",
      "/properties/cotocollao_2.jpeg",
      "/properties/cotocollao_3.jpeg",
      "/properties/cotocollao_4.jpeg",
      "/properties/cotocollao_5.jpeg",
      "/properties/cotocollao_6.jpeg",
      "/properties/cotocollao_7.jpeg",
      "/properties/cotocollao_8.jpeg",
      "/properties/cotocollao_9.jpeg",
      "/properties/cotocollao_10.jpeg",
      "/properties/cotocollao_11.jpeg",
      "/properties/cotocollao_12.jpeg"
    ],
    tags: ["Jardín", "Área BBQ", "Ideal Residencia", "3 Niveles", "Cerca a El Condado"]
  },
  {
    id: 3,
    title: "Moderno Departamento con Vista en Quito Tenis",
    description: "Excelente departamento en venta en el cotizado sector de Quito Tenis. Ubicado en el 7mo piso con una hermosa vista. Cuenta con 3 dormitorios, el dormitorio máster con baño propio y un baño completo que funciona también como baño social. Dispone de dos parqueaderos paralelos (uno al lado del otro) en el subsuelo dos y una bodega privada. El edificio tiene 8 años de antigüedad y ofrece excelentes áreas comunales como gimnasio equipado y área de BBQ. Todo el sistema del departamento es eléctrico, incluyendo el calefón. Valor de la alícuota: $170.",
    price: 160000,
    type: "departamento",
    transaction: "venta",
    sector: "Quito Tenis",
    area: 130,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    image: "/properties/quito_tenis_1.jpeg",
    images: [
      "/properties/quito_tenis_1.jpeg",
      "/properties/quito_tenis_2.jpeg",
      "/properties/quito_tenis_3.jpeg",
      "/properties/quito_tenis_4.jpeg",
      "/properties/quito_tenis_5.jpeg",
      "/properties/quito_tenis_6.jpeg",
      "/properties/quito_tenis_7.jpeg",
      "/properties/quito_tenis_8.jpeg",
      "/properties/quito_tenis_9.jpeg"
    ],
    tags: ["Gimnasio", "Área BBQ", "Piso Alto con Vista", "Bodega", "Doble Parqueadero"]
  },
  {
    id: 4,
    title: "Exclusiva Residencia Multinivel en El Bosque",
    description: "Imponente casa de 4 niveles y subniveles internos con un área de construcción de 530 m², ubicada en el distinguido sector de El Bosque. Cuenta con 4 dormitorios amplios, 3 baños completos, 2 baños sociales, cocina con alacena y área para desayunador independiente, sala de TV acogedora, estudio privado, patios internos con encanto natural, 2 terrazas accesibles con excelente vista y 3 parqueaderos. Incluye cuarto y baño de servicio (empleada), bodega espaciosa, cisterna y un basement multiusos con su propio baño. En el primer piso de la propiedad, dispone de un área ideal para oficinas o suite con entrada completamente independiente. Propiedad con 33 años de antigüedad en perfectas condiciones de mantenimiento. Valor negociable.",
    price: 350000,
    type: "casa",
    transaction: "venta",
    sector: "El Bosque",
    area: 530,
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    image: "/properties/bosque_1.jpeg",
    images: [
      "/properties/bosque_1.jpeg",
      "/properties/bosque_2.jpeg",
      "/properties/bosque_3.jpeg",
      "/properties/bosque_4.jpeg",
      "/properties/bosque_5.jpeg"
    ],
    tags: ["Oficina/Suite Independiente", "2 Terrazas", "Basement Multiusos", "Cisterna", "Patios Internos"]
  },
  {
    id: 5,
    title: "Luminoso Departamento junto al Redondel del Ciclista",
    description: "Excelente departamento en venta en el sector del Redondel del Ciclista, cercano a la UDLA. Tiene 96 m² de área habitable que sumando 2 parqueaderos cómodos y bodega da un total de 120 m² de área útil. Cuenta con 2 dormitorios amplios, cada uno con su baño privado completo, más un baño social. El área social integra la cocina, la sala y el comedor en un solo ambiente abierto y funcional. Ubicado en el 2do piso, el edificio tiene 15 años de construcción y está sumamente bien mantenido. Alícuota muy económica de $70. Precio de venta negociable.",
    price: 115000,
    type: "departamento",
    transaction: "venta",
    sector: "Redondel del Ciclista",
    area: 96,
    bedrooms: 2,
    bathrooms: 2.5,
    parking: 2,
    image: "/properties/ciclista_1.jpeg",
    images: [
      "/properties/ciclista_1.jpeg",
      "/properties/ciclista_2.jpeg",
      "/properties/ciclista_3.jpeg",
      "/properties/ciclista_4.jpeg",
      "/properties/ciclista_5.jpeg",
      "/properties/ciclista_6.jpeg",
      "/properties/ciclista_7.jpeg",
      "/properties/ciclista_8.jpeg"
    ],
    tags: ["Baño en cada Hab.", "Estilo Integrado", "Bodega", "Excelente Ubicación", "Bajo Costo Alícuota"]
  }
];
