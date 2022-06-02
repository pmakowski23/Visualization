import dayjs from "dayjs";
import { ApiResponse } from "../types/response";

import axios from "axios";
export const fetchHotels = async (location: google.maps.LatLng, params) => {
  const { checkin_date, checkout_date, adults_number } = params;
  const parsedParams = {
    checkin_date: dayjs(checkin_date).format("YYYY-MM-DD"),
    checkout_date: dayjs(checkout_date).format("YYYY-MM-DD"),
    adults_number,
  };
  const response = await axios.request(options(location, parsedParams));
  return response.data.result as ApiResponse[];
};

// import { exampleResponse } from './exampleResponse';
// export const fetchHotels = async (location: google.maps.LatLng, params) => {
//   const response = await Promise.resolve(exampleResponse);
//   return response.data.result as any as ApiResponse[];
// };

const today = dayjs().format("YYYY-MM-DD");

const twoDaysFromToday = dayjs().add(2, "days").format("YYYY-MM-DD");

const options = (location: google.maps.LatLng, params) => ({
  method: "GET",
  url: "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates",
  params: {
    order_by: "popularity",
    adults_number: "2",
    units: "metric",
    room_number: "1",
    checkout_date: twoDaysFromToday,
    checkin_date: today,
    latitude: location.lat(),
    longitude: location.lng(),
    filter_by_currency: "PLN",
    locale: "pl",
    page_number: "0",
    include_adjacency: "true",
    ...params,
  },
  headers: {
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    "X-RapidAPI-Key": "41740fdb36mshedbefbe33d2d1bdp1be05cjsn10562a9fcd6b",
  },
});
