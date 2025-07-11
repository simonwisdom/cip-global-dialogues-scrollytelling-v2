
import fs from "fs/promises";
import path from "path";
import { csvParse } from "d3-dsv";

/* -------------------------------------------------------------------------
   CONFIG
   --------------------------------------------------------------------- */
const AGREEMENT_DATA_PATH = path.resolve(
  process.cwd(),
  "website/public/data/agreement_data.csv"
);
const COUNTRIES_TOPO_PATH = path.resolve(
  process.cwd(),
  "website/public/data/countries-110m.json"
);
const OUTPUT_PATH = path.resolve(
  process.cwd(),
  "website/public/data/countries-with-agreement.json"
);
const UN_M49_PATH = path.resolve(
  process.cwd(),
  "website/public/data/2022-09-24__JSON_UNSD_M49.json"
);

/* -------------------------------------------------------------------------
   MAIN
   --------------------------------------------------------------------- */
async function main() {
  console.log("Starting data processing...");

  // 1. Load all data sources
  const [agreementCsv, countriesTopo, unM49] = await Promise.all([
    fs.readFile(AGREEMENT_DATA_PATH, "utf-8"),
    fs.readFile(COUNTRIES_TOPO_PATH, "utf-8").then(JSON.parse),
    fs.readFile(UN_M49_PATH, "utf-8").then(JSON.parse),
  ]);
  console.log("Data loaded.");

  // 2. Process agreement data into a lookup map
  const agreementData = csvParse(agreementCsv);
  const agreementMap = createAgreementMap(agreementData);
  console.log("Agreement data processed.");

  // 3. Process UN M49 data into a country-to-region lookup
  const countryToRegionMap = createCountryToRegionMap(unM49);
  console.log("Country to region map created.");

  // 4. Join data and inject into TopoJSON
  const { updatedTopo, notFound } = joinData(
    countriesTopo,
    countryToRegionMap,
    agreementMap
  );
  console.log("Data joined.");
  if (notFound.length > 0) {
    console.warn(`Could not find agreement data for ${notFound.length} countries:`);
    console.warn(notFound.join(", "));
  }

  // 5. Write the output file
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(updatedTopo, null, 2));
  console.log(`Processing complete. Output written to: ${OUTPUT_PATH}`);
}

/* -------------------------------------------------------------------------
   HELPERS
   --------------------------------------------------------------------- */
/**
 * Creates a map from a normalized region name to its agreement percentage.
 * It also handles the "Other" categories from the CSV.
 */
function createAgreementMap(data) {
  const map = new Map();
  const norm = (str) => str.toLowerCase().replace(/[\s-]/g, "");

  // Manual mappings for "Other" categories based on CSV notes
  const otherRegionMappings = {
    otherafrica: ["middleafrica", "southernafrica", "westernafrica"],
    otherasia: ["centralasia"],
    othernorthamerica: ["caribbean", "centralamerica"],
  };

  data.forEach((row) => {
    const regionKey = norm(row.region);
    const value = {
      agreement_pct: parseFloat(row.agreement_pct),
      n: parseInt(row.n, 10),
    };

    if (otherRegionMappings[regionKey]) {
      otherRegionMappings[regionKey].forEach((subRegionKey) => {
        map.set(subRegionKey, value);
      });
    } else {
      // Handle typos in source data
      if (regionKey === "southerasia") {
        map.set("southernasia", value);
      } else if (regionKey === "northereurope") {
        // incoming "Norther Europe" from CSV normalizes to "northereurope"
        map.set("northerneurope", value);
      } else {
        map.set(regionKey, value);
      }
    }
  });

  return map;
}

/**
 * Creates a map from a country name to its geological regions.
 */
function createCountryToRegionMap(unM49) {
  const norm = (str) => (str || "").toLowerCase().replace(/\s|-/g, "");
  const countryToRegionMap = new Map();

  unM49.forEach((country) => {
    const countryName = norm(country["Country or Area"]);
    const regionHierarchy = {
      intermediate: norm(country["Intermediate Region Name"]),
      sub: norm(country["Sub-region Name"]),
      region: norm(country["Region Name"]),
    };

    if (countryName && (regionHierarchy.intermediate || regionHierarchy.sub || regionHierarchy.region)) {
      countryToRegionMap.set(countryName, regionHierarchy);
    }
  });

  // Manually add Taiwan to Eastern Asia
  countryToRegionMap.set("taiwan(provinceofchina)", {
    intermediate: "easternasia",
    sub: "easternasia",
    region: "asia",
  });

  return countryToRegionMap;
}

/**
 * Joins the agreement data into the TopoJSON file.
 */
function joinData(topoData, countryToRegionMap, agreementMap) {
  const countries = topoData.objects.countries.geometries;
  const notFound = [];
  const norm = (str) => (str || "").toLowerCase().replace(/\s|-/g, "");

  const countryNameExceptions = {
    "bosniaandherz.": "bosniaandherzegovina",
    "centralafricanrep.": "centralafricanrepublic",
    "côted'ivoire": "côted’ivoire",
    "dem.rep.congo": "democraticrepublicofthecongo",
    "dominicanrep.": "dominicanrepublic",
    "eq.guinea": "equatorialguinea",
    eswatini: "eswatini",
    "falklandis.": "falklandislands(malvinas)",
    "fr.s.antarcticlands": "frenchsouthernterritories",
    kosovo: "serbia", // M49 does not list Kosovo separately
    macedonia: "northmacedonia",
    "n.cyprus": "cyprus",
    palestine: "stateofpalestine",
    "s.sudan": "southsudan",
    "solomonis.": "solomonislands",
    somaliland: "somalia",
    "timor-leste": "timorleste",
    "w.sahara": "westernsahara",
    // Newly added exceptions
    tanzania: "unitedrepublicoftanzania",
    russia: "russianfederation",
    bolivia: "bolivia(plurinationalstateof)",
    venezuela: "venezuela(bolivarianrepublicof)",
    laos: "laopeople'sdemocraticrepublic",
    "northkorea": "democraticpeople'srepublicofkorea",
    "southkorea": "republicofkorea",
    iran: "iran(islamicrepublicof)",
    syria: "syrianarabrepublic",
    moldova: "republicofmoldova",
    turkey: "türkiye",
    taiwan: "taiwan(provinceofchina)",
    "unitedkingdom": "unitedkingdomofgreatbritainandnorthernireland",
    brunei: "bruneidarussalam",
  };

  countries.forEach((country) => {
    let countryName = norm(country.properties.name);

    if (countryNameExceptions[countryName]) {
      countryName = countryNameExceptions[countryName];
    }

    const regionHierarchy = countryToRegionMap.get(countryName);

    if (regionHierarchy) {
      // Try to find agreement data in order of specificity: intermediate -> sub -> region
      const agreementData =
        agreementMap.get(regionHierarchy.intermediate) ??
        agreementMap.get(regionHierarchy.sub) ??
        agreementMap.get(regionHierarchy.region);

      if (agreementData !== undefined) {
        country.properties.agreement_pct = agreementData.agreement_pct;
        country.properties.n = agreementData.n;
      } else {
        const searchedRegions = [regionHierarchy.intermediate, regionHierarchy.sub, regionHierarchy.region].filter(Boolean).join(", ");
        notFound.push(
          `${country.properties.name} (regions: [${searchedRegions}], no agreement value)`
        );
        country.properties.agreement_pct = null;
        country.properties.n = null;
      }
    } else {
      if (country.properties.name && country.properties.name !== "Antarctica")
        notFound.push(country.properties.name);
      country.properties.agreement_pct = null;
      country.properties.n = null;
    }
  });

  return { updatedTopo: topoData, notFound };
}


main().catch((err) => {
  console.error("An error occurred during data processing:", err);
  process.exit(1);
}); 