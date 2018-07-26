const { csvFormat } = require('d3-dsv');
const Nightmare = require('nightmare');
const { writeFileSync } = require('fs');
require("dotenv").config()

const numbers = ['1'];
const email = process.env.SB_USER_NAME;
const password = process.env.SB_PASSWORD
const number = "1";

const START = "https://www.switchboard.tech/";

const getCheckpoints = async number => {
    console.log(`Now checking Checkpoint ${number}`);
    const nightmare = new Nightmare({ show: true });

    try {
        await nightmare
            .goto(START)
            .wait('.login-btn')
            .click('.login-btn');
    } catch(e) {
        console.error(e);
    }

    try {
        await nightmare
            .wait('input[name="login"]')
            .type('input[name="login"]', email)
            .wait('input[name="password"]')
            .type('input[name="password"]', password)
            .click('input[name="commit"]')
    } catch(e) {
        console.error(e);
    }

    try {
        await nightmare
            .wait('')
            .goto('https://www.switchboard.tech/dashboard')
            .wait('.class-checkpoint-avg')
    } catch(e) {
        console.error(e);
    }

    // try {
    //     const result = await nightmare
    //         .wait('.selection-component')
    //         .evaluate(() => {
    //             fetch(`/api/grades/UNCCHAR20180514FSF-FT/${number}`, {
    //                 credentials: 'same-origin'
    //                }).then(function (res) {
    //                 return res.json();
    //               }).then(function (data) {
    //                 return data.class.students;
    //                 // for (let student of array) {
    //                 //     if(student.checkpoint !== null) {
    //                 //         console.log(student.name + ',' + student.checkpoint.result)
    //                 //     } else {
    //                 //         console.log(student.name + ',0')
    //                 //     }
            
    //                 // }
    //               });
    //         })
    //         .end();
    //         console.log(result);
    //     //     let refinedId = id.replace("\r", "");
    //     //     let address = result[0].replace(/\n/g, " ");
    //     // return { id: refinedId, address: address, lease: result[1] };
    // } catch(e) {
    //     console.error(e);
    //     return undefined;
    // }
};

getCheckpoints("1");