// Reads the google sheets gen 7 draft csv and finds matching data from standardSunAndMoonMons.json
// Outputs a new json file with matching 

const fs = require("fs");
const csv = require("csv-parser");
const gsCsv = [];
const jsonData = fs.readFileSync("./output/standardSunAndMoonMons.json");
const ghJson = JSON.parse(jsonData);

fs.createReadStream("./input/draft.csv").pipe(csv())
    .on("data", (d) => gsCsv.push(d))
    .on("end", () => main())

const main = () => {
    // loop through ghJson and load names with indexes into dict
    // name: indexInOriginalJson
    let githubNameDict = {};
    ghJson.forEach((mon, index) => githubNameDict[mon.name] = index)

    let output = [];

    const buoing = (name) => {
        if (githubNameDict[name] !== undefined) {
            output.push(ghJson[githubNameDict[name]]);
        }
    }

    // 1. mega alolan name formatting
    // 2. Check if name exists in set, if so pull data from sunAndMoon.json
    gsCsv.forEach((googleSheetMon) => {
        const monName = convertFromGoogleSheetsToSmogonJsonFormatting(googleSheetMon["Pokémon"]);

        if (githubNameDict[monName] !== undefined) {
            output.push(ghJson[githubNameDict[monName]]);
        }
    });

    // List of Pokemon that were the errors of a previous execution
    const handPickedMons = ["Castform-Sunny", "Castform-Rainy", "Castform-Snowy", "Nidoran-F", "Nidoran-M", "Wormadam-Sandy", "Wormadam-Trash", "Thundurus", "Tornadus", "Meowstic-F", "Meowstic-M", "Oricorio-Pom-Pom", "Oricorio-Pa'u", "Oricorio-Sensu", "Wishiwashi-School", "Minior-Meteor", "Lycanroc", "Flabebe"];

    handPickedMons.forEach(handPickedMon => {
        if (githubNameDict[handPickedMon] !== undefined) {
            output.push(ghJson[githubNameDict[handPickedMon]]);
        }
    });

    // Save to newer file
    fs.writeFileSync("output/gen7DraftSheet.json", JSON.stringify(output, null, "\t"));
    console.log("File saved to: smogon-data/output/gen7DraftSheet.json");
}

// Converts Alolan Sandslash -> Sandslash-Alola
// Mega Charizard X -> Charizard-Mega-X | Mega Blastoise -> Blastoise-Mega
const convertFromGoogleSheetsToSmogonJsonFormatting = (string) => {
    // Alolan Raticate -> Raticate-Alola
    const split = string.split(" ");

    if (split.includes("Alolan")) {
        return split[1] + "-Alola";
    }

    // Mega Charizard X -> Charizard-Mega-X
    if (split.includes("Mega")) {
        const extraWords = split.length > 2 ? "-" + split[2] : "";

        return split[1] + "-" + split[0] + extraWords;
    }

    return string;
}
