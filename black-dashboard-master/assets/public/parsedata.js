
let firstcolorArray = ['#1d3163', '#223a75', '#264082', '#29468f', '#2d4ea1',
    '#3154ad', '#375ebf', '#3c66cf', '#3c66cf', '#3c66cf',
    '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf',
    '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf',
    '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf', '#3c66cf'];

let pieColorArray = ['#1d3163', '#3274db', '#6da0ed', '#2d4ea1', '#375ebf', '#3b73cc', '#337ae8', '#6da0ed']

function makeChartData(data, stringParam, numberParam, topAmount, colorArray) {
    const totalObj = {};

    let total = 0;
    data.forEach(d => {
        total += parseInt(d[numberParam]);
    })

    data.forEach(d => {

        if (totalObj[String(d[stringParam])] === undefined) {
            totalObj[String(d[stringParam])] = parseInt(d[numberParam]);
        } else {
            totalObj[String(d[stringParam])] += parseInt(d[numberParam]);
        }
    });

    const percentObj = {};

    Object.keys(totalObj).forEach(function (key) {

        percentObj[key] = (totalObj[key] / total) * 100;


    });

    const arr = Object.values(percentObj).sort(function (a, b) { return b - a });
    const topValueArray = arr.slice(0, topAmount);




    const topKeyArray = [];

    for (let i = 0; i < topAmount; i++) {
        let arrayIndex = ((Object.values(percentObj).indexOf(topValueArray[i])));
        topKeyArray.push(Object.keys(percentObj)[arrayIndex]);
    }


    // console.log(topValueArray);
    // console.log(topKeyArray);
    // console.log(percentObj);

    const arrayOfArraysReturn = [];
    arrayOfArraysReturn.push([stringParam, numberParam, { role: "style" }]);

    for (let i = 0; i < topAmount; i++) {
        arrayOfArraysReturn.push([topKeyArray[i], topValueArray[i], colorArray[i]]);
    }

    // console.log(arrayOfArraysReturn);

    return arrayOfArraysReturn;
}


function makeChartDataNocolor(data, stringParam, numberParam, topAmount) {
    const totalObj = {};

    let total = 0;
    data.forEach(d => {
        total += parseInt(d[numberParam]);
    })

    data.forEach(d => {

        if (totalObj[String(d[stringParam])] === undefined) {
            totalObj[String(d[stringParam])] = parseInt(d[numberParam]);
        } else {
            totalObj[String(d[stringParam])] += parseInt(d[numberParam]);
        }
    });

    const percentObj = {};

    Object.keys(totalObj).forEach(function (key) {

        percentObj[key] = (totalObj[key] / total) * 100;


    });

    const arr = Object.values(percentObj).sort(function (a, b) { return b - a });
    const topValueArray = arr.slice(0, topAmount);




    const topKeyArray = [];

    for (let i = 0; i < topAmount; i++) {
        let arrayIndex = ((Object.values(percentObj).indexOf(topValueArray[i])));
        topKeyArray.push(Object.keys(percentObj)[arrayIndex]);
    }


    // console.log(topValueArray);
    // console.log(topKeyArray);
    // console.log(percentObj);

    const arrayOfArraysReturn = [];
    arrayOfArraysReturn.push([stringParam, numberParam]);

    for (let i = 0; i < topAmount; i++) {
        arrayOfArraysReturn.push([topKeyArray[i], topValueArray[i]]);
    }

    return arrayOfArraysReturn;
}

function mergeData(firstData,secondData){

    let mergedData = [];
    let index;
    for(index = 0;index<firstData.length;index++){
        mergedData.push([firstData[index][0],firstData[index][1],secondData[index][1]]);
    }
    return mergedData;

}