# 06 Server-Side APIs: Weather Dashboard

## Table of Content

- Homework Description
- Author Info
- User Story
- Acceptance Criteria
- Deployed Version

## Homework Description

In this assignment we focused on applying what we learned about third party rest apis. The end goal was to use Open Weather Api in order to show our users the current climate in the city of their choosing. This was done by send the user perfered city to an asyncronous function with an await promise, so that the information recieved from the first api call and be used in the url of the next api call.

## Author Info

Name: Burak Aksu

Email: Sabburak26@gmail.com

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Deployed Version

https://brickly26.github.io/Weather-Dashboard/


