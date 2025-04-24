import { readFileSync } from 'fs';

const loadAndTrimJson = () => {
    const data = readFileSync(new URL("gen7DraftSheet.json", import.meta.url));
    const json = JSON.parse(data);

    const draftList = [];

    json.forEach((mon, id) => {
        let { name, hp, atk, def, spa, spd, spe, weight, height, types, abilities, fileName = "" } = mon;

        draftList.push({ id, name, hp, atk, def, spa, spd, spe, weight, height, types, abilities, fileName, picked: false });
    })

    return draftList;
}

export default loadAndTrimJson();