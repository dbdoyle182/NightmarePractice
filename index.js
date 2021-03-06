const { csvFormat } = require('d3-dsv');
const Nightmare = require('nightmare');
const { readFileSync, writeFileSync } = require('fs');

const numbers = readFileSync('./tesco-title-numbers.csv', {encoding: 'utf8'}).trim().split('\n');

const START = 'https://eservices.landregistry.gov.uk/wps/portal/Property_Search';

const getAddress = async id => {
    console.log(`Now checking ${id}`);
    const nightmare = new Nightmare({ show: false });

    try {
        await nightmare
            .goto(START)
            .wait('.bodylinkcopy:first-child')
            .click('.bodylinkcopy:first-child');
    } catch(e) {
        console.error(e);
    }

    try {
        await nightmare
            .wait('input[name="titleNo"]')
            .type('input[name="titleNo"]', id)
            .click('input[value="Search »"]')
    } catch(e) {
        console.error(e);
    }

    try {
        const result = await nightmare
            .wait('.w80p')
            .evaluate(() => {
                return [...document.querySelectorAll('.w80p')]
                    .map(el => el.innerText);
            })
            .end();
            console.log(result);
            let refinedId = id.replace("\r", "");
            let address = result[0].replace(/\n/g, " ");
        return { id: refinedId, address: address, lease: result[1] };
    } catch(e) {
        console.error(e);
        return undefined;
    }
};



const series = numbers.reduce(async (queue, number) => {
    const dataArray = await queue;
    dataArray.push(await getAddress(number));
    return dataArray;
}, Promise.resolve([]));

series.then(data => {
    const csvData = csvFormat(data.filter(i => i));
    console.log(data)
    writeFileSync('./output.csv', csvData, { encoding: 'utf8' })
})
.catch(e => console.error(e));
