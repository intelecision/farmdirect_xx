//import { retrieveItem } from "../utils/localStorage";
import { saveToStore, retrieveItem } from "../../utils/localStorage";
import { result } from "lodash";

export const getTimeSlotsAsync = () => {
  const timeSlots = retrieveItem("DB_TIME_SLOTS_KEY");

  if (timeSlots) return timeSlots;
  else return null;
};

export const saveTimeSlots = async (timeSlots) => {
  saveToStore("DB_TIME_SLOTS_KEY", timeSlots);
};

export const loadSlots = async () => {
  const timeSlots = await retrieveItem("DB_TIME_SLOTS_KEY");

  if (timeSlots) {
    return timeSlots;
  }
};
