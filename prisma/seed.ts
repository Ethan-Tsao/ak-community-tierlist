import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const operators = [
    { id: "aak", name: "Aak", class: "specialist", rarity: 6, tier: "S" },
    { id: "angelina", name: "Angelina", class: "supporter", rarity: 6, tier: "S" },
    { id: "archetto", name: "Archetto", class: "sniper", rarity: 6, tier: "S" },
    { id: "ash", name: "Ash", class: "sniper", rarity: 6, tier: "S" },
    { id: "bagpipe", name: "Bagpipe", class: "vanguard", rarity: 6, tier: "S" },
    { id: "blaze", name: "Blaze", class: "guard", rarity: 6, tier: "S" },
    { id: "blemishine", name: "Blemishine", class: "defender", rarity: 6, tier: "S" },
    { id: "carnelian", name: "Carnelian", class: "caster", rarity: 6, tier: "S" },
    { id: "ceobe", name: "Ceobe", class: "caster", rarity: 6, tier: "S" },
    { id: "ch'en", name: "Ch'en", class: "guard", rarity: 6, tier: "S" },
    { id: "ch'en the holungday", name: "Ch'en the Holungday", class: "sniper", rarity: 6, tier: "S" },
    { id: "chongyue", name: "Chongyue", class: "guard", rarity: 6, tier: "S" },
    { id: "dorothy", name: "Dorothy", class: "specialist", rarity: 6, tier: "S" },
    { id: "dusk", name: "Dusk", class: "caster", rarity: 6, tier: "S" },
    { id: "ebenholz", name: "Ebenholz", class: "caster", rarity: 6, tier: "S" },
    { id: "eunectes", name: "Eunectes", class: "defender", rarity: 6, tier: "S" },
    { id: "executor the ex foedere", name: "Executor the Ex Foedere", class: "guard", rarity: 6, tier: "S" },
    { id: "exusiai", name: "Exusiai", class: "sniper", rarity: 6, tier: "S" },
    { id: "eyjafjalla", name: "Eyjafjalla", class: "caster", rarity: 6, tier: "S" },
    { id: "eyjafjalla the hvít aska", name: "Eyjafjalla the Hvít Aska", class: "medic", rarity: 6, tier: "S" },
    { id: "fartooth", name: "Fartooth", class: "sniper", rarity: 6, tier: "S" },
    { id: "fiammetta", name: "Fiammetta", class: "sniper", rarity: 6, tier: "S" },
    { id: "flametail", name: "Flametail", class: "vanguard", rarity: 6, tier: "S" },
    { id: "gavial the invincible", name: "Gavial the Invincible", class: "guard", rarity: 6, tier: "S" },
    { id: "gladiia", name: "Gladiia", class: "specialist", rarity: 6, tier: "S" },
    { id: "gnosis", name: "Gnosis", class: "supporter", rarity: 6, tier: "S" },
    { id: "goldenglow", name: "Goldenglow", class: "caster", rarity: 6, tier: "S" },
    { id: "hellagur", name: "Hellagur", class: "guard", rarity: 6, tier: "S" },
    { id: "ho'olheyak", name: "Ho'olheyak", class: "caster", rarity: 6, tier: "S" },
    { id: "horn", name: "Horn", class: "defender", rarity: 6, tier: "S" },
    { id: "hoshiguma", name: "Hoshiguma", class: "defender", rarity: 6, tier: "S" },
    { id: "ifrit", name: "Ifrit", class: "caster", rarity: 6, tier: "S" },
    { id: "ines", name: "Ines", class: "vanguard", rarity: 6, tier: "S" },
    { id: "irene", name: "Irene", class: "guard", rarity: 6, tier: "S" },
    { id: "jessica the liberated", name: "Jessica the Liberated", class: "defender", rarity: 6, tier: "S" },
    { id: "kal'tsit", name: "Kal'tsit", class: "medic", rarity: 6, tier: "S" },
    { id: "kirin r yato", name: "Kirin R Yato", class: "specialist", rarity: 6, tier: "S" },
    { id: "lee", name: "Lee", class: "specialist", rarity: 6, tier: "S" },
    { id: "lin", name: "Lin", class: "caster", rarity: 6, tier: "S" },
    { id: "ling", name: "Ling", class: "supporter", rarity: 6, tier: "S" },
    { id: "lumen", name: "Lumen", class: "medic", rarity: 6, tier: "S" },
    { id: "magallan", name: "Magallan", class: "supporter", rarity: 6, tier: "S" },
    { id: "mizuki", name: "Mizuki", class: "specialist", rarity: 6, tier: "S" },
    { id: "mostima", name: "Mostima", class: "caster", rarity: 6, tier: "S" },
    { id: "mountain", name: "Mountain", class: "guard", rarity: 6, tier: "S" },
    { id: "mudrock", name: "Mudrock", class: "defender", rarity: 6, tier: "S" },
    { id: "muelsyse", name: "Muelsyse", class: "vanguard", rarity: 6, tier: "S" },
    { id: "młynar", name: "Młynar", class: "guard", rarity: 6, tier: "S" },
    { id: "nearl the radiant knight", name: "Nearl the Radiant Knight", class: "guard", rarity: 6, tier: "S" },
    { id: "nian", name: "Nian", class: "defender", rarity: 6, tier: "S" },
    { id: "nightingale", name: "Nightingale", class: "medic", rarity: 6, tier: "S" },
    { id: "pallas", name: "Pallas", class: "guard", rarity: 6, tier: "S" },
    { id: "passenger", name: "Passenger", class: "caster", rarity: 6, tier: "S" },
    { id: "penance", name: "Penance", class: "defender", rarity: 6, tier: "S" },
    { id: "phantom", name: "Phantom", class: "specialist", rarity: 6, tier: "S" },
    { id: "pozëmka", name: "Pozëmka", class: "sniper", rarity: 6, tier: "S" },
    { id: "qiubai", name: "Qiubai", class: "guard", rarity: 6, tier: "S" },
    { id: "reed the flame shadow", name: "Reed the Flame Shadow", class: "medic", rarity: 6, tier: "S" },
    { id: "rosa", name: "Rosa", class: "sniper", rarity: 6, tier: "S" },
    { id: "rosmontis", name: "Rosmontis", class: "sniper", rarity: 6, tier: "S" },
    { id: "saga", name: "Saga", class: "vanguard", rarity: 6, tier: "S" },
    { id: "saileach", name: "Saileach", class: "vanguard", rarity: 6, tier: "S" },
    { id: "saria", name: "Saria", class: "defender", rarity: 6, tier: "S" },
    { id: "schwarz", name: "Schwarz", class: "sniper", rarity: 6, tier: "S" },
    { id: "shining", name: "Shining", class: "medic", rarity: 6, tier: "S" },
    { id: "siege", name: "Siege", class: "vanguard", rarity: 6, tier: "S" },
    { id: "silence the paradigmatic", name: "Silence the Paradigmatic", class: "supporter", rarity: 6, tier: "S" },
    { id: "silverash", name: "SilverAsh", class: "guard", rarity: 6, tier: "S" },
    { id: "skadi", name: "Skadi", class: "guard", rarity: 6, tier: "S" },
    { id: "skadi the corrupting heart", name: "Skadi the Corrupting Heart", class: "supporter", rarity: 6, tier: "S" },
    { id: "specter the unchained", name: "Specter the Unchained", class: "specialist", rarity: 6, tier: "S" },
    { id: "stainless", name: "Stainless", class: "supporter", rarity: 6, tier: "S" },
    { id: "surtr", name: "Surtr", class: "guard", rarity: 6, tier: "S" },
    { id: "suzuran", name: "Suzuran", class: "supporter", rarity: 6, tier: "S" },
    { id: "swire the elegant wit", name: "Swire the Elegant Wit", class: "specialist", rarity: 6, tier: "S" },
    { id: "texas the omertosa", name: "Texas the Omertosa", class: "specialist", rarity: 6, tier: "S" },
    { id: "thorns", name: "Thorns", class: "guard", rarity: 6, tier: "S" },
    { id: "typhon", name: "Typhon", class: "sniper", rarity: 6, tier: "S" },
    { id: "vigil", name: "Vigil", class: "vanguard", rarity: 6, tier: "S" },
    { id: "w", name: "W", class: "sniper", rarity: 6, tier: "S" },
    { id: "weedy", name: "Weedy", class: "specialist", rarity: 6, tier: "S" },
    { id: "absinthe", name: "Absinthe", class: "caster", rarity: 5, tier: "S" },
    { id: "akafuyu", name: "Akafuyu", class: "guard", rarity: 5, tier: "S" },
    { id: "almond", name: "Almond", class: "specialist", rarity: 5, tier: "S" },
    { id: "amiya", name: "Amiya", class: "caster", rarity: 5, tier: "S" },
    { id: "andreana", name: "Andreana", class: "sniper", rarity: 5, tier: "S" },
    { id: "aosta", name: "Aosta", class: "sniper", rarity: 5, tier: "S" },
    { id: "april", name: "April", class: "sniper", rarity: 5, tier: "S" },
    { id: "asbestos", name: "Asbestos", class: "defender", rarity: 5, tier: "S" },
    { id: "ashlock", name: "Ashlock", class: "defender", rarity: 5, tier: "S" },
    { id: "astesia", name: "Astesia", class: "guard", rarity: 5, tier: "S" },
    { id: "astgenne", name: "Astgenne", class: "caster", rarity: 5, tier: "S" },
    { id: "aurora", name: "Aurora", class: "defender", rarity: 5, tier: "S" },
    { id: "ayerscarpe", name: "Ayerscarpe", class: "guard", rarity: 5, tier: "S" },
    { id: "beeswax", name: "Beeswax", class: "caster", rarity: 5, tier: "S" },
    { id: "bena", name: "Bena", class: "specialist", rarity: 5, tier: "S" },
    { id: "bibeak", name: "Bibeak", class: "guard", rarity: 5, tier: "S" },
    { id: "bison", name: "Bison", class: "defender", rarity: 5, tier: "S" },
    { id: "blacknight", name: "Blacknight", class: "vanguard", rarity: 5, tier: "S" },
    { id: "blitz", name: "Blitz", class: "defender", rarity: 5, tier: "S" },
    { id: "blue poison", name: "Blue Poison", class: "sniper", rarity: 5, tier: "S" },
    { id: "breeze", name: "Breeze", class: "medic", rarity: 5, tier: "S" },
    { id: "broca", name: "Broca", class: "guard", rarity: 5, tier: "S" },
    { id: "bryophyta", name: "Bryophyta", class: "guard", rarity: 5, tier: "S" },
    { id: "cantabile", name: "Cantabile", class: "vanguard", rarity: 5, tier: "S" },
    { id: "cement", name: "Cement", class: "defender", rarity: 5, tier: "S" },
    { id: "ceylon", name: "Ceylon", class: "medic", rarity: 5, tier: "S" },
    { id: "chiave", name: "Chiave", class: "vanguard", rarity: 5, tier: "S" },
    { id: "cliffheart", name: "Cliffheart", class: "specialist", rarity: 5, tier: "S" },
    { id: "coldshot", name: "Coldshot", class: "sniper", rarity: 5, tier: "S" },
    { id: "corroserum", name: "Corroserum", class: "caster", rarity: 5, tier: "S" },
    { id: "croissant", name: "Croissant", class: "defender", rarity: 5, tier: "S" },
    { id: "czerny", name: "Czerny", class: "defender", rarity: 5, tier: "S" },
    { id: "dagda", name: "Dagda", class: "guard", rarity: 5, tier: "S" },
    { id: "elysium", name: "Elysium", class: "vanguard", rarity: 5, tier: "S" },
    { id: "enforcer", name: "Enforcer", class: "specialist", rarity: 5, tier: "S" },
    { id: "erato", name: "Erato", class: "sniper", rarity: 5, tier: "S" },
    { id: "executor", name: "Executor", class: "sniper", rarity: 5, tier: "S" },
    { id: "feater", name: "FEater", class: "specialist", rarity: 5, tier: "S" },
    { id: "firewatch", name: "Firewatch", class: "sniper", rarity: 5, tier: "S" },
    { id: "firewhistle", name: "Firewhistle", class: "defender", rarity: 5, tier: "S" },
    { id: "flamebringer", name: "Flamebringer", class: "guard", rarity: 5, tier: "S" },
    { id: "flint", name: "Flint", class: "guard", rarity: 5, tier: "S" },
    { id: "folinic", name: "Folinic", class: "medic", rarity: 5, tier: "S" },
    { id: "franka", name: "Franka", class: "guard", rarity: 5, tier: "S" },
    { id: "frost", name: "Frost", class: "specialist", rarity: 5, tier: "S" },
    { id: "glaucus", name: "Glaucus", class: "supporter", rarity: 5, tier: "S" },
    { id: "grani", name: "Grani", class: "vanguard", rarity: 5, tier: "S" },
    { id: "greythroat", name: "GreyThroat", class: "sniper", rarity: 5, tier: "S" },
    { id: "greyy the lightningbearer", name: "Greyy the Lightningbearer", class: "sniper", rarity: 5, tier: "S" },
    { id: "harmonie", name: "Harmonie", class: "caster", rarity: 5, tier: "S" },
    { id: "heavyrain", name: "Heavyrain", class: "defender", rarity: 5, tier: "S" },
    { id: "heidi", name: "Heidi", class: "supporter", rarity: 5, tier: "S" },
    { id: "hibiscus the purifier", name: "Hibiscus the Purifier", class: "medic", rarity: 5, tier: "S" },
    { id: "highmore", name: "Highmore", class: "guard", rarity: 5, tier: "S" },
    { id: "honeyberry", name: "Honeyberry", class: "medic", rarity: 5, tier: "S" },
    { id: "hung", name: "Hung", class: "defender", rarity: 5, tier: "S" },
    { id: "indra", name: "Indra", class: "guard", rarity: 5, tier: "S" },
    { id: "insider", name: "Insider", class: "sniper", rarity: 5, tier: "S" },
    { id: "iris", name: "Iris", class: "caster", rarity: 5, tier: "S" },
    { id: "istina", name: "Istina", class: "supporter", rarity: 5, tier: "S" },
    { id: "jieyun", name: "Jieyun", class: "sniper", rarity: 5, tier: "S" },
    { id: "kafka", name: "Kafka", class: "specialist", rarity: 5, tier: "S" },
    { id: "kazemaru", name: "Kazemaru", class: "specialist", rarity: 5, tier: "S" },
    { id: "kestrel", name: "Kestrel", class: "vanguard", rarity: 5, tier: "S" },
    { id: "kirara", name: "Kirara", class: "specialist", rarity: 5, tier: "S" },
    { id: "kjera", name: "Kjera", class: "caster", rarity: 5, tier: "S" },
    { id: "kroos the keen glint", name: "Kroos the Keen Glint", class: "sniper", rarity: 5, tier: "S" },
    { id: "la pluma", name: "La Pluma", class: "guard", rarity: 5, tier: "S" },
    { id: "lappland", name: "Lappland", class: "guard", rarity: 5, tier: "S" },
    { id: "lava the purgatory", name: "Lava the Purgatory", class: "caster", rarity: 5, tier: "S" },
    { id: "leizi", name: "Leizi", class: "caster", rarity: 5, tier: "S" },
    { id: "leonhardt", name: "Leonhardt", class: "caster", rarity: 5, tier: "S" },
    { id: "liskarm", name: "Liskarm", class: "defender", rarity: 5, tier: "S" },
    { id: "lunacub", name: "Lunacub", class: "sniper", rarity: 5, tier: "S" },
    { id: "manticore", name: "Manticore", class: "specialist", rarity: 5, tier: "S" },
    { id: "mayer", name: "Mayer", class: "supporter", rarity: 5, tier: "S" },
    { id: "melanite", name: "Melanite", class: "sniper", rarity: 5, tier: "S" },
    { id: "meteorite", name: "Meteorite", class: "sniper", rarity: 5, tier: "S" },
    { id: "minimalist", name: "Minimalist", class: "caster", rarity: 5, tier: "S" },
    { id: "mint", name: "Mint", class: "caster", rarity: 5, tier: "S" },
    { id: "morgan", name: "Morgan", class: "guard", rarity: 5, tier: "S" },
    { id: "mr. nothing", name: "Mr. Nothing", class: "specialist", rarity: 5, tier: "S" },
    { id: "mulberry", name: "Mulberry", class: "medic", rarity: 5, tier: "S" },
    { id: "nearl", name: "Nearl", class: "defender", rarity: 5, tier: "S" },
    { id: "nightmare", name: "Nightmare", class: "caster", rarity: 5, tier: "S" },
    { id: "nine-colored deer", name: "Nine-Colored Deer", class: "supporter", rarity: 5, tier: "S" },
    { id: "paprika", name: "Paprika", class: "medic", rarity: 5, tier: "S" },
    { id: "platinum", name: "Platinum", class: "sniper", rarity: 5, tier: "S" },
    { id: "poncirus", name: "Poncirus", class: "vanguard", rarity: 5, tier: "S" },
    { id: "pramanix", name: "Pramanix", class: "supporter", rarity: 5, tier: "S" },
    { id: "projekt red", name: "Projekt Red", class: "specialist", rarity: 5, tier: "S" },
    { id: "provence", name: "Provence", class: "sniper", rarity: 5, tier: "S" },
    { id: "proviso", name: "Proviso", class: "supporter", rarity: 5, tier: "S" },
    { id: "ptilopsis", name: "Ptilopsis", class: "medic", rarity: 5, tier: "S" },
    { id: "puzzle", name: "Puzzle", class: "vanguard", rarity: 5, tier: "S" },
    { id: "qanipalaat", name: "Qanipalaat", class: "caster", rarity: 5, tier: "S" },
    { id: "quercus", name: "Quercus", class: "supporter", rarity: 5, tier: "S" },
    { id: "rathalos s noir corne", name: "Rathalos S Noir Corne", class: "guard", rarity: 5, tier: "S" },
    { id: "reed", name: "Reed", class: "vanguard", rarity: 5, tier: "S" },
    { id: "robin", name: "Robin", class: "specialist", rarity: 5, tier: "S" },
    { id: "rockrock", name: "Rockrock", class: "caster", rarity: 5, tier: "S" },
    { id: "santalla", name: "Santalla", class: "caster", rarity: 5, tier: "S" },
    { id: "savage", name: "Savage", class: "guard", rarity: 5, tier: "S" },
    { id: "scene", name: "Scene", class: "supporter", rarity: 5, tier: "S" },
    { id: "sesa", name: "Sesa", class: "sniper", rarity: 5, tier: "S" },
    { id: "shalem", name: "Shalem", class: "defender", rarity: 5, tier: "S" },
    { id: "shamare", name: "Shamare", class: "supporter", rarity: 5, tier: "S" },
    { id: "sideroca", name: "Sideroca", class: "guard", rarity: 5, tier: "S" },
    { id: "silence", name: "Silence", class: "medic", rarity: 5, tier: "S" },
    { id: "skyfire", name: "Skyfire", class: "caster", rarity: 5, tier: "S" },
    { id: "snowsant", name: "Snowsant", class: "specialist", rarity: 5, tier: "S" },
    { id: "sora", name: "Sora", class: "supporter", rarity: 5, tier: "S" },
    { id: "specter", name: "Specter", class: "guard", rarity: 5, tier: "S" },
    { id: "spuria", name: "Spuria", class: "specialist", rarity: 5, tier: "S" },
    { id: "swire", name: "Swire", class: "guard", rarity: 5, tier: "S" },
    { id: "tachanka", name: "Tachanka", class: "guard", rarity: 5, tier: "S" },
    { id: "tequila", name: "Tequila", class: "guard", rarity: 5, tier: "S" },
    { id: "texas", name: "Texas", class: "vanguard", rarity: 5, tier: "S" },
    { id: "toddifons", name: "Toddifons", class: "sniper", rarity: 5, tier: "S" },
    { id: "tomimi", name: "Tomimi", class: "caster", rarity: 5, tier: "S" },
    { id: "tsukinogi", name: "Tsukinogi", class: "supporter", rarity: 5, tier: "S" },
    { id: "tuye", name: "Tuye", class: "medic", rarity: 5, tier: "S" },
    { id: "valarqvin", name: "Valarqvin", class: "supporter", rarity: 5, tier: "S" },
    { id: "vulcan", name: "Vulcan", class: "defender", rarity: 5, tier: "S" },
    { id: "waai fu", name: "Waai Fu", class: "specialist", rarity: 5, tier: "S" },
    { id: "warfarin", name: "Warfarin", class: "medic", rarity: 5, tier: "S" },
    { id: "whislash", name: "Whislash", class: "guard", rarity: 5, tier: "S" },
    { id: "whisperain", name: "Whisperain", class: "medic", rarity: 5, tier: "S" },
    { id: "wild mane", name: "Wild Mane", class: "vanguard", rarity: 5, tier: "S" },
    { id: "wind chimes", name: "Wind Chimes", class: "guard", rarity: 5, tier: "S" },
    { id: "windflit", name: "Windflit", class: "supporter", rarity: 5, tier: "S" },
    { id: "zima", name: "Zima", class: "vanguard", rarity: 5, tier: "S" },
    { id: "aciddrop", name: "Aciddrop", class: "sniper", rarity: 4, tier: "S" },
    { id: "ambriel", name: "Ambriel", class: "sniper", rarity: 4, tier: "S" },
    { id: "arene", name: "Arene", class: "guard", rarity: 4, tier: "S" },
    { id: "beanstalk", name: "Beanstalk", class: "vanguard", rarity: 4, tier: "S" },
    { id: "beehunter", name: "Beehunter", class: "guard", rarity: 4, tier: "S" },
    { id: "bubble", name: "Bubble", class: "defender", rarity: 4, tier: "S" },
    { id: "chestnut", name: "Chestnut", class: "medic", rarity: 4, tier: "S" },
    { id: "click", name: "Click", class: "caster", rarity: 4, tier: "S" },
    { id: "conviction", name: "Conviction", class: "guard", rarity: 4, tier: "S" },
    { id: "courier", name: "Courier", class: "vanguard", rarity: 4, tier: "S" },
    { id: "cuora", name: "Cuora", class: "defender", rarity: 4, tier: "S" },
    { id: "cutter", name: "Cutter", class: "guard", rarity: 4, tier: "S" },
    { id: "deepcolor", name: "Deepcolor", class: "supporter", rarity: 4, tier: "S" },
    { id: "dobermann", name: "Dobermann", class: "guard", rarity: 4, tier: "S" },
    { id: "dur-nar", name: "Dur-nar", class: "defender", rarity: 4, tier: "S" },
    { id: "earthspirit", name: "Earthspirit", class: "supporter", rarity: 4, tier: "S" },
    { id: "estelle", name: "Estelle", class: "guard", rarity: 4, tier: "S" },
    { id: "ethan", name: "Ethan", class: "specialist", rarity: 4, tier: "S" },
    { id: "frostleaf", name: "Frostleaf", class: "guard", rarity: 4, tier: "S" },
    { id: "gavial", name: "Gavial", class: "medic", rarity: 4, tier: "S" },
    { id: "gitano", name: "Gitano", class: "caster", rarity: 4, tier: "S" },
    { id: "gravel", name: "Gravel", class: "specialist", rarity: 4, tier: "S" },
    { id: "greyy", name: "Greyy", class: "caster", rarity: 4, tier: "S" },
    { id: "gummy", name: "Gummy", class: "defender", rarity: 4, tier: "S" },
    { id: "haze", name: "Haze", class: "caster", rarity: 4, tier: "S" },
    { id: "humus", name: "Humus", class: "guard", rarity: 4, tier: "S" },
    { id: "indigo", name: "Indigo", class: "caster", rarity: 4, tier: "S" },
    { id: "jackie", name: "Jackie", class: "guard", rarity: 4, tier: "S" },
    { id: "jaye", name: "Jaye", class: "specialist", rarity: 4, tier: "S" },
    { id: "jessica", name: "Jessica", class: "sniper", rarity: 4, tier: "S" },
    { id: "luo xiaohei", name: "Luo Xiaohei", class: "guard", rarity: 4, tier: "S" },
    { id: "matoimaru", name: "Matoimaru", class: "guard", rarity: 4, tier: "S" },
    { id: "matterhorn", name: "Matterhorn", class: "defender", rarity: 4, tier: "S" },
    { id: "may", name: "May", class: "sniper", rarity: 4, tier: "S" },
    { id: "meteor", name: "Meteor", class: "sniper", rarity: 4, tier: "S" },
    { id: "mousse", name: "Mousse", class: "guard", rarity: 4, tier: "S" },
    { id: "myrrh", name: "Myrrh", class: "medic", rarity: 4, tier: "S" },
    { id: "myrtle", name: "Myrtle", class: "vanguard", rarity: 4, tier: "S" },
    { id: "perfumer", name: "Perfumer", class: "medic", rarity: 4, tier: "S" },
    { id: "pinecone", name: "Pinecone", class: "sniper", rarity: 4, tier: "S" },
    { id: "podenco", name: "Podenco", class: "supporter", rarity: 4, tier: "S" },
    { id: "pudding", name: "Pudding", class: "caster", rarity: 4, tier: "S" },
    { id: "purestream", name: "Purestream", class: "medic", rarity: 4, tier: "S" },
    { id: "quartz", name: "Quartz", class: "guard", rarity: 4, tier: "S" },
    { id: "roberta", name: "Roberta", class: "supporter", rarity: 4, tier: "S" },
    { id: "rope", name: "Rope", class: "specialist", rarity: 4, tier: "S" },
    { id: "scavenger", name: "Scavenger", class: "vanguard", rarity: 4, tier: "S" },
    { id: "shaw", name: "Shaw", class: "specialist", rarity: 4, tier: "S" },
    { id: "shirayuki", name: "Shirayuki", class: "sniper", rarity: 4, tier: "S" },
    { id: "sussurro", name: "Sussurro", class: "medic", rarity: 4, tier: "S" },
    { id: "totter", name: "Totter", class: "sniper", rarity: 4, tier: "S" },
    { id: "utage", name: "Utage", class: "guard", rarity: 4, tier: "S" },
    { id: "vermeil", name: "Vermeil", class: "sniper", rarity: 4, tier: "S" },
    { id: "vigna", name: "Vigna", class: "vanguard", rarity: 4, tier: "S" },
];

async function main() {
  console.log('Seeding database...');

  for (const operator of operators) {
    await prisma.operator.upsert({
      where: { id: operator.id },
      update: operator,
      create: operator,
    });
  }

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
