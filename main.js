let n = 0;
let currentLat, currentLon;

function getPlace(lat, lon) {
    let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const div = document.querySelector('.my-location');

        try {
            let town = data?.address?.town ? data.address?.town : data?.address?.city;

            let content = 
            `
                <div>Town: ${town}</div>
                <div>Region: ${data.address.region}</div>
                <div>State: ${data.address.state}</div>
                <div>---------------------</div>
                <div>Display Name: ${data?.display_name}</div>

            `;

            div.innerHTML = content;
            n++;
            console.log(n);
        } catch (error) {
            console.log(error);
        }
    })
    .catch(error => console.log(error));
}

function getGeolocation() {
    if (navigator.geolocation) {
        // Using watchPosition for real-time tracking
        navigator.geolocation.watchPosition(showPosition, handleError, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
        
        // Using setInterval to periodically check location
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(showPosition, handleError, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        }, 10000); // Check every 10 seconds
    }
}

function showPosition(position) {
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;

    // Only fetch place if coordinates have changed
    getPlace(currentLat, currentLon);
}

function handleError(error) {
    console.log('Geolocation error:', error.message);
}

getGeolocation();
