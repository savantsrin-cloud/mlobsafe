"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cambodiaHeatMapData } from "@/data/heatStressTranslations";
import { CambodiaHeatRegion } from "@/types/heatStress";
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Layers, 
  Sun, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  PhoneCall, 
  Search, 
  Navigation, 
  Sparkles, 
  Shirt, 
  Bike, 
  Utensils, 
  Info, 
  Maximize2, 
  Minimize2,
  CheckCircle,
  Thermometer,
  CloudRain,
  Eye,
  Sliders,
  MapPin,
  X
} from "lucide-react";
import "leaflet/dist/leaflet.css";

type ForecastLayer = "wet_bulb" | "temperature" | "wind" | "satellite";
type SectorFilter = "all" | "garment" | "transport" | "food_seller";

export default function CambodiaHeatMap() {
  const { language } = useLanguage();
  const [selectedRegionId, setSelectedRegionId] = useState<string>("phnom_penh");
  const [activeLayer, setActiveLayer] = useState<ForecastLayer>("wet_bulb");
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Timeline / Time-of-day Player State (Zoom Earth style)
  const timeSteps = [
    { id: "07:00", labelEn: "7:00 AM (Morning Shift)", labelKm: "៧:០០ ព្រឹក (វេនព្រឹក)", tempOffset: -5, intensity: 0.6 },
    { id: "09:30", labelEn: "9:30 AM (Rising Heat)", labelKm: "៩:៣០ ព្រឹក (កម្ដៅចាប់កើន)", tempOffset: -2, intensity: 0.75 },
    { id: "11:30", labelEn: "11:30 AM (Peak Sun Alert)", labelKm: "១១:៣០ ព្រឹក (កម្ដៅថ្ងៃត្រង់)", tempOffset: 0, intensity: 1.0 },
    { id: "14:00", labelEn: "2:00 PM (Maximum Scorcher)", labelKm: "២:០០ រសៀល (កម្ដៅឡើងខ្ពស់បំផុត)", tempOffset: +1, intensity: 1.1 },
    { id: "16:30", labelEn: "4:30 PM (Late Afternoon)", labelKm: "៤:៣០ រសៀល (រសៀលជ្រាល)", tempOffset: -3, intensity: 0.7 },
  ];
  const [currentTimeIndex, setCurrentTimeIndex] = useState<number>(2); // Default to 11:30 AM Peak
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Master Temperature Override Slider
  const [masterTemp, setMasterTemp] = useState<number | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const tileLayerRef = useRef<any>(null);
  const heatOverlayRef = useRef<any>(null);

  const activeTimeStep = timeSteps[currentTimeIndex];
  const selectedRegion = cambodiaHeatMapData.find((r) => r.id === selectedRegionId) || cambodiaHeatMapData[0];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation timeline loop when "Play" is clicked
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeIndex((prev) => (prev + 1) % timeSteps.length);
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeSteps.length]);

  // NOAA Heat Index / Wet-Bulb Calculation
  const calculateLiveHeatIndex = (tempC: number, rh: number): number => {
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

    const HI_C = ((HI_F - 32) * 5) / 9;
    return Math.round(HI_C);
  };

  const getRegionMetrics = (region: CambodiaHeatRegion) => {
    const baseTemp = masterTemp !== null 
      ? masterTemp + activeTimeStep.tempOffset
      : region.peakTemp + activeTimeStep.tempOffset;

    const heatIndex = calculateLiveHeatIndex(baseTemp, region.peakHumidity);

    let risk: "extreme" | "danger" | "caution";
    if (heatIndex >= 46) risk = "extreme";
    else if (heatIndex >= 38) risk = "danger";
    else risk = "caution";

    return {
      temp: baseTemp,
      heatIndex,
      risk,
      labelEn: `${activeTimeStep.labelEn}`,
      labelKm: `${activeTimeStep.labelKm}`,
    };
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "extreme":
        return {
          badgeBg: "bg-red-600 text-white",
          pillBg: "rgba(220, 38, 38, 0.92)",
          glowColor: "rgba(220, 38, 38, 0.8)",
          labelEn: "Extreme Heat Stress",
          labelKm: "គ្រោះថ្នាក់កម្ដៅធ្ងន់ធ្ងរបំផុត",
        };
      case "danger":
        return {
          badgeBg: "bg-orange-500 text-white",
          pillBg: "rgba(234, 88, 12, 0.92)",
          glowColor: "rgba(234, 88, 12, 0.8)",
          labelEn: "High Heat Stress",
          labelKm: "គ្រោះថ្នាក់កម្ដៅខ្ពស់",
        };
      case "caution":
      default:
        return {
          badgeBg: "bg-amber-500 text-white",
          pillBg: "rgba(217, 119, 6, 0.92)",
          glowColor: "rgba(217, 119, 6, 0.8)",
          labelEn: "Moderate Heat Stress",
          labelKm: "ប្រុងប្រយ័ត្នខ្ពស់",
        };
    }
  };

  const currentMetrics = getRegionMetrics(selectedRegion);
  const currentRiskTheme = getRiskColor(currentMetrics.risk);

  const filteredRegions = cambodiaHeatMapData.filter((r) => {
    const matchesSector = 
      sectorFilter === "all" ||
      (sectorFilter === "garment" && r.isGarmentHub) ||
      (sectorFilter === "transport" && r.isTransportHub) ||
      (sectorFilter === "food_seller" && r.isMarketHub);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      r.nameEn.toLowerCase().includes(q) ||
      r.nameKm.toLowerCase().includes(q) ||
      r.zoneEn.toLowerCase().includes(q) ||
      r.zoneKm.toLowerCase().includes(q);

    return matchesSector && matchesSearch;
  });

  // Generate the glowing continuous Zoom Earth Thermal Radar canvas layer
  const generateThermalRadarDataUrl = (intensityFactor: number) => {
    if (typeof document === "undefined") return null;

    const width = 900;
    const height = 650;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Bounds covering Cambodia and surrounding Indochina:
    // North: 15.4, South: 9.6 | West: 101.4, East: 108.4
    const north = 15.4;
    const south = 9.6;
    const west = 101.4;
    const east = 108.4;

    // 1. Base ambient warmth field across Southeast Asia / Cambodia (Zoom Earth style golden-orange haze)
    const baseGrad = ctx.createRadialGradient(450, 350, 40, 450, 350, 420);
    baseGrad.addColorStop(0, `rgba(249, 115, 22, ${0.45 * intensityFactor})`);
    baseGrad.addColorStop(0.5, `rgba(234, 88, 12, ${0.35 * intensityFactor})`);
    baseGrad.addColorStop(0.85, `rgba(245, 158, 11, ${0.25 * intensityFactor})`);
    baseGrad.addColorStop(1, "rgba(234, 179, 8, 0)");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw glowing high-temperature thermal radar blobs for each Cambodian province
    cambodiaHeatMapData.forEach((region) => {
      const metrics = getRegionMetrics(region);
      const px = ((region.lng - west) / (east - west)) * width;
      const py = ((north - region.lat) / (north - south)) * height;

      const radius = (metrics.temp >= 40 ? 150 : 120) * intensityFactor;
      const radialGrad = ctx.createRadialGradient(px, py, 5, px, py, radius);

      if (metrics.temp >= 41) {
        // Extreme Heatwave Purple/Crimson Hotspot
        radialGrad.addColorStop(0, "rgba(147, 51, 234, 0.95)");
        radialGrad.addColorStop(0.25, "rgba(220, 38, 38, 0.85)");
        radialGrad.addColorStop(0.55, "rgba(249, 115, 22, 0.70)");
        radialGrad.addColorStop(0.85, "rgba(234, 179, 8, 0.35)");
        radialGrad.addColorStop(1, "rgba(234, 179, 8, 0)");
      } else if (metrics.temp >= 38) {
        // High Heat Stress Deep Red/Orange Hotspot
        radialGrad.addColorStop(0, "rgba(220, 38, 38, 0.88)");
        radialGrad.addColorStop(0.3, "rgba(234, 88, 12, 0.75)");
        radialGrad.addColorStop(0.65, "rgba(245, 158, 11, 0.50)");
        radialGrad.addColorStop(0.9, "rgba(250, 204, 21, 0.20)");
        radialGrad.addColorStop(1, "rgba(250, 204, 21, 0)");
      } else {
        // Moderate Warm Yellow/Amber Hotspot
        radialGrad.addColorStop(0, "rgba(245, 158, 11, 0.80)");
        radialGrad.addColorStop(0.4, "rgba(234, 179, 8, 0.60)");
        radialGrad.addColorStop(0.8, "rgba(250, 204, 21, 0.30)");
        radialGrad.addColorStop(1, "rgba(250, 204, 21, 0)");
      }

      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    return canvas.toDataURL();
  };

  // Initialize & Update Leaflet with Zoom Earth Style
  useEffect(() => {
    if (!isClient || !mapContainerRef.current) return;

    const L = require("leaflet");

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [12.5657, 104.9910],
        zoom: 7,
        minZoom: 5,
        maxZoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // 1. Base Tile Layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const tileUrl = activeLayer === "satellite"
      ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    const subdomains = activeLayer === "satellite" ? ["server"] : ["a", "b", "c", "d"];

    tileLayerRef.current = L.tileLayer(tileUrl, {
      subdomains,
      maxZoom: 18,
    }).addTo(map);

    // 2. Continuous Glowing Thermal Radar Image Overlay (Zoom Earth Weather Heatmap)
    if (heatOverlayRef.current) {
      map.removeLayer(heatOverlayRef.current);
    }

    if (activeLayer === "wet_bulb" || activeLayer === "temperature") {
      const radarDataUrl = generateThermalRadarDataUrl(activeTimeStep.intensity);
      if (radarDataUrl) {
        const bounds = [
          [9.6, 101.4],
          [15.4, 108.4]
        ];
        heatOverlayRef.current = L.imageOverlay(radarDataUrl, bounds, {
          opacity: activeLayer === "temperature" ? 0.80 : 0.85,
          interactive: false,
        }).addTo(map);
      }
    }

    // 3. Zoom Earth Style City / Province Badges on Map
    Object.values(markersRef.current).forEach((marker: any) => map.removeLayer(marker));
    markersRef.current = {};

    filteredRegions.forEach((region) => {
      const metrics = getRegionMetrics(region);
      const riskInfo = getRiskColor(metrics.risk);
      const isSelected = region.id === selectedRegionId;

      // Exact Zoom Earth Style City Weather Badge: [ City Name ] [ 39° WBT ]
      const badgeHtml = `
        <div class="ze-city-badge ${isSelected ? 'ze-selected' : ''}" style="
          position: relative;
          display: inline-flex;
          align-items: center;
          background: ${isSelected ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.92)'};
          color: ${isSelected ? '#ffffff' : '#111827'};
          padding: 3px 8px 3px 6px;
          border-radius: 9999px;
          border: 1.5px solid ${isSelected ? '#f97316' : 'rgba(255,255,255,0.8)'};
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
          cursor: pointer;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          font-family: inherit;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          user-select: none;
        ">
          <!-- Small colored indicator dot -->
          <span style="
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            background: ${riskInfo.pillBg};
            margin-right: 6px;
            flex-shrink: 0;
            box-shadow: 0 0 6px ${riskInfo.glowColor};
          "></span>

          <!-- City name in Khmer or English -->
          <span style="font-size: 11px; font-weight: 800; margin-right: 6px;">
            ${language === "km" ? region.nameKm : region.nameEn}
          </span>

          <!-- Temperature value badge -->
          <span style="
            font-size: 11px;
            font-weight: 900;
            color: ${isSelected ? '#fb923c' : '#ea580c'};
            background: ${isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(234, 88, 12, 0.1)'};
            padding: 1px 5px;
            border-radius: 6px;
          ">
            ${metrics.temp}\u00B0
          </span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-zoomearth-pin",
        html: badgeHtml,
        iconSize: [120, 28],
        iconAnchor: [60, 14],
      });

      const marker = L.marker([region.lat, region.lng], { icon: customIcon })
        .addTo(map)
        .on("click", () => {
          setSelectedRegionId(region.id);
          setShowDetailsPanel(true);
          map.flyTo([region.lat, region.lng], 9, { duration: 0.8 });
        });

      // Zoom Earth Hover Tooltip Pill: "39°C  Extreme Heat Stress"
      const tooltipContent = `
        <div style="
          background: rgba(17, 24, 39, 0.95);
          color: #ffffff;
          padding: 6px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 8px 20px rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.15);
          white-space: nowrap;
        ">
          <span style="color: #fb923c; font-size: 13px; font-weight: 900; margin-right: 6px;">${metrics.temp}\u00B0C</span>
          <span style="color: #ffffff;">${language === "km" ? riskInfo.labelKm : riskInfo.labelEn}</span>
        </div>
      `;
      marker.bindPopup(tooltipContent, { offset: [0, -18], closeButton: false });

      marker.on("mouseover", () => marker.openPopup());
      marker.on("mouseout", () => {
        if (region.id !== selectedRegionId) {
          marker.closePopup();
        }
      });

      markersRef.current[region.id] = marker;
    });

  }, [isClient, activeLayer, currentTimeIndex, masterTemp, sectorFilter, searchQuery, selectedRegionId, language]);

  const handleSelectRegion = (region: CambodiaHeatRegion) => {
    setSelectedRegionId(region.id);
    setShowDetailsPanel(true);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([region.lat, region.lng], 9, { duration: 0.8 });
      const marker = markersRef.current[region.id];
      if (marker) marker.openPopup();
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([12.5657, 104.9910], 7, { duration: 0.8 });
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
      
      {/* 1. Header & Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-heat-100 text-heat-800 text-xs font-black uppercase tracking-wider mb-1.5 border border-heat-200">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span>{language === "km" ? "ផែនទីរ៉ាដាកម្ដៅកម្ពុជា • Zoom Earth Live Thermal Map" : "Cambodia Heat Stress Radar • Live Zoom Earth Interface"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {language === "km" ? (
              <>
                <span className="text-heat-600">ផែនទីកម្ដៅកម្ពុជា</span> (ទម្រង់ Zoom Earth Heat Radar)
              </>
            ) : (
              <>
                Cambodia <span className="text-heat-600">Wet-Bulb & Thermal Heat Radar</span>
              </>
            )}
          </h2>
        </div>

        {/* Quick Sector Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSectorFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
              sectorFilter === "all"
                ? "bg-gray-900 text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {language === "km" ? "គ្រប់វិស័យ" : "All Sectors"}
          </button>
          <button
            onClick={() => setSectorFilter("garment")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              sectorFilter === "garment"
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200"
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>{language === "km" ? "រោងចក្រកាត់ដេរ" : "Garment Hubs"}</span>
          </button>
          <button
            onClick={() => setSectorFilter("transport")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              sectorFilter === "transport"
                ? "bg-cooling-600 text-white shadow-xs"
                : "bg-white text-cooling-700 hover:bg-cooling-50 border border-cooling-200"
            }`}
          >
            <Bike className="w-3.5 h-3.5" />
            <span>{language === "km" ? "អ្នករត់កង់បី" : "Tuk-Tuk Routes"}</span>
          </button>
          <button
            onClick={() => setSectorFilter("food_seller")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              sectorFilter === "food_seller"
                ? "bg-heat-600 text-white shadow-xs"
                : "bg-white text-heat-700 hover:bg-heat-50 border border-heat-200"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>{language === "km" ? "លក់ដូរតាមផ្លូវ" : "Street Food"}</span>
          </button>
        </div>
      </div>

      {/* 2. THE ZOOM EARTH RADAR MAP CANVAS CONTAINER */}
      <div 
        ref={mapWrapperRef}
        className="relative w-full h-[620px] sm:h-[680px] rounded-3xl overflow-hidden border-2 border-gray-800 shadow-2xl bg-[#0f1117] select-none"
      >
        {/* The Leaflet Base Map + Thermal Overlay */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* TOP-LEFT BRANDING BADGE (Zoom Earth Style) */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="bg-[#1c1d24]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl border border-white/15 shadow-xl flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-heat-500 to-red-500 flex items-center justify-center text-white shadow-md shadow-heat-500/30 flex-shrink-0">
              <Sun className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs font-black leading-tight tracking-wide">
                SHADE SAFETY <span className="text-heat-400">ម្លប់សុវត្ថិភាព</span>
              </div>
              <div className="text-[10px] text-gray-300 font-semibold">
                Live Heat Stress & Wet-Bulb Radar
              </div>
            </div>
          </div>
        </div>

        {/* LEFT FLOATING GLASS LAYER MENU (Exact Zoom Earth Match!) */}
        <div className="hidden md:flex absolute top-20 left-4 z-20 flex-col w-56 bg-[#181920]/90 backdrop-blur-md text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-2.5 space-y-3">
          
          {/* Live Maps */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-2 mb-1 flex items-center justify-between">
              <span>{language === "km" ? "ផែនទីផ្ទាល់" : "LIVE MAPS"}</span>
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveLayer("satellite")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeLayer === "satellite"
                    ? "bg-white/20 text-white font-black"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>{language === "km" ? "ផ្កាយរណប (Satellite)" : "Satellite"}</span>
              </button>

              <button
                onClick={() => setActiveLayer("wet_bulb")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeLayer === "wet_bulb"
                    ? "bg-heat-600 text-white font-black shadow-md shadow-heat-600/40"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <Droplets className="w-4 h-4 text-orange-400" />
                <div className="leading-tight">
                  <div>{language === "km" ? "រ៉ាដាកម្ដៅ Wet Bulb" : "Wet-Bulb Radar"}</div>
                  <div className="text-[10px] text-orange-200 font-normal">Heat Stress Index</div>
                </div>
              </button>
            </div>
          </div>

          {/* Forecast Maps */}
          <div className="border-t border-white/10 pt-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-2 mb-1">
              <span>{language === "km" ? "ការព្យាករធាតុអាកាស" : "FORECAST MAPS"}</span>
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveLayer("temperature")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeLayer === "temperature"
                    ? "bg-white/20 text-white font-black"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <Thermometer className="w-4 h-4 text-red-400" />
                <span>{language === "km" ? "សីតុណ្ហភាពខ្យល់" : "Temperature"}</span>
              </button>

              <button
                onClick={() => setActiveLayer("wind")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition text-left ${
                  activeLayer === "wind"
                    ? "bg-white/20 text-white font-black"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <Wind className="w-4 h-4 text-teal-300" />
                <span>{language === "km" ? "ល្បឿនខ្យល់ & កង្ហារ" : "Wind & Airflow"}</span>
              </button>
            </div>
          </div>

          {/* Quick Search inside menu */}
          <div className="border-t border-white/10 pt-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === "km" ? "ស្វែងរកខេត្ត..." : "Search province..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 text-xs bg-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-heat-400"
              />
            </div>
          </div>

        </div>

        {/* TOP-RIGHT MODEL RESOLUTION BADGE (Zoom Earth Style) */}
        <div className="absolute top-4 right-16 z-20 hidden sm:flex items-center gap-2">
          <div className="bg-[#181920]/80 backdrop-blur-md text-white px-3 py-1 rounded-xl border border-white/10 text-[11px] font-bold shadow-lg">
            <span className="text-heat-400 font-black">ICON</span> 13 km | <span className="text-cyan-400 font-black">GFS</span> 22 km
          </div>
        </div>

        {/* RIGHT TOOLBAR: Floating Action Buttons (Exact Zoom Earth Match!) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 rounded-2xl bg-[#181920]/90 backdrop-blur-md text-white border border-white/15 flex items-center justify-center hover:bg-white/20 active:scale-95 transition shadow-xl"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleResetView}
            className="w-10 h-10 rounded-2xl bg-[#181920]/90 backdrop-blur-md text-white border border-white/15 flex items-center justify-center hover:bg-white/20 active:scale-95 transition shadow-xl"
            title={language === "km" ? "កំណត់ទិដ្ឋភាពកម្ពុជាឡើងវិញ" : "Recenter Cambodia"}
          >
            <Navigation className="w-4 h-4 text-heat-400 rotate-45" />
          </button>

          <a
            href="tel:119"
            className="w-10 h-10 rounded-2xl bg-red-600/90 backdrop-blur-md text-white border border-red-400 flex items-center justify-center hover:bg-red-700 active:scale-95 transition shadow-xl animate-pulse"
            title="Call 119 Ambulance"
          >
            <PhoneCall className="w-4 h-4" />
          </a>
        </div>

        {/* BOTTOM-LEFT HEAT GRADIENT COLOR SCALE BAR (Exact Zoom Earth Match!) */}
        <div className="absolute bottom-4 left-4 z-20 bg-[#181920]/90 backdrop-blur-md text-white px-3 py-2 rounded-2xl border border-white/15 shadow-2xl max-w-xs sm:max-w-md">
          <div className="flex items-center justify-between text-[11px] font-black text-gray-300 mb-1">
            <span>&deg;C</span>
            <div className="flex gap-3 sm:gap-4 font-mono text-[10px] text-gray-200">
              <span>18</span>
              <span>22</span>
              <span>26</span>
              <span>30</span>
              <span>34</span>
              <span>38</span>
              <span>42</span>
              <span>46+</span>
            </div>
          </div>
          {/* Zoom Earth Heat Color Strip */}
          <div className="w-56 sm:w-72 h-3.5 rounded-full overflow-hidden shadow-inner flex" style={{
            background: "linear-gradient(to right, #38bdf8 0%, #4ade80 18%, #facc15 36%, #fb923c 54%, #ef4444 72%, #b91c1c 88%, #6b21a8 100%)"
          }} />
          <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1">
            <span>{language === "km" ? "សុវត្ថិភាព" : "Safe"}</span>
            <span className="text-yellow-300">{language === "km" ? "ប្រុងប្រយ័ត្ន" : "Caution"}</span>
            <span className="text-orange-400">{language === "km" ? "គ្រោះថ្នាក់" : "Danger"}</span>
            <span className="text-red-400 font-black">{language === "km" ? "ខ្យល់គរ (Stroke)" : "Extreme"}</span>
          </div>
        </div>

        {/* BOTTOM-CENTER TIMELINE PLAYER (Exact Zoom Earth Match!) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-80 sm:w-96 bg-[#181920]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl flex items-center justify-between gap-3">
          
          {/* Play / Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-xl bg-heat-600 text-white flex items-center justify-center hover:bg-heat-500 active:scale-95 transition shadow-md shadow-heat-600/40 flex-shrink-0"
            title={isPlaying ? "Pause" : "Play Timeline"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          {/* Time Step Stepper Buttons & Label */}
          <button
            onClick={() => setCurrentTimeIndex((prev) => (prev - 1 + timeSteps.length) % timeSteps.length)}
            className="p-1 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center flex-1">
            <div className="text-xs font-black text-white leading-tight">
              4 Nov &bull; {activeTimeStep.id}
            </div>
            <div className="text-[10px] text-heat-400 font-bold">
              {language === "km" ? activeTimeStep.labelKm : activeTimeStep.labelEn}
            </div>
          </div>

          <button
            onClick={() => setCurrentTimeIndex((prev) => (prev + 1) % timeSteps.length)}
            className="p-1 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* 3. WORKPLACE PROTECTION INSPECTION CARD (Synchronized with Map) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-heat-300 shadow-lg space-y-6">
        
        {/* Header: Selected Province & Category Badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-heat-700 bg-heat-100 px-3 py-1 rounded-full border border-heat-200">
                <MapPin className="w-3.5 h-3.5 text-heat-600" />
                <span>{language === "km" ? selectedRegion.zoneKm : selectedRegion.zoneEn}</span>
              </span>
              
              {selectedRegion.isGarmentHub && (
                <span className="text-[11px] font-black uppercase text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md border border-purple-200">
                  {language === "km" ? "រោងចក្រកាត់ដេរ" : "Garment SEZ"}
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              {language === "km" ? (
                <>
                  <span>{selectedRegion.nameKm}</span>{" "}
                  <span className="text-lg text-gray-500 font-bold font-sans">({selectedRegion.nameEn})</span>
                </>
              ) : (
                <>
                  <span>{selectedRegion.nameEn}</span>{" "}
                  <span className="text-lg text-gray-500 font-bold font-sans">({selectedRegion.nameKm})</span>
                </>
              )}
            </h3>
          </div>

          {/* Health Severity Alert Badge */}
          <div className={`px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xs ${currentRiskTheme.badgeBg}`}>
            <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <div>
              <div className="text-xs font-black uppercase tracking-wider opacity-90">
                {language === "km" ? "ការប្រកាសអាសន្នសុខភាព" : "Health Severity Alert"}
              </div>
              <div className="text-sm sm:text-base font-black">
                {language === "km" ? currentRiskTheme.labelKm : currentRiskTheme.labelEn}
              </div>
            </div>
          </div>
        </div>

        {/* Thermal Readings Grid: Ambient Temp & Feels Like Heat Index */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-gray-500 mb-1">
              <Thermometer className="w-4 h-4 text-heat-600" />
              <span>{language === "km" ? "កម្ដៅខ្យល់" : "Air Temp"}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900">
              {currentMetrics.temp}&deg;C
            </div>
            <div className="text-xs text-gray-500 font-medium mt-1">
              {activeTimeStep.id} &bull; {language === "km" ? "កម្ដៅធម្មជាតិ" : "Ambient"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-red-600 mb-1">
              <Sun className="w-4 h-4 text-red-600" />
              <span>{language === "km" ? "កម្ដៅជាក់ស្ដែង (Feels Like)" : "Feels Like Heat Index"}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-red-700">
              {currentMetrics.heatIndex}&deg;C
            </div>
            <div className="text-xs text-red-700 font-bold mt-1">
              {language === "km" ? "សន្ទស្សន៍កម្តៅ Wet Bulb (HI)" : "NOAA Heat Index (HI)"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cooling-50 border border-cooling-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-cooling-700 mb-1">
                <Droplets className="w-4 h-4 text-cooling-600" />
                <span>{language === "km" ? "សំណើមបរិយាកាស" : "Relative Humidity"}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-cooling-900">
                {selectedRegion.peakHumidity}%
              </div>
            </div>
            <div className="text-xs text-cooling-800 font-bold mt-1">
              {language === "km" ? "កាំរស្មីព្រះអាទិត្យ UV៖ ១១ (ខ្ពស់)" : "UV Index: 11 (Extreme)"}
            </div>
          </div>

        </div>

        {/* Sector-Specific Working Alerts */}
        <div className="space-y-3 pt-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-heat-600" />
            <span>{language === "km" ? "វិធានការការពារតាមមុខរបរជាក់ស្តែង៖" : "Tailored Occupational Protection:"}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Garment Workers */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs sm:text-sm font-medium text-gray-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Shirt className="w-4 h-4" />
                </div>
                <div className="font-black text-purple-900">
                  {language === "km" ? "កម្មករកាត់ដេរ" : "Garment Workers"}
                </div>
              </div>
              <p className="leading-relaxed text-gray-700 text-xs">
                {language === "km" ? selectedRegion.garmentAlertKm : selectedRegion.garmentAlertEn}
              </p>
            </div>

            {/* Transport Drivers */}
            <div className="p-4 rounded-2xl bg-cooling-50/70 border border-cooling-200 text-xs sm:text-sm font-medium text-gray-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cooling-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Bike className="w-4 h-4" />
                </div>
                <div className="font-black text-cooling-900">
                  {language === "km" ? "អ្នករត់កង់បី & ដឹកជញ្ជូន" : "Tuk-Tuk Drivers"}
                </div>
              </div>
              <p className="leading-relaxed text-gray-700 text-xs">
                {language === "km" ? selectedRegion.transportAlertKm : selectedRegion.transportAlertEn}
              </p>
            </div>

            {/* Street Food Sellers */}
            <div className="p-4 rounded-2xl bg-heat-50/70 border border-heat-200 text-xs sm:text-sm font-medium text-gray-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-heat-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Utensils className="w-4 h-4" />
                </div>
                <div className="font-black text-heat-900">
                  {language === "km" ? "អ្នកលក់ដូរតាមផ្លូវ" : "Street Food Sellers"}
                </div>
              </div>
              <p className="leading-relaxed text-gray-700 text-xs">
                {language === "km" ? selectedRegion.foodSellerAlertKm : selectedRegion.foodSellerAlertEn}
              </p>
            </div>

          </div>
        </div>

        {/* Mandatory Water & Shade Prescription + 119 Ambulance Hotline */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-gray-100">
          <div className="space-y-1 text-xs sm:text-sm font-bold text-gray-800">
            <div className="flex items-center gap-2 text-cooling-800">
              <CheckCircle className="w-4 h-4 text-cooling-600 flex-shrink-0" />
              <span>
                <strong>{language === "km" ? "ផឹកទឹក៖ " : "Water: "}</strong>
                {language === "km" ? selectedRegion.waterAdviceKm : selectedRegion.waterAdviceEn}
              </span>
            </div>
            <div className="flex items-center gap-2 text-heat-800">
              <CheckCircle className="w-4 h-4 text-heat-600 flex-shrink-0" />
              <span>
                <strong>{language === "km" ? "សម្រាកម្លប់៖ " : "Shade: "}</strong>
                {language === "km" ? selectedRegion.shadeAdviceKm : selectedRegion.shadeAdviceEn}
              </span>
            </div>
          </div>

          <a
            href="tel:119"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black py-3.5 px-6 rounded-2xl shadow-md shadow-red-600/30 transition text-sm flex-shrink-0"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>
              {language === "km" ? "ហៅឡានពេទ្យ ១១៩" : "Call 119 Ambulance"}
            </span>
          </a>
        </div>

      </div>

    </div>
  );
}
