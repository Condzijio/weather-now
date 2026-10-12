# Weather Now

A responsive city weather lookup built with HTML, CSS, and vanilla JavaScript. It uses Open-Meteo's geocoding and forecast APIs, so no API key or build step is needed.

## Run locally

Serve this folder with a local static server:

```sh
npx --yes http-server . -p 8000
```

Then visit `http://localhost:8000`.

## Features

- Search for a city and resolve it with Open-Meteo geocoding.
- Show current temperature, humidity, and a weather condition icon.
- Handle unknown cities and failed API requests without a secret key.
- Responsive layout and accessible status updates.

Weather data provided by [Open-Meteo](https://open-meteo.com/).
