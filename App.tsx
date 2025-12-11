
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight,
  Globe, 
  Briefcase, 
  TrendingUp, 
  MapPin,
  Calendar,
  Menu,
  X,
  FileText,
  PieChart,
  ClipboardList,
  HelpCircle,
  Send
} from 'lucide-react';

import { HexagonPattern, DotPattern } from './components/ui/Backgrounds';
import { FadeInUp, Reveal } from './components/ui/AnimationWrapper';
import { BentoGrid, BentoItem } from './components/BentoGrid';
import { SmokeEffect } from './components/ui/SmokeEffect';

// --- Constants & Data ---

// Specified Palette
const BRAND_COLORS = [
  '#EE7F1B', // Orange
  '#1C79C2', // Blue
  '#269135', // Green
  '#CD5395', // Pink
  '#B6264A'  // Red
];

// Gradient excluding Green as per previous request
const TEXT_GRADIENT_CLASS = "bg-clip-text text-transparent bg-[linear-gradient(90deg,#ED7539,#ED7539,#4D2B5E,#4D2B5E)]";

// User provided images
const IMAGES = [
  "https://images.unsplash.com/photo-1517146783983-418c681b56c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGV4dGlsZXxlbnwwfHwwfHx8MA%3D%3D", // 0: Threads/Machine
  "https://plus.unsplash.com/premium_photo-1675799745842-33425f7716df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRleHRpbGV8ZW58MHx8MHx8fDA%3D", // 1: Texture
  "https://media.istockphoto.com/id/898566242/photo/choosing-a-fabric-color-in-a-store.jpg?s=2048x2048&w=is&k=20&c=1Ib8VPywrD1Ble0OgyXi88sUZtOhZnpSSqD1YYknxKc=", // 2: Choosing Fabric
  "https://images.unsplash.com/photo-1536867520774-5b4f2628a69b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhYnJpY3xlbnwwfHwwfHx8MA%3D%3D", // 3: Silk/Fabric Rolls
  "https://images.unsplash.com/photo-1570215171323-4ec328f3f5fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvZnR3YXJlfGVufDB8fDB8fHww"  // 4: Tech
];

const EVENTS = [
  {
    country: "BANGLADESH",
    date: "17-19.06.2026",
    venue: "ICCB, Dhaka",
    status: "Upcoming",
    color: BRAND_COLORS[4], // Red
    images: [
      IMAGES[0], IMAGES[1], IMAGES[2], IMAGES[3], IMAGES[4]
    ]
  },
  {
    country: "SRI LANKA",
    date: "05-07.08.2026",
    venue: "BMICH, Colombo",
    status: "Upcoming",
    color: BRAND_COLORS[1], // Blue
    images: [
      IMAGES[1], IMAGES[2], IMAGES[3], IMAGES[4], IMAGES[0]
    ]
  },
  {
    country: "INDIA",
    date: "TBA",
    venue: "New Delhi",
    status: "Announcing Soon",
    color: BRAND_COLORS[2], // Green
    images: [
      IMAGES[2], IMAGES[3], IMAGES[4], IMAGES[0], IMAGES[1]
    ]
  }
];

const STATS = [
  { label: "Business Generated", value: "₹5000Cr+" },
  { label: "Exhibitor Satisfaction", value: "98%" },
  { label: "Countries Reached", value: "120+" },
  { label: "Growth YoY", value: "100%" }
];

const BUYER_CATEGORIES = [
  "Apparel Brands",
  "Fashion Design Studios",
  "Fashion Designers & Private Labels",
  "Apparel Exporters",
  "Apparel Manufacturers",
  "International Brands & Retailers",
  "International Sourcing Offices",
  "Buying Agents",
  "Buying Houses",
  "Merchant Exporters",
  "Retail Chain Stores",
  "Chambers of Commerce",
  "Denim Brands",
  "Textile Exporters",
  "Textile Importers",
  "Denim Exporters",
  "Denim Manufacturers",
  "Textile Manufacturers",
  "Trade Associations",
  "Distributors",
  "E-tailers",
  "Trading Houses"
];

// --- Sub Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black/10">
      <div className="container mx-auto px-4 md:px-6  flex justify-between items-center">
        <div className="flex items-center gap-2">
           {/* <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: BRAND_COLORS[0] }}>
             <span className="text-white font-mono font-bold text-lg">I</span>
           </div> */}
           {/* <span className="font-semibold tracking-tight text-lg uppercase">Intex</span> */}
           <img className="w-36" src="https://bd.intexsouthasia.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.ff36e4e2.png&w=384&q=75" alt="img" />
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider font-medium">
          {['About', 'Exhibitor', 'Buyer', 'Media'].map((item) => (
            <a key={item} href="#" className="hover:text-[var(--hover-color)] transition-colors" style={{ '--hover-color': BRAND_COLORS[1] } as React.CSSProperties}>
              {item}
            </a>
          ))}
          <a 
            href="#" 
            className="flex items-center gap-2 text-white px-4 py-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: BRAND_COLORS[4] }} // Red button
          >
            Book Booth <ArrowRight size={14} />
          </a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const RotatingHeroGrid = () => {

  const perimeterCoords = [
    // Top Row (Left to Right)
    {x:0,y:0}, {x:1,y:0}, {x:2,y:0}, {x:3,y:0}, {x:4,y:0}, {x:5,y:0},
    // Right Col (Top to Bottom)
    {x:5,y:1}, {x:5,y:2}, {x:5,y:3}, {x:5,y:4}, {x:5,y:5},
    // Bottom Row (Right to Left)
    {x:4,y:5}, {x:3,y:5}, {x:2,y:5}, {x:1,y:5}, {x:0,y:5},
    // Left Col (Bottom to Top)
    {x:0,y:4}, {x:0,y:3}, {x:0,y:2}, {x:0,y:1}
  ];

  const getPercentage = (val: number) => `${val * 100}%`;

  return (
    <div className="relative w-full aspect-square bg-gray-50 border border-black/10 select-none overflow-hidden backdrop-blur-3xl">
      {/* Center Video (Enlarged 4x4 in middle) */}
      {/* Covers grid positions x:1,2,3,4 y:1,2,3,4 */}
      <div className="absolute top-[16.666%] left-[16.666%] w-[66.666%] h-[66.666%] border border-white/20 z-20 overflow-hidden shadow-2xl">
         {/* <div className="absolute inset-0 bg-black/40 z-10 animate-pulse pointer-events-none"></div>
         <div className="absolute inset-0 border-[1px] border-white/30 z-20"></div> */}
         <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/-68Bm1eKn8Y?si=_E_rvPD-AARZOmXj"
          title="Video"
          className="w-full h-full object-cover grayscale scale-110 opacity-90"
          allow="autoplay; encrypted-media"
        />
        {/* Cinematic Scanlines */}
        <div className="absolute inset-0 z-30 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
        
        {/* REC Indicator */}
        <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
           <span className="font-mono text-[10px] text-white/80 tracking-widest">REC</span>
        </div>
      </div>

      {/* Perimeter Ring Animation */}
      {perimeterCoords.map((_, index) => {
         // Create smooth path for each item
         const keyframes = [];
         for(let k=0; k<=perimeterCoords.length; k++) {
            const posIndex = (index + k) % perimeterCoords.length;
            const coord = perimeterCoords[posIndex];
            keyframes.push({ x: getPercentage(coord.x), y: getPercentage(coord.y) });
         }
         
         return (
            <motion.div
               key={`outer-${index}`}
               className="absolute top-0 left-0 w-[16.666%] h-[16.666%] p-[1px] z-10 will-change-transform"
               initial={{ x: getPercentage(perimeterCoords[index].x), y: getPercentage(perimeterCoords[index].y) }}
               animate={{ x: keyframes.map(k => k.x), y: keyframes.map(k => k.y) }}
               transition={{ duration: 50, ease: "linear", repeat: Infinity }}
            >
               <div className="relative w-full h-full bg-white/5 backdrop-blur-md border border-white/10 group overflow-hidden">
                  <img src={IMAGES[index % IMAGES.length]} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-500" alt=""/>
               </div>
            </motion.div>
         )
      })}
    </div>
  );
};

const ScannerHero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col pt-32 bg-white overflow-hidden border-b border-black/10">
      {/* Smoke Effect (Ink in Water) */}
      <div className="absolute inset-0 z-0">
        <SmokeEffect opacity={0.7} />
      </div>

      {/* Hexagon Layer */}
      <div className="absolute inset-0 z-0">
        <HexagonPattern opacity={0.05} />
      </div>

      {/* Hero Content */}
      <div className="relative flex flex-col flex-grow z-10 container mx-auto px-4 md:px-6">
        
        {/* Top Meta Information REMOVED */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center flex-grow pb-16">
          {/* LEFT COLUMN: Text */}
          <div className="flex flex-col justify-center">
             <div className="mix-blend-multiply">
              <FadeInUp>
               <h1 className={`text-[12vw] lg:text-[7vw] leading-[0.85] font-black tracking-tighter uppercase mb-8 ${TEXT_GRADIENT_CLASS}`}>
                  Intex<br/>
                  South<br/>
                  Asia.
               </h1>
              </FadeInUp>
            </div>

            <FadeInUp delay={0.2}>
              <p className="font-mono text-xs md:text-sm leading-relaxed text-gray-600 text-justify uppercase tracking-wide mb-12 max-w-lg">
                The premier international textiles sourcing show. 
                Facilitating trade between <span className="font-bold" style={{ color: BRAND_COLORS[1] }}>55,000+ buyers</span> and suppliers across 
                <span className="font-bold" style={{ color: BRAND_COLORS[0] }}> 40+ countries</span>. 
                Engineered for business growth.
              </p>
            </FadeInUp>
             
            <FadeInUp delay={0.3} className="w-full max-w-md">
                 <div className="flex flex-col gap-4">
                   <button 
                    className="h-16 px-8 text-white transition-opacity font-mono uppercase text-sm tracking-widest flex items-center justify-between group w-full border border-black hover:opacity-90"
                    style={{ backgroundColor: BRAND_COLORS[4] }}
                   >
                      <span>Show Brochure</span>
                      <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>
                   </button>
                   
                   <div className="grid grid-cols-2 gap-4">
                     <button className="h-14 px-4 bg-white text-black border border-black hover:bg-gray-50 transition-colors font-mono uppercase text-xs tracking-widest">
                        Exhibitor Enquiry
                     </button>
                     <button className="h-14 px-4 bg-white text-black border border-black hover:bg-gray-50 transition-colors font-mono uppercase text-xs tracking-widest">
                        Buyer Registration
                     </button>
                   </div>
                 </div>
             </FadeInUp>
          </div>

          {/* RIGHT COLUMN: Rotating Grid */}
          <div className="w-full h-full flex items-center justify-center p-4 lg:p-0">
             <FadeInUp delay={0.4} className="w-full max-w-xl">
                <RotatingHeroGrid />
             </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-white">
      {/* Constrained width to match Exhibitor Profile and Hero Container */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 border-l border-r border-b border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10">
          {STATS.map((stat, i) => {
            const color = BRAND_COLORS[i % BRAND_COLORS.length];
            
            return (
              <div 
                key={i} 
                className="group relative p-8 lg:p-12 min-h-[320px] flex flex-col justify-between overflow-hidden bg-white cursor-crosshair"
              >
                 {/* Curtain Fill Reveal */}
                 <div 
                   className="absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"
                   style={{ backgroundColor: color }}
                 ></div>

                 {/* Top Row */}
                 <div className="relative z-10 flex justify-between items-start">
                   <span className="font-mono text-[10px] uppercase tracking-widest border border-black/20 px-1.5 py-0.5 text-black/60 group-hover:text-white group-hover:border-white/40 transition-colors duration-300">
                     0{i + 1}
                   </span>
                   {/* Reveal Icon */}
                   <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-45 group-hover:rotate-0 text-white">
                      <ArrowUpRight size={24} />
                   </div>
                 </div>

                 {/* Content */}
                 <div className="relative z-10 mt-auto">
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                      viewport={{ once: true }}
                      className="text-5xl lg:text-7xl font-black tracking-tighter mb-2 text-black group-hover:text-white transition-colors duration-300"
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="font-mono text-xs uppercase tracking-widest text-gray-500 group-hover:text-white/90 transition-colors duration-300">
                      {stat.label}
                    </p>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EventsList = () => {
  return (
    <section className="py-32 bg-white relative">
      <DotPattern opacity={0.3} />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 pb-6 border-b-2 border-black">
           <Reveal>
             <h2 className={`text-5xl md:text-8xl font-black tracking-tighter uppercase ${TEXT_GRADIENT_CLASS}`}>Schedule</h2>
           </Reveal>
           <div className="font-mono text-xs uppercase tracking-widest mt-4 md:mt-0 mb-2">
             /// 2026 Global Series
           </div>
        </div>

        <div className="flex flex-col border-t border-black/10">
          {EVENTS.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative border-b border-black/10 min-h-[180px] flex items-center bg-white overflow-hidden cursor-pointer"
            >
               {/* Hover Images Layer - Z-10 */}
               <div className="absolute inset-0 flex z-10 pointer-events-none">
                  {event.images.map((img, i) => (
                    <div 
                      key={i} 
                      className="flex-1 relative border-r border-white/20 last:border-0 h-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover grayscale" />
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                  ))}
               </div>

               {/* Active State Indicator Bar - Z-30 */}
               <div 
                  className="absolute left-0 top-0 bottom-0 w-1 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 z-30"
                  style={{ backgroundColor: event.color }}
               ></div>
               
               {/* Content Layer - Z-20 */}
               <div className="relative z-20 w-full flex flex-col md:flex-row justify-between items-start md:items-center py-8 group-hover:text-white transition-colors duration-300">
                 <div className="flex items-start md:items-center gap-8 w-full md:w-1/3 pl-6 md:pl-10">
                   <span className="font-mono text-xs text-gray-400 group-hover:text-white/60 transition-colors">0{index + 1}</span>
                   <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight transition-colors">
                     <span className={`${TEXT_GRADIENT_CLASS} group-hover:text-white group-hover:bg-none`}>{event.country}</span>
                   </h3>
                 </div>
                 
                 <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full md:w-2/3 mt-8 md:mt-0 font-mono text-xs uppercase tracking-wide pl-6 md:pl-0">
                    <div className="flex items-center gap-3 min-w-[150px]">
                      <Calendar size={14} className="text-gray-400 group-hover:text-white/60 transition-colors" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <MapPin size={14} className="text-gray-400 group-hover:text-white/60 transition-colors" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto pr-8">
                      <div className={`w-1.5 h-1.5 rounded-full ${event.status === 'Upcoming' ? 'animate-pulse' : ''}`} style={{ backgroundColor: event.status === 'Upcoming' ? '#22c55e' : 'gray' }}></div>
                      <span className="text-gray-400 group-hover:text-white/80 transition-colors">{event.status}</span>
                      <ArrowUpRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" style={{ color: event.color }} />
                    </div>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GridSection = () => {
  return (
    <section className="py-32 bg-white border-t border-black/10">
       <div className="container mx-auto px-4 md:px-6 mb-16 flex flex-col md:flex-row justify-between items-end">
         <div>
            <h2 className="text-sm font-mono uppercase tracking-widest mb-4 text-gray-500">/// Categories</h2>
            <h3 className={`text-4xl md:text-6xl font-bold tracking-tighter uppercase ${TEXT_GRADIENT_CLASS}`}>Exhibitor<br/>Profile</h3>
         </div>
         <p className="font-mono text-xs max-w-md text-gray-500 mt-8 md:mt-0">
           Showcasing the entire textile value chain from raw materials to finished products.
         </p>
       </div>
       
       <div className="container mx-auto px-4 md:px-6">
         <BentoGrid>
            <BentoItem 
              colSpan={2} 
              rowSpan={2} 
              title="Fibers & Yarns" 
              subtitle="01 // RAW"
              image={IMAGES[0]}
              color={BRAND_COLORS[0]} // Orange
            />
            <BentoItem 
              colSpan={1} 
              rowSpan={1} 
              title="Fabrics" 
              subtitle="02 // MATERIAL"
              image={IMAGES[1]}
              dark
              color={BRAND_COLORS[1]} // Blue
            />
            <BentoItem 
              colSpan={1} 
              rowSpan={2} 
              title="Denim" 
              subtitle="03 // TEXTURE"
              image={IMAGES[3]}
              color={BRAND_COLORS[2]} // Green
            />
            <BentoItem 
              colSpan={1} 
              rowSpan={1} 
              title="Trims & Accessories" 
              subtitle="04 // ACCENT"
              image={IMAGES[2]}
              color={BRAND_COLORS[3]} // Pink
            />
             <BentoItem 
              colSpan={2} 
              rowSpan={1} 
              title="Software & ERP" 
              subtitle="05 // DIGITAL"
              image={IMAGES[4]}
              dark
              color={BRAND_COLORS[4]} // Red
            />
             <BentoItem 
              colSpan={2} 
              rowSpan={1} 
              title="Other Allied Services" 
              subtitle="06 // SERVICES"
              image={IMAGES[0]}
              color={BRAND_COLORS[0]} // Orange
            />
         </BentoGrid>
       </div>
    </section>
  );
};

const BuyerProfileSection = () => {
  // Split categories into two rows
  const half = Math.ceil(BUYER_CATEGORIES.length / 2);
  const row1 = BUYER_CATEGORIES.slice(0, half);
  const row2 = BUYER_CATEGORIES.slice(half);

  // Helper for duplicate content
  const renderCards = (items: string[], offsetIndex: number) => (
     items.map((item, i) => {
        const color = BRAND_COLORS[(i + offsetIndex) % BRAND_COLORS.length];
        return (
          <div key={`${item}-${i}`} className="w-80 h-56 relative border border-black/10 shrink-0 group/card overflow-hidden">
             <img 
              src={IMAGES[(i + offsetIndex) % IMAGES.length]} 
              alt={item} 
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500 scale-100 group-hover/card:scale-110"
             />
             <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors duration-500"></div>
             {/* Colored Overlay on Hover */}
             <div className="absolute inset-0 opacity-0 group-hover/card:opacity-30 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: color }}></div>
             
             <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                   <span className="font-mono text-[10px] text-white/80 border border-white/30 px-2 py-0.5">
                     0{offsetIndex + 1}.{i+1}
                   </span>
                   <div className="w-2 h-2 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity" style={{ backgroundColor: color }}></div>
                </div>
                <h4 className="text-xl font-bold text-white uppercase leading-tight tracking-tight break-words whitespace-normal drop-shadow-md">
                  {item}
                </h4>
             </div>
          </div>
        );
     })
  );

  return (
    <section className="py-32 bg-white border-t border-black/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-16 flex flex-col md:flex-row justify-between items-end">
        <Reveal>
          <div>
            <h2 className="text-sm font-mono uppercase tracking-widest mb-4 text-gray-500">/// Audience</h2>
            <h3 className={`text-4xl md:text-6xl font-bold tracking-tighter uppercase ${TEXT_GRADIENT_CLASS}`}>Buyer<br/>Profile</h3>
          </div>
        </Reveal>
        <p className="font-mono text-xs max-w-md text-gray-500 mt-8 md:mt-0 text-right">
           Connecting you with key decision makers from across the globe.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-4">
          {/* Row 1 - Left */}
          <div className="relative overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
             <motion.div 
               className="flex whitespace-nowrap"
               animate={{ x: [0, "-50%"] }} // Move from 0 to -50% for seamless loop of duplicated content
               transition={{ duration: 60, ease: "linear", repeat: Infinity }}
               style={{ width: "fit-content" }}
             >
               {renderCards(row1, 0)}
               {renderCards(row1, 0)}
             </motion.div>
          </div>

          {/* Row 2 - Right */}
          <div className="relative overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
             <motion.div 
               className="flex whitespace-nowrap"
               animate={{ x: ["-50%", 0] }}
               transition={{ duration: 60, ease: "linear", repeat: Infinity }}
               style={{ width: "fit-content" }}
             >
               {renderCards(row2, 2)}
               {renderCards(row2, 2)}
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResourcesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const RESOURCES = [
    { title: "Show Brochure", desc: "Download comprehensive exhibition details", icon: FileText },
    { title: "Factsheet", desc: "Key statistics and data insights", icon: PieChart },
    { title: "Post Show Report", desc: "Review past event highlights", icon: ClipboardList },
    { title: "FAQ", desc: "Get your questions answered", icon: HelpCircle }
  ];

  return (
    <section className="py-32 bg-white border-t border-black/10">
      <div className="container mx-auto px-4 md:px-6 mb-16 flex flex-col md:flex-row justify-between items-end">
         <Reveal>
            <div>
              <h2 className="text-sm font-mono uppercase tracking-widest mb-4 text-gray-500">/// Knowledge Base</h2>
              <h3 className={`text-4xl md:text-6xl font-bold tracking-tighter uppercase ${TEXT_GRADIENT_CLASS}`}>Resources</h3>
            </div>
         </Reveal>
         <p className="font-mono text-xs max-w-md text-gray-500 mt-8 md:mt-0 text-right">
            Essential documentation for exhibitors and visitors.
         </p>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/10">
          {RESOURCES.map((item, i) => {
            const color = BRAND_COLORS[(i + 1) % BRAND_COLORS.length]; // Offset color index
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                 key={i}
                 onMouseEnter={() => setHoveredIndex(i)}
                 onMouseLeave={() => setHoveredIndex(null)}
                 className="group border-r border-b border-black/10 p-10 transition-colors duration-500 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[280px]"
                 style={{ backgroundColor: isHovered ? color : 'white' }}
              >
                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <ArrowUpRight size={24} strokeWidth={1} />
                 </div>
                 
                 <div className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}>
                    <item.icon size={40} strokeWidth={1} />
                 </div>
                 
                 <div className="relative z-10">
                    <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 uppercase tracking-tight ${isHovered ? 'text-white' : 'text-black'}`}>
                      {item.title}
                    </h4>
                    <p className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-gray-500'}`}>
                      {item.desc}
                    </p>
                 </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryItems = [...IMAGES, ...IMAGES.slice(0, 2)];

  return (
    <section className="bg-white border-t border-black/10 py-32 relative">
      <div className="container mx-auto px-4 md:px-6 mb-16 flex flex-col md:flex-row justify-between items-end">
           <Reveal>
              <div>
                <h2 className="text-sm font-mono uppercase tracking-widest mb-4 text-gray-500">/// Visual Intelligence</h2>
                <h3 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] ${TEXT_GRADIENT_CLASS}`}>
                  Exhibition<br/>Archive
                </h3>
              </div>
           </Reveal>
           <div className="mt-8 md:mt-0 font-mono text-xs uppercase tracking-wide text-right hidden md:block">
              <p>Hover to expand</p>
              <p>2024 Collection</p>
           </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div 
            className="flex flex-col md:flex-row w-full h-[70vh] bg-black overflow-hidden border border-black/10"
            onMouseLeave={() => setActiveIndex(0)}
        >
          {galleryItems.map((img, index) => {
             const isActive = activeIndex === index;
             const color = BRAND_COLORS[index % BRAND_COLORS.length];
             
             return (
              <div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                className="relative h-full border-b md:border-b-0 md:border-r border-black/20 overflow-hidden cursor-pointer transition-[flex-grow] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[flex-grow]"
                style={{
                  flexGrow: isActive ? 3.5 : 1,
                  flexBasis: '0%'
                }}
              >
                 {/* Image */}
                 <img 
                   src={img} 
                   alt={`Archive ${index}`} 
                   className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isActive ? 'filter-none scale-110' : 'grayscale brightness-50 scale-100'}`}
                 />
                 
                 {/* Overlay Content */}
                 <div className={`absolute inset-0 p-6 md:p-10 flex flex-col justify-between transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex justify-between items-start">
                       <span className="text-white text-[10px] font-mono px-2 py-1 uppercase tracking-widest" style={{ backgroundColor: color }}>
                         IMG_00{index + 1}
                       </span>
                       <ArrowUpRight className="text-white drop-shadow-md" size={32} />
                    </div>
                    <div>
                      <h4 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 drop-shadow-lg">
                        {['Bangladesh - 2022', 'Sri Lanka - 2022', 'India 2022', 'Bangladesh - 2023', 'Sri Lanka - 2023', 'Bangladesh - 2024', 'Sri Lanka - 2024'][index]}
                      </h4>
                      <p className="text-white/80 font-mono text-xs uppercase tracking-widest">
                         View Details
                      </p>
                    </div>
                 </div>

                 {/* Inactive Label (Vertical) */}
                 <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="hidden md:block text-white/70 font-mono text-xs uppercase tracking-[0.2em] rotate-90 whitespace-nowrap drop-shadow-md">
                       Archive 0{index + 1}
                    </span>
                 </div>
              </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="py-32 bg-white border-t border-black/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left Column: Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xl md:text-2xl font-bold mb-8 uppercase tracking-tight">Communication_Channels</h4>
              <a href="mailto:info@intexsouthasia.com" className="text-3xl md:text-5xl font-black tracking-tighter hover:text-gray-600 transition-colors block mb-12 uppercase break-all">
                info@intex<br/>southasia.com
              </a>
              
              <div className="grid grid-cols-2 gap-8 font-mono text-xs uppercase tracking-widest text-gray-500">
                <div>
                   <p className="mb-1 text-black font-bold">Response_Time</p>
                   <p>&lt; 24 HRS</p>
                </div>
                <div>
                   <p className="mb-1 text-black font-bold">Hotline</p>
                   <p>+91 22 1234 5678</p>
                </div>
                 <div>
                   <p className="mb-1 text-black font-bold">Availability</p>
                   <p>Mon - Fri / 09:00 - 18:00</p>
                </div>
              </div>
            </div>

            <p className="font-mono text-xs text-gray-500 mt-12 max-w-sm uppercase leading-relaxed">
              Looking for a custom solution? Fill out the transmission form to initialize a secure connection.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <form className="flex flex-col gap-10">
               <div className="group relative">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">01 // Identity</label>
                  <input 
                    type="text" 
                    placeholder="YOUR NAME" 
                    className="w-full bg-transparent border-b border-black py-4 font-mono text-lg outline-none focus:border-[var(--focus-color)] transition-colors placeholder:text-black/30"
                    style={{ '--focus-color': BRAND_COLORS[0] } as React.CSSProperties}
                  />
               </div>

               <div className="group relative">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">02 // Coordinates</label>
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL" 
                    className="w-full bg-transparent border-b border-black py-4 font-mono text-lg outline-none focus:border-[var(--focus-color)] transition-colors placeholder:text-black/30"
                    style={{ '--focus-color': BRAND_COLORS[1] } as React.CSSProperties}
                  />
               </div>

               <div className="group relative">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">03 // Payload</label>
                  <textarea 
                    placeholder="PROJECT DETAILS..." 
                    rows={4}
                    className="w-full bg-transparent border-b border-black py-4 font-mono text-lg outline-none focus:border-[var(--focus-color)] transition-colors placeholder:text-black/30 resize-none"
                    style={{ '--focus-color': BRAND_COLORS[3] } as React.CSSProperties}
                  />
               </div>

               <button 
                type="button" 
                className="group relative h-16 bg-black text-white font-mono uppercase text-sm tracking-widest overflow-hidden mt-4"
               >
                  <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full group-hover:text-black transition-colors duration-300">
                    Send Transmission <Send size={14} />
                  </span>
                  <div 
                    className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.16,1,0.3,1] z-0"
                  ></div>
               </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  // Duplicating content enough times to fill screen and loop seamlessly
  const content = [...Array(4)].map((_, i) => (
    <React.Fragment key={i}>
      <span className="flex items-center gap-4">
        <Globe size={18} style={{ color: BRAND_COLORS[0] }} /> Global Sourcing
      </span>
      <span className="flex items-center gap-4">
        <TrendingUp size={18} style={{ color: BRAND_COLORS[1] }} /> Textile Innovation
      </span>
      <span className="flex items-center gap-4">
        <Briefcase size={18} style={{ color: BRAND_COLORS[3] }} /> Business Growth
      </span>
    </React.Fragment>
  ));

  return (
    <div className="border-t border-b border-black py-6 bg-black text-white overflow-hidden flex relative z-10">
      <motion.div 
        className="flex whitespace-nowrap gap-24 font-mono text-lg font-bold uppercase tracking-widest"
        animate={{ x: [0, "-50%"] }} // Translate -50% to loop the doubled content
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        style={{ width: "fit-content" }}
      >
        {content}
        {content}
      </motion.div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white text-black pt-32 pb-12 border-t border-black/10 relative overflow-hidden">
      <HexagonPattern opacity={0.03} />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32">
          <div className="col-span-1 md:col-span-1 pr-8">
             <div className="w-16 h-16 text-white flex items-center justify-center font-mono text-2xl font-bold mb-8" style={{ backgroundColor: BRAND_COLORS[0] }}>
               I
             </div>
             <p className="font-mono text-xs text-gray-500 leading-relaxed uppercase tracking-wide">
               The platform for the textile industry.<br/>
               Connecting South Asia to the World.<br/>
               Since 2015.
             </p>
          </div>
          
          <div className="col-span-1">
            <h4 className={`font-mono text-xs font-bold uppercase mb-8 border-b border-black pb-2 inline-block text-black`}>Platform</h4>
            <ul className="space-y-4 font-medium text-sm text-gray-600">
              <li><a href="#" className="hover:text-black hover:translate-x-2 transition-all block">Exhibitors</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-2 transition-all block">Visitors</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-2 transition-all block">Why Intex?</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-2 transition-all block">Venue Maps</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className={`font-mono text-xs font-bold uppercase mb-8 border-b border-black pb-2 inline-block text-black`}>Company</h4>
            <ul className="space-y-4 font-medium text-sm text-gray-600">
              <li><a href="#" className="hover:text-black hover:translate-x-2 transition-all block">About Worldex</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-2 transition-all block">Press Room</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-2 transition-all block">Contact</a></li>
              <li><a href="#" className="hover:text-black hover:translate-x-2 transition-all block">Careers</a></li>
            </ul>
          </div>

          <div className="col-span-1">
             <h4 className={`font-mono text-xs font-bold uppercase mb-8 border-b border-black pb-2 inline-block text-black`}>Subscribe</h4>
             <div className="flex border-b border-black pb-4 pt-2">
               <input type="email" placeholder="ENTER EMAIL ADDRESS" className="w-full bg-transparent outline-none font-mono text-xs placeholder:text-gray-400 uppercase" />
               <button className="text-black font-bold uppercase text-xs hover:opacity-80 ml-4 transition-opacity" style={{ color: BRAND_COLORS[4] }}>Join</button>
             </div>
             <p className="font-mono text-[10px] text-gray-400 mt-4 uppercase">
                Receive intelligence updates directly to your inbox.
             </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-black/10 pt-8 font-mono text-[10px] uppercase text-gray-400 tracking-widest">
           <div className="flex flex-col gap-1">
              <span className="text-black font-bold">&copy; 2024 Intex South Asia.</span>
              <span>All Systems Normal.</span>
           </div>
           <div className="flex gap-8 mt-6 md:mt-0">
             <a href="#" className="hover:text-black transition-colors">Privacy Protocol</a>
             <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-black transition-colors">Sitemap</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="font-sans text-black bg-white min-h-screen selection:bg-black selection:text-white">
      <Navbar />
      <ScannerHero />
      <StatsSection />
      <EventsList />
      <Marquee />
      <GridSection />
      <BuyerProfileSection />
      <ResourcesSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
