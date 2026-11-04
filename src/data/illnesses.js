export const illnesses = [
  {
    id: "heat-stroke",
    severity: "emergency",
    titleKm: "ខ្យល់គរ",
    titleEn: "Heat Stroke (Medical Emergency)",
    shortDescKm: "ស្ថានភាពអាសន្នគំរាមកំហែងដល់អាយុជីវិត! កម្ដៅរាងកាយឡើងលើសពី ៤០°C ហើយរាងកាយលែងបញ្ចេញញើសដើម្បីបន្សាបកម្តៅ។",
    shortDescEn: "A life-threatening medical emergency where body core temperature exceeds 40°C (104°F) and the cooling mechanism fails completely.",
    symptomsKm: [
      "សីតុណ្ហភាពក្នុងខ្លួនឡើងខ្ពស់ខ្លាំង (> ៤០°C)",
      "ស្បែកឡើងក្រហម ក្តៅខ្លាំង និងស្ងួត (គ្មានញើស)",
      "វង្វេងវង្វាន់ និយាយមិនត្រង់មាត់ ឬបាត់បង់ស្មារតីសន្លប់",
      "ចង្វាក់បេះដូងលោតញាប់ខ្លាំង និងពិបាកដកដង្ហើម",
      "ប្រកាច់ ឬក្អួតខ្លាំង"
    ],
    symptomsEn: [
      "Core body temperature above 40°C (104°F)",
      "Hot, red, dry skin with zero perspiration",
      "Confusion, slurred speech, hallucinations, or unconsciousness",
      "Rapid, pounding pulse and rapid shallow breathing",
      "Seizures or severe vomiting"
    ],
    whatToDoKm: [
      "🚨 តេហៅឡានពេទ្យលេខ ១១៩ ឬបញ្ជូនទៅមន្ទីរពេទ្យជាបន្ទាន់បំផុត!",
      "សែងអ្នកជំងឺទៅកន្លែងម្លប់ត្រជាក់ ឬបន្ទប់មានកង្ហារជាបន្ទាន់",
      "ដោះសម្លៀកបំពាក់ក្រាស់ៗចេញ",
      "យកកន្សែងសើមជូតត្រជាក់ពេញដងខ្លួន ជាពិសេសកញ្ចឹងក ក្លៀក និងក្រលៀន",
      "បក់កង្ហារ ឬយកទឹកត្រជាក់ស្អំ ដើម្បីបញ្ចុះកម្តៅឱ្យបានលឿន"
    ],
    whatToDoEn: [
      "🚨 Call Cambodia Ambulance 119 immediately or rush to the nearest emergency clinic!",
      "Move the victim to an airy shaded area or air-conditioned room immediately",
      "Loosen and remove tight or heavy outer clothing",
      "Apply cool wet cloths to the neck, armpits, and groin where major blood vessels run",
      "Fan aggressively and mist with cool water to drop core temperature"
    ],
    dontDoKm: [
      "❌ ហាមបញ្ចុកទឹក ឬថ្នាំពេទ្យដាច់ខាត ប្រសិនបើគាត់សន្លប់ ឬវង្វេង (ខ្លាចស្ទះផ្លូវដង្ហើម)",
      "❌ ហាមកោសខ្យល់ជ្រៅខ្លាំង ឬចាក់ម្ជុលលើម្រាមដៃដែលពន្យារពេលបញ្ជូនទៅពេទ្យ"
    ],
    dontDoEn: [
      "❌ NEVER force liquids or medication if the person is unconscious or semi-conscious (choking hazard)",
      "❌ Avoid delaying emergency ambulance transport with home folk remedies like deep coining or finger pricking"
    ]
  },
  {
    id: "heat-exhaustion",
    severity: "warning",
    titleKm: "អស់កម្លាំងដោយសារកម្ដៅ (Heat Exhaustion)",
    titleEn: "Heat Exhaustion",
    shortDescKm: "កើតឡើងនៅពេលរាងកាយបាត់បង់ជាតិទឹក និងអំបិលរ៉ែច្រើនតាមរយៈញើសជោកជាំ។ ប្រសិនបើមិនព្យាបាលទាន់ពេល អាចវិវត្តទៅជាស្ទះកម្ដៅ (Heat Stroke)។",
    shortDescEn: "Occurs when excessive sweating depletes vital water and essential electrolytes. Left untreated, it quickly turns into fatal heat stroke.",
    symptomsKm: [
      "បែកញើសជោកខ្លួនខ្លាំង",
      "វិលមុខ ស្រវាំងភ្នែក អស់កម្លាំងល្ហិតល្ហៃ",
      "ស្បែកស្លេកស្លាំង ត្រជាក់ ហើយមានសំណើមស្អិត",
      "ឈឺក្បាល ធីងធោង និងចង្អោរ",
      "ជីពចរខ្សោយតែដើរញាប់"
    ],
    symptomsEn: [
      "Heavy, drenching sweating",
      "Dizziness, lightheadedness, and profound weakness",
      "Pale, cool, clammy skin",
      "Throbbing headache and nausea",
      "Weak but rapid pulse"
    ],
    whatToDoKm: [
      "ឈប់ធ្វើការងារភ្លាមៗ ហើយចូលសម្រាកនៅក្រោមម្លប់ ឬកន្លែងមានខ្យល់បក់",
      "ផឹកទឹកស្អាត ឬទឹកលាយអំបិលរ៉ែ (ORS) យឺតៗម្ដងបន្តិចៗ",
      "ដោះមួក ស្បែកជើង និងបន្ធូរសម្លៀកបំពាក់ឱ្យធូរស្រាល",
      "យកក្រណាត់សើមត្រជាក់ស្អំលើថ្ងាស និងកញ្ចឹងក",
      "បើអាការៈមិនធូរស្បើយក្នុងរយៈពេល ៣០ នាទី ត្រូវទៅជួបគ្រូពេទ្យ"
    ],
    whatToDoEn: [
      "Cease all work immediately and recline in breezy shade",
      "Sip cool clean water or Oral Rehydration Solution (ORS) slowly",
      "Remove helmet, boots, and loosen all tight work clothing",
      "Place damp, cool cloths across the forehead and back of neck",
      "Seek clinic care if nausea persists or symptoms do not improve in 30 minutes"
    ],
    dontDoKm: [
      "❌ កុំផឹកភេសជ្ជៈប៉ូវកម្លាំង ឬកាហ្វេដែលមានជាតិស្ករ និងកាហ្វេអ៊ីនខ្ពស់",
      "❌ កុំបន្តធ្វើការហាលថ្ងៃដោយបង្ខំ"
    ],
    dontDoEn: [
      "❌ Do not drink caffeinated energy drinks or sugary sodas",
      "❌ Do not push through work or ignore dizzy spells"
    ]
  },
  {
    id: "heat-cramps",
    severity: "caution",
    titleKm: "រមួលក្រពើដោយសារកម្ដៅ (Heat Cramps)",
    titleEn: "Heat Cramps",
    shortDescKm: "ការកន្ត្រាក់សាច់ដុំយ៉ាងឈឺចាប់ (ជាពិសេសត្រង់កំភួនជើង ភ្លៅ ឬពោះ) បង្កឡើងដោយការខ្វះជាតិអំបិលរ៉ែពេលបែកញើសខ្លាំង។",
    shortDescEn: "Painful involuntary muscle spasms—commonly in calves, thighs, and abdomen—caused by electrolyte loss during heavy sweat.",
    symptomsKm: [
      "សាច់ដុំកន្ត្រាក់ឈឺចាប់ខ្លាំងនៅកំភួនជើង ភ្លៅ ឬក្បាលពោះ",
      "មានអារម្មណ៍តឹងសាច់ដុំខ្លាំងពេលកំពុងធ្វើការ",
      "បែកញើសខ្លាំង អស់កម្លាំងល្មម"
    ],
    symptomsEn: [
      "Sharp, painful muscle spasms in calves, thighs, or stomach",
      "Intense muscle tightness during physical work",
      "Heavy sweating and mild fatigue"
    ],
    whatToDoKm: [
      "ឈប់ធ្វើចលនាធ្ងន់ៗ ហើយសម្រាកនៅកន្លែងត្រជាក់",
      "ផឹកទឹកលាយអំបិលបន្តិច (ឬទឹកដូងស្រស់ ទឹក ORS)",
      "ម៉ាស្សា និងទាញពន្លាតសាច់ដុំដែលរមួលនោះថ្នមៗ",
      "សម្រាករហូតដល់សាច់ដុំលែងកន្ត្រាក់យ៉ាងហោចណាស់ពីរបីម៉ោង"
    ],
    whatToDoEn: [
      "Stop heavy activity and rest in a shaded spot",
      "Drink electrolyte-rich fluids (coconut water, ORS packet in water, or lightly salted water)",
      "Gently stretch and massage the cramped muscle group",
      "Rest for a few hours before resuming physical exertion"
    ],
    dontDoKm: [
      "❌ កុំលេបថ្នាំគ្រាប់ជាតិប្រៃសុទ្ធដោយគ្មានការណែនាំពីគ្រូពេទ្យ",
      "❌ កុំបន្តលើកអីវ៉ាន់ធ្ងន់ភ្លាមៗ"
    ],
    dontDoEn: [
      "❌ Do not swallow undiluted salt tablets without doctor oversight",
      "❌ Do not return to strenuous hauling immediately"
    ]
  },
  {
    id: "heat-syncope",
    severity: "warning",
    titleKm: "សន្លប់វិលមុខដោយកម្ដៅ (Heat Syncope)",
    titleEn: "Heat Syncope (Fainting)",
    shortDescKm: "ការងងឹតមុខ ឬដួលសន្លប់បណ្តោះអាសន្ន ដោយសារសរសៃឈាមរីកធំនៅពេលក្តៅ ហើយឈាមរត់ទៅចិញ្ចឹមខួរក្បាលមិនទាន់។ ឧស្សាហ៍កើតលើអ្នកឈរយូរ។",
    shortDescEn: "Sudden fainting or blackout spell caused by blood pooling in the lower extremities when blood vessels dilate to shed heat.",
    symptomsKm: [
      "ស្រវាំងភ្នែក ងងឹតឈឹងភ្លាមៗ",
      "វិលមុខខ្លាំងពេលងើបឈរ ឬឈរមួយកន្លែងយូរ",
      "ដួលសន្លប់មួយភ្លែត (ដឹងខ្លួនឡើងវិញលឿន)"
    ],
    symptomsEn: [
      "Sudden tunnel vision or blacking out",
      "Intense dizziness when standing in place for prolonged periods",
      "Brief episode of unconsciousness followed by quick recovery upon lying flat"
    ],
    whatToDoKm: [
      "ឱ្យគាត់គេងរាបស្មើ ហើយលើកជើងឡើងលើបន្តិច (ខ្ពស់ជាងកម្រិតបេះដូង)",
      "បក់កង្ហារ និងឱ្យផឹកទឹកត្រជាក់យឺតៗពេលគាត់ដឹងខ្លួនពេញលេញ",
      "កុំឱ្យគាត់ងើបឈរភ្លាមៗ"
    ],
    whatToDoEn: [
      "Lie the patient flat on their back and elevate legs 20–30 cm above heart level",
      "Loosen collar and fan gently; offer cool water once fully conscious",
      "Do not allow the person to stand up quickly"
    ],
    dontDoKm: [
      "❌ ហាមឱ្យងើបឈរដើរភ្លាមៗ ព្រោះអាចដួលសន្លប់ម្តងទៀត",
      "❌ កុំឱ្យមនុស្សចោមរោមជិត ត្រូវបើកផ្លូវឱ្យខ្យល់ចេញចូល"
    ],
    dontDoEn: [
      "❌ Do not let the person stand up abruptly",
      "❌ Do not crowd around the patient; ensure unobstructed airflow"
    ]
  },
  {
    id: "heat-rash",
    severity: "caution",
    titleKm: "រោលកន្ទួលកម្ដៅ (Heat Rash / Prickly Heat)",
    titleEn: "Heat Rash (Prickly Heat)",
    shortDescKm: "ការរលាកស្បែកដែលបណ្តាលមកពីការស្ទះក្រពេញញើស។ កើតញឹកញាប់លើកម្មកររោងចក្រ និងអ្នកដែលពាក់អាវក្រាស់ស្អុះស្អាប់។",
    shortDescEn: "Skin irritation triggered by blocked sweat ducts during hot, humid shifts. Very common in humid factory settings.",
    symptomsKm: [
      "កន្ទួលតូចៗក្រហម ឬពងទឹកថ្លាតូចៗដូចគ្រាប់ពោត",
      "មានអារម្មណ៍រមាស់ ឬផ្សារក្រហាយលើស្បែក",
      "ច្រើនកើតនៅកញ្ចឹងក ទ្រូង ក្រលៀន និងក្រោមសុដន់"
    ],
    symptomsEn: [
      "Clusters of tiny red pimples or clear sweat blisters",
      "Prickly, stinging, or itching sensation on damp skin",
      "Common on neck, upper chest, groin, elbow creases, and under breasts"
    ],
    whatToDoKm: [
      "រក្សាកន្លែងដែលរោលឱ្យស្ងួត និងត្រជាក់",
      "ពាក់សម្លៀកបំពាក់កប្បាសរលុងៗ ដែលមានខ្យល់ចេញចូលស្រួល",
      "ងូតទឹកត្រជាក់ ឬជូតខ្លួនឱ្យស្ងួតល្អ"
    ],
    whatToDoEn: [
      "Keep affected skin cool and dry",
      "Wear loose, lightweight cotton clothing",
      "Rinse with cool water and gently pat skin dry"
    ],
    dontDoKm: [
      "❌ ជៀសវាងការលាបប្រេង ឬក្រែមខាញ់ក្រាស់ៗ ព្រោះវានឹងស្ទះរន្ធញើសថែមទៀត",
      "❌ កុំអេះខ្លាំងៗ ខ្លាចបង្កជាដំបៅឆ្លងរោគ"
    ],
    dontDoEn: [
      "❌ Avoid greasy petroleum ointments or heavy creams that block pores further",
      "❌ Avoid aggressive scratching which leads to secondary bacterial infection"
    ]
  },
  {
    id: "sunburn",
    severity: "caution",
    titleKm: "រលាកស្បែកដោយកម្ដៅថ្ងៃ (Sunburn)",
    titleEn: "Sunburn",
    shortDescKm: "ការខូចខាតស្បែកដោយសារកាំរស្មីយូវី (UV) ពីពន្លឺព្រះអាទិត្យ ធ្វើឱ្យស្បែកបាត់បង់សមត្ថភាពបញ្ចេញកម្តៅ និងបាត់បង់ជាតិទឹកកាន់តែលឿន។",
    shortDescEn: "UV radiation damage that leaves skin inflamed, impairs temperature regulation, and accelerates fluid loss through damaged epidermis.",
    symptomsKm: [
      "ស្បែកឡើងក្រហម ក្តៅ ឈឺផ្សារពេលប៉ះ",
      "អាចឡើងពងទឹក និងរបកស្បែកនៅប៉ុន្មានថ្ងៃបន្ទាប់",
      "ក្តៅខ្លួនស្រាល ឬឈឺក្បាល"
    ],
    symptomsEn: [
      "Red, tender, warm skin painful to the touch",
      "Blistering and subsequent skin peeling days later",
      "Mild fever, chills, and headache"
    ],
    whatToDoKm: [
      "ស្អំកន្សែងត្រជាក់ ឬលាបជែលប្រទាលកន្ទុយក្រពើ (Aloe Vera)",
      "ញ៉ាំទឹកបន្ថែមដើម្បីទូទាត់ជាតិទឹកដែលបាត់បង់",
      "ការពារស្បែកពីពន្លឺថ្ងៃបន្ថែមរហូតដល់ជាសះស្បើយ"
    ],
    whatToDoEn: [
      "Apply cool compresses or pure aloe vera gel",
      "Drink extra fluids to replenish systemic hydration",
      "Shield affected skin from further sun exposure with protective long sleeves"
    ],
    dontDoKm: [
      "❌ កុំចាក់បំបែកពងទឹកដែលកើតលើស្បែក",
      "❌ កុំលាបថ្នាំដុសធ្មេញ ឬប្រេងកូឡាលើមុខរបួសរលាកថ្ងៃ"
    ],
    dontDoEn: [
      "❌ Do not pop or peel sun blisters",
      "❌ Do not smear menthol balms or toothpaste onto sunburned skin"
    ]
  }
];
