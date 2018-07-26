const { csvFormat } = require('d3-dsv');
const Nightmare = require('nightmare');
const { writeFileSync } = require('fs');
require("dotenv").config();

const email = process.env.ZP_USER_EMAIL;
const password = process.env.ZP_PASSWORD;

const zipRecruiter = "https://www.ziprecruiter.com/login?realm=candidates";


const applyToJobs = async (location, title) => {
    console.log(`Now checking ${title} in ${location}`);
    const nightmare = new Nightmare({ show: true });

    try {
        await nightmare
            .goto(zipRecruiter)
            .wait("input[name=email]")
            .type("input[name=email]", email)
            .wait("input[name=password]")
            .type("input[name=password]", password)
            .click("input[type=submit]")
    } catch(e) {
        console.error(e)
    }


}

applyToJobs("Charlotte, NC", "Junior Developer")
