import{ useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/Profile.css";
import { useNavigate } from 'react-router-dom';


const Profile = () => {

// State hooks
const [FullName, setFullName] = useState("");
const [ProfileName, setProfileName] = useState("");
const [Email, setEmail] = useState("");
const [Phone, setPhone] = useState("");
const [DOB, setDOB] = useState("");
const [Gender, setGender] = useState("");
const [Language, setLanguage] = useState("");
const [CarType, setCarType] = useState("");
const [idtype, setIdtype] = useState("");
const [idnumber, setIdnumber] = useState("");
const [license, setLicense] = useState("");
const [licenseED, setLicenseED] = useState("");
const [About, setAbout] = useState("");
const [file, setFile] = useState(null); 
const [selectedCountry, setSelectedCountry] = useState("");
const [selectedCity, setSelectedCity] = useState("");
const navigate = useNavigate(); 



    //Gender
    const gender =[
        {option: "Male"},
        {option: "Female"}
    ]

    //Languages
    const languages = [
        { option: "English" },
        { option: "Spanish" },
        { option: "Mandarin Chinese" },
        { option: "Hindi" },
        { option: "Arabic" },
        { option: "Bengali" },
        { option: "Portuguese" },
        { option: "Russian" },
        { option: "Japanese" },
        { option: "Punjabi" },
        { option: "German" },
        { option: "Javanese" },
        { option: "Korean" },
        { option: "French" },
        { option: "Telugu" },
        { option: "Vietnamese" },
        { option: "Marathi" },
        { option: "Turkish" },
        { option: "Tamil" },
        { option: "Italian" },
        { option: "Urdu" },
        { option: "Dutch" },
        { option: "Swahili" },
        { option: "Malay" },
        { option: "Thai" },
        { option: "Gujarati" },
        { option: "Polish" },
        { option: "Ukrainian" },
        { option: "Persian" },
        { option: "Romanian" },
        { option: "Hausa" },
        { option: "Burmese" },
        { option: "Amharic" },
        { option: "Yoruba" },
        { option: "Farsi" },
        { option: "Serbian" },
        { option: "Czech" },
        { option: "Greek" },
        { option: "Malayalam" },
        { option: "Odia" },
        { option: "Igbo" },
        { option: "Hebrew" },
        { option: "Nepali" },
        { option: "Pashto" },
        { option: "Tagalog" },
        { option: "Hungarian" },
        { option: "Sindhi" },
        { option: "Zulu" },
        { option: "Kazakh" },
        { option: "Kannada" },
        { option: "Danish" },
        { option: "Finnish" },
        { option: "Slovak" },
        { option: "Croatian" },
        { option: "Bulgarian" },
        { option: "Latvian" },
        { option: "Lithuanian" },
        { option: "Slovenian" },
        { option: "Norwegian" },
        { option: "Mongolian" },
        { option: "Bosnian" },
        { option: "Albanian" },
        { option: "Macedonian" },
        { option: "Estonian" },
        { option: "Icelandic" },
        { option: "Georgian" },
        { option: "Armenian" },
        { option: "Khmer" },
        { option: "Lao" },
        { option: "Somali" },
        { option: "Sinhala" },
        { option: "Tajik" },
        { option: "Turkmen" },
        { option: "Uzbek" },
        { option: "Kurdish" },
        { option: "Tigrinya" },
        { option: "Balochi" },
        { option: "Kinyarwanda" },
        { option: "Chichewa" },
        { option: "Maori" },
        { option: "Haitian Creole" },
        { option: "Xhosa" },
        { option: "Setswana" },
        { option: "Afrikaans" },
        { option: "Navajo" },
        { option: "Quechua" },
        { option: "Fijian" },
        { option: "Tongan" },
        { option: "Samoan" },
        { option: "Aymara" }
    ];

    //Car Type
  const cartype = [
    { type: 'Sedan' },
    { type: 'SUV' },
    { type: 'Hatchback' },
    { type: 'Coupe' },
    { type: 'Convertible' },
    { type: 'Wagon' },
    { type: 'Pickup Truck' },
    { type: 'Van' },
    { type: 'Crossover' },
    { type: 'Sports Car' },
    { type: 'Luxury Car' },
    { type: 'Electric Car' },
    { type: 'Hybrid Car' },
    { type: 'Minivan' },
    { type: 'Roadster' },
    { type: 'Muscle Car' },
    { type: '4x4' },
    { type: 'Off-road Vehicle' }
];

    //country
    const country = [
        { name: "Afghanistan" },
        { name: "Albania" },
        { name: "Algeria" },
        { name: "Andorra" },
        { name: "Angola" },
        { name: "Antigua and Barbuda" },
        { name: "Argentina" },
        { name: "Armenia" },
        { name: "Australia" },
        { name: "Austria" },
        { name: "Azerbaijan" },
        { name: "Bahamas" },
        { name: "Bahrain" },
        { name: "Bangladesh" },
        { name: "Barbados" },
        { name: "Belarus" },
        { name: "Belgium" },
        { name: "Belize" },
        { name: "Benin" },
        { name: "Bhutan" },
        { name: "Bolivia" },
        { name: "Bosnia and Herzegovina" },
        { name: "Botswana" },
        { name: "Brazil" },
        { name: "Brunei" },
        { name: "Bulgaria" },
        { name: "Burkina Faso" },
        { name: "Burundi" },
        { name: "Cambodia" },
        { name: "Cameroon" },
        { name: "Canada" },
        { name: "Cape Verde" },
        { name: "Central African Republic" },
        { name: "Chad" },
        { name: "Chile" },
        { name: "China" },
        { name: "Colombia" },
        { name: "Comoros" },
        { name: "Congo (Brazzaville)" },
        { name: "Congo (Kinshasa)" },
        { name: "Costa Rica" },
        { name: "Croatia" },
        { name: "Cuba" },
        { name: "Cyprus" },
        { name: "Czech Republic" },
        { name: "Denmark" },
        { name: "Djibouti" },
        { name: "Dominica" },
        { name: "Dominican Republic" },
        { name: "Ecuador" },
        { name: "Egypt" },
        { name: "El Salvador" },
        { name: "Equatorial Guinea" },
        { name: "Eritrea" },
        { name: "Estonia" },
        { name: "Eswatini" },
        { name: "Ethiopia" },
        { name: "Fiji" },
        { name: "Finland" },
        { name: "France" },
        { name: "Gabon" },
        { name: "Gambia" },
        { name: "Georgia" },
        { name: "Germany" },
        { name: "Ghana" },
        { name: "Greece" },
        { name: "Grenada" },
        { name: "Guatemala" },
        { name: "Guinea" },
        { name: "Guinea-Bissau" },
        { name: "Guyana" },
        { name: "Haiti" },
        { name: "Honduras" },
        { name: "Hungary" },
        { name: "Iceland" },
        { name: "India" },
        { name: "Indonesia" },
        { name: "Iran" },
        { name: "Iraq" },
        { name: "Ireland" },
        { name: "Israel" },
        { name: "Italy" },
        { name: "Jamaica" },
        { name: "Japan" },
        { name: "Jordan" },
        { name: "Kazakhstan" },
        { name: "Kenya" },
        { name: "Kiribati" },
        { name: "Korea (North)" },
        { name: "Korea (South)" },
        { name: "Kuwait" },
        { name: "Kyrgyzstan" },
        { name: "Laos" },
        { name: "Latvia" },
        { name: "Lebanon" },
        { name: "Lesotho" },
        { name: "Liberia" },
        { name: "Libya" },
        { name: "Liechtenstein" },
        { name: "Lithuania" },
        { name: "Luxembourg" },
        { name: "Madagascar" },
        { name: "Malawi" },
        { name: "Malaysia" },
        { name: "Maldives" },
        { name: "Mali" },
        { name: "Malta" },
        { name: "Marshall Islands" },
        { name: "Mauritania" },
        { name: "Mauritius" },
        { name: "Mexico" },
        { name: "Micronesia" },
        { name: "Moldova" },
        { name: "Monaco" },
        { name: "Mongolia" },
        { name: "Montenegro" },
        { name: "Morocco" },
        { name: "Mozambique" },
        { name: "Myanmar" },
        { name: "Namibia" },
        { name: "Nauru" },
        { name: "Nepal" },
        { name: "Netherlands" },
        { name: "New Zealand" },
        { name: "Nicaragua" },
        { name: "Niger" },
        { name: "Nigeria" },
        { name: "North Macedonia" },
        { name: "Norway" },
        { name: "Oman" },
        { name: "Pakistan" },
        { name: "Palau" },
        { name: "Palestine" },
        { name: "Panama" },
        { name: "Papua New Guinea" },
        { name: "Paraguay" },
        { name: "Peru" },
        { name: "Philippines" },
        { name: "Poland" },
        { name: "Portugal" },
        { name: "Qatar" },
        { name: "Romania" },
        { name: "Russia" },
        { name: "Rwanda" },
        { name: "Saint Kitts and Nevis" },
        { name: "Saint Lucia" },
        { name: "Saint Vincent and the Grenadines" },
        { name: "Samoa" },
        { name: "San Marino" },
        { name: "Sao Tome and Principe" },
        { name: "Saudi Arabia" },
        { name: "Senegal" },
        { name: "Serbia" },
        { name: "Seychelles" },
        { name: "Sierra Leone" },
        { name: "Singapore" },
        { name: "Slovakia" },
        { name: "Slovenia" },
        { name: "Solomon Islands" },
        { name: "Somalia" },
        { name: "South Africa" },
        { name: "Spain" },
        { name: "Sri Lanka" },
        { name: "Sudan" },
        { name: "Suriname" },
        { name: "Sweden" },
        { name: "Switzerland" },
        { name: "Syria" },
        { name: "Taiwan" },
        { name: "Tajikistan" },
        { name: "Tanzania" },
        { name: "Thailand" },
        { name: "Timor-Leste" },
        { name: "Togo" },
        { name: "Tonga" },
        { name: "Trinidad and Tobago" },
        { name: "Tunisia" },
        { name: "Turkey" },
        { name: "Turkmenistan" },
        { name: "Tuvalu" },
        { name: "Uganda" },
        { name: "Ukraine" },
        { name: "United Arab Emirates" },
        { name: "United Kingdom" },
        { name: "United States" },
        { name: "Uruguay" },
        { name: "Uzbekistan" },
        { name: "Vanuatu" },
        { name: "Vatican City" },
        { name: "Venezuela" },
        { name: "Vietnam" },
        { name: "Yemen" },
        { name: "Zambia" },
        { name: "Zimbabwe" }
    ];

    //city
    const citiesByCountry = {
        "Afghanistan": ["Kabul", "Herat", "Mazar-i-Sharif", "Kandahar"],
        "Albania": ["Tirana", "Durrës", "Vlorë", "Shkodër"],
        "Algeria": ["Algiers", "Oran", "Constantine", "Annaba"],
        "Andorra": ["Andorra la Vella"],
        "Angola": ["Luanda", "Lobito", "Huambo", "Lubango"],
        "Antigua and Barbuda": ["Saint John's", "Jolly Harbour", "Freetown", "Liberta"],
        "Argentina": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
        "Armenia": ["Yerevan", "Gyumri", "Vanadzor", "Hrazdan"],
        "Australia": ["Canberra", "Sydney", "Melbourne", "Brisbane"],
        "Austria": ["Vienna", "Graz", "Linz", "Salzburg"],
        "Azerbaijan": ["Baku", "Ganja", "Sumqayit", "Mingachevir"],
        "Bahamas": ["Nassau", "Freeport", "West End", "Lucaya"],
        "Bahrain": ["Manama", "Muharraq", "Sitra", "Arad"],
        "Bangladesh": ["Dhaka", "Chittagong", "Khulna", "Rajshahi"],
        "Barbados": ["Bridgetown", "Holetown", "Speightstown", "Oistins"],
        "Belarus": ["Minsk", "Gomel", "Mogilev", "Vitebsk"],
        "Belgium": ["Brussels", "Antwerp", "Ghent", "Charleroi"],
        "Belize": ["Belmopan", "Belize City", "San Ignacio", "Orange Walk"],
        "Benin": ["Porto-Novo", "Cotonou", "Parakou", "Abomey-Calavi"],
        "Bhutan": ["Thimphu", "Phuentsholing", "Punakha", "Paro"],
        "Bolivia": ["Sucre", "La Paz", "Santa Cruz de la Sierra", "Cochabamba"],
        "Bosnia and Herzegovina": ["Sarajevo", "Tuzla", "Banja Luka", "Zenica"],
        "Botswana": ["Gaborone", "Francistown", "Maun", "Serowe"],
        "Brazil": ["Brasília", "São Paulo", "Rio de Janeiro", "Salvador"],
        "Brunei": ["Bandar Seri Begawan", "Kuala Belait", "Seria", "Tutong"],
        "Bulgaria": ["Sofia", "Plovdiv", "Varna", "Burgas"],
        "Burkina Faso": ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Kaya"],
        "Burundi": ["Bujumbura", "Gitega", "Ngozi", "Rutana"],
        "Cabo Verde": ["Praia", "Mindelo", "Santa Maria", "Sal Rei"],
        "Cambodia": ["Phnom Penh", "Siem Reap", "Sihanoukville", "Battambang"],
        "Cameroon": ["Yaoundé", "Douala", "Garoua", "Bafoussam"],
        "Canada": ["Ottawa", "Toronto", "Vancouver", "Montreal"],
        "Central African Republic": ["Bangui", "Bimbo", "Berberati", "Bossangoa"],
        "Chad": ["N'Djamena", "Moundou", "Kélo", "Doba"],
        "Chile": ["Santiago", "Valparaíso", "Concepción", "Antofagasta"],
        "China": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen"],
        "Colombia": ["Bogotá", "Medellín", "Cali", "Barranquilla"],
        "Comoros": ["Moroni", "Fomboni", "Mitsamiouli", "Domoni"],
        "Congo, Democratic Republic of the": ["Kinshasa", "Lubumbashi", "Goma", "Bukavu"],
        "Congo, Republic of the": ["Brazzaville", "Pointe-Noire", "Dolisie", "Owando"],
        "Costa Rica": ["San José", "Alajuela", "Cartago", "Liberia"],
        "Croatia": ["Zagreb", "Split", "Rijeka", "Osijek"],
        "Cuba": ["Havana", "Santiago de Cuba", "Guantánamo", "Camagüey"],
        "Cyprus": ["Nicosia", "Limassol", "Famagusta", "Larnaca"],
        "Czech Republic": ["Prague", "Brno", "Ostrava", "Plzeň"],
        "Denmark": ["Copenhagen", "Aarhus", "Aalborg", "Odense"],
        "Djibouti": ["Djibouti", "Ali Sabieh", "Dikhil", "Tadjoura"],
        "Dominica": ["Roseau", "Portsmouth", "Vieille Case", "Marigot"],
        "Dominican Republic": ["Santo Domingo", "Santiago de los Caballeros", "San Pedro de Macorís", "La Romana"],
        "Ecuador": ["Quito", "Guayaquil", "Cuenca", "Loja"],
        "Egypt": ["Cairo", "Alexandria", "Giza", "Luxor"],
        "El Salvador": ["San Salvador", "Santa Ana", "San Miguel", "Soyapango"],
        "Equatorial Guinea": ["Malabo", "Bata", "Ebebiyín", "Aconibe"],
        "Eritrea": ["Asmara", "Massawa", "Keren", "Mendefera"],
        "Estonia": ["Tallinn", "Tartu", "Narva", "Pärnu"],
        "Eswatini": ["Mbabane", "Manzini", "Lobamba", "Nhlangano"],
        "Ethiopia": ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Nazret"],
        "Fiji": ["Suva", "Lautoka", "Nadi", "Labasa"],
        "Finland": ["Helsinki", "Espoo", "Tampere", "Oulu"],
        "France": ["Paris", "Marseille", "Lyon", "Toulouse"],
        "Gabon": ["Libreville", "Port-Gentil", "Oyem", "Franceville"],
        "Gambia": ["Banjul", "Serrekunda", "Brikama", "Serekunda"],
        "Georgia": ["Tbilisi", "Batumi", "Kutaisi", "Zugdidi"],
        "Germany": ["Berlin", "Munich", "Frankfurt", "Hamburg"],
        "Ghana": ["Accra", "Kumasi", "Sekondi-Takoradi", "Tamale"],
        "Greece": ["Athens", "Thessaloniki", "Patras", "Heraklion"],
        "Grenada": ["Saint George's", "Grenville", "Sauteurs", "Victoria"],
        "Guatemala": ["Guatemala City", "Antigua Guatemala", "Mixco", "Villa Nueva"],
        "Guinea": ["Conakry", "Kindia", "Nzérékoré", "Kankan"],
        "Guinea-Bissau": ["Bissau", "Bafatá", "Gabu", "Quebo"],
        "Guyana": ["Georgetown", "New Amsterdam", "Linden", "Bartica"],
        "Haiti": ["Port-au-Prince", "Cap-Haïtien", "Jacmel", "Les Cayes"],
        "Honduras": ["Tegucigalpa", "San Pedro Sula", "Choloma", "La Ceiba"],
        "Hungary": ["Budapest", "Debrecen", "Miskolc", "Szeged"],
        "Iceland": ["Reykjavik", "Kopavogur", "Hafnarfjordur", "Akureyri"],
        "India": ["New Delhi", "Mumbai", "Bangalore", "Hyderabad"],
        "Indonesia": ["Jakarta", "Surabaya", "Bandung", "Medan"],
        "Iran": ["Tehran", "Mashhad", "Isfahan", "Shiraz"],
        "Iraq": ["Baghdad", "Basra", "Mosul", "Erbil"],
        "Ireland": ["Dublin", "Cork", "Limerick", "Galway"],
        "Israel": ["Jerusalem", "Tel Aviv-Yafo", "Haifa", "Be'er Sheva"],
        "Italy": ["Rome", "Milan", "Naples", "Turin"],
        "Jamaica": ["Kingston", "Montego Bay", "Portmore", "Spanish Town"],
        "Japan": ["Tokyo", "Osaka", "Yokohama", "Nagoya"],
        "Jordan": ["Amman", "Irbid", "Zarqa", "Aqaba"],
        "Kazakhstan": ["Nur-Sultan", "Almaty", "Shymkent", "Aktobe"],
        "Kenya": ["Nairobi", "Mombasa", "Nakuru", "Eldoret"],
        "Kiribati": ["Tarawa", "Bairiki", "Bikenibeu", "Taburao"],
        "Kosovo": ["Pristina", "Mitrovica", "Gjakova", "Ferizaj"],
        "Kuwait": ["Kuwait City", "Hawally", "Al Jahra", "Mubarak Al Kabeer"],
        "Kyrgyzstan": ["Bishkek", "Osh", "Jalal-Abad", "Karabalta"],
        "Laos": ["Vientiane", "Luang Prabang", "Savannakhet", "Pakse"],
        "Latvia": ["Riga", "Daugavpils", "Jelgava", "Jurmala"],
        "Lebanon": ["Beirut", "Tripoli", "Sidon", "Tyre"],
        "Lesotho": ["Maseru", "Mafeteng", "Quthing", "Mokhotlong"],
        "Liberia": ["Monrovia", "Kakata", "Harper", "Gbarnga"],
        "Libya": ["Tripoli", "Benghazi", "Misrata", "Sebha"],
        "Liechtenstein": ["Vaduz", "Schaan", "Balzers", "Triesen"],
        "Lithuania": ["Vilnius", "Kaunas", "Klaipeda", "Šiauliai"],
        "Luxembourg": ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Ettelbruck"],
        "Madagascar": ["Antananarivo", "Toamasina", "Fianarantsoa", "Mahajanga"],
        "Malawi": ["Lilongwe", "Blantyre", "Mzuzu", "Zomba"],
        "Malaysia": ["Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh"],
        "Maldives": ["Malé", "Addu City", "Fuvahmulah", "Kulhudhuffushi"],
        "Mali": ["Bamako", "Sikasso", "Segou", "Mopti"],
        "Malta": ["Valletta", "Birkirkara", "Sliema", "Mosta"],
        "Marshall Islands": ["Majuro", "Ebeye", "Laura", "Kwajalein"],
        "Mauritania": ["Nouakchott", "Nouadhibou", "Zouerate", "Atar"],
        "Mauritius": ["Port Louis", "Beau Bassin-Rose Hill", "Curepipe", "Triolet"],
        "Mexico": ["Mexico City", "Guadalajara", "Monterrey", "Puebla"],
        "Micronesia, Federated States of": ["Palikir", "Weno", "Kolonia", "Nukuro"],
        "Moldova": ["Chisinau", "Tiraspol", "Bălți", "Rîbnița"],
        "Monaco": ["Monaco"],
        "Mongolia": ["Ulaanbaatar", "Erdenet", "Darkhan", "Mandal"],
        "Montenegro": ["Podgorica", "Nikšić", "Pljevlja", "Herceg Novi"],
        "Morocco": ["Rabat", "Casablanca", "Fes", "Marrakech"],
        "Mozambique": ["Maputo", "Beira", "Nampula", "Pemba"],
        "Myanmar": ["Naypyidaw", "Yangon", "Mandalay", "Mawlamyine"],
        "Namibia": ["Windhoek", "Swakopmund", "Walvis Bay", "Oshakati"],
        "Nauru": ["Yaren"],
        "Nepal": ["Kathmandu", "Pokhara", "Biratnagar", "Lalitpur"],
        "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
        "New Zealand": ["Wellington", "Auckland", "Christchurch", "Hamilton"],
        "Nicaragua": ["Managua", "León", "Masaya", "Bluefields"],
        "Niger": ["Niamey", "Zinder", "Maradi", "Agadez"],
        "Nigeria": ["Abuja", "Lagos", "Kano", "Ibadan"],
        "North Korea": ["Pyongyang", "Nampo", "Sinuiju", "Kaesong"],
        "North Macedonia": ["Skopje", "Bitola", "Kumanovo", "Prilep"],
        "Norway": ["Oslo", "Bergen", "Stavanger", "Trondheim"],
        "Oman": ["Muscat", "Sohar", "Salalah", "Nizwa"],
        "Pakistan": ["Islamabad", "Karachi", "Lahore", "Faisalabad"],
        "Palau": ["Ngerulmud", "Koror", "Aimeliik", "Ngaraard"],
        "Panama": ["Panama City", "San Miguelito", "David", "Colón"],
        "Papua New Guinea": ["Port Moresby", "Lae", "Mount Hagen", "Madang"],
        "Paraguay": ["Asunción", "Ciudad del Este", "Encarnación", "Luque"],
        "Peru": ["Lima", "Arequipa", "Cusco", "Trujillo"],
        "Philippines": ["Manila", "Quezon City", "Davao City", "Cebu City"],
        "Poland": ["Warsaw", "Kraków", "Wrocław", "Łódź"],
        "Portugal": ["Lisbon", "Porto", "Amadora", "Braga"],
        "Qatar": ["Doha", "Al Wakrah", "Al Rayyan", "Umm Salal"],
        "Romania": ["Bucharest", "Cluj-Napoca", "Iași", "Timisoara"],
        "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg"],
        "Rwanda": ["Kigali", "Butare", "Gitarama", "Byumba"],
        "Saint Kitts and Nevis": ["Basseterre", "Old Road", "Dieppe Bay Town", "Cayon"],
        "Saint Lucia": ["Castries", "Vieux Fort", "Soufrière", "Gros Islet"],
        "Saint Vincent and the Grenadines": ["Kingstown", "Bequia", "Union Island", "Murray"],
        "Samoa": ["Apia", "Salelologa", "Vaitele", "Faleolo"],
        "San Marino": ["San Marino"],
        "Sao Tome and Principe": ["São Tomé", "Neves", "Pagué", "Trindade"],
        "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam", "Mecca"],
        "Senegal": ["Dakar", "Saint-Louis", "Thiès", "Ziguinchor"],
        "Serbia": ["Belgrade", "Novi Sad", "Niš", "Subotica"],
        "Seychelles": ["Victoria", "Anse Royale", "Baie Lazare", "Port Glaud"],
        "Sierra Leone": ["Freetown", "Bo", "Kenema", "Koidu Town"],
        "Singapore": ["Singapore"],
        "Slovakia": ["Bratislava", "Košice", "Nitra", "Prešov"],
        "Slovenia": ["Ljubljana", "Maribor", "Celje", "Kranj"],
        "Solomon Islands": ["Honiara", "Gizo", "Auki", "Taro"],
        "Somalia": ["Mogadishu", "Hargeysa", "Burao", "Berbera"],
        "South Africa": ["Pretoria", "Johannesburg", "Cape Town", "Durban"],
        "South Korea": ["Seoul", "Busan", "Incheon", "Daegu"],
        "South Sudan": ["Juba", "Malakal", "Wau", "Yei"],
        "Spain": ["Madrid", "Barcelona", "Valencia", "Seville"],
        "Sri Lanka": ["Colombo", "Kandy", "Galle", "Jaffna"],
        "Sudan": ["Khartoum", "Port Sudan", "Nyala", "Kassala"],
        "Suriname": ["Paramaribo", "Lelydorp", "Nickerie", "Albina"],
        "Sweden": ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
        "Switzerland": ["Bern", "Zurich", "Geneva", "Basel"],
        "Syria": ["Damascus", "Aleppo", "Homs", "Latakia"],
        "Tajikistan": ["Dushanbe", "Khujand", "Kurgan-Tyube", "Kulob"],
        "Tanzania": ["Dodoma", "Dar es Salaam", "Mwanza", "Zanzibar"],
        "Thailand": ["Bangkok", "Chiang Mai", "Pattaya", "Phuket"],
        "Timor-Leste": ["Dili", "Baucau", "Oecusse", "Vera Cruz"],
        "Togo": ["Lomé", "Kara", "Atakpamé", "Sokodé"],
        "Tonga": ["Nukuʻalofa", "Vavāʻu", "Haʻapai", "ʻEua"],
        "Trinidad and Tobago": ["Port of Spain", "Chaguanas", "San Fernando", "Arima"],
        "Tunisia": ["Tunis", "Sfax", "Sousse", "Kairouan"],
        "Turkey": ["Ankara", "Istanbul", "Izmir", "Bursa"],
        "Turkmenistan": ["Ashgabat", "Dashoguz", "Turkmenabat", "Mary"],
        "Tuvalu": ["Funafuti"],
        "Uganda": ["Kampala", "Gulu", "Jinja", "Mbale","Mbarara"],
        "Ukraine": ["Kyiv", "Kharkiv", "Odessa", "Lviv"],
        "United Arab Emirates": ["Abu Dhabi", "Dubai", "Sharjah", "Ajman"],
        "United Kingdom": ["London", "Birmingham", "Manchester", "Glasgow"],
        "United States": ["Washington, D.C.", "New York City", "Los Angeles", "Chicago"],
        "Uruguay": ["Montevideo", "Salto", "Paysandú", "Maldonado"],
        "Uzbekistan": ["Tashkent", "Namangan", "Andijan", "Samarkand"],
        "Vanuatu": ["Port Vila", "Luganville", "Isangel", "Saratamata"],
        "Vatican City": ["Vatican City"],
        "Venezuela": ["Caracas", "Maracaibo", "Valencia", "Maracay"],
        "Vietnam": ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hải Phòng"],
        "Yemen": ["Sana'a", "Aden", "Taiz", "Mukalla"],
        "Zambia": ["Lusaka", "Kitwe", "Ndola", "Livingstone"],
        "Zimbabwe": ["Harare", "Bulawayo", "Chitungwiza", "Mutare"]
      };
  
    
    //ID type
    const IDtype =[
        {option: "Passport"},
        {option: "National Identification"}
    ]

    useEffect(()=>{
      window.scrollTo(0, 0);
    }, []);

    const handleCountryChange = (e) => {
      setSelectedCountry(e.target.value);
      setSelectedCity(""); 
  };
  
  const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          setFile(file); // update the state with the selected file
          const reader = new FileReader();
          reader.onloadend = () => {
              document.getElementById('profile-photo').style.backgroundImage = `url(${reader.result})`;
          };
          reader.readAsDataURL(file);
      }
  };
  
  const handleSubmit = async (event) => {
      event.preventDefault();
      
      // const formData = new FormData();
      
      // formData.append('FullName', FullName);
      // formData.append('ProfileName', ProfileName);
      // formData.append('Email', Email);
      // formData.append('Phone', Phone);
      // formData.append('DOB', DOB);
      // formData.append('Gender', Gender);
      // formData.append('Language', Language);
      // formData.append('CarType', CarType);
      // formData.append('Country', selectedCountry);
      // formData.append('City', selectedCity);
      // formData.append('idtype', idtype);
      // formData.append('idnumber', idnumber);
      // formData.append('license', license);
      // formData.append('licenseED', licenseED);
      // formData.append('About', About);
    
      // if (file) {
      //     formData.append('file', file);
      // }
  
      // const profileInput = document.getElementById('profilePicture');
      // const idInput = document.getElementById('idPicture');
      // const licenseInput = document.getElementById('licensePicture');
  
      // if (profileInput.files[0]) formData.append('profilePicture', profileInput.files[0]);
      // if (idInput.files[0]) formData.append('idPicture', idInput.files[0]);
      // if (licenseInput.files[0]) formData.append('licensePicture', licenseInput.files[0]);
    
      // try {
      //     const response = await fetch('http://localhost:5000/api/profile', {
      //         method: 'POST',
      //         body: formData,
      //     });
  
      //     if (response.ok) {
      //         alert("Profile saved successfully!");
      //         navigate("/");
      //     } else {
      //         alert("Failed to save profile.");
      //     }
      // } catch (error) {
      //     console.error("Error saving profile data:", error);
      // }
  };
    
  return (
    <div className="profile-container">
      <Header />
      <form className="profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Profile Picture Section */}
            <div className="profile-section">
            <div className="profile-picture">
                <div className="profile-photo" id="profile-photo"></div>
                <div className="upload-buttons">
                <button 
                    className="Upload-picture" 
                    onClick={() => document.getElementById('profilePicture').click()}
                >
                    Upload Picture
                </button>
                <button 
                    className="Delete-picture"
                    onClick={() => {
                    document.getElementById('profilePicture').value = '';  
                    document.getElementById('profile-photo').style.backgroundImage = '';  
                    setFile(null);
                    }}
                >
                    Delete Picture
                </button>
                <input 
                    type="file" 
                    id="profilePicture" 
                    accept="image/*" 
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                </div>
            </div>
            </div>


                  {/* Personal Information */}
            <div className="profile-section">
              <div className="form-row">
                <div className="profile-inputs">
                  <label className="profile-labels">Full Name</label>
                  <input 
                    type="text" 
                    className="name-inputs" 
                    placeholder="John Dave" 
                    required
                    value={FullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">Profile Name</label>
                  <input 
                    type="text" 
                    className="name-inputs" 
                    placeholder="JohnD123" 
                    required
                    value={ProfileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="profile-inputs">
                  <label className="profile-labels">Email Address</label>
                  <input 
                    type="email" 
                    className="name-inputs" 
                    placeholder="Johndave@mail.com" 
                    required
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">Phone Number</label>
                  <input 
                    type="tel" 
                    className="name-inputs" 
                    placeholder="0700-000-000" 
                    required
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth and Gender */}
            <div className="profile-section">
              <div className="form-row">
                <div className="profile-inputs">
                  <label className="profile-labels">Date of Birth</label>
                  <input 
                    type="date" 
                    className="profile-input-info" 
                    required
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">Gender</label>
                  <select 
                    className="profile-input-info"
                    required
                    value={Gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>Select Gender</option>
                    {gender.map((items, index) => (
                      <option key={index} value={items.option}>
                        {items.option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">Language</label>
                  <select 
                    className="profile-input-info"
                    required
                    value={Language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="" disabled>Select Language</option>
                    {languages.map((items, index) => (
                      <option key={index} value={items.option}>
                        {items.option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle Preferences */}
            <div className="profile-section">
              <div className="form-row">
                <div className="profile-inputs">
                  <label className="profile-labels">Preferred Vehicle Type</label>
                  <select 
                    className="profile-input-info"
                    required
                    value={CarType}
                    onChange={(e) => setCarType(e.target.value)}
                  >
                    <option value="" disabled>Select Type</option>
                    {cartype.map((items, index) => (
                      <option key={index} value={items.type}>
                        {items.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">Country</label>
                  <select 
                    className="profile-input-info"
                    onChange={(e) => {
                      setSelectedCountry(e.target.value); 
                      handleCountryChange(e);     
                    }}
                    required
                    value={selectedCountry}
                  >
                    <option value="" disabled>Select Country</option>
                    {country.map((items, index) => (
                      <option key={index} value={items.name}>
                        {items.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">City/Town</label>
                  <select 
                    className="profile-input-info"
                    required
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedCountry}
                  >
                    <option value="" disabled>Select City</option>
                    {selectedCountry && citiesByCountry[selectedCountry].map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Proof of Identification */}
            <div className="profile-section">
              <div className="form-row">
                <div className="profile-inputs">
                  <label className="profile-labels">Identification Type</label>
                  <select 
                    className="profile-input-info"
                    required
                    value={idtype}
                    onChange={(e) => setIdtype(e.target.value)}
                  >
                    <option value="" disabled>Select ID Type</option>
                    {IDtype.map((items, index) => (
                      <option key={index} value={items.option}>
                        {items.option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">ID Number</label>
                  <input 
                    type="text" 
                    className="profile-input-info" 
                    required
                    value={idnumber}
                    onChange={(e) => setIdnumber(e.target.value)}
                  />
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">ID Picture</label><br />
                  <button 
                    type="button"  // Prevent form submission
                    className="Upload-picture" 
                    onClick={() => document.getElementById('idPicture').click()}
                  >
                    Upload
                  </button>
                  <input 
                    type="file" 
                    id="idPicture" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* ID and Driver's License */}
            <div className="profile-section">
              <div className="form-row">
                <div className="profile-inputs">
                  <label className="profile-labels">Driver's License number</label>
                  <input 
                    type="text" 
                    className="profile-input-info" 
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                  />
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">License Expiry Date</label>
                  <input 
                    type="date" 
                    className="profile-input-info" 
                    value={licenseED}
                    onChange={(e) => setLicenseED(e.target.value)}
                  />
                </div>
                <div className="profile-inputs">
                  <label className="profile-labels">License Picture</label><br />
                  <button 
                    type="button"  // Prevent form submission
                    className="Upload-picture" 
                    onClick={() => document.getElementById('licensePicture').click()}
                  >
                    Upload
                  </button>
                  <input 
                    type="file" 
                    id="licensePicture" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="profile-section">
              <label className="profile-labels">Bio/About Me</label>
              <textarea 
                className="Bio-input-info" 
                placeholder="Tell us about yourself..." 
                value={About}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="submit-buttons">
              <button type="submit" className="Submit-button" >Save Profile</button>
              <button type="button" className="Cancel-button">Cancel</button>
            </div>
      </form>
    </div>
  );
};

export default Profile;
