import { addDoc, collection } from "firebase/firestore";
import { fireStoreDb } from "../config/firebase";
import { generateTimeSlots } from "../util/generateTimeSlots";
import moment from "moment";
import { checkIfEventExists } from "./checkIfEventExists";

export const createEvent = async (
  dateTime: string,
  duration: number,
  timeZone: string
) => {
  const eventTime = moment(dateTime).format();
  const eventExists = await checkIfEventExists(eventTime,duration);

  if (eventExists) {
    return {
      status: 422,
      message: { error: "Slot already booked" },
    };
  }

  const slots = generateTimeSlots(dateTime, timeZone);
  console.log(
    slots.map((slot) => slot.format()),
    moment(eventTime).format()
  );

  const eventTimeMoment = moment(eventTime).tz(timeZone);
  const isValidSlot = slots.some((slot) => slot.isSame(eventTimeMoment));

  if (!isValidSlot) {
    return {
      status: 422,
      message: { message: "Invalid slot" },
    };
  }
  await addDoc(collection(fireStoreDb, "events"), {
    dateTime,
    duration,
  });

  return {
    status: 200,
    message: { message: "Event created" },
  };
};
