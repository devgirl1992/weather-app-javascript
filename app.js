window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let locationTimeZone = document.querySelector(".timezone");
  let temperatureDegree = document.querySelector(".tem-degree");
  let temperaturDescription = document.querySelector(".tem-description");
  let temperatureSection = document.querySelector(".temperature");
  let temperatireSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/687e2ddc19ef4b7895351d36350c2519/${latitude},${longitude}`;

      fetch(api)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          console.log(icon);
          console.log(temperature);
          const celsius = Math.floor((temperature - 32) * (5 / 9));
          console.log(celsius);

          //Set DOM Element from API
          temperatureDegree.textContent = temperature;
          temperaturDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;

          //Set Icon
          setIcons(icon, document.querySelector(".icon"));

          //Change temperature to Celsius/Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatireSpan.textContent === "F") {
              temperatireSpan.textContent = "C";
              temperatureDegree.textContent = celsius;
            } else {
              temperatireSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    let skycons = new Skycons({ color: "white" });
    let currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
