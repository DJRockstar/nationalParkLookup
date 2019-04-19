'use strict'

const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key =>`${key}=${params[key]}`)
    return queryItems.join('&');
}

function displayResults(responseJson){
    $("#results").empty();
    for(let i = 0; i < $("#js-max-results").val(); i++){
        $("#results").append(`
         <ul id="results-list">
        		<li class="stateName"><strong>${responseJson.data[i].states}</strong></li>
            <li class="park-name"><strong>${responseJson.data[i].fullName}</strong></li>
            <li class="description"><strong>Description:</strong> ${responseJson.data[i].description}</li>
            <li class="park-link"><a href="${responseJson.data[i].url}">Link to Park</a></li>
        </ul>
        `) 
        $("#results").removeClass("hidden");
    }
  
}

function getInfo(stateCode, maxResults=10){
    const params = {
        api_key : "xGeAedOFFc4z4HHevvfvFId8YSXlzVUCg7VtwhrJ",
        stateCode: stateCode,
        maxResults
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(responseJson => { 
        console.log(responseJson);
        displayResults(responseJson);
    }) 
}


function watchForm(){
    $("form").on("submit", (e)=>{
        e.preventDefault();
        const stateCode = $(".state-code").val();
        const maxResults = $("#js-max-results").val();
        getInfo(stateCode, maxResults);
    })
}

$(watchForm)