import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: getAvgMpg(mpg_data),
    allYearStats: getAllYearStats(mpg_data),
    ratioHybrids: getRatioHybrids(mpg_data),
};

export function getAvgMpg(array) {
    let hwyMpg = [];
    let cityMpg = [];
    for (let i=0; i<array.length; i++) {
        hwyMpg.push(array[i].highway_mpg);
        cityMpg.push(array[i].city_mpg);
    }
    var cityAvg = getStatistics(cityMpg).mean;
    var hwyAvg = getStatistics(hwyMpg).mean;
    return {city: cityAvg, highway: hwyAvg};
}

export function getAllYearStats(array) {
    let years = [];
    for (let i=0; i<array.length; i++) {
        years.push(array[i].year);
    }
    return getStatistics(years);
}

export function getRatioHybrids(array) {
    let isHybrid = 0;
    for (let i=0; i<array.length; i++) {
        if (array[i].hybrid == true) {
            isHybrid++;
        }
    }
    return isHybrid/array.length;
}


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: getMakerHybrids(mpg_data),
    avgMpgByYearAndHybrid: getYearAndHybrid(mpg_data)
};

export function getMakerHybrids(array) {
    // let makes = [];
    // let hybridIds = [];
    let makesAndIds = [];
    for (let i=0; i<array.length; i++) {
        if (array[i].hybrid == true) {
            // makes.push(array[i].make);
            // hybridIds.push(array[i].id);
            makesAndIds = {make: array[i].make, hybrids: array[i].id};
        }
    }
    
    const transformArr = (makesAndIds = []) => {
        const res = [];
        const map = {};
        let i, curr;
        for (i=0; i<makesAndIds.length; i++) {
            curr = makesAndIds[i];
            if (!(curr.make in map)) {
                map[curr.make] = {make: curr.make, hybrids: []};
                res.push(map[curr.make]);
            };
            map[curr.make].hybrids.push(curr.hybrids);
        };
        return res;
    }
    // function groupBy(objectArr, property) {
    //     return objectArr.reduce(function (acc, obj) {
    //         let key = obj[property];
    //         if (!acc[key]) {
    //             acc[key] = [];
    //         }
    //         acc[key].push(obj);
    //         return acc;
    //     }, {})
    // }
    // return groupBy(makesAndIds, 'make');
}



export function getYearAndHybrid(array) {
    let hybrids = [];
    let nonHybrids = [];
    for (let i=0; i<array.length; i++) {
        if (array[i].hybrid) {
            hybrids.push({city_mpg: array[i].city_mpg, highway_mpg: array[i].highway_mpg, year: array[i].year});
        } else {
            nonHybrids.push({city_mpg: array[i].city_mpg, highway_mpg: array[i].highway_mpg, year: array[i].year});
        }
    }

    const transformArr = (array = []) => {
        const res = [];
        const map = {};
        let i, curr;
        for (i=0; i<array.length; i++) {
            curr = array[i];
            if (!(curr.year in map)) {
                map[curr.year] = {year: curr.year, hybrid: [], nonHybrid: []};
                res.push(map[curr.year]);
            };
            if (curr.hybrid) {
                map[curr.year].hybrid.push({city_mpg: curr.city_mpg, highway_mpg: curr.highway_mpg});
            } else {
                map[curr.year].nonHybrid.push({city_mpg: curr.city_mpg, highway_mpg: curr.highway_mpg});
            }
        };
        return res;
    }
    
    // function groupBy(objectArr, property) {
    //     return objectArr.reduce(function (acc, obj) {
    //         let key = obj[property];
    //         if (!acc[key]) {
    //             acc[key] = [];
    //         }
    //         acc[key].push(obj);
    //         return acc;
    //     }, {})
    // }
}