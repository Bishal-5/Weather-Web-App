// Selecting elements from the DOM
const weatherForm = document.getElementById('weatherForm'); // The form element
const locationInput = document.getElementById('locationInput'); // Input field for location
const weatherResults = document.getElementById('weatherResults'); // Div for displaying weather results
const moreInfo = document.getElementById('moreInfo'); //Display more information (Wind, Humidity)
const locationName = document.getElementById('location'); // Span for displaying location name
const temperature = document.getElementById('temperature'); // Span for displaying temperature
const weather_img = document.getElementById('weather-img'); //Access weather image field
const description = document.getElementById('description'); // Span for displaying weather description
const wind = document.getElementById('wind'); // Span for displaying wind speed
const humidity = document.getElementById('humidity'); // Span for displaying humidity
const error_photo = document.getElementById('error-photo'); //Access error photo div
const loader = document.getElementById('loader');

// API key for accessing weather data (replace with your actual API key)
const apiKey = '7e455ce9f03c070393116dcbaa30688f';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?q='

// Event listener for form submission & fetch data from API & show result
weatherForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const location = locationInput.value; // Get the value entered in the location input field

    //If user give no input or form is empty
    if (location === "" || location === " ") {
        alert('Please Enter a City Name!')
    }

    // Fetch weather data from API & display the weather report
    async function checkReport() {
        const result = await fetch(apiURL + `${location}&appid=${apiKey}&units=metric`); //Create URL
        let weather_data = await result.json(); //Get result in JSON format

        // console.log(weather_data); //Show full weather data in console only

        //If any error then display error message
        if (weather_data.cod === '404') { //404 error code
            //Show the error image & message div
            alert('City Not Found'); //Alert message
            error_photo.style.display = 'inline'; //Show error image
        } else {
            //If no any error display Weather Result area
            weatherResults.style.display = "unset"; //Temperature
            moreInfo.style.display = "flex"; //Wind, Humidity
        }

        //Display weather result
        locationName.textContent = weather_data.name; //Display location
        const temp_data = weather_data.main.temp; //Store Temperture
        //Covert Decimal to Real Number (Math.floo())
        temperature.textContent = `${Math.floor(temp_data)} °C`; //Display Temperture
        description.textContent = weather_data.weather[0].description; //Display description
        wind.textContent = `${weather_data.wind.speed} Km/h`; //Display wind
        humidity.textContent = `${weather_data.main.humidity} %`; //Display humidity

        //Change weather image according to weather report
        switch (weather_data.weather[0].main) {
            case 'Haze':
                weather_img.src = 'Image/Haze.png'
                break;
            case 'Clear':
                weather_img.src = 'Image/Clear.png'
                break;
            case 'Clouds':
                weather_img.src = 'Image/Clouds.png'
                break;
            case 'Mist':
                weather_img.src = 'Image/Mist.png'
                break;
            case 'Rain':
                weather_img.src = 'Image/Rain.png'
                break;
            case 'Snow':
                weather_img.src = 'Image/Snow.png'
                break;
            case 'Thunderstorm':
                weather_img.src = 'Image/Thunderstorm.png'
        }
    }




    checkReport(); //Function call to get weather data  
});

//Activate Refresh button
weatherForm.addEventListener('reset', function (event) {
    location.reload();
})
