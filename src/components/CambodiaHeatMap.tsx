"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Search, 
  Navigation, 
  X, 
  Layers, 
  Plus, 
  Minus, 
  MapPin, 
  PhoneCall, 
  Shirt, 
  Bike, 
  Utensils, 
  AlertTriangle, 
  Thermometer, 
  Compass, 
  Maximize2, 
  Minimize2, 
  Droplets,
  HeartPulse,
  Flame,
  Edit3,
  Check,
  Trash2,
  RotateCcw,
  Download,
  Upload,
  PlusCircle,
  Save,
  ShieldCheck,
  HelpCircle
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Resilient Leaflet resolver
const getL = () => {
  if (typeof window === "undefined") return null;
  const anyL = L as any;
  if (anyL && typeof anyL.map === "function") return anyL;
  if (anyL && anyL.default && typeof anyL.default.map === "function") return anyL.default;
  if ((window as any).L && typeof (window as any).L.map === "function") return (window as any).L;
  return anyL;
};

type MapType = "hybrid" | "roadmap" | "terrain";
type FilterCategory = "all" | "garment" | "transport" | "food" | "hospital" | "heatwave";

export interface WorkerLocation {
  id: string;
  nameEn: string;
  nameKm: string;
  category: "garment" | "transport" | "food" | "hospital";
  categoryLabelEn: string;
  categoryLabelKm: string;
  lat: number;
  lng: number;
  baseTemp: number;
  humidity: number;
  addressEn: string;
  addressKm: string;
  descriptionEn: string;
  descriptionKm: string;
  adviceEn: string;
  adviceKm: string;
  imageUrl?: string;
}

// Initial Default Locations
const defaultWorkerLocations: WorkerLocation[] = [
  // 1. Garment Hubs
  {
    id: "veng_sreng",
    nameEn: "Veng Sreng Garment SEZ",
    nameKm: "តំបន់កាត់ដេរ ផ្លូវវេងស្រេង",
    category: "garment",
    categoryLabelEn: "Garment Factory SEZ",
    categoryLabelKm: "តំបន់រោងចក្រកាត់ដេរ",
    lat: 11.5234,
    lng: 104.8562,
    baseTemp: 41,
    humidity: 58,
    addressEn: "Veng Sreng Blvd, Sangkat Chom Chao, Phnom Penh",
    addressKm: "មហាវិថីវេងស្រេង សង្កាត់ចោមចៅ រាជធានីភ្នំពេញ",
    descriptionEn: "High-density factory corridor. 60%+ of factories lack industrial cooling; indoor tin roofs heat up to 41°C.",
    descriptionKm: "តំបន់ប្រមូលផ្តុំរោងចក្រកាត់ដេរធំជាងគេ។ ដំបូលស័ង្កសីធ្វើឱ្យកម្ដៅក្នុងរោងចក្រឡើងដល់ ៤១°C។",
    adviceEn: "Keep continuous industrial exhaust fans running, drink 1 cup cool water every 20 mins, take 5 min shade pause.",
    adviceKm: "ទាមទារឱ្យបើកកង្ហារបញ្ចេញខ្យល់ជាប្រចាំ ផឹកទឹកត្រជាក់ ១ កែវរៀងរាល់ ២០ នាទី និងសម្រាកម្លប់ ៥ នាទី។",
    imageUrl: "/images/cambodian-garment-worker.jpg",
  },
  {
    id: "chom_chao_sez",
    nameEn: "Chom Chao Industrial Zone",
    nameKm: "តំបន់ឧស្សាហកម្ម ចោមចៅ",
    category: "garment",
    categoryLabelEn: "Garment Industrial Zone",
    categoryLabelKm: "តំបន់រោងចក្រកាត់ដេរ",
    lat: 11.5140,
    lng: 104.8320,
    baseTemp: 40,
    humidity: 60,
    addressEn: "National Road 3 & 4 Junction, Phnom Penh",
    addressKm: "ប្រសព្វផ្លូវជាតិលេខ ៣ និង ៤ ចោមចៅ ភ្នំពេញ",
    descriptionEn: "Textile manufacturing hub with thousands of garment and footwear workers.",
    descriptionKm: "តំបន់ផលិតសម្លៀកបំពាក់ និងស្បែកជើងដែលមានកម្មកររាប់ម៉ឺននាក់។",
    adviceEn: "Wear loose cotton clothes under uniform, avoid direct hot steam vents, use ice-cloth wraps on neck.",
    adviceKm: "ស្លៀកសំលៀកបំពាក់កប្បាសរលុង ជៀសវាងឈរក្បែរម៉ាស៊ីនអ៊ុតចំហាយក្ដៅ និងយកក្រណាត់ត្រជាក់ជូតកញ្ចឹងក។",
    imageUrl: "/images/cambodian-garment-worker.jpg",
  },
  {
    id: "sen_sok_garment",
    nameEn: "Sen Sok Garment & Warehouse Zone",
    nameKm: "តំបន់រោងចក្រ សែនសុខ",
    category: "garment",
    categoryLabelEn: "Garment & Logistics",
    categoryLabelKm: "រោងចក្រ និងឃ្លាំងទំនិញ",
    lat: 11.5835,
    lng: 104.8720,
    baseTemp: 39,
    humidity: 62,
    addressEn: "Khan Sen Sok, Phnom Penh",
    addressKm: "ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ",
    descriptionEn: "Expanding industrial corridor with garment factories and commercial warehouses.",
    descriptionKm: "តំបន់រោងចក្រ និងឃ្លាំងទំនិញដែលកំពុងរីកចម្រើនយ៉ាងឆាប់រហ័ស។",
    adviceEn: "Ensure drinking water points are re-filled hourly with electrolyte solutions.",
    adviceKm: "ត្រូវប្រាកដថាធុងទឹកស្អាតមានទឹកគ្រប់គ្រាន់ និងលាយអំបិលរ៉ែបន្តិចដើម្បីការពារការខ្សោះជាតិទឹក។",
  },

  // 2. Transport & Tuk-Tuk Hubs
  {
    id: "phsar_thmey_tuktuk",
    nameEn: "Central Market (Phsar Thmey) Tuk-Tuk Stand",
    nameKm: "ចំណតកង់បី ផ្សារធំថ្មី",
    category: "transport",
    categoryLabelEn: "Tuk-Tuk & PassApp Stand",
    categoryLabelKm: "ចំណតកង់បី និងម៉ូតូឌុប",
    lat: 11.5696,
    lng: 104.9213,
    baseTemp: 39,
    humidity: 56,
    addressEn: "Street 128 (Kampuchea Krom Blvd), Phsar Thmey, Phnom Penh",
    addressKm: "ផ្លូវ ១២៨ (កម្ពុជាក្រោម) ផ្សារធំថ្មី ភ្នំពេញ",
    descriptionEn: "High urban asphalt heat radiation. Tuk-tuks wait on direct sunny roads between 11 AM and 3 PM.",
    descriptionKm: "កម្ដៅជះចេញពីផ្លូវកៅស៊ូ និងចំណតចំហរថ្ងៃ។ អ្នករត់កង់បីរង់ចាំម៉ូយក្រោមកម្ដៅថ្ងៃត្រង់។",
    adviceEn: "Park strictly under tree shade or awning, drink cool water hourly, drape wet towel on steering handlebar.",
    adviceKm: "ចតកង់បីក្នុងម្លប់ដើមឈើ ឬក្រោមសំយាប ផឹកទឹកត្រជាក់ ១ ម៉ោង ១ ដង និងដាក់កន្សែងសើមលើចង្កូត។",
    imageUrl: "/images/cambodian-tuktuk-driver.jpg",
  },
  {
    id: "riverside_sisowath",
    nameEn: "Riverside Sisowath Quay Passenger Stand",
    nameKm: "ចំណតមាត់ទន្លេ ព្រះស៊ីសុវត្ថិ",
    category: "transport",
    categoryLabelEn: "Riverside Driver Stand",
    categoryLabelKm: "ចំណតទេសចរណ៍ និងកង់បី",
    lat: 11.5714,
    lng: 104.9310,
    baseTemp: 38,
    humidity: 68,
    addressEn: "Preah Sisowath Quay, Phnom Penh",
    addressKm: "តីរវិថីព្រះស៊ីសុវត្ថិ រាជធានីភ្នំពេញ",
    descriptionEn: "Riverfront transport waiting area with intense midday glare and high humidity.",
    descriptionKm: "ចំណតមាត់ទន្លេដែលមានពន្លឺថ្ងៃជះខ្លាំង និងសំណើមខ្ពស់ធ្វើឱ្យស្អុះស្អាប់។",
    adviceEn: "Wear UV-protective long sleeves, sunglasses, and keep a 2L insulated water flask in tuk-tuk.",
    adviceKm: "ពាក់អាវដៃវែងការពារកម្ដៅថ្ងៃ វ៉ែនតាការពារភ្នែក និងដាក់ដបទឹកត្រជាក់ចំណុះ ២ លីត្រជាប់កង់បី។",
    imageUrl: "/images/cambodian-tuktuk-driver.jpg",
  },
  {
    id: "olympic_stadium_hub",
    nameEn: "Olympic Stadium Transport Junction",
    nameKm: "ចំណតកីឡដ្ឋានជាតិអូឡាំពិក",
    category: "transport",
    categoryLabelEn: "City Transport Hub",
    categoryLabelKm: "ចំណតដឹកជញ្ជូនកណ្តាលក្រុង",
    lat: 11.5540,
    lng: 104.9125,
    baseTemp: 39,
    humidity: 59,
    addressEn: "St. 274, Sangkat Veal Vong, Phnom Penh",
    addressKm: "ផ្លូវ ២៧៤ សង្កាត់វាលវង់ រាជធានីភ្នំពេញ",
    descriptionEn: "Major crossroads for delivery riders, PassApp drivers, and inter-city minivans.",
    descriptionKm: "ចំណុចប្រសព្វដឹកជញ្ជូនសំខាន់សម្រាប់អ្នកដឹកជញ្ជូនអាហារ និងកង់បី។",
    adviceEn: "Avoid parking directly over fresh tarmac during 11 AM - 2 PM peak sun.",
    adviceKm: "ជៀសវាងការចតលើផ្លូវកៅស៊ូចំហរចន្លោះម៉ោង ១១ ព្រឹក ដល់ ២ រសៀល។",
  },

  // 3. Street Food Hubs
  {
    id: "toul_kork_food",
    nameEn: "Toul Kork Street Food Market",
    nameKm: "ផ្សារម្ហូបតាមផ្លូវ ទួលគោក",
    category: "food",
    categoryLabelEn: "Street Food & Cooking Hub",
    categoryLabelKm: "តូបលក់ម្ហូប និងចង្ក្រានហ្គាស",
    lat: 11.5738,
    lng: 104.8986,
    baseTemp: 40,
    humidity: 61,
    addressEn: "Street 315 & Street 598, Toul Kork, Phnom Penh",
    addressKm: "ផ្លូវ ៣១៥ និង ៥៩៨ ខណ្ឌទួលគោក ភ្នំពេញ",
    descriptionEn: "Intense heat trap: Cooking burner fires + narrow street + sidewalk heat. Sellers lose income when forced to close.",
    descriptionKm: "កម្ដៅទ្វេដងពីភ្លើងចង្ក្រានហ្គាស បូករួមកម្ដៅថ្ងៃ។ អ្នកលក់ងាយខ្យល់គរ និងបាត់បង់ចំណូល។",
    adviceEn: "Position cooking stove downwind, set up double silver UV-reflective tarps, use battery fan.",
    adviceKm: "ដាក់ចង្ក្រានបែរទៅទិសខាងក្រោមខ្យល់ ប្រើតង់ឆ្លុះពន្លឺពណ៌ប្រាក់ ២ ជាន់ និងប្រើកង្ហារសាកអាគុយ។",
    imageUrl: "/images/cambodian-street-food-seller.jpg",
  },
  {
    id: "night_market_phsar_chas",
    nameEn: "Phnom Penh Night Market & Street Vendors",
    nameKm: "ផ្សាររាត្រី និងតូបលក់ដូរតាមចិញ្ចើមផ្លូវ",
    category: "food",
    categoryLabelEn: "Night Market & Daytime Vendors",
    categoryLabelKm: "ផ្សាររាត្រី និងតូបអាហារ",
    lat: 11.5742,
    lng: 104.9288,
    baseTemp: 38,
    humidity: 65,
    addressEn: "Preah Mohaksat Treiyani Kossamak, Phnom Penh",
    addressKm: "វិថីព្រះមហាក្សត្រីយានីកុសុមៈ ភ្នំពេញ",
    descriptionEn: "Daytime prep in open sun; grill stoves generate heavy heat radiation.",
    descriptionKm: "ការរៀបចំអាំងសាច់ និងចម្អិនក្រោមកម្ដៅថ្ងៃស្អុះស្អាប់។",
    adviceEn: "Keep a large bucket of water nearby, wear light breathable head wraps, sip lime water.",
    adviceKm: "ដាក់ធុងទឹកត្រជាក់ជិតខ្លួន ពាក់ក្រមាកប្បាសការពារក្បាល និងផឹកទឹកក្រូចឆ្មារដើម្បីកាត់បន្ថយកម្ដៅ។",
    imageUrl: "/images/cambodian-street-food-seller.jpg",
  },
  {
    id: "olympic_market_food",
    nameEn: "Olympic Market Sidewalk Food Sellers",
    nameKm: "តូបលក់បាយ និងម្ហូប ផ្សារអូឡាំពិក",
    category: "food",
    categoryLabelEn: "Sidewalk Food Vendors",
    categoryLabelKm: "អ្នកលក់ដូរតាមចិញ្ចើមផ្លូវ",
    lat: 11.5518,
    lng: 104.9142,
    baseTemp: 39,
    humidity: 60,
    addressEn: "St. 286, Olympic Market, Phnom Penh",
    addressKm: "ផ្លូវ ២៨៦ ជុំវិញផ្សារអូឡាំពិក ភ្នំពេញ",
    descriptionEn: "Sidewalk food vendors surrounded by heavy motorbike traffic and hot exhausts.",
    descriptionKm: "តូបលក់អាហារតាមចិញ្ចើមផ្លូវដែលរងផ្សែងម៉ូតូ និងកម្ដៅថ្ងៃខ្លាំង។",
    adviceEn: "Sprinkle clean water on sidewalk ground around stall to reduce radiated ground heat.",
    adviceKm: "ជះទឹកស្អាតលើដីជុំវិញតូប ដើម្បីជួយបន្ថយកម្ដៅភាយចេញពីថ្មចិញ្ចើមផ្លូវ។",
  },

  // 4. Emergency Hospitals
  {
    id: "calmette_hospital",
    nameEn: "Calmette Hospital (មន្ទីរពេទ្យកាល់ម៉ែត)",
    nameKm: "មន្ទីរពេទ្យកាល់ម៉ែត (សង្គ្រោះបន្ទាន់កម្ដៅ)",
    category: "hospital",
    categoryLabelEn: "National Referral Hospital",
    categoryLabelKm: "មន្ទីរពេទ្យជាតិសង្គ្រោះបន្ទាន់",
    lat: 11.5833,
    lng: 104.9189,
    baseTemp: 38,
    humidity: 58,
    addressEn: "No. 3 Monivong Blvd, Srah Chak, Phnom Penh",
    addressKm: "លេខ ៣ មហាវិថីព្រះមុនីវង្ស សង្កាត់ស្រះចក ភ្នំពេញ",
    descriptionEn: "Top national emergency referral center equipped with intensive care for heat stroke and severe dehydration.",
    descriptionKm: "មន្ទីរពេទ្យធំជាតិដែលទទួលសង្គ្រោះបន្ទាន់ជនរងគ្រោះដោយជំងឺខ្យល់គរ និងដាច់សរសៃឈាមដោយកម្ដៅ (Heat Stroke)។",
    adviceEn: "Call 119 for free ambulance dispatch. While waiting, move victim to AC/shade and place ice packs on armpits and neck.",
    adviceKm: "ហៅលេខ ១១៩ ដើម្បីបញ្ជូនឡានពេទ្យឥតគិតថ្លៃ។ ពេលរង់ចាំ ត្រូវដាក់អ្នកជំងឺក្នុងម្លប់ និងស្អំទឹកកកត្រង់ក្លៀក និងកញ្ចឹងក។",
  },
  {
    id: "khmer_soviet_hospital",
    nameEn: "Khmer-Soviet Friendship Hospital (ពេទ្យរុស្ស៊ី)",
    nameKm: "មន្ទីរពេទ្យមិត្តភាពខ្មែរ-សូវៀត (ពេទ្យរុស្ស៊ី)",
    category: "hospital",
    categoryLabelEn: "Public Emergency Hospital",
    categoryLabelKm: "មន្ទីរពេទ្យសាធារណៈសង្គ្រោះបន្ទាន់",
    lat: 11.5392,
    lng: 104.9038,
    baseTemp: 39,
    humidity: 60,
    addressEn: "Street 271, Sangkat Tumnub Teuk, Phnom Penh",
    addressKm: "ផ្លូវ ២៧១ សង្កាត់ទំនប់ទឹក ខណ្ឌបឹងកេងកង ភ្នំពេញ",
    descriptionEn: "Primary public hospital servicing garment workers from Veng Sreng and Stung Meanchey.",
    descriptionKm: "មន្ទីរពេទ្យរដ្ឋដ៏សំខាន់សម្រាប់កម្មករកាត់ដេរមកពីតំបន់វេងស្រេង និងស្ទឹងមានជ័យ។",
    adviceEn: "Toll-free national health line 115 and emergency dispatch 119 operate 24/7.",
    adviceKm: "ខ្សែទូរសព្ទសុខាភិបាល ១១៥ និងសង្គ្រោះបន្ទាន់ ១១៩ បម្រើសេវា ២៤ ម៉ោង។",
  },
  {
    id: "royal_phnom_penh_hospital",
    nameEn: "Royal Phnom Penh Hospital",
    nameKm: "មន្ទីរពេទ្យរ៉ូយ៉ាល់ភ្នំពេញ",
    category: "hospital",
    categoryLabelEn: "Emergency Care Hospital",
    categoryLabelKm: "មន្ទីរពេទ្យសង្គ្រោះបន្ទាន់",
    lat: 11.5658,
    lng: 104.8885,
    baseTemp: 39,
    humidity: 60,
    addressEn: "No. 888 Russian Confederation Blvd, Phnom Penh",
    addressKm: "មហាវិថីសហព័ន្ធរុស្ស៊ី សង្កាត់ទឹកថ្លា ភ្នំពេញ",
    descriptionEn: "Major medical facility along Russian Blvd near factory and transport clusters.",
    descriptionKm: "មន្ទីរពេទ្យលើមហាវិថីសហព័ន្ធរុស្ស៊ី ក្បែរតំបន់រោងចក្រ និងអ្នកដឹកជញ្ជូន។",
    adviceEn: "Equipped with round-the-clock emergency medical response teams.",
    adviceKm: "មានក្រុមការងារសង្គ្រោះបន្ទាន់ ២៤ ម៉ោងលើ ២៤ ម៉ោង។",
  },
];

export default function CambodiaHeatMap() {
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState<boolean>(false);
  
  // State for Editable Worker Locations (Stored in localStorage!)
  const [locations, setLocations] = useState<WorkerLocation[]>(defaultWorkerLocations);
  const [selectedLocation, setSelectedLocation] = useState<WorkerLocation>(defaultWorkerLocations[0]);

  // Edit Mode Toggle
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<WorkerLocation>(defaultWorkerLocations[0]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");

  // Map Controls
  const [mapType, setMapType] = useState<MapType>("hybrid");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showHeatRadar, setShowHeatRadar] = useState<boolean>(true);
  const [masterTemp, setMasterTemp] = useState<number | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const heatOverlayRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved locations from localStorage on client mount
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mlobsafe_custom_locations");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLocations(parsed);
            setSelectedLocation(parsed[0]);
          }
        } catch (e) {
          console.error("Failed to parse custom locations:", e);
        }
      }
    }
  }, []);

  // Save to localStorage whenever locations change
  const saveLocationsToStorage = (newLocs: WorkerLocation[]) => {
    setLocations(newLocs);
    if (typeof window !== "undefined") {
      localStorage.setItem("mlobsafe_custom_locations", JSON.stringify(newLocs));
    }
    setSaveSuccessMsg(language === "km" ? "រក្សាទុកជោគជ័យក្នុងកម្មវិធីរុករក!" : "Saved successfully to your browser!");
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  };

  // Reset to original default locations
  const handleResetToDefaults = () => {
    if (window.confirm(language === "km" ? "តើអ្នកចង់កំណត់ទីតាំងទាំងអស់មកដូចដើមវិញទេ?" : "Are you sure you want to reset all locations to original defaults?")) {
      setLocations(defaultWorkerLocations);
      setSelectedLocation(defaultWorkerLocations[0]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("mlobsafe_custom_locations");
      }
      setIsFormOpen(false);
      setSaveSuccessMsg(language === "km" ? "បានកំណត់ទិន្នន័យមកដើមវិញ!" : "Reset to default settings!");
      setTimeout(() => setSaveSuccessMsg(""), 3500);
    }
  };

  // Export locations as JSON file
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(locations, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mlobsafe_locations_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import locations from JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            saveLocationsToStorage(parsed);
            if (parsed.length > 0) setSelectedLocation(parsed[0]);
          }
        } catch (err) {
          alert("Invalid JSON file format");
        }
      };
    }
  };

  // NOAA Heat Index formula ("Feels Like")
  const calculateFeelsLike = (tempC: number, rh: number): number => {
    const T = (tempC * 9) / 5 + 32;
    const R = rh;
    let HI_F = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (R * 0.094));
    if (HI_F >= 80) {
      HI_F =
        -42.379 +
        2.04901523 * T +
        10.14333127 * R -
        0.22475541 * T * R -
        0.00683783 * T * T -
        0.05481717 * R * R +
        0.00122874 * T * T * R +
        0.00085282 * T * R * R -
        0.00000199 * T * T * R * R;
    }
    return Math.round(((HI_F - 32) * 5) / 9);
  };

  const getActiveLocationTemp = (loc: WorkerLocation) => {
    if (masterTemp !== null) return masterTemp;
    return loc.baseTemp;
  };

  const currentTemp = getActiveLocationTemp(selectedLocation);
  const currentFeelsLike = calculateFeelsLike(currentTemp, selectedLocation.humidity);

  // Filter locations by search query and category
  const filteredLocations = locations.filter((loc) => {
    const matchesCat = 
      activeCategory === "all" ||
      (activeCategory === "garment" && loc.category === "garment") ||
      (activeCategory === "transport" && loc.category === "transport") ||
      (activeCategory === "food" && loc.category === "food") ||
      (activeCategory === "hospital" && loc.category === "hospital") ||
      (activeCategory === "heatwave" && getActiveLocationTemp(loc) >= 40);

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !q ||
      loc.nameEn.toLowerCase().includes(q) ||
      loc.nameKm.toLowerCase().includes(q) ||
      loc.addressEn.toLowerCase().includes(q) ||
      loc.addressKm.toLowerCase().includes(q);

    return matchesCat && matchesQuery;
  });

  // Generate glowing thermal radar overlay on top of Google Maps Satellite
  const generateThermalRadarDataUrl = () => {
    if (typeof document === "undefined") return null;
    const width = 800;
    const height = 600;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const north = 11.68;
    const south = 11.45;
    const west = 104.78;
    const east = 105.02;

    locations.forEach((loc) => {
      const temp = getActiveLocationTemp(loc);
      const px = ((loc.lng - west) / (east - west)) * width;
      const py = ((north - loc.lat) / (north - south)) * height;
      const radius = temp >= 41 ? 160 : temp >= 39 ? 120 : 90;

      const grad = ctx.createRadialGradient(px, py, 4, px, py, radius);
      if (temp >= 41) {
        grad.addColorStop(0, "rgba(220, 38, 38, 0.70)");
        grad.addColorStop(0.3, "rgba(234, 88, 12, 0.55)");
        grad.addColorStop(0.65, "rgba(245, 158, 11, 0.30)");
        grad.addColorStop(1, "rgba(245, 158, 11, 0)");
      } else if (temp >= 39) {
        grad.addColorStop(0, "rgba(234, 88, 12, 0.60)");
        grad.addColorStop(0.4, "rgba(245, 158, 11, 0.40)");
        grad.addColorStop(1, "rgba(245, 158, 11, 0)");
      } else {
        grad.addColorStop(0, "rgba(245, 158, 11, 0.45)");
        grad.addColorStop(1, "rgba(245, 158, 11, 0)");
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    return canvas.toDataURL();
  };

  // 1. Initialize Leaflet Map once
  useEffect(() => {
    if (!isClient || !mapContainerRef.current) return;
    const Leaflet = getL();
    if (!Leaflet || typeof Leaflet.map !== "function") return;

    if (mapContainerRef.current) {
      if ((mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }
    }

    if (!mapInstanceRef.current && mapContainerRef.current) {
      const map = Leaflet.map(mapContainerRef.current, {
        center: [11.5621, 104.8885],
        zoom: 13,
        minZoom: 7,
        maxZoom: 19,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Allow clicking on map to add a custom pin when in Edit Mode!
      map.on("click", (e: any) => {
        const lat = Number(e.latlng.lat.toFixed(5));
        const lng = Number(e.latlng.lng.toFixed(5));
        
        const newLocation: WorkerLocation = {
          id: "custom_" + Date.now(),
          nameEn: "Custom Work Location",
          nameKm: "ទីតាំងការងារថ្មី",
          category: "garment",
          categoryLabelEn: "Worker Location",
          categoryLabelKm: "កន្លែងធ្វើការ",
          lat,
          lng,
          baseTemp: 39,
          humidity: 60,
          addressEn: `Coordinates: ${lat}, ${lng}`,
          addressKm: `កូអរដោនេ៖ ${lat}, ${lng}`,
          descriptionEn: "Added by user. Click edit below to change details.",
          descriptionKm: "បានបន្ថែមដោយអ្នកប្រើប្រាស់។ ចុចកែសម្រួលដើម្បីកែប្រែព័ត៌មាន។",
          adviceEn: "Keep drinking cool water and rest in shade regularly.",
          adviceKm: "ត្រូវផឹកទឹកត្រជាក់ និងសម្រាកក្នុងម្លប់ជាប្រចាំ។",
        };

        // Open editing form immediately
        setEditFormData(newLocation);
        setIsFormOpen(true);
        setSelectedLocation(newLocation);
        setIsDetailsOpen(true);
      });

      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch (e) {}
      }, 150);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, [isClient]);

  // 2. Update Tiles, Radar, and Google Maps Style Pins
  useEffect(() => {
    if (!isClient || !mapInstanceRef.current) return;
    const Leaflet = getL();
    const map = mapInstanceRef.current;
    if (!Leaflet || !map) return;

    try {
      map.invalidateSize();
    } catch (e) {}

    // A. Real Google Maps Satellite / Hybrid Tiles
    if (tileLayerRef.current) {
      try {
        map.removeLayer(tileLayerRef.current);
      } catch (e) {}
      tileLayerRef.current = null;
    }

    let tileUrl = "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";
    if (mapType === "roadmap") {
      tileUrl = "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
    } else if (mapType === "terrain") {
      tileUrl = "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}";
    }

    tileLayerRef.current = Leaflet.tileLayer(tileUrl, {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      maxZoom: 20,
    }).addTo(map);

    // B. Glowing Heat Stress Radar Overlay
    if (heatOverlayRef.current) {
      try {
        map.removeLayer(heatOverlayRef.current);
      } catch (e) {}
      heatOverlayRef.current = null;
    }

    if (showHeatRadar) {
      const radarUrl = generateThermalRadarDataUrl();
      if (radarUrl) {
        const bounds = [
          [11.45, 104.78],
          [11.68, 105.02],
        ];
        heatOverlayRef.current = Leaflet.imageOverlay(radarUrl, bounds, {
          opacity: 0.65,
          interactive: false,
        }).addTo(map);
      }
    }

    // C. Google Maps Style Pins with Icons & Temperature Badges
    Object.values(markersRef.current).forEach((marker: any) => {
      try {
        map.removeLayer(marker);
      } catch (e) {}
    });
    markersRef.current = {};

    filteredLocations.forEach((loc) => {
      const isSelected = loc.id === selectedLocation.id;
      const temp = getActiveLocationTemp(loc);

      let pinColor = "#ea580c";
      let pinSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M6 2v20"/><path d="M12 11v11"/></svg>`;

      if (loc.category === "hospital") {
        pinColor = "#dc2626";
        pinSvg = `<span style="color: white; font-weight: 900; font-size: 13px; font-family: sans-serif;">H</span>`;
      } else if (loc.category === "garment") {
        pinColor = "#9333ea";
        pinSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`;
      } else if (loc.category === "transport") {
        pinColor = "#0284c7";
        pinSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>`;
      }

      const pinHtml = `
        <div class="gmaps-pin-wrapper" style="
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transform: translate(-50%, -100%);
          user-select: none;
        ">
          <!-- Floating Temperature Bubble -->
          <div style="
            background: rgba(17, 24, 39, 0.95);
            color: #ffffff;
            font-size: 11px;
            font-weight: 900;
            padding: 2px 7px;
            border-radius: 9999px;
            border: 1.5px solid ${isSelected ? '#f97316' : 'rgba(255,255,255,0.7)'};
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            margin-bottom: 3px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span style="color: ${temp >= 40 ? '#ef4444' : '#fb923c'};">${temp}\u00B0C</span>
            <span style="font-size: 10px; color: #9ca3af;">${language === "km" ? loc.nameKm : loc.nameEn}</span>
          </div>

          <!-- Google Maps Circular Icon Pin -->
          <div style="
            width: ${isSelected ? '36px' : '30px'};
            height: ${isSelected ? '36px' : '30px'};
            border-radius: 9999px;
            background: ${pinColor};
            border: 2.5px solid #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.45);
            transition: transform 0.2s ease;
          ">
            ${pinSvg}
          </div>
          <!-- Pin Pointer Stem -->
          <div style="
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid ${pinColor};
            margin-top: -1px;
          "></div>
        </div>
      `;

      const customIcon = Leaflet.divIcon({
        className: "custom-gmaps-pin",
        html: pinHtml,
        iconSize: [160, 60],
        iconAnchor: [80, 60],
      });

      const marker = Leaflet.marker([loc.lat, loc.lng], { icon: customIcon })
        .addTo(map)
        .on("click", () => {
          setSelectedLocation(loc);
          setEditFormData(loc);
          setIsDetailsOpen(true);
          map.flyTo([loc.lat, loc.lng], 15, { duration: 0.8 });
        });

      markersRef.current[loc.id] = marker;
    });

  }, [isClient, mapType, showHeatRadar, activeCategory, searchQuery, selectedLocation.id, locations, masterTemp, language]);

  const handleSelectLoc = (loc: WorkerLocation) => {
    setSelectedLocation(loc);
    setEditFormData(loc);
    setIsDetailsOpen(true);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([loc.lat, loc.lng], 15, { duration: 0.8 });
    }
  };

  // Save changes to location from the Edit Form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const existingIndex = locations.findIndex((l) => l.id === editFormData.id);
    let updatedLocations: WorkerLocation[];

    if (existingIndex >= 0) {
      // Update existing
      updatedLocations = [...locations];
      updatedLocations[existingIndex] = editFormData;
    } else {
      // Add new
      updatedLocations = [editFormData, ...locations];
    }

    saveLocationsToStorage(updatedLocations);
    setSelectedLocation(editFormData);
    setIsFormOpen(false);
  };

  // Delete a location
  const handleDeleteLocation = (id: string) => {
    if (locations.length <= 1) {
      alert("You must keep at least 1 location on the map.");
      return;
    }
    if (window.confirm(language === "km" ? "តើអ្នកចង់លុបទីតាំងនេះទេ?" : "Are you sure you want to delete this location?")) {
      const remaining = locations.filter((l) => l.id !== id);
      saveLocationsToStorage(remaining);
      setSelectedLocation(remaining[0]);
      setEditFormData(remaining[0]);
      setIsFormOpen(false);
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleRecenterPhnomPenh = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([11.5621, 104.8885], 13, { duration: 0.8 });
    }
  };

  const toggleFullscreen = () => {
    if (!mapWrapperRef.current) return;
    if (!isFullscreen) {
      if (mapWrapperRef.current.requestFullscreen) {
        mapWrapperRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. MASTER TOOLBAR: HEAT SIMULATION & SELF-EDIT MODE SWITCH */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-heat-200 shadow-sm space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-heat-700 flex items-center gap-1.5 mb-1">
              <Flame className="w-4 h-4 text-heat-600 animate-pulse" />
              <span>{language === "km" ? "ផែនទីផ្កាយរណប Google Maps & មុខងារកែប្រែដោយខ្លួនឯង" : "Google Maps Satellite & Self-Editing Mode"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
              {language === "km" ? "ផែនទីសុវត្ថិភាពកម្ដៅកម្មករ (Google Maps Live)" : "Worker Heat Stress Google Satellite Radar"}
            </h2>
          </div>

          {/* EDIT MODE TOGGLE & QUICK ACTIONS */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const nextMode = !isEditMode;
                setIsEditMode(nextMode);
                if (nextMode) {
                  setIsFormOpen(true);
                  setEditFormData(selectedLocation);
                } else {
                  setIsFormOpen(false);
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-sm ${
                isEditMode
                  ? "bg-purple-600 text-white shadow-purple-600/30 ring-2 ring-purple-600 ring-offset-2"
                  : "bg-white text-purple-700 hover:bg-purple-50 border-2 border-purple-300"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditMode ? (language === "km" ? "កំពុងកែសម្រួល (ON)" : "Edit Mode: ON") : (language === "km" ? "✏️ បើកមុខងារកែសម្រួល (Edit Mode)" : "✏️ Turn ON Edit Mode")}</span>
            </button>

            {/* Add New Location Button */}
            <button
              onClick={() => {
                const newLoc: WorkerLocation = {
                  id: "custom_" + Date.now(),
                  nameEn: "New Priority Workplace",
                  nameKm: "ទីតាំងការងារថ្មី",
                  category: "garment",
                  categoryLabelEn: "Worker Zone",
                  categoryLabelKm: "តំបន់កម្មករ",
                  lat: 11.5500,
                  lng: 104.9000,
                  baseTemp: 40,
                  humidity: 60,
                  addressEn: "Phnom Penh, Cambodia",
                  addressKm: "រាជធានីភ្នំពេញ កម្ពុជា",
                  descriptionEn: "Describe working conditions and heat traps here.",
                  descriptionKm: "សរសេរពិពណ៌នាអំពីលក្ខខណ្ឌកម្ដៅនៅទីនេះ។",
                  adviceEn: "Hydrate hourly, take 5-10 min shade breaks.",
                  adviceKm: "ផឹកទឹក ១ ម៉ោងម្តង និងសម្រាកក្នុងម្លប់។",
                };
                setEditFormData(newLoc);
                setIsFormOpen(true);
                setIsEditMode(true);
              }}
              className="px-3 py-2 rounded-xl text-xs font-black bg-heat-600 hover:bg-heat-700 text-white transition flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === "km" ? "+ បន្ថែមទីតាំងថ្មី" : "+ Add Location"}</span>
            </button>

            {/* Export / Reset Dropdown Buttons */}
            <button
              onClick={handleExportJSON}
              title="Download your custom map data as JSON"
              className="p-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 transition"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import JSON data"
              className="p-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 transition"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".json" 
              onChange={handleImportJSON} 
              className="hidden" 
            />

            <button
              onClick={handleResetToDefaults}
              title="Reset all locations to original defaults"
              className="p-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-black flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-green-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Edit Mode Instruction Banner */}
        {isEditMode && (
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
              <span>
                {language === "km" 
                  ? "👉 របៀបកែ៖ ចុចលើចំណុចណាមួយលើផែនទីដើម្បីទម្លាក់ Pin ថ្មី ឬចុចលើ Pin ណាមួយរួចកែប្រែក្នុងទម្រង់ខាងក្រោម!" 
                  : "👉 How to edit: Click anywhere on the map to drop a new Pin, or click any existing Pin to edit its values below!"}
              </span>
            </div>
            <span className="text-[11px] text-purple-700 font-normal">
              (Auto-saved to your browser)
            </span>
          </div>
        )}

        {/* Master Temp Quick Simulation Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-600 mr-1">
            {language === "km" ? "ក្លែងធ្វើកម្ដៅថ្ងៃត្រង់៖" : "Simulate Heat:"}
          </span>
          {[35, 37, 39, 41, 43].map((temp) => (
            <button
              key={temp}
              onClick={() => setMasterTemp(temp)}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                masterTemp === temp
                  ? "bg-red-600 text-white shadow-xs"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              {temp}&deg;C {temp >= 41 ? "🔥" : ""}
            </button>
          ))}
          {masterTemp !== null && (
            <button
              onClick={() => setMasterTemp(null)}
              className="px-2.5 py-1 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200"
            >
              {language === "km" ? "កំណត់ឡើងវិញ" : "Reset"}
            </button>
          )}
        </div>

      </div>

      {/* 2. THE GOOGLE MAPS SATELLITE CANVAS CONTAINER */}
      <div 
        ref={mapWrapperRef}
        className="relative w-full h-[650px] sm:h-[720px] rounded-3xl overflow-hidden border-2 border-gray-300 shadow-2xl bg-[#242f3e] select-none"
      >
        {/* Leaflet Google Maps Base Layer */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* TOP FLOATING SEARCH BAR & CATEGORY PILLS (Authentic Google Maps Style!) */}
        <div className="absolute top-3 left-3 right-3 sm:right-auto sm:w-[480px] z-20 space-y-2 pointer-events-auto">
          
          {/* A. Search Box */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 flex items-center px-4 py-2.5 gap-3">
            <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "km" ? "ស្វែងរកទីតាំងក្នុង Google Maps (វេងស្រេង, កាល់ម៉ែត, ផ្សារធំថ្មី...)" : "Search Google Maps (Veng Sreng, Calmette, Toul Kork...)"}
              className="w-full text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="h-6 w-px bg-gray-200 flex-shrink-0" />
            <button 
              onClick={handleRecenterPhnomPenh}
              className="p-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition flex-shrink-0"
              title="Recenter Phnom Penh"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          {/* B. Google Maps Filter Chips / Category Pills (Scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-extrabold">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-full shadow-md whitespace-nowrap transition flex items-center gap-1.5 border ${
                activeCategory === "all"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white/95 text-gray-800 hover:bg-gray-100 border-gray-300 backdrop-blur-md"
              }`}
            >
              <span>{language === "km" ? "ទាំងអស់" : "All Places"}</span>
            </button>

            <button
              onClick={() => setActiveCategory("garment")}
              className={`px-3 py-1.5 rounded-full shadow-md whitespace-nowrap transition flex items-center gap-1.5 border ${
                activeCategory === "garment"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white/95 text-purple-800 hover:bg-purple-50 border-gray-300 backdrop-blur-md"
              }`}
            >
              <Shirt className="w-3.5 h-3.5 text-purple-600" />
              <span>{language === "km" ? "រោងចក្រកាត់ដេរ" : "Garment Factories"}</span>
            </button>

            <button
              onClick={() => setActiveCategory("transport")}
              className={`px-3 py-1.5 rounded-full shadow-md whitespace-nowrap transition flex items-center gap-1.5 border ${
                activeCategory === "transport"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white/95 text-blue-800 hover:bg-blue-50 border-gray-300 backdrop-blur-md"
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === "km" ? "អ្នករត់កង់បី" : "Tuk-Tuk Hubs"}</span>
            </button>

            <button
              onClick={() => setActiveCategory("food")}
              className={`px-3 py-1.5 rounded-full shadow-md whitespace-nowrap transition flex items-center gap-1.5 border ${
                activeCategory === "food"
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white/95 text-orange-800 hover:bg-orange-50 border-gray-300 backdrop-blur-md"
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-orange-600" />
              <span>{language === "km" ? "លក់ដូរតាមផ្លូវ" : "Street Food"}</span>
            </button>

            <button
              onClick={() => setActiveCategory("hospital")}
              className={`px-3 py-1.5 rounded-full shadow-md whitespace-nowrap transition flex items-center gap-1.5 border ${
                activeCategory === "hospital"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white/95 text-red-700 hover:bg-red-50 border-gray-300 backdrop-blur-md"
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-red-600" />
              <span>{language === "km" ? "មន្ទីរពេទ្យសង្គ្រោះ" : "Hospitals"}</span>
            </button>

            <button
              onClick={() => setShowHeatRadar(!showHeatRadar)}
              className={`px-3 py-1.5 rounded-full shadow-md whitespace-nowrap transition flex items-center gap-1.5 border ${
                showHeatRadar
                  ? "bg-amber-500 text-gray-950 font-black border-amber-500"
                  : "bg-white/95 text-gray-700 hover:bg-gray-100 border-gray-300 backdrop-blur-md"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === "km" ? "ស្រទាប់កម្ដៅ (Radar)" : "Heat Radar"}</span>
            </button>
          </div>
        </div>

        {/* BOTTOM-LEFT "LAYERS" BUTTON */}
        <div className="absolute bottom-6 left-4 z-20 pointer-events-auto">
          <div className="relative">
            <button
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className="bg-white/95 backdrop-blur-md hover:bg-white text-gray-900 px-3 py-2 rounded-2xl shadow-2xl border-2 border-white flex items-center gap-2 text-xs font-black transition group"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-gray-300 flex-shrink-0">
                <img
                  src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/10/448/812"
                  alt="Satellite Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="leading-tight">{language === "km" ? "ស្រទាប់" : "Layers"}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">{mapType}</div>
              </div>
            </button>

            {showLayerMenu && (
              <div className="absolute bottom-14 left-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 w-48 space-y-1 text-xs font-bold animate-fadeIn">
                <button
                  onClick={() => { setMapType("hybrid"); setShowLayerMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
                    mapType === "hybrid" ? "bg-blue-50 text-blue-700 font-black" : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <span>Satellite (ផ្កាយរណប)</span>
                  {mapType === "hybrid" && <span className="text-blue-600 font-black">✓</span>}
                </button>
                <button
                  onClick={() => { setMapType("roadmap"); setShowLayerMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
                    mapType === "roadmap" ? "bg-blue-50 text-blue-700 font-black" : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <span>Roadmap (ផែនទីផ្លូវ)</span>
                  {mapType === "roadmap" && <span className="text-blue-600 font-black">✓</span>}
                </button>
                <button
                  onClick={() => { setMapType("terrain"); setShowLayerMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
                    mapType === "terrain" ? "bg-blue-50 text-blue-700 font-black" : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <span>Terrain (ដីខ្ពស់ទាប)</span>
                  {mapType === "terrain" && <span className="text-blue-600 font-black">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM-RIGHT GOOGLE MAPS CONTROLS */}
        <div className="absolute bottom-6 right-4 z-20 flex flex-col items-center gap-2 pointer-events-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
            <button
              onClick={handleRecenterPhnomPenh}
              className="p-2.5 text-gray-700 hover:bg-gray-100 transition border-b border-gray-100"
              title="Center Phnom Penh"
            >
              <Compass className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2.5 text-gray-700 hover:bg-gray-100 transition"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
            <button
              onClick={handleZoomIn}
              className="p-2.5 text-gray-700 hover:bg-gray-100 transition border-b border-gray-100"
              title="Zoom In"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2.5 text-gray-700 hover:bg-gray-100 transition"
              title="Zoom Out"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WATERMARK */}
        <div className="absolute bottom-2 left-32 z-10 pointer-events-none opacity-80 text-[11px] font-black tracking-wider text-white drop-shadow">
          Google Maps
        </div>

      </div>

      {/* 3. EDIT LOCATION FORM MODAL (When Edit Mode is Active) */}
      {isFormOpen && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-purple-400 shadow-2xl space-y-6 animate-fadeIn">
          
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <Edit3 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  {language === "km" ? "កែប្រែព័ត៌មានទីតាំងនេះដោយខ្លួនឯង" : "Edit This Location Details"}
                </h3>
                <p className="text-xs text-gray-500 font-semibold">
                  {language === "km" ? "អ្នកអាចផ្លាស់ប្តូរឈ្មោះ កម្ដៅ សំណើម ការណែនាំ និងការវិភាគហានិភ័យបានភ្លាមៗ" : "Customize place name, temperature, advice, and risk level"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFormOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-4">
            
            {/* Row 1: Name En & Name Km */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">
                  Name (English)
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.nameEn}
                  onChange={(e) => setEditFormData({ ...editFormData, nameEn: e.target.value })}
                  placeholder="e.g. Veng Sreng Garment SEZ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">
                  ឈ្មោះទីតាំង (ខ្មែរ)
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.nameKm}
                  onChange={(e) => setEditFormData({ ...editFormData, nameKm: e.target.value })}
                  placeholder="ឧ. តំបន់រោងចក្រ វេងស្រេង"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-khmer"
                />
              </div>
            </div>

            {/* Row 2: Category, Temperature, Humidity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">
                  {language === "km" ? "ប្រភេទមុខរបរ / ទីតាំង" : "Category"}
                </label>
                <select
                  value={editFormData.category}
                  onChange={(e) => {
                    const cat = e.target.value as any;
                    let labelEn = "Garment Factory";
                    let labelKm = "រោងចក្រកាត់ដេរ";
                    if (cat === "transport") { labelEn = "Tuk-Tuk Hub"; labelKm = "ចំណតកង់បី"; }
                    if (cat === "food") { labelEn = "Street Food Hub"; labelKm = "តូបលក់ម្ហូប"; }
                    if (cat === "hospital") { labelEn = "Emergency Hospital"; labelKm = "មន្ទីរពេទ្យសង្គ្រោះ"; }
                    setEditFormData({ 
                      ...editFormData, 
                      category: cat,
                      categoryLabelEn: labelEn,
                      categoryLabelKm: labelKm 
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="garment">🧵 Garment Factory (កាត់ដេរ)</option>
                  <option value="transport">🛺 Tuk-Tuk Hub (អ្នករត់កង់បី)</option>
                  <option value="food">🍳 Street Food (លក់ដូរតាមផ្លូវ)</option>
                  <option value="hospital">🏥 Hospital (មន្ទីរពេទ្យ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">
                  {language === "km" ? "សីតុណ្ហភាព (°C)" : "Temperature (°C)"}
                </label>
                <input
                  type="number"
                  min={25}
                  max={50}
                  value={editFormData.baseTemp}
                  onChange={(e) => setEditFormData({ ...editFormData, baseTemp: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">
                  {language === "km" ? "សំណើម (%)" : "Humidity (%)"}
                </label>
                <input
                  type="number"
                  min={20}
                  max={100}
                  value={editFormData.humidity}
                  onChange={(e) => setEditFormData({ ...editFormData, humidity: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Row 3: Address En & Km */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">
                  Address (English)
                </label>
                <input
                  type="text"
                  value={editFormData.addressEn}
                  onChange={(e) => setEditFormData({ ...editFormData, addressEn: e.target.value })}
                  placeholder="Street / District address in English"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">
                  អាសយដ្ឋាន (ខ្មែរ)
                </label>
                <input
                  type="text"
                  value={editFormData.addressKm}
                  onChange={(e) => setEditFormData({ ...editFormData, addressKm: e.target.value })}
                  placeholder="ផ្លូវ / ខណ្ឌ អាសយដ្ឋានជាភាសាខ្មែរ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-khmer"
                />
              </div>
            </div>

            {/* Row 4: Risk Description Km */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 mb-1">
                {language === "km" ? "ការវិភាគហានិភ័យកម្ដៅ (Khmer & English Description)" : "Workplace Heat Exposure Risk Description"}
              </label>
              <textarea
                rows={2}
                value={language === "km" ? editFormData.descriptionKm : editFormData.descriptionEn}
                onChange={(e) => {
                  if (language === "km") {
                    setEditFormData({ ...editFormData, descriptionKm: e.target.value });
                  } else {
                    setEditFormData({ ...editFormData, descriptionEn: e.target.value });
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Row 5: Actionable Safety Advice */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 mb-1">
                {language === "km" ? "វិធានការការពារសុវត្ថិភាព (Safety Advice)" : "Mandatory Safety Action Advice"}
              </label>
              <textarea
                rows={2}
                value={language === "km" ? editFormData.adviceKm : editFormData.adviceEn}
                onChange={(e) => {
                  if (language === "km") {
                    setEditFormData({ ...editFormData, adviceKm: e.target.value });
                  } else {
                    setEditFormData({ ...editFormData, adviceEn: e.target.value });
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Action Buttons: Save & Delete */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleDeleteLocation(editFormData.id)}
                className="px-4 py-2.5 rounded-xl text-xs font-black bg-red-100 hover:bg-red-200 text-red-700 transition flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>{language === "km" ? "លុបទីតាំងនេះ" : "Delete Location"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition"
                >
                  {language === "km" ? "បោះបង់" : "Cancel"}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-purple-600 hover:bg-purple-700 text-white transition flex items-center gap-2 shadow-md shadow-purple-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>{language === "km" ? "រក្សាទុកការកែប្រែ" : "Save Changes"}</span>
                </button>
              </div>
            </div>

          </form>

        </div>
      )}

      {/* 4. GOOGLE MAPS PLACE INSPECTION CARD (Synchronized with Map Pin Selection) */}
      {isDetailsOpen && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-heat-300 shadow-xl space-y-6 animate-fadeIn">
          
          {/* Top Bar: Location Name & Badges */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-heat-700 bg-heat-100 px-3 py-1 rounded-full border border-heat-200">
                  <MapPin className="w-3.5 h-3.5 text-heat-600" />
                  <span>{language === "km" ? selectedLocation.categoryLabelKm : selectedLocation.categoryLabelEn}</span>
                </span>
                
                {currentTemp >= 40 && (
                  <span className="text-[11px] font-black uppercase text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200 animate-pulse">
                    {language === "km" ? "កម្ដៅថ្ងៃត្រង់ឡើងខ្លាំង" : "Scorcher Heat Alert"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
                  {language === "km" ? (
                    <>
                      <span>{selectedLocation.nameKm}</span>{" "}
                      <span className="text-lg text-gray-500 font-bold font-sans">({selectedLocation.nameEn})</span>
                    </>
                  ) : (
                    <>
                      <span>{selectedLocation.nameEn}</span>{" "}
                      <span className="text-lg text-gray-500 font-bold font-khmer">({selectedLocation.nameKm})</span>
                    </>
                  )}
                </h3>

                {/* Edit Button for this specific location */}
                <button
                  onClick={() => {
                    setEditFormData(selectedLocation);
                    setIsFormOpen(true);
                  }}
                  className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition"
                  title="Edit this location"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
                📍 {language === "km" ? selectedLocation.addressKm : selectedLocation.addressEn}
              </p>
            </div>

            {/* Emergency 119 Ambulance Hotline Button */}
            <a
              href="tel:119"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md shadow-red-600/30 transition flex-shrink-0"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>{language === "km" ? "ហៅឡានពេទ្យ ១១៩" : "Call 119 Ambulance"}</span>
            </a>
          </div>

          {/* Environmental Metrics (Live Temp, Heat Index, Humidity) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-heat-600" />
                <span>{language === "km" ? "សីតុណ្ហភាពខ្យល់" : "Air Temperature"}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-gray-900">
                {currentTemp}&deg;C
              </div>
              <div className="text-xs text-heat-700 font-bold mt-1">
                {currentTemp >= 40 ? "Extreme Scorcher" : "High Tropical Heat"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-600" />
                <span>{language === "km" ? "កម្ដៅជាក់ស្ដែង (Feels Like)" : "Heat Index (Feels Like)"}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-red-700">
                {currentFeelsLike}&deg;C
              </div>
              <div className="text-xs text-red-600 font-bold mt-1">
                {currentFeelsLike >= 46 ? "Danger of Heat Stroke" : "High Heat Fatigue"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cooling-50 border border-cooling-200">
              <div className="text-xs font-bold text-cooling-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cooling-600" />
                <span>{language === "km" ? "សំណើមបរិយាកាស" : "Relative Humidity"}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-cooling-900">
                {selectedLocation.humidity}%
              </div>
              <div className="text-xs text-cooling-700 font-bold mt-1">
                High sweat evaporation resistance
              </div>
            </div>

          </div>

          {/* Workplace Risk & Actionable Tips */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 space-y-3">
            <div className="text-sm font-black text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{language === "km" ? "ការវិភាគហានិភ័យកម្ដៅជាក់ស្ដែង៖" : "Workplace Heat Exposure Risk:"}</span>
            </div>
            <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">
              {language === "km" ? selectedLocation.descriptionKm : selectedLocation.descriptionEn}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-safety-50/80 border border-safety-200 space-y-3">
            <div className="text-sm font-black text-safety-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-safety-600 flex-shrink-0" />
              <span>{language === "km" ? "វិធានការការពារសុវត្ថិភាពជាបន្ទាន់៖" : "Mandatory Heat Safety Actions:"}</span>
            </div>
            <p className="text-sm sm:text-base text-gray-900 font-bold leading-relaxed">
              {language === "km" ? selectedLocation.adviceKm : selectedLocation.adviceEn}
            </p>
          </div>

          {/* Quick Location Switcher Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                {language === "km" ? "ទីតាំងទាំងអស់ (ចុចដើម្បីមើល ឬកែសម្រួល)៖" : "All Locations (Click to view or edit):"}
              </span>
              <span className="text-xs font-bold text-gray-400">
                {locations.length} {language === "km" ? "ទីតាំង" : "locations"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelectLoc(loc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                    selectedLocation.id === loc.id
                      ? "bg-heat-600 text-white border-heat-600 shadow-sm"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  {language === "km" ? loc.nameKm : loc.nameEn}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
