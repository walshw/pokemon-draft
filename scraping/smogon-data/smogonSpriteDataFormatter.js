const rawSmJson = require('./input/sm.json');
// const standardSM = require("./output/standardSunAndMoonMons.json");
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

// load sm.json -> https://github.com/simoniz0r/smogon-dump/blob/main/sm.json
// remove all non-standard pokemon, anything that isnt "isNonstandard": "Standard"
// write to new json

const standardSM = rawSmJson.pokemon.filter(pokemon => pokemon["isNonstandard"] === "Standard");

// get all the pokemon images
// go through list of standard pokemon and match by name
// store them in public folder like how we did pfps
// add "fileName" to json "/sprites/bulbasaur.png"

async function scrapeImages(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let reachedEndHeader = false;

        $('.gen7 tr').each((index, element) => {
            const row = $(element);

            if (row.hasClass("header")) {
                reachedEndHeader = true;
            }

            if (reachedEndHeader) {
                return;
            }

            const pokemonName = row.find('td').last().text();
            const imgSrc = row.find('img').attr('src');

            // If pokemon name is in standardSunAndMoonMons.json, download picture
            // Add attribute "fileName" to mon
            const monIndex = standardSM.findIndex(mon => mon.name.toLowerCase() == pokemonName);
            if (monIndex !== -1) {
                const filename = pokemonName + ".png";
                standardSM[monIndex]["fileName"] = "/sprites/" + filename;
                downloadImage(imgSrc, filename);
            }

            // console.log(pokemonName);
            // console.log(imgdata);

        });

        const monsWithoutImages = standardSM.filter(mon => mon["fileName"] === undefined);

        console.log(monsWithoutImages);

        fs.writeFileSync("output/standardSunAndMoonMons.json", JSON.stringify(standardSM, null, "\t"));
        console.log("File saved to: smogon-data/output/standardSunAndMoonMons.json");

        if (monsWithoutImages.length > 0) {
            fs.writeFileSync("output/monsWithoutImages.json", JSON.stringify(monsWithoutImages, null, "\t"));
            console.log("SOME MONS DO NOT HAVE IMAGES\n Error file saved to: smogon-data/output/monsWithoutImages.json");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function downloadImage(url, fileName) {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        });

        const folderPath = path.join(__dirname, 'images');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const filePath = path.join(folderPath, fileName);
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

scrapeImages("https://msikma.github.io/pokesprite/overview/dex-gen7.html");
