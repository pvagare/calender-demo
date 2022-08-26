import * as actionTypes from "../constants/actionTypes";

export function getTimeZones(payload){
   return{
     type:actionTypes.GET_TIME_ZONES,
     payload
   }
}


export function getTimes(payload){
  return{
    type:actionTypes.GET_TIMES,
    payload
  }
}


export function getDays(payload){
  return{
    type:actionTypes.GET_DAYS,
    payload
  }
}

