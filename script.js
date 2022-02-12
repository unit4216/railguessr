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

//init Animate On Scroll
AOS.init();

//set position for Alertify
alertify.set('notifier','position', 'top-center');

//get initial photo
getPhoto();

//submit guess on enter
$('#countryInput').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault(); 
        checkAnswer();
    }
});

async function getPhoto() {

    //get random country
    const countriesAbbrev = Object.keys(countryList)
    const randomCountry = countriesAbbrev[Math.floor(Math.random() * countriesAbbrev.length)]
    nameToCheck = countryList[randomCountry] //global variable assignment
    listToCheck = nameToCheck.split(",")    //used for when there are multiple correct answers i.e. US, USA, The United States

    //pull all train station photos for the random country
    const res = await fetch(`https://api.railway-stations.org/${randomCountry}/stations?hasPhoto=True`)
    const obj = await res.json();

    //pick random object (train station) from JSON array
    const stationObj = obj[Math.floor(Math.random() * obj.length)];

    //extract photo's URL
    const photoURL = stationObj.photoUrl;

    //init Jquery.zoom
    $(document).ready(function(){
        $('#railPhoto').zoom({magnify: 1});
    });

    //send image to div, displaying it on page
    document.getElementById('railPhoto').innerHTML = `<img src=${photoURL} class='shadow rounded' id='image'>`;

    //print country name in console
    console.log(nameToCheck);
}


function checkAnswer(){

    var countryInput = document.getElementById('countryInput').value;

    if(listToCheck.includes(countryInput) == true){

        alertify.success('Correct!');
        $('#countryInput').val(''); //reset input box
        getPhoto(); //get next photo

    }
    else if(listToCheck.includes(countryInput) == false){

        alertify.error(`False! The correct answer is ${listToCheck[0]}`);
        $('#countryInput').val(''); //reset input box
        getPhoto(); //get next photo

    }

}


