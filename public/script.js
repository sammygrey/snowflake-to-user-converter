var userInput
var stateObj = { id: "100" };

const parseInput = e => {
    const userString = e.target.value
    var filteredString = userString.replace(/\D/g,'') 
    userInput.value = filteredString
    console.log(filteredString.length)
    if (filteredString.length === 0){
        filteredString = './'
    }
    sessionStorage.setItem("userInput", filteredString)
    history.replaceState(stateObj,'', filteredString);

    //getTime(filteredString)
    //on input remove all non numerical characters
}

const getTime = userID => {
    //convert snowflake to binary
    var valid = true
    var intID
    try{
        intID = BigInt(userID)
    }catch(err){
        return (null, false)
    }
    var valid = true
    var binary = intID.toString(2);
    binary = binary.padStart(64, '0')
    timestamp = parseInt(binary.slice(0,42),2)
    //1420070400000 is the epoch of discord's creation no accounts were created before this date
    //175928847299117063
    discordEpoch = 1420070400000
    currentEpoch = Date.now()
    if (timestamp + discordEpoch > currentEpoch){
        valid = false
    }
    console.log(timestamp + discordEpoch, valid)
    return (timestamp + discordEpoch, valid)
}
//copy image/larger view

//change url based on user id

//light dark mode based on browser

$(document).ready(function() {
    userInput = document.getElementById("snowflake")
    submitButton = document.getElementById("submit")
    if (sessionStorage.getItem("userInput") != null) {
        //if userInput storage == url ending
        sessionSnowflake = sessionStorage.getItem("userInput")
        if (location.href.split('/')[3] === sessionSnowflake){
            userInput.value = sessionSnowflake
        }
    }
    userInput.addEventListener('input', parseInput)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter'){
            location.href = `http://${location.href.split('/')[2]}/${userInput.value}`
        }
    })
    submitButton.addEventListener('click', function(e) {
        if (userInput.value != ''){
            location.href = `http://${location.href.split('/')[2]}/${userInput.value}`
        }
    })
});