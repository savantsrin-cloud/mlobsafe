// 25 Provinces and Capital of Cambodia with hot season temperature, humidity, and AQI data
export const cambodiaProvinces = [
  {
    id: "phnom-penh",
    nameKm: "រាជធានីភ្នំពេញ",
    nameEn: "Phnom Penh",
    temp: 38,
    humidity: 62,
    aqi: 125, // Unhealthy for Sensitive Groups (urban traffic & construction)
    pm25: 45.2,
    region: "Central",
    x: 480, // SVG map relative coordinate
    y: 430,
    workerAlertKm: "កម្ដៅជះពីផ្លូវកៅស៊ូ និងចរាចរណ៍ខាប់។ អ្នករត់ PassApp និងកម្មករគួរពាក់ម៉ាស់ និងញ៉ាំទឹកជាប្រចាំ។",
    workerAlertEn: "High asphalt radiant heat and traffic emissions. PassApp drivers and workers should wear masks and hydrate constantly."
  },
  {
    id: "kandal",
    nameKm: "ខេត្តកណ្ដាល",
    nameEn: "Kandal",
    temp: 38,
    humidity: 63,
    aqi: 88,
    pm25: 29.8,
    region: "Central",
    x: 495,
    y: 455,
    workerAlertKm: "តំបន់រោងចក្រច្រើន។ ត្រូវរក្សាចរន្តកង្ហារក្នុងរោងចក្រឱ្យបានល្អ។",
    workerAlertEn: "Dense manufacturing corridor. Ensure adequate cross-ventilation fans inside workshops."
  },
  {
    id: "siem-reap",
    nameKm: "ខេត្តសៀមរាប",
    nameEn: "Siem Reap",
    temp: 37,
    humidity: 65,
    aqi: 68,
    pm25: 20.4,
    region: "Northwest",
    x: 350,
    y: 220,
    workerAlertKm: "កម្ដៅថ្ងៃខ្លាំងនៅតំបន់ប្រាសាទ និងផ្លូវទេសចរណ៍។ ត្រូវពាក់មួក ឬឆ័ត្រការពារ។",
    workerAlertEn: "Intense daytime sun around heritage zones. Wear broad-brimmed hats and use sun umbrellas."
  },
  {
    id: "battambang",
    nameKm: "ខេត្តបាត់ដំបង",
    nameEn: "Battambang",
    temp: 40,
    humidity: 48,
    aqi: 95,
    pm25: 33.2,
    region: "Northwest",
    x: 240,
    y: 260,
    workerAlertKm: "កម្ដៅស្ងួតឡើងដល់ ៤០°C។ ងាយរមួលក្រពើខ្លាំង ប្រសិនបើខ្វះជាតិទឹក។",
    workerAlertEn: "Dry heat reaching 40°C. High risk of severe muscle cramps without electrolyte fluids."
  },
  {
    id: "banteay-meanchey",
    nameKm: "ខេត្តបន្ទាយមានជ័យ",
    nameEn: "Banteay Meanchey",
    temp: 39,
    humidity: 50,
    aqi: 105,
    pm25: 37.5,
    region: "Northwest",
    x: 210,
    y: 180,
    workerAlertKm: "កម្ដៅព្រំដែនក្តៅស្ងួត និងធូលីដី។ កម្មករសំណង់ត្រូវសម្រាកម្លប់ជាប្រចាំ។",
    workerAlertEn: "Dry border heat and airborne dust. Construction laborers need regular shade intervals."
  },
  {
    id: "kampong-cham",
    nameKm: "ខេត្តកំពង់ចាម",
    nameEn: "Kampong Cham",
    temp: 37,
    humidity: 60,
    aqi: 65,
    pm25: 18.9,
    region: "Central East",
    x: 540,
    y: 370,
    workerAlertKm: "កម្ដៅមធ្យម តែសំណើមជិតទន្លេមេគង្គធ្វើឱ្យស្អុះស្អាប់ខ្លាំង។",
    workerAlertEn: "Moderate temperatures but riverine humidity makes daytime conditions very muggy."
  },
  {
    id: "kampong-chhnang",
    nameKm: "ខេត្តកំពង់ឆ្នាំង",
    nameEn: "Kampong Chhnang",
    temp: 38,
    humidity: 58,
    aqi: 72,
    pm25: 22.0,
    region: "Central",
    x: 390,
    y: 350,
    workerAlertKm: "កម្ដៅជះខ្លាំងនៅចន្លោះម៉ោង ១១ ព្រឹក ដល់ ៣ រសៀល។",
    workerAlertEn: "Severe sun exposure between 11 AM and 3 PM."
  },
  {
    id: "kampong-speu",
    nameKm: "ខេត្តកំពង់ស្ពឺ",
    nameEn: "Kampong Speu",
    temp: 38,
    humidity: 55,
    aqi: 80,
    pm25: 26.5,
    region: "Southwest",
    x: 410,
    y: 440,
    workerAlertKm: "រោងចក្រកាត់ដេរ និងកសិកម្មច្រើន។ ត្រូវត្រៀមដបទឹកស្អាតនៅជិតខ្លួន។",
    workerAlertEn: "High concentration of garment factories and farms. Keep refillable water bottles nearby."
  },
  {
    id: "kampong-thom",
    nameKm: "ខេត្តកំពង់ធំ",
    nameEn: "Kampong Thom",
    temp: 38,
    humidity: 58,
    aqi: 60,
    pm25: 16.5,
    region: "Central",
    x: 440,
    y: 290,
    workerAlertKm: "កម្ដៅកណ្តាលប្រទេសក្តៅខ្លាំង។ ជៀសវាងការធ្វើការធ្ងន់ពេលថ្ងៃត្រង់។",
    workerAlertEn: "High central plain heat. Avoid heavy physical tasks during midday hours."
  },
  {
    id: "kampot",
    nameKm: "ខេត្តកំពត",
    nameEn: "Kampot",
    temp: 35,
    humidity: 75,
    aqi: 45, // Good
    pm25: 11.2,
    region: "Coast",
    x: 380,
    y: 540,
    workerAlertKm: "ខ្យល់សមុទ្រល្អ តែសំណើមខ្ពស់ធ្វើឱ្យបែកញើសច្រើន និងបាត់បង់ជាតិទឹក។",
    workerAlertEn: "Good air quality but high coastal humidity triggers intense sweating."
  },
  {
    id: "koh-kong",
    nameKm: "ខេត្តកោះកុង",
    nameEn: "Koh Kong",
    temp: 34,
    humidity: 80,
    aqi: 38, // Good
    pm25: 9.1,
    region: "Coast",
    x: 260,
    y: 480,
    workerAlertKm: "សំណើមសមុទ្រខ្ពស់ ត្រូវផ្លាស់ប្តូរសម្លៀកបំពាក់កុំឱ្យរោលកន្ទួលស្បែក។",
    workerAlertEn: "High tropical humidity; wear loose cotton to prevent heat rash."
  },
  {
    id: "kratie",
    nameKm: "ខេត្តក្រចេះ",
    nameEn: "Kratie",
    temp: 39,
    humidity: 55,
    aqi: 58,
    pm25: 15.6,
    region: "East",
    x: 620,
    y: 310,
    workerAlertKm: "កម្ដៅតាមដងទន្លេឡើងខ្ពស់។ កសិករ និងអ្នកនេសាទត្រូវសម្រាកក្នុងម្លប់។",
    workerAlertEn: "High riverbank heat. Farmers and fishers need shaded hydration rests."
  },
  {
    id: "mondulkiri",
    nameKm: "ខេត្តមណ្ឌលគិរី",
    nameEn: "Mondulkiri",
    temp: 32,
    humidity: 60,
    aqi: 30, // Good
    pm25: 7.2,
    region: "Northeast Plateau",
    x: 750,
    y: 330,
    workerAlertKm: "អាកាសធាតុខ្ពង់រាបត្រជាក់បង្គួរ គុណភាពខ្យល់ល្អបរិសុទ្ធ។",
    workerAlertEn: "Cooler highland microclimate with pristine mountain air."
  },
  {
    id: "preah-vihear",
    nameKm: "ខេត្តព្រះវិហារ",
    nameEn: "Preah Vihear",
    temp: 39,
    humidity: 52,
    aqi: 62,
    pm25: 17.2,
    region: "North",
    x: 480,
    y: 150,
    workerAlertKm: "កម្ដៅព្រះអាទិត្យក្តៅខ្លាំងនៅតំបន់ភ្នំដងរែក។ ត្រូវមានមួកការពារកម្ដៅ។",
    workerAlertEn: "Intense solar radiation along Dangrek range. Use protective headwear."
  },
  {
    id: "prey-veng",
    nameKm: "ខេត្តព្រៃវែង",
    nameEn: "Prey Veng",
    temp: 38,
    humidity: 64,
    aqi: 70,
    pm25: 21.0,
    region: "South East",
    x: 560,
    y: 440,
    workerAlertKm: "វាលស្រែក្តៅហប់។ កសិករត្រូវញ៉ាំទឹកលាយអំបិលរ៉ែ ORS។",
    workerAlertEn: "Open lowland paddy heat. Agricultural laborers should sip ORS fluids."
  },
  {
    id: "pursat",
    nameKm: "ខេត្តពោធិ៍សាត់",
    nameEn: "Pursat",
    temp: 39,
    humidity: 50,
    aqi: 65,
    pm25: 18.5,
    region: "West",
    x: 320,
    y: 360,
    workerAlertKm: "កម្ដៅក្តៅខ្លាំងពីបឹងទន្លេសាបដល់ជួរភ្នំក្រវាញ។ ត្រូវប្រយ័ត្នការសន្លប់។",
    workerAlertEn: "High heat from Tonle Sap basin to Cardamom hills. Monitor for fainting signs."
  },
  {
    id: "ratanakiri",
    nameKm: "ខេត្តរតនគិរី",
    nameEn: "Ratanakiri",
    temp: 33,
    humidity: 62,
    aqi: 35, // Good
    pm25: 8.5,
    region: "Northeast",
    x: 740,
    y: 180,
    workerAlertKm: "តំបន់ចម្ការកៅស៊ូ និងដីក្រហម។ កម្មករកៅស៊ូត្រូវចាប់ផ្តើមការងារពីព្រលឹម។",
    workerAlertEn: "Rubber plantation terrain. Tappers should schedule work in early morning dawn."
  },
  {
    id: "preah-sihanouk",
    nameKm: "ខេត្តព្រះសីហនុ",
    nameEn: "Preah Sihanouk",
    temp: 34,
    humidity: 78,
    aqi: 75,
    pm25: 23.8,
    region: "Coast",
    x: 320,
    y: 550,
    workerAlertKm: "តំបន់កំពង់ផែ និងសំណង់ច្រើន។ កម្មករសំណង់ត្រូវមានរបាំងការពារកម្តៅ។",
    workerAlertEn: "Busy port and high-rise construction zones. Workers need sun shades."
  },
  {
    id: "stung-treng",
    nameKm: "ខេត្តស្ទឹងត្រែង",
    nameEn: "Stung Treng",
    temp: 39,
    humidity: 54,
    aqi: 50,
    pm25: 12.8,
    region: "Northeast",
    x: 620,
    y: 180,
    workerAlertKm: "ចំណុចប្រសព្វទន្លេមេគង្គ និងសេសាន។ កម្ដៅឡើងខ្ពស់នៅពេលរសៀល។",
    workerAlertEn: "Mekong/Sesan confluence. Temperatures peak acutely in late afternoon."
  },
  {
    id: "svay-rieng",
    nameKm: "ខេត្តស្វាយរៀង",
    nameEn: "Svay Rieng",
    temp: 38,
    humidity: 65,
    aqi: 92,
    pm25: 31.4,
    region: "South East",
    x: 620,
    y: 480,
    workerAlertKm: "តំបន់សេដ្ឋកិច្ចពិសេស (SEZ) ច្រើន។ រោងចក្រត្រូវត្រួតពិនិត្យប្រព័ន្ធត្រជាក់។",
    workerAlertEn: "Multiple Special Economic Zones (SEZ). Factories must audit cooling fans."
  },
  {
    id: "takeo",
    nameKm: "ខេត្តតាកែវ",
    nameEn: "Takeo",
    temp: 38,
    humidity: 62,
    aqi: 68,
    pm25: 20.1,
    region: "South",
    x: 460,
    y: 500,
    workerAlertKm: "កម្ដៅថ្ងៃត្រង់ក្តៅខ្លាំងនៅតំបន់ជនបទ។ ត្រូវជ្រកកន្លែងម្លប់ដើមឈើ។",
    workerAlertEn: "Strong rural midday heat. Rest under tree canopies during breaks."
  },
  {
    id: "oddar-meanchey",
    nameKm: "ខេត្តឧត្ដរមានជ័យ",
    nameEn: "Oddar Meanchey",
    temp: 40,
    humidity: 47,
    aqi: 78,
    pm25: 25.0,
    region: "North",
    x: 290,
    y: 130,
    workerAlertKm: "កម្ដៅស្ងួតកំណត់ត្រា ៤០°C។ ហាមដាច់ខាតការធ្វើការហាលថ្ងៃដោយគ្មានមួក។",
    workerAlertEn: "Record dry heat reaching 40°C. Never work unshaded without head protection."
  },
  {
    id: "kep",
    nameKm: "ខេត្តកែប",
    nameEn: "Kep",
    temp: 34,
    humidity: 76,
    aqi: 40, // Good
    pm25: 9.8,
    region: "Coast",
    x: 410,
    y: 565,
    workerAlertKm: "ខ្យល់សមុទ្របរិសុទ្ធ តែត្រូវរក្សាជាតិទឹកឱ្យបានទៀងទាត់។",
    workerAlertEn: "Fresh coastal sea breeze; keep hydration steady throughout the day."
  },
  {
    id: "pailin",
    nameKm: "ខេត្តប៉ៃលិន",
    nameEn: "Pailin",
    temp: 38,
    humidity: 52,
    aqi: 70,
    pm25: 21.5,
    region: "West",
    x: 180,
    y: 290,
    workerAlertKm: "តំបន់ជើងភ្នំក្តៅហប់។ កម្មករចម្ការត្រូវផឹកទឹកមុនពេលស្រេក។",
    workerAlertEn: "Foothill microclimate prone to heat pockets. Plantation workers must pre-hydrate."
  },
  {
    id: "tboung-khmum",
    nameKm: "ខេត្តត្បូងឃ្មុំ",
    nameEn: "Tboung Khmum",
    temp: 37,
    humidity: 61,
    aqi: 64,
    pm25: 18.2,
    region: "East",
    x: 580,
    y: 390,
    workerAlertKm: "តំបន់កសិ-ឧស្សាហកម្ម។ កម្មករកាត់ផ្លែ និងចៀរជ័រត្រូវប្រយ័ត្នការសន្លប់។",
    workerAlertEn: "Agro-industrial rubber & fruit processing. Watch for early heat dizziness."
  }
];

// Helper to get AQI category and colors
export function getAqiCategory(aqi, lang = "km") {
  if (aqi <= 50) {
    return {
      statusKm: "ល្អ (Good)",
      statusEn: "Good",
      color: "text-emerald-700 bg-emerald-100 border-emerald-300",
      dot: "bg-emerald-500",
      adviceKm: "ខ្យល់បរិសុទ្ធល្អ គ្មានហានិភ័យដល់សុខភាព។",
      adviceEn: "Air quality is satisfactory with little to no health risk."
    };
  } else if (aqi <= 100) {
    return {
      statusKm: "មធ្យម (Moderate)",
      statusEn: "Moderate",
      color: "text-yellow-800 bg-yellow-100 border-yellow-300",
      dot: "bg-yellow-500",
      adviceKm: "គុណភាពខ្យល់មធ្យម។ អ្នកងាយប្រតិកម្មគួរប្រុងប្រយ័ត្ន។",
      adviceEn: "Acceptable quality; unusually sensitive individuals should take precautions."
    };
  } else if (aqi <= 150) {
    return {
      statusKm: "មិនល្អសម្រាប់អ្នកប្រតិកម្ម (Sensitive)",
      statusEn: "Unhealthy for Sensitive",
      color: "text-orange-800 bg-orange-100 border-orange-300",
      dot: "bg-orange-500",
      adviceKm: "កម្មករមានជំងឺហឺត ឬបេះដូង និងស្ត្រីមានផ្ទៃពោះគួរពាក់ម៉ាស់។",
      adviceEn: "Sensitive groups (asthma, heart disease, pregnant workers) should wear masks."
    };
  } else if (aqi <= 200) {
    return {
      statusKm: "មិនល្អចំពោះសុខភាព (Unhealthy)",
      statusEn: "Unhealthy",
      color: "text-red-800 bg-red-100 border-red-300",
      dot: "bg-red-600",
      adviceKm: "មនុស្សគ្រប់គ្នាអាចចាប់ផ្តើមជួបបញ្ហាដង្ហើម។ ពាក់ម៉ាស់ការពារធូលី។",
      adviceEn: "Everyone may begin to experience health effects; wear particulate masks."
    };
  } else {
    return {
      statusKm: "គ្រោះថ្នាក់ខ្លាំង (Hazardous)",
      statusEn: "Hazardous",
      color: "text-purple-900 bg-purple-100 border-purple-400",
      dot: "bg-purple-700",
      adviceKm: "ការប្រកាសអាសន្នសុខភាព! ជៀសវាងការធ្វើសកម្មភាពក្រៅផ្ទះទាំងអស់។",
      adviceEn: "Health emergency alert! Avoid all outdoor exertion."
    };
  }
}
