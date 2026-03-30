import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const regions = {
  CBD: [
    "Melbourne CBD",
    "Carlton",
    "Parkville",
    "North Melbourne",
    "West Melbourne",
    "Docklands",
    "Southbank",
    "East Melbourne",
    "Carlton North",
    "South Melbourne",
  ],
  North: [
    "Brunswick",
    "Brunswick East",
    "Brunswick West",
    "Coburg",
    "Coburg North",
    "Pascoe Vale",
    "Pascoe Vale South",
    "Glenroy",
    "Fawkner",
    "Hadfield",
    "Reservoir",
    "Preston",
    "Thornbury",
    "Northcote",
    "Fairfield",
    "Alphington",
    "Ivanhoe",
    "Heidelberg",
    "Heidelberg West",
    "Heidelberg Heights",
    "Rosanna",
    "Macleod",
    "Watsonia",
    "Bundoora",
    "Greensborough",
    "Diamond Creek",
    "Eltham",
    "Mill Park",
    "Epping",
    "Lalor",
    "Thomastown",
    "Keon Park",
    "Kingsbury",
    "Bellfield",
    "Yallambie",
    "Viewbank",
    "Montmorency",
    "Lower Plenty",
    "Research",
    "St Helena",
  ],
  East: [
    "Richmond",
    "Fitzroy",
    "Collingwood",
    "Hawthorn",
    "Hawthorn East",
    "Camberwell",
    "Kew",
    "Kew East",
    "Balwyn",
    "Balwyn North",
    "Doncaster",
    "Doncaster East",
    "Templestowe",
    "Templestowe Lower",
    "Box Hill",
    "Box Hill North",
    "Box Hill South",
    "Blackburn",
    "Blackburn North",
    "Blackburn South",
    "Nunawading",
    "Mitcham",
    "Vermont",
    "Vermont South",
    "Wantirna",
    "Wantirna South",
    "Ringwood",
    "Ringwood East",
    "Croydon",
    "Croydon Hills",
    "Croydon North",
    "Mooroolbark",
    "Lilydale",
    "Montrose",
    "Kilsyth",
    "Kilsyth South",
    "Bayswater",
    "Bayswater North",
    "Boronia",
    "Ferntree Gully",
    "Belgrave",
    "Belgrave South",
    "Upwey",
    "Tecoma",
    "Sassafras",
    "Olinda",
    "Mount Evelyn",
    "Healesville",
    "Warranwood",
    "Knox",
  ],
  "South East": [
    "South Yarra",
    "Prahran",
    "Windsor",
    "Toorak",
    "Armadale",
    "Malvern",
    "Malvern East",
    "Caulfield",
    "Caulfield North",
    "Caulfield South",
    "Carnegie",
    "Murrumbeena",
    "Oakleigh",
    "Oakleigh East",
    "Oakleigh South",
    "Clayton",
    "Chadstone",
    "Glen Waverley",
    "Mount Waverley",
    "Wheelers Hill",
    "Mulgrave",
    "Springvale",
    "Springvale South",
    "Noble Park",
    "Dandenong",
    "Keysborough",
    "Rowville",
    "Scoresby",
    "Notting Hill",
    "Burwood",
    "Burwood East",
    "Ashburton",
    "Ashwood",
    "Hughesdale",
    "Bentleigh",
    "Bentleigh East",
    "Moorabbin",
    "Mentone",
    "Chelsea",
    "Clarinda",
  ],
  South: [
    "St Kilda",
    "St Kilda East",
    "Elsternwick",
    "Brighton",
    "Brighton East",
    "Sandringham",
    "Hampton",
    "Hampton East",
    "Black Rock",
    "Beaumaris",
    "Cheltenham",
    "Parkdale",
    "Mordialloc",
    "Aspendale",
    "Edithvale",
    "Bonbeach",
    "Carrum",
    "Frankston",
    "Frankston South",
    "Seaford",
    "Mornington",
    "Mount Eliza",
    "Mount Martha",
    "Rosebud",
    "Dromana",
    "Safety Beach",
    "Sorrento",
    "Rye",
    "Blairgowrie",
    "McCrae",
    "Carrum Downs",
    "Langwarrin",
    "Somerville",
    "Tyabb",
    "Baxter",
    "Skye",
    "Cranbourne",
    "Cranbourne East",
    "Cranbourne North",
    "Cranbourne West",
  ],
  West: [
    "Footscray",
    "Maribyrnong",
    "Yarraville",
    "Seddon",
    "Kingsville",
    "Spotswood",
    "Newport",
    "Williamstown",
    "Altona",
    "Altona North",
    "Seaholme",
    "Brooklyn",
    "Sunshine",
    "Sunshine West",
    "Sunshine North",
    "St Albans",
    "Keilor",
    "Keilor East",
    "Kealba",
    "Taylors Lakes",
    "Sydenham",
    "Caroline Springs",
    "Deer Park",
    "Ardeer",
    "Laverton",
    "Altona Meadows",
    "Point Cook",
    "Hoppers Crossing",
    "Werribee",
    "Tarneit",
    "Truganina",
    "Manor Lakes",
    "Wyndham Vale",
    "Melton",
    "Melton South",
    "Rockbank",
    "Beechworth",
    "Essendon",
    "Moonee Ponds",
    "Ascot Vale",
  ],
  Geelong: [
    "Geelong",
    "Geelong West",
    "Newtown",
    "Belmont",
    "Highton",
    "Grovedale",
    "Waurn Ponds",
    "Torquay",
    "Ocean Grove",
    "Barwon Heads",
    "Lara",
    "Corio",
    "Norlane",
    "Leopold",
    "Drysdale",
    "St Leonards",
    "Portarlington",
    "Marshall",
    "Armstrong Creek",
    "North Geelong",
  ],
  Regional: [
    "Ballarat",
    "Ballarat East",
    "Ballarat North",
    "Lake Wendouree",
    "Wendouree",
    "Bendigo",
    "Golden Square",
    "Kangaroo Flat",
    "Strathdale",
    "Epsom",
    "Flora Hill",
    "Shepparton",
    "Mooroopna",
    "Echuca",
    "Mildura",
    "Wodonga",
    "Wangaratta",
    "Albury",
    "Traralgon",
    "Morwell",
    "Sale",
    "Bairnsdale",
    "Warragul",
    "Drouin",
    "Moe",
    "Warrnambool",
    "Portland",
    "Hamilton",
    "Benalla",
    "Castlemaine",
    "Kyneton",
    "Daylesford",
    "Horsham",
    "Swan Hill",
    "Colac",
    "Leongatha",
    "Phillip Island",
    "Ararat",
    "Seymour",
    "Kyabram",
    "Mansfield",
    "Maffra",
    "Rochester",
    "Kerang",
    "Cobram",
    "Numurkah",
    "Euroa",
    "Tatura",
    "Stawell",
    "Maryborough",
    "Bacchus Marsh",
    "Camperdown",
    "Inverloch",
    "Yarrawonga",
    "Myrtleford",
    "Bright",
    "Lakes Entrance",
    "Bairnsdale North",
    "Woodend",
    "Berwick",
  ],
};

const postcodeOverrides = {
  "Melbourne CBD": "3000",
  Richmond: "3121",
  Fitzroy: "3065",
  Collingwood: "3066",
  "St Kilda": "3182",
  "South Yarra": "3141",
  Prahran: "3181",
  Windsor: "3181",
  Toorak: "3142",
  Hawthorn: "3122",
  Camberwell: "3124",
  Doncaster: "3108",
  "Box Hill": "3128",
  Ringwood: "3134",
  Croydon: "3136",
  Lilydale: "3140",
  Boronia: "3155",
  "Ferntree Gully": "3156",
  Knox: "3152",
  Rowville: "3178",
  Dandenong: "3175",
  Frankston: "3199",
  Mornington: "3931",
  Chelsea: "3196",
  Mentone: "3194",
  Moorabbin: "3189",
  Brighton: "3186",
  Sandringham: "3191",
  Bentleigh: "3204",
  Clayton: "3168",
  Chadstone: "3148",
  "Glen Waverley": "3150",
  "Mount Waverley": "3149",
  Oakleigh: "3166",
  Malvern: "3144",
  Armadale: "3143",
  Elsternwick: "3185",
  Carnegie: "3163",
  Caulfield: "3162",
  "St Kilda East": "3183",
  Northcote: "3070",
  Thornbury: "3071",
  Preston: "3072",
  Reservoir: "3073",
  Bundoora: "3083",
  Greensborough: "3088",
  Eltham: "3095",
  "Diamond Creek": "3089",
  Heidelberg: "3084",
  Ivanhoe: "3079",
  Kew: "3101",
  Balwyn: "3103",
  Templestowe: "3106",
  Nunawading: "3131",
  Mitcham: "3132",
  Vermont: "3133",
  Wantirna: "3152",
  Bayswater: "3153",
  Belgrave: "3160",
  Mooroolbark: "3138",
  Healesville: "3777",
  Werribee: "3030",
  "Hoppers Crossing": "3029",
  "Point Cook": "3030",
  Altona: "3018",
  Williamstown: "3016",
  Newport: "3015",
  Footscray: "3011",
  Maribyrnong: "3032",
  Sunshine: "3020",
  "St Albans": "3021",
  Keilor: "3036",
  Essendon: "3040",
  "Moonee Ponds": "3039",
  Coburg: "3058",
  Brunswick: "3056",
  Carlton: "3053",
  Parkville: "3052",
  "North Melbourne": "3051",
  "West Melbourne": "3003",
  Geelong: "3220",
  Ballarat: "3350",
  Bendigo: "3550",
  Shepparton: "3630",
  Wodonga: "3690",
  Warrnambool: "3280",
  Traralgon: "3844",
  Berwick: "3806",
};

const regionBaseRent = {
  CBD: 700,
  North: 580,
  East: 620,
  "South East": 610,
  South: 650,
  West: 520,
  Geelong: 500,
  Regional: 430,
};

const suburbRecords = [];
const allNames = [];
Object.entries(regions).forEach(([region, suburbs]) => {
  suburbs.forEach((name) => {
    if (!allNames.includes(name)) {
      allNames.push(name);
      suburbRecords.push({ name, region });
    }
  });
});

if (suburbRecords.length !== 300) {
  throw new Error(`Expected 300 suburbs, found ${suburbRecords.length}`);
}

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const descriptions = {
  CBD: "{name} gives renters fast access to the CBD, major tram and train links, and a dense mix of apartments and lifestyle amenities. It is a strong option for professionals and students seeking convenience in Victoria's most connected precincts.",
  North:
    "{name} appeals to renters looking for established neighbourhoods, cafes, parks, and dependable public transport into Melbourne. The suburb offers a balanced rental market with apartments, units, and family homes across Victoria's inner and middle north.",
  East:
    "{name} is popular with renters who want leafy streets, good schools, and strong transport connections across Melbourne's east. Weekly rents reflect the suburb's mix of established homes, convenient shopping hubs, and access to employment centres.",
  "South East":
    "{name} attracts renters with its mix of apartments, townhouses, and family homes near major shopping, education, and business precincts. It remains one of Melbourne's most active rental corridors for tenants comparing value and convenience in Victoria.",
  South:
    "{name} offers renters a coastal or bayside lifestyle with strong local amenity, village shopping strips, and access to beaches and commuter routes. Demand stays steady thanks to its lifestyle appeal and range of rental property types in southern Melbourne.",
  West:
    "{name} is a practical choice for renters seeking value, rail access, and growing amenity across Melbourne's west. The suburb continues to attract tenants who want more space, newer developments, or straightforward commutes to the CBD and industrial hubs.",
  Geelong:
    "{name} gives renters access to Geelong's employment, education, and waterfront lifestyle while staying connected to greater Victoria. The local rental market includes apartments, units, and family homes suited to both city commuters and regional tenants.",
  Regional:
    "{name} provides renters with a regional Victorian alternative to Melbourne, often with more space and competitive weekly rents. Local demand is supported by hospitals, schools, retail, and transport links that keep the suburb attractive for long-term leasing.",
};

const suburbs = suburbRecords.map((record, index) => {
  const withinRegion = regions[record.region];
  const position = withinRegion.indexOf(record.name);
  const nearbySuburbs = withinRegion
    .filter((_, suburbIndex) => Math.abs(suburbIndex - position) > 0 && Math.abs(suburbIndex - position) <= 2)
    .slice(0, 4);
  const base = regionBaseRent[record.region] + (index % 7) * 10;
  const postcode = postcodeOverrides[record.name] ?? String(3000 + index).slice(0, 4);

  return {
    name: record.name,
    slug: slugify(record.name),
    postcode,
    region: record.region,
    medianRent: {
      "1br": base,
      "2br": base + 140,
      "3br": base + 280,
    },
    transportScore: Math.min(95, 58 + (index % 20) + (record.region === "CBD" ? 20 : 0) + (record.region === "Regional" ? -8 : 0)),
    walkability: Math.min(96, 54 + ((index * 3) % 22) + (["CBD", "North", "South"].includes(record.region) ? 12 : 0)),
    description: descriptions[record.region].replace("{name}", record.name),
    nearbySuburbs,
  };
});

const listingWeights = [
  ["Richmond", 14],
  ["Fitzroy", 12],
  ["Collingwood", 10],
  ["St Kilda", 12],
  ["South Yarra", 12],
  ["Prahran", 10],
  ["Doncaster", 8],
  ["Box Hill", 8],
  ["Ringwood", 6],
  ["Knox", 5],
  ["Footscray", 8],
  ["Sunshine", 7],
  ["Werribee", 7],
  ["Dandenong", 8],
  ["Frankston", 7],
  ["Berwick", 6],
  ["Preston", 8],
  ["Thornbury", 7],
  ["Reservoir", 7],
  ["Geelong", 7],
  ["Melbourne CBD", 10],
  ["Brunswick", 7],
  ["Carlton", 6],
  ["Northcote", 6],
  ["Windsor", 5],
  ["Toorak", 4],
  ["Hawthorn", 5],
  ["Camberwell", 4],
  ["Clayton", 5],
  ["Glen Waverley", 5],
  ["Oakleigh", 4],
  ["Bentleigh", 4],
  ["Moorabbin", 4],
  ["Chelsea", 4],
  ["Mentone", 4],
  ["Point Cook", 5],
  ["Hoppers Crossing", 4],
  ["Williamstown", 3],
  ["Newport", 3],
  ["Essendon", 4],
  ["Moonee Ponds", 4],
  ["Coburg", 4],
  ["Heidelberg", 3],
  ["Bundoora", 3],
  ["Eltham", 3],
  ["Mornington", 4],
  ["Ballarat", 3],
  ["Bendigo", 3],
  ["Warrnambool", 2],
  ["Traralgon", 2],
  ["South Melbourne", 5],
  ["Docklands", 4],
];

const weightedSuburbs = listingWeights.flatMap(([name, weight]) =>
  Array.from({ length: weight }, () => suburbs.find((suburb) => suburb.name === name)).filter(Boolean),
);

const imageUrls = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
];

const streetNames = [
  "Bridge Rd",
  "Swan St",
  "Church St",
  "Victoria St",
  "Smith St",
  "Brunswick St",
  "Gertrude St",
  "Chapel St",
  "Toorak Rd",
  "Commercial Rd",
  "High St",
  "Plenty Rd",
  "Lygon St",
  "Glenferrie Rd",
  "Burke Rd",
  "Whitehorse Rd",
  "Station St",
  "Maroondah Hwy",
  "Canterbury Rd",
  "Stud Rd",
  "Princes Hwy",
  "Nepean Hwy",
  "Bay St",
  "Barkly St",
  "Paisley St",
  "Hoddle St",
  "La Trobe St",
  "Collins St",
  "Flinders Lane",
  "Clarendon St",
  "Beach Rd",
  "Malop St",
  "Pakington St",
  "Moorabool St",
  "Yarra St",
  "Humphries Rd",
  "Keilor Rd",
  "Mt Alexander Rd",
  "Buckley St",
  "Napier St",
];

const agentFirstNames = [
  "Olivia",
  "Jack",
  "Amelia",
  "Noah",
  "Mia",
  "Harry",
  "Sophie",
  "William",
  "Grace",
  "Ethan",
  "Chloe",
  "Luca",
  "Ruby",
  "Thomas",
  "Zoe",
  "Archie",
  "Ava",
  "Leo",
  "Charlotte",
  "Hudson",
];

const agentLastNames = [
  "Nguyen",
  "Patel",
  "Anderson",
  "Clarke",
  "O'Brien",
  "Murphy",
  "Singh",
  "Brown",
  "Taylor",
  "Wilson",
  "Henderson",
  "Campbell",
  "Evans",
  "Foster",
  "Morgan",
  "Reid",
  "Bennett",
  "Hughes",
  "Walker",
  "Miller",
];

const featurePool = [
  "Floorboards",
  "Gas cooking",
  "Built-in robes",
  "Balcony",
  "Pets considered",
  "Dishwasher",
  "Split-system heating",
  "Secure entry",
  "Stone benchtops",
  "Courtyard",
  "Car space",
  "European laundry",
  "Study nook",
  "Ceiling fans",
  "Storage cage",
  "Ensuite",
  "Garden shed",
  "Tram access nearby",
  "Walk to shops",
  "Freshly painted",
];

const titleTemplates = {
  apartment: ["Modern", "Light-filled", "Stylish", "Contemporary", "City-edge"],
  house: ["Spacious", "Charming", "Renovated", "Family-sized", "Elegant"],
  unit: ["Well-kept", "Sunny", "Neat", "Updated", "Private"],
  townhouse: ["Designer", "Contemporary", "Low-maintenance", "Split-level", "Executive"],
  studio: ["Smart", "Compact", "Updated", "Inner-city", "Easy-care"],
};

function pickListingShape(suburb, index) {
  const region = suburb.region;
  const innerHotspots = ["Richmond", "Fitzroy", "Collingwood", "St Kilda", "South Yarra", "Prahran", "Melbourne CBD"];
  if (innerHotspots.includes(suburb.name)) {
    return index % 6 === 0
      ? { type: "house", bedrooms: 3 }
      : index % 5 === 0
        ? { type: "studio", bedrooms: 1 }
        : index % 2 === 0
          ? { type: "apartment", bedrooms: 2 }
          : { type: "apartment", bedrooms: 1 };
  }
  if (["CBD", "South"].includes(region)) {
    return index % 5 === 0 ? { type: "house", bedrooms: 3 } : { type: "apartment", bedrooms: index % 2 === 0 ? 2 : 1 };
  }
  if (["East", "South East", "North"].includes(region)) {
    return index % 4 === 0
      ? { type: "house", bedrooms: 3 + (index % 2) }
      : index % 3 === 0
        ? { type: "townhouse", bedrooms: 3 }
        : { type: "unit", bedrooms: 2 };
  }
  if (region === "West") {
    return index % 4 === 0 ? { type: "house", bedrooms: 3 } : index % 3 === 0 ? { type: "townhouse", bedrooms: 3 } : { type: "unit", bedrooms: 2 };
  }
  return index % 4 === 0 ? { type: "house", bedrooms: 3 } : { type: "unit", bedrooms: 2 };
}

function calculatePrice(suburb, type, bedrooms, index) {
  const region = suburb.region;
  const base1 = suburb.medianRent["1br"];
  const base2 = suburb.medianRent["2br"];
  const base3 = suburb.medianRent["3br"];

  if (type === "studio") return Math.max(380, Math.min(550, base1 - 50 + (index % 5) * 20));
  if (type === "apartment" && bedrooms === 1) return Math.max(380, Math.min(620, base1 - 20 + (index % 6) * 18));
  if (bedrooms === 2) {
    const candidate = region === "CBD" || ["North", "South", "South East", "East"].includes(region) ? base2 - 40 + (index % 7) * 22 : base2 - 110 + (index % 7) * 20;
    return Math.max(region === "West" || region === "Regional" || region === "Geelong" ? 350 : 450, Math.min(region === "West" || region === "Regional" || region === "Geelong" ? 550 : 750, candidate));
  }
  if (type === "house") {
    const candidate = (region === "CBD" || ["North", "South", "South East", "East"].includes(region) ? base3 + 40 : base3 - 120) + (index % 6) * 35;
    return Math.max(region === "West" || region === "Regional" || region === "Geelong" ? 350 : 600, Math.min(region === "West" || region === "Regional" || region === "Geelong" ? 600 : 1200, candidate));
  }
  const fallback = base3 - 80 + (index % 5) * 24;
  return Math.max(280, Math.min(720, fallback));
}

function buildDescription(suburb, type, bedrooms, features) {
  const homeLabel = type === "studio" ? "studio" : `${bedrooms} bedroom ${type}`;
  return `This ${homeLabel} in ${suburb.name} offers a well-zoned layout, updated finishes, and convenient access to local transport, cafes, and shopping. Designed for Melbourne and Victorian renters who want practical liveability, it includes ${features.slice(0, 2).join(" and ").toLowerCase()} with a move-in ready presentation.`;
}

const listings = Array.from({ length: 250 }, (_, index) => {
  const suburb = weightedSuburbs[(index * 17) % weightedSuburbs.length];
  const { type, bedrooms } = pickListingShape(suburb, index);
  const price = calculatePrice(suburb, type, bedrooms, index);
  const bathrooms = bedrooms >= 4 ? 3 : bedrooms >= 3 || type === "townhouse" ? 2 : 1;
  const parking = ["Melbourne CBD", "Fitzroy", "Collingwood", "Carlton"].includes(suburb.name) && type !== "house" ? (index % 3 === 0 ? 1 : 0) : bedrooms >= 3 ? 2 : 1;
  const available = new Date(Date.UTC(2026, 3 + (index % 3), 1 + ((index * 3) % 27))).toISOString().slice(0, 10);
  const streetNumber = 3 + ((index * 7) % 96);
  const street = streetNames[index % streetNames.length];
  const address = `${streetNumber} ${street}`;
  const adjectives = titleTemplates[type];
  const title =
    type === "studio"
      ? `${adjectives[index % adjectives.length]} Studio in ${suburb.name}`
      : `${adjectives[index % adjectives.length]} ${bedrooms}BR ${type.charAt(0).toUpperCase() + type.slice(1)} in ${suburb.name}`;
  const featureStart = index % featurePool.length;
  const features = Array.from({ length: 5 }, (_, featureIndex) => featurePool[(featureStart + featureIndex) % featurePool.length]);
  const agentFirst = agentFirstNames[index % agentFirstNames.length];
  const agentLast = agentLastNames[(index * 3) % agentLastNames.length];
  const agentName = `${agentFirst} ${agentLast}`;
  const agentPhone = `04${String(10 + (index % 90)).padStart(2, "0")} ${String(100 + ((index * 13) % 900)).padStart(3, "0")} ${String(100 + ((index * 17) % 900)).padStart(3, "0")}`;
  const emailLocal = `${agentFirst}.${agentLast}`.toLowerCase().replace(/[^a-z.]/g, "");
  const domains = ["leasingmelb.com.au", "citynest.com.au", "homelane.com.au", "rentalcollective.com.au"];
  const id = `vic-${String(index + 1).padStart(3, "0")}`;

  return {
    id,
    slug: `${slugify(title)}-${id}`,
    title,
    suburb: suburb.name,
    address,
    price,
    bedrooms,
    bathrooms,
    parking,
    type,
    available,
    description: buildDescription(suburb, type, bedrooms, features),
    features,
    imageUrl: imageUrls[index % imageUrls.length],
    agentName,
    agentPhone,
    agentEmail: `${emailLocal}@${domains[index % domains.length]}`,
    isPrivateLandlord: index % 10 < 3,
    featured: index % 10 === 0,
  };
});

const guideTopics = [
  ["Renting in Melbourne for first-time renters", "Getting Started"],
  ["How much rent can you afford in Victoria?", "Budgeting"],
  ["Understanding bond, advance rent, and moving costs", "Budgeting"],
  ["Suburb checklist for Melbourne apartment hunters", "Suburb Research"],
  ["Questions to ask at a rental inspection", "Inspections"],
  ["How to compare rental value between suburbs", "Suburb Research"],
  ["What documents renters need before applying", "Applications"],
  ["How to improve your rental application", "Applications"],
  ["Private landlord vs agency rentals in Victoria", "Applications"],
  ["Best inner-city suburbs for renters who commute", "Suburb Research"],
  ["Best family-friendly rental suburbs in the east", "Suburb Research"],
  ["Affordable rental suburbs in Melbourne's west", "Suburb Research"],
  ["What to expect from a Victorian lease agreement", "Tenancy"],
  ["Condition reports explained for Victorian tenants", "Tenancy"],
  ["Rent increase rules in Victoria", "Tenancy"],
  ["What to do if a rental listing looks overpriced", "Pricing"],
  ["How to inspect a unit for hidden maintenance issues", "Inspections"],
  ["Choosing between an apartment, unit, and townhouse", "Property Types"],
  ["How transport access changes rental value", "Pricing"],
  ["What renters should know about pet applications", "Applications"],
  ["How to budget for utilities in a Melbourne rental", "Budgeting"],
  ["Best renter tools for comparing weekly costs", "Budgeting"],
  ["How to shortlist suburbs by lifestyle and price", "Suburb Research"],
  ["What makes South Yarra rents higher than average", "Pricing"],
  ["What makes Brunswick popular with renters", "Suburb Research"],
  ["How to read a rental listing before you enquire", "Listings"],
  ["What counts as urgent repairs in Victoria", "Tenancy"],
  ["How to negotiate a lease start date", "Applications"],
  ["End of lease cleaning expectations for tenants", "Tenancy"],
  ["How to decide between bayside and inner north rentals", "Suburb Research"],
  ["Rental application mistakes to avoid", "Applications"],
  ["How to compare listings by effective weekly cost", "Pricing"],
  ["Living near a train line: trade-offs for renters", "Lifestyle"],
  ["How students can find rentals near universities", "Lifestyle"],
  ["Is furnished or unfurnished better for your budget?", "Budgeting"],
  ["How to find rentals with parking in inner Melbourne", "Listings"],
  ["What to inspect in older Victorian homes", "Inspections"],
  ["How to find pet-friendly apartments in Melbourne", "Listings"],
  ["Checklist for moving into a new rental", "Moving"],
  ["How to calculate total upfront moving costs", "Budgeting"],
  ["Why median rent matters when comparing suburbs", "Pricing"],
  ["How to track new rentals in your target suburb", "Search"],
  ["How to prepare for Saturday inspection runs", "Inspections"],
  ["When to choose regional Victoria over Melbourne", "Regional"],
  ["Best suburbs for beachside renters on a budget", "Suburb Research"],
  ["Best suburbs for renters who work from home", "Lifestyle"],
  ["How school zones affect rental demand", "Pricing"],
  ["What renters should ask about internet and mobile coverage", "Listings"],
  ["Guide to townhouse rentals in Melbourne's growth areas", "Property Types"],
  ["How to evaluate storage space before you apply", "Inspections"],
  ["Guide to renting in Geelong", "Regional"],
  ["Guide to renting in Ballarat", "Regional"],
  ["Guide to renting in Bendigo", "Regional"],
  ["How to compare walkability between suburbs", "Suburb Research"],
  ["How to shortlist a suburb in one afternoon", "Suburb Research"],
  ["Pros and cons of renting in Melbourne CBD", "Suburb Research"],
  ["How to estimate commute costs by suburb", "Budgeting"],
  ["What makes a listing enquiry stand out", "Applications"],
  ["How to evaluate value in fast-moving rental markets", "Pricing"],
  ["Guide to regional rental inspections in Victoria", "Regional"],
];

const guides = guideTopics.map(([title, category], index) => {
  const slug = slugify(title);
  const datePublished = new Date(Date.UTC(2026, 0, 3 + index)).toISOString().slice(0, 10);
  return {
    title,
    slug,
    excerpt: `${title} with practical Victorian rental advice, suburb context, and budget tips for tenants comparing listings in Melbourne and regional Victoria.`,
    category,
    datePublished,
  };
});

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });
ensureDir(path.join(root, "data"));
ensureDir(path.join(root, "content", "guides"));

const banner = `/* eslint-disable */\n// This file is generated by scripts/generate-data.mjs\n`;
fs.writeFileSync(
  path.join(root, "data", "suburbs.ts"),
  `${banner}
export type Suburb = {
  name: string;
  slug: string;
  postcode: string;
  region: string;
  medianRent: { "1br": number; "2br": number; "3br": number };
  transportScore: number;
  walkability: number;
  description: string;
  nearbySuburbs: string[];
};

export const suburbs: Suburb[] = ${JSON.stringify(suburbs, null, 2)} as Suburb[];
`
);

fs.writeFileSync(
  path.join(root, "data", "listings.ts"),
  `${banner}
export type Listing = {
  id: string;
  slug: string;
  title: string;
  suburb: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  type: "apartment" | "house" | "unit" | "townhouse" | "studio";
  available: string;
  description: string;
  features: string[];
  imageUrl: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  isPrivateLandlord: boolean;
  featured: boolean;
};

export const listings: Listing[] = ${JSON.stringify(listings, null, 2)} as Listing[];
`
);

fs.writeFileSync(
  path.join(root, "data", "guides.ts"),
  `${banner}
export type GuideStub = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  datePublished: string;
};

export const guides: GuideStub[] = ${JSON.stringify(guides, null, 2)} as GuideStub[];
`
);

const guideContentMap = {};
guides.forEach((guide, index) => {
  const content = `---
title: "${guide.title.replace(/"/g, '\\"')}"
slug: "${guide.slug}"
excerpt: "${guide.excerpt.replace(/"/g, '\\"')}"
category: "${guide.category}"
datePublished: "${guide.datePublished}"
author: "RentVic Editorial Team"
faq:
  - question: "How can this guide help Victorian renters?"
    answer: "It gives practical steps, suburb context, and pricing guidance renters can use before applying for a property."
  - question: "Are the examples specific to Melbourne and Victoria?"
    answer: "Yes. Each article is written for renters comparing suburbs, lease costs, and inspection decisions across Victoria."
  - question: "Can I use RentVic tools alongside this guide?"
    answer: "Yes. Pair the article with our affordability, bond, and suburb comparison tools to turn advice into decisions."
---

## Why this matters

${guide.title} is most useful when the market moves quickly and renters need a repeatable way to compare options. This guide focuses on Victoria-specific decisions so you can move from browsing to inspection-ready planning faster.

## What to check first

- Confirm your weekly budget before you start shortlisting listings.
- Compare asking rent with suburb medians to spot outliers.
- Review commute, lifestyle, and application requirements early.

## Practical renter strategy

When you are weighing several suburbs, treat transport, walkability, and total move-in cost as one package rather than separate factors. A property can look cheaper on paper but cost more once commute time, parking, bond, and setup expenses are included.

### Build a short list

Pick two or three suburbs that match your budget, your preferred property type, and your likely move-in date. This keeps inspection runs realistic and reduces the chance of applying for homes that are not a strong fit.

### Compare value, not just price

Use the suburb median as your benchmark. If a listing is above the median, check whether the extra cost is justified by size, parking, condition, or a better location near trains, shops, or schools.

### Move quickly once the numbers work

Have documents ready before the inspection. In fast-moving rental pockets, the strongest applications are often the ones that combine a fair budget, complete paperwork, and a clear move-in timeline.

## Victoria renter takeaway

The best rental decisions come from comparing lifestyle fit with weekly affordability. Use RentVic data and tools to narrow your search, benchmark pricing, and focus your applications on suburbs that make sense for your budget.
`;
  guideContentMap[guide.slug] = {
    ...guide,
    author: "RentVic Editorial Team",
    faq: [
      {
        question: "How can this guide help Victorian renters?",
        answer: "It gives practical steps, suburb context, and pricing guidance renters can use before applying for a property.",
      },
      {
        question: "Are the examples specific to Melbourne and Victoria?",
        answer: "Yes. Each article is written for renters comparing suburbs, lease costs, and inspection decisions across Victoria.",
      },
      {
        question: "Can I use RentVic tools alongside this guide?",
        answer: "Yes. Pair the article with our affordability, bond, and suburb comparison tools to turn advice into decisions.",
      },
    ],
    content,
  };
  fs.writeFileSync(path.join(root, "content", "guides", `${guide.slug}.md`), content);
});

fs.writeFileSync(
  path.join(root, "data", "guide-content.ts"),
  `${banner}
export type GuideContent = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  datePublished: string;
  author: string;
  faq: { question: string; answer: string }[];
  content: string;
};

export const guideContent: Record<string, GuideContent> = ${JSON.stringify(guideContentMap, null, 2)} as Record<string, GuideContent>;
`
);

console.log(`Generated ${suburbs.length} suburbs, ${listings.length} listings, and ${guides.length} guides.`);
