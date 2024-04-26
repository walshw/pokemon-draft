const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeImages(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('figure').each((index, element) => {
            const $figure = $(element);
            const artistName = $figure.find('figcaption').text().split("by ")[1].trim();
            const altText = $figure.find('img').attr('alt');
            const imageUrl = $figure.find('img').attr('src');
            
            if (altText && imageUrl) {
                const fileName = altText.replace(".png", "") + "_" + artistName + ".png";
                downloadImage(imageUrl, fileName);
            }
        });
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

// Example usage:
const url = 'https://play.pokemonshowdown.com/sprites/trainers/credits/'; // Replace with your URL
scrapeImages(url);
