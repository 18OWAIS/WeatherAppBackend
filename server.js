const express= require('express');
const app=express();
const dotenv = require('dotenv');
dotenv.config();

var cors = require('cors');
app.use(cors());
const axios=require('axios');

// since we are taking data from frontend it comes in the form of Json format so use express.json middleware to accept JSON data
app.use(express.json())

const PORT=5000;

const API_LOCATION='http://api.openweathermap.org/geo/1.0/direct';
const API_WEATHER='https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.API_KEY;



app.post("/api/location", async (req, res) => {
    try {
  
      const { city, units} = req.body;
      console.log(city, units)
  
      // Fetch location data
      const locationResponse = await axios.get(API_LOCATION, {
        params: {
          q: city,
          units: units,
          appid: API_KEY,
        },
      });
  
      // Extract latitude and longitude from location data
      const latitude = locationResponse.data[0].lat;
      const longitude = locationResponse.data[0].lon;

  
      // Fetch weather data using latitude and longitude
      const weatherResponse = await axios.get(API_WEATHER, {
        params: {
          lat: latitude,
          lon: longitude,
          units: units,
          appid: API_KEY,
        },
      });

  
      // Send weather data back to the client
      res.json(weatherResponse.data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



const server = app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`)
})