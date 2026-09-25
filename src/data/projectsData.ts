import { ArchitecturalProject, ServiceItem } from '../types/architecture';

export const PROJECTS_DATA: ArchitecturalProject[] = [
  {
    id: 'modularidad-premium',
    refCode: 'ARCH-2025-MOD',
    title: 'Modularidad Premium',
    location: 'Sotogrande / Madrid',
    area: '680 m²',
    year: '2025',
    category: 'modular',
    categoryLabel: 'Arquitectura Modular Industrializada',
    imageUrl: import.meta.env.BASE_URL + '721099171_1894561801234574_4184927469999369895_n.jpg',
    imageAlt: 'Modularidad Premium: Residencia modular de lujo con cápsulas de hormigón blanco redondeadas, paneles verticales de madera de roble, ventanales panorámicos de vidrio estructural y palmera tropical al atardecer',
    materialHighlight: 'CÁPSULAS GFRC & ROBLE',
    materialColor: 'bg-emerald-400',
    shortDescription: 'Líneas limpias, alta densidad, altamente flexibles. Combinando lujo contemporáneo con precisión quirúrgica en cuatro módulos industrializados de hormigón redondeado y roble natural.',
    fullDescription: 'Modularidad Premium representa el pináculo de la industrialización arquitectónica de alto standing. La vivienda se articula mediante cuatro módulos autoportantes de alta precisión ensamblados in situ en menos de 72 horas. Dos cápsulas de envolvente continua en microcemento blanco con esquinas redondeadas albergan la cocina gourmet y la suite principal, mientras que dos módulos ortogonales revestidos en listones verticales de roble natural y ventanales panorámicos completan las áreas sociales y terrazas en voladizo.',
    specs: [
      { label: 'Sistema Constructivo', value: '4 Módulos Tridimensionales Off-Site' },
      { label: 'Superficie Construida', value: '680 m²' },
      { label: 'Tiempo de Montaje', value: '72 horas en parcela' },
      { label: 'Envolvente', value: 'Cápsulas GFRC termoacústicas U = 0.14 W/m²K' },
      { label: 'Madera de Fachada', value: 'Roble europeo termotratado sin mantenimiento' },
      { label: 'Certificación Energética', value: 'Passivhaus Premium (Net-Positive)' },
    ],
    features: [
      'Cápsulas arquitectónicas con esquinas curvas de radio continuo (R=55cm)',
      'Cocina integrada con isla de roble y encimera monolítica vista desde el exterior',
      'Planta superior con cortinas difusoras textiles y suite en voladizo',
      'Podio aterrazado de hormigón flotante con junta de sombra perimetral',
      'Integración biofílica con palmeras tropicales y lámina de agua reflectante',
      'Precisión milimétrica de tolerancias industriales inferiores a 1 mm'
    ],
    has3DModel: true,
    modelKey: 'modular',
    galleryImages: [
      import.meta.env.BASE_URL + '721099171_1894561801234574_4184927469999369895_n.jpg',
      import.meta.env.BASE_URL + '608957458_1388015189531242_8447060198789431145_n.jpg'
    ]
  },
  {
    id: 'casa-travertino',
    refCode: 'ARCH-2024-TRV',
    title: 'Casa Travertino I',
    location: 'Pozuelo de Alarcón, Madrid',
    area: '850 m²',
    year: '2024',
    category: 'residencial',
    categoryLabel: 'Residencial Alto Standing',
    imageUrl: import.meta.env.BASE_URL + '725153208_1487642689218128_819161186868229869_n.jpg',
    imageAlt: 'Monolithic luxury residence built from warm textured travertine stone blocks with warm architectural evening illumination, concrete entry steps, curving driveway with manicured circular lawn and illuminated tree under a dramatic sunset sky in Madrid',
    materialHighlight: 'TRAVERTINO AL CORTE',
    materialColor: 'bg-amber-400/80',
    shortDescription: 'Estructuración monolítica en bloques continuos de piedra natural. Las hendiduras verticales permiten el ingreso calibrado del sol poniente, generando una atmósfera introspectiva y majestuosa.',
    fullDescription: 'Ubicada en una suave elevación topográfica de Pozuelo de Alarcón, Casa Travertino I se articula mediante volúmenes ortogonales de piedra travertino romano extraída y labrada a corte continuo. La vivienda se cierra con dignidad hacia la vía pública y se desfragmenta gradualmente hacia el suroeste, captando la luz ámbar del atardecer madrileño.',
    specs: [
      { label: 'Superficie Construida', value: '850 m²' },
      { label: 'Parcela', value: '2,400 m²' },
      { label: 'Orientación Principal', value: 'Suroeste (215° Azimut)' },
      { label: 'Envolvente Térmica', value: 'Muro multicapa U = 0.18 W/m²K' },
      { label: 'Sistema de Clima', value: 'Geotermia vertical + Suelo radiante' },
      { label: 'Certificación Energética', value: 'Passivhaus Classic (A+)' },
    ],
    features: [
      'Envolvente exterior en travertino romano de 8cm ventilado',
      'Carpintería oculta de aluminio anonizado y vidrio triple',
      'Driveway curvo con adoquín de granito flameado y rotonda botánica',
      'Piscina infinita revestida en basalto oscuro'
    ],
    has3DModel: true,
    modelKey: 'travertino',
    galleryImages: [
      import.meta.env.BASE_URL + '725153208_1487642689218128_819161186868229869_n.jpg'
    ]
  },
  {
    id: 'villa-cristal-agua',
    refCode: 'ARCH-2024-VCA',
    title: 'Villa Cristal & Agua',
    location: 'Valle de Bravo, México',
    area: '1,120 m²',
    year: '2024',
    category: 'residencial',
    categoryLabel: 'Residencial Alto Standing',
    imageUrl: import.meta.env.BASE_URL + '725279091_1358169512825333_7700966943037890292_n.jpg',
    imageAlt: 'Stunning ultra contemporary multi-story white architectural villa at twilight with fully glazed structural glass upper floor glowing warmly, lower travertine garage, suspended greenery planter box and an illuminated sheet waterfall fountain pouring into a reflection pool',
    materialHighlight: 'VIDRIO ESTRUCTURAL',
    materialColor: 'bg-cyan-400/80',
    shortDescription: 'Voladizos que flotan sobre una lámina de agua en cascada. El prisma transparente superior ofrece vistas panorámicas 270° preservando el confort climático mediante cristalería electrocrómica.',
    fullDescription: 'Villa Cristal & Agua dialoga de manera íntima con la orografía y el ecosistema lacustre de Valle de Bravo. Su estructura híbrida yuxtapone un basamento pétreo arraigado al terreno con un piso superior ingrávido de cristal estructural suspendido.',
    specs: [
      { label: 'Superficie Construida', value: '1,120 m²' },
      { label: 'Voladizo Principal', value: '4.8 m libre sin apoyos' },
      { label: 'Lámina de Agua', value: '180 m² con rebosadero continuo' },
      { label: 'Aislamiento Acústico', value: 'Rw = 49 dB' },
      { label: 'Energía Fotovoltaica', value: '22 kWp integrados en cubierta plana' }
    ],
    features: [
      'Caja de vidrio superior con iluminación rasante indirecta integrada',
      'Cascada de agua laminar con bombeo solar de circuito cerrado',
      'Jardinera aérea suspendida con flora endémica descolgante'
    ],
    has3DModel: true,
    modelKey: 'cristal',
    galleryImages: [
      import.meta.env.BASE_URL + '725279091_1358169512825333_7700966943037890292_n.jpg'
    ]
  },
  {
    id: 'residencia-domotica-v',
    refCode: 'ARCH-2023-RDV',
    title: 'Residencia Domótica V',
    location: 'La Moraleja, Madrid',
    area: '940 m²',
    year: '2023',
    category: 'domotica',
    categoryLabel: 'Domótica & High-Tech',
    imageUrl: import.meta.env.BASE_URL + '725588653_1731047268076807_2055582365866218853_n.jpg',
    imageAlt: 'High-tech brutalist luxury black mansion at dusk featuring matte black composite panels, cantilevered glass lounge with warm ambient lighting inside, illuminated minimalist concrete staircase and manicured topiary trees',
    materialHighlight: 'ALGORITMO DOMÓTICO IA',
    materialColor: 'bg-amber-500',
    shortDescription: 'Arquitectura high-tech revestida en grafito mate. El edificio aprende hábitos térmicos y circadianos de sus ocupantes para autorregular persianas estructurales y climatización por pozo canadiense.',
    fullDescription: 'Residencia Domótica V representa el matrimonio perfecto entre el brutalismo refinado y la tecnología de control espacial. Los paneles de composite mineral negro mate absorben la radiación diurna mientras un sistema de sensores IoT distribuidos ajusta la opacidad de los vidrios.',
    specs: [
      { label: 'Superficie Construida', value: '940 m²' },
      { label: 'Servidor Central', value: 'Doble redundancia KNX / BACnet IP' },
      { label: 'Consumo Energético', value: 'Net-Zero Positivo (-14 kWh/m²a)' },
      { label: 'Control Lumínico', value: 'Escenas circadianas 1800K - 6500K' }
    ],
    features: [
      'Escalera flotante exterior iluminada con líneas rasantes LED empotradas',
      'Lounge en voladizo con ventanales de 6 metros de altura continua',
      'Jardín zen con árboles topiarios esculpidos y microclima regulado'
    ],
    has3DModel: true,
    modelKey: 'domotica',
    galleryImages: [
      import.meta.env.BASE_URL + '725588653_1731047268076807_2055582365866218853_n.jpg'
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 's01',
    number: '[S·01]',
    title: 'Diseño Residencial Premium & Modular',
    summary: 'Desarrollo conceptual, maquetación tridimensional hiperrealista y redacción de proyecto de ejecución integral para residencias modulares de cápsulas y villas privadas.',
    details: 'Nuestro proceso abarca desde los primeros croquis de ordenación volumétrica hasta la modelización BIM LOD 500 y despiece de módulos prefabricados. Analizamos la trayectoria heliotérmica de la parcela para producir una geometría de cápsulas ensambladas con precisión milimétrica.',
    tags: ['Cápsulas Prefabricadas', 'Modelado BIM LOD 500', 'Interiorismo Integrado', 'Maquetas Físicas & 3D'],
    deliverables: ['Memoria técnica visada', 'Planos de replanteo milimétricos', 'Modelos 3D interactivos', 'Pliego de ensamble off-site'],
    timeline: '3 a 5 meses de proyecto ejecutivo'
  },
  {
    id: 's02',
    number: '[S·02]',
    title: 'Paisajismo e Integración Biofílica',
    summary: 'Diseño de jardines arquitectónicos, palmeras tropicales, láminas de agua espejadas y terrazas de hormigón flotante.',
    details: 'Tratamos el paisaje no como un adorno periférico sino como una extensión tectónica del propio edificio. Diseñamos podios escalonados, taludes vegetales y palmeras estratégicamente dispuestas para enmarcar las vistas principales.',
    tags: ['Topografía Esculpida', 'Palmeras Escultóricas', 'Láminas de Agua Vivas', 'Terrazas Flotantes'],
    deliverables: ['Proyecto botánico integral', 'Esquema hidráulico de fuentes y piscinas', 'Plan de iluminación exterior rasante'],
    timeline: '2 a 4 meses en paralelo con proyecto'
  },
  {
    id: 's03',
    number: '[S·03]',
    title: 'Dirección y Montaje de Obra',
    summary: 'Control de calidad milimétrico in situ, coordinación de ensamblaje de módulos en 72 horas y auditoría económica semanal.',
    details: 'Nuestra presencia en obra y en planta de prefabricación es innegociable. Supervisamos cada cápsula de hormigón GFRC, cada junta de roble termotratado y cada carpintería curva embutida con tolerancias inferiores a 1 mm.',
    tags: ['Montaje en 72 Horas', 'Tolerancias < 1mm', 'Plazos Garantizados', 'Certificación Passivhaus'],
    deliverables: ['Informes fotogramétricos semanales', 'Certificaciones de hito real', 'Pruebas Blower Door'],
    timeline: '6 a 9 meses de ejecución total'
  },
  {
    id: 's04',
    number: '[S·04]',
    title: 'Automatización y Domótica Invisible',
    summary: 'Protocolos KNX integrados en paneles empotrados sin cajas visibles. Gestión climática zonificada, apertura biométrica y control acústico inteligente.',
    details: 'La verdadera tecnología de vanguardia no se ve ni se escucha: simplemente responde con discreción. Integramos climatización geotérmica invisible, monitorización de CO2, aperturas robotizadas de carpinterías pesadas y escenas lumínicas circadianas.',
    tags: ['Protocolo KNX Pro', 'Iluminación DALI Circadiana', 'Audio Invisible Stealth', 'Pozo Canadiense IoT'],
    deliverables: ['Arquitectura de red domótica', 'Programación de escenas personalizadas', 'App de control privado'],
    timeline: 'Integrado desde fase de prefabricación'
  }
];

export const STUDIO_METRICS = [
  { index: '01 / RECONOCIMIENTOS', value: '48', label: 'Premios Internacionales Mies & FAD' },
  { index: '02 / INDUSTRIALIZACIÓN', value: '72H', label: 'Tiempo récord de ensamblaje en parcela' },
  { index: '03 / ESTÁNDAR TÉCNICO', value: 'PASSIV', label: 'Certificación Passivhaus & Net-Zero' },
  { index: '04 / PRECISIÓN', value: '<1mm', label: 'Tolerancia en ensamblaje de cápsulas' },
];
