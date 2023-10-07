# APIS & DOCS
All available APIS for book my show clone 

## Scripts and faker generator order
1. createMovies
2. createTheatres
3. createScreens
4. createShowTimes

### List theatres in city
GET /v1/theatres?location=East%20Zitabury&page=1&limit=10
```
{
    "status": "success",
    "data": {
        "theatres": [
            {
                "id": 9,
                "name": "Gusikowski Group",
                "description": "Ut eligendi voluptatem qui minus excepturi et velit. Hic qui in dolore expedita.",
                "createdAt": "2023-08-04T07:26:12.000Z",
                "updatedAt": "2023-08-04T07:26:12.000Z",
                "theatre_address": {
                    "id": 8,
                    "addressLine1": "1886 Clement Curve",
                    "addressLine2": null,
                    "city": "East Zitabury",
                    "postalCode": "66517",
                    "state": "Ohio",
                    "country": "Congo",
                    "latitude": 39.7392,
                    "longitude": 73.5117,
                    "createdAt": "2023-08-04T07:26:12.000Z",
                    "updatedAt": "2023-08-04T07:26:12.000Z",
                    "theatreId": 9
                }
            }
        ]
    }
}
```

### List Movies in theatre for next few days with show times
GET /v1/theatres/:theatreId/movies?days=7
```
{
    "status": "success",
    "data": {
        "theatreShowTimes": [
            {
              "screen": "Unions",
                "movies": [
                    {
                        "name": "officiis eius quisquam",
                        "dateTime": "2023-08-04T13:24:00.000Z",
                        "bookingsOpen": true
                    },
                ]
            }
        ]
    }
}
```

### TODO: List current and upcoming movies
GET /v1/movies?status=running&page=1&limit=10

### TODO: Showtimes for a Movie with Theatre from a particular date
GET /v1/movies/:movieId?location=Bangalore&page=1&limit=10

### TODO: Ticket Booking APIS

### Questions
1. It’s been 2 years since you built this API. The API overtime has become slow. Which columns would you index to improve the performance of the API ? Why ?  
> Index - dateTime since we want showtimes for next few days and is run multiple times, the primary keys are already indexed which helps. 

2. You have noticed that even after indexing the columns the API speed isn’t under 100 ms. Update the code of existing API to cache the appropriate data in the redis. What all data would you cache and why ?  
> Theatre Information, Movies and ShowTimes, ShowTimes information
