var countryList = {
    'de':'Germany',
    'ie':'Ireland',
    'tw':'Taiwan',
    'es':'Spain',
    'cz':'Czech Republic,The Czech Republic',
    'be':'Belgium',
    'jp':'Japan',
    'ru':'Russia',
    'hr':'Croatia',
    'ee':'Estonia',
    'cn':'China',
    'at':'Austria',
    'ch':'Switzerland',
    'fr':'France',
    'pt':'Portugal',
    'us':'USA,The United States,US,The United States of America',
    'md':'Moldova',
    'pl':'Poland',
    'fi':'Finland',
    'uk':'UK,The United Kingdom,United Kingdom',
    'in':'India',
    'no':'Norway',
    'dk':'Denmark',
    'nl':'Netherlands,The Netherlands',
    'sk':'Slovakia',
    'lt':'Lithuania',
}

AOS.init();

alertify.set('notifier','position', 'top-center');

getPhoto();

//JQuery which detects if Enter is pushed (preventDefault keeps page from refreshing before executing checkAnswer)
$('#countryInput').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault(); //critical to function properly!
        checkAnswer();
    }
});



async function getPhoto() {

    //get random country
    const countriesAbbrev = Object.keys(countryList)
    const randomCountry = countriesAbbrev[Math.floor(Math.random() * countriesAbbrev.length)]
    nameToCheck = countryList[randomCountry] //not using var type makes the var GLOBAL
    listToCheck = nameToCheck.split(",")

    //pull all JSON data from country
    const res = await fetch(`https://api.railway-stations.org/${randomCountry}/stations?hasPhoto=True`)
    const data = await res.json();
    const text = JSON.stringify(data);
    const obj = JSON.parse(text);

    //pick random object (train station) from JSON array
    const station = obj[Math.floor(Math.random() * obj.length)];
    const station_strings = JSON.stringify(station);
    const stationObj = JSON.parse(station_strings);

    //extract photo's URL
    const photoURL = stationObj.photoUrl;

    //Jquery Zoom
    $(document).ready(function(){
        $('#railPhoto').zoom({magnify: 1});
    });

    //send image to div, displaying it on page
    document.getElementById('railPhoto').innerHTML = `<img src=${photoURL} class='shadow rounded' style='display:block;margin-left:auto;margin-right:auto;height:70%;width:70%'>`;

    //return country name
    console.log(nameToCheck);
}


function checkAnswer(){

    var countryInput = document.getElementById('countryInput').value;

    if(listToCheck.includes(countryInput) == true){
        //alert('Correct!');
        alertify.success('Correct!');

        $('#countryInput').val(''); //reset input box
        getPhoto(); //get next photo
    }
    else if(listToCheck.includes(countryInput) == false){
        //alert(`False! The correct answer is ${nameToCheck}`);
        alertify.error(`False! The correct answer is ${listToCheck[0]}`);

        $('#countryInput').val(''); //reset input box
        getPhoto(); //get next photo
    }

}


