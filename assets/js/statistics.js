const moment = require("moment");
const uniqid = require("uniqid");
const getId = require("./utils");
const isValid = require('./validation.js')
const chart = require("chart.js");

let todaySteps = getId("todaySteps");
let yesterdaySteps = getId("yesterdaySteps");
let allResults = [];
let currentChart = undefined;


let displayResults = (allResults) => {
    todaySteps.innerHTML = "";
    yesterdaySteps.innerHTML = "";
    if (currentChart !== undefined) {
        currentChart.destroy();
    }

    for (let i = 0; i < allResults.length; i++) {
        if (allResults[i].date === moment().format("YYYY-MM-DD")) {
            todaySteps.innerHTML = `<p class="result"/> (${moment().format("DD.MM.YYYY")}) ${allResults[i].amount} </p>`;
        }
        if (allResults[i].date === moment().subtract(1, 'days').format("YYYY-MM-DD")) {
            yesterdaySteps.innerHTML = `<p class="result"/> (${moment().subtract(1, 'days').format("DD.MM.YYYY")}) ${allResults[i].amount}</p>`;
        }
    }

    const deleteBtns = document.getElementsByClassName("delete");
    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', () => {
            deleteResult(deleteBtn.id);
        })
    }

    const data = {
        labels: [],
        datasets: [{
            label: 'My steps',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
        }]
    };

    let x = 0;
    for (let i = 0; i < allResults.length; i++) {
        if (moment().format("YYYY-MM-DD") >= allResults[i].date && allResults[i].date > moment().subtract(7, 'days').format("YYYY-MM-DD")) {
            data.labels.push(moment(allResults[i].date, "YYYY-MM-DD").format('dddd'));
            data.datasets[0].data.push(allResults[i].amount);
            x += allResults[i].amount;
            getId("averageNumberSteps").innerHTML = `Average number of steps per week: ${Math.round(x / 7)}`;
        }
    }


    const config = {
        type: 'line',
        data,
        options: {}
    };

    currentChart = new Chart(
        getId('showResults'),
        config
    );
}

let saveResults = (results) => {
    localStorage.setItem("allResults", JSON.stringify(results));
    allResults = results;
}

const save = getId("save");
const inputNewResult = getId("newResult");
let date = getId("date");

document.addEventListener("DOMContentLoaded", () => {

    // let D = () => {
    //     newResultJson = {
    //         amount: 0,
    //         date: moment("2021-07-01", "YYYY-MM-DD").format("YYYY-MM-DD"),
    //         id: uniqid()
    //     }
    //     allResults.push(newResultJson);
    //     functionForSave();
    //     console.log(allResults)
    //     for (let i = 0; i <= allResults.length; i++) {
    //         newResultJson = {
    //             amount: 0,
    //             date: moment(allResults[i].date, "YYYY-MM-DD").add(1, 'days'),
    //             id: uniqid()
    //         }
    //         if (allResults[i].date == newResultJson.date) {
    //             allResults.push(newResultJson);

    //             functionForSave();
    //             console.log(allResults)
    //         } else {
    //             newResultJson = {
    //                 amount: 0,
    //                 date: moment(newResultJson.date, "YYYY-MM-DD").add(1, 'days'),
    //                 id: uniqid()
    //             }
    //             allResults.push(newResultJson);
    //             functionForSave();

    //             console.log(allResults)
    //         }
    //     }
    // }

    let validat = () => {
        if ((!isValid(date.value) || !isValid(inputNewResult.value)) === false) {
            save.disabled = false;
        } else {
            save.disabled = true;
        }
    }

    inputNewResult.addEventListener("input", () => {
        validat()
    })

    date.addEventListener("input", () => {
        validat()
    })

    let loadedAllTasks = localStorage.getItem("allResults");

    if (loadedAllTasks != null) {
        allResults = JSON.parse(loadedAllTasks);
        displayResults(allResults);
    }
    // D();
});



let functionForSave = () => {
    allResults.sort(function (a, b) {
        var keyA = new Date(a.date),
            keyB = new Date(b.date);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    displayResults(allResults);
    saveResults(allResults);
    save.disabled = true;
    getId("newResult").value = "";
    getId("date").value = "";
}

save.addEventListener('click', () => {
    let newResult = parseFloat(getId("newResult").value);
    let newDate = getId("date").value;

    newResultJson = {
        amount: newResult,
        date: newDate,
        id: uniqid()
    }
    if (allResults.length === 0) {
        allResults.push(newResultJson);

        functionForSave();
    } else {
        for (let i = 0; i < allResults.length; i++) {
            if (allResults[i].date === newResultJson.date) {
                allResults[i].amount += newResultJson.amount;

                functionForSave();
                return;
            }
        }
        allResults.push(newResultJson);

        functionForSave();
    }
})

const deleteResult = (id) => {
    const filtredAllResults = allResults.filter(result => result.id !== id)
    saveResults(filtredAllResults);
    displayResults(allResults);
}