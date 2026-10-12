const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const describeWeather = (code) => {
	if (code === 0) return { label: 'Clear sky', icon: 'sun.png' };
	if ([1, 2, 3].includes(code))
		return { label: 'Partly cloudy', icon: 'cloud.png' };
	if ([45, 48].includes(code)) return { label: 'Fog', icon: 'fog.png' };
	if ([51, 53, 55, 56, 57].includes(code))
		return { label: 'Drizzle', icon: 'drizzle.png' };
	if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
		return { label: 'Rain', icon: 'rain.png' };
	if ([71, 73, 75, 77, 85, 86].includes(code))
		return { label: 'Snow', icon: 'ice.png' };
	if ([95, 96, 99].includes(code))
		return { label: 'Thunderstorm', icon: 'thunderstorm.png' };
	return { label: 'Unknown', icon: 'unknown.png' };
};

const fetchJson = async (url) => {
	const response = await fetch(url);
	if (!response.ok) throw new Error('The weather service is unavailable.');
	return response.json();
};

const getWeather = async (city = input.value || 'Kielce') => {
	warning.textContent = '';
	button.disabled = true;

	try {
		const geocodingUrl = new URL(
			'https://geocoding-api.open-meteo.com/v1/search',
		);
		geocodingUrl.search = new URLSearchParams({
			name: city.trim(),
			count: '1',
			language: 'en',
			format: 'json',
		});
		const location = (await fetchJson(geocodingUrl)).results?.[0];
		if (!location) throw new Error('Wpisz poprawną nazwę miasta');

		const forecastUrl = new URL('https://api.open-meteo.com/v1/forecast');
		forecastUrl.search = new URLSearchParams({
			latitude: location.latitude,
			longitude: location.longitude,
			current: 'temperature_2m,relative_humidity_2m,weather_code',
			temperature_unit: 'celsius',
			timezone: 'auto',
		});
		const current = (await fetchJson(forecastUrl)).current;
		const conditions = describeWeather(current.weather_code);

		cityName.textContent = location.name;
		weather.textContent = conditions.label;
		temperature.textContent = `${Math.round(current.temperature_2m)}°C`;
		humidity.textContent = `${current.relative_humidity_2m}%`;
		photo.src = `img/${conditions.icon}`;
		input.value = '';
	} catch (error) {
		warning.textContent = error.message || 'Wpisz poprawną nazwę miasta';
	} finally {
		button.disabled = false;
	}
};

const enterCheck = (event) => {
	if (event.key === 'Enter') getWeather();
};

getWeather('Kielce');
input.addEventListener('keyup', enterCheck);
button.addEventListener('click', () => getWeather());
