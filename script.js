"use strict";

const key = "DELwKI0VzYWGv8mss8kvGUoelOMrMFw2u4Ksk229";
const baseUrl = "https://developer.nps.gov/api/v1/parks";

let state;
let resultsNum;


function formatParameters(parameters) {
    const queryItems = Object.keys(parameters)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`);
    console.log(queryItems)
    return queryItems.join('&');
}

function displayResults(data) {
    console.log(data);
    $("#search-results").empty();
    for (let i = 0; i < data.length; i++) {
        $("#search-results")
        .append(`<h3>${data[i].fullName}</h3>
            <p>${data[i].description}</p>
            <p><a href=${data[i].url}>${data[i].url}</a><p>
            <p>${data[i].addresses[0].line1} ${data[i].addresses[0].line2}</p>
            <p>${data[i].addresses[0].city}, ${data[i].addresses[0].stateCode}.
                ${data[i].addresses[0].postalCode}</p>`);
    }
}

function getParks(query, limit) {
    const parameters = {
        api_key: key,
        stateCode: query,
        limit
    };

    console.log(parameters);
    const queryString = formatParameters(parameters);
    console.log(queryString);
    const finalUrl = baseUrl + "?" + queryString;

    fetch(finalUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(data => displayResults(data.data))
        .catch(err => {
            $(".error").text(`Problem encounterred: ${err.message}`);
        })

}

function getSearch() {
    $("form").submit(function (event) {
        event.preventDefault();
        console.log("data got");
        state = $("input[name='state']").val();
        encodeURIComponent(state);
        resultsNum = $("input[name='resultsNum']").val();
        console.log(state);
        console.log(resultsNum);
        getParks(state, resultsNum);
    });
}

$(getSearch);