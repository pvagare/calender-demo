import * as actionTypes from "../constants/actionTypes";
import initialState from "./initialState";

export function CalenderReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TIME_ZONES:
      return {
        ...state,
        timeList: state.timeList
      }
    case actionTypes.GET_TIMES:
      return {
        ...state,
        timeZones: state.timeZones
      }
      case actionTypes.GET_DAYS:
        return {
          ...state,
          days: state.days
        }  

    default:
      return {
        ...state
      }
  }
}