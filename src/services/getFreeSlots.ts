import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { fireStoreDb } from "../config/firebase";
import { generateTimeSlots } from "../util/generateTimeSlots";
import moment from "moment";
import { ResponseBody } from "../models/response";
import logger from "../../logger";

export const getFreeSlots = async (
  date: string,
  timezone: string
): Promise<ResponseBody> => {
  let response: ResponseBody = {
    status: 200,
    message: "Success",
    data: [],
  };

  try {
    const slots = generateTimeSlots(date, timezone);
    const docRef = collection(fireStoreDb, "events");
    const q = query(docRef);
    const docSnap = await getDocs(q);

    if (!docSnap) {
      response.status = 500;
      response.message = "Failed to fetch events";
      return response;
    }

    const bookedSlots = docSnap.docs.map((doc) => {
      const eventStartTime = moment.tz(doc.data().dateTime, timezone);
      const eventEndTime = eventStartTime
        .clone()
        .add(doc.data().duration, "minutes");
      return { eventStartTime, eventEndTime };
    });

    const freeSlots = slots.filter((slot) => {
      const slotStartTime = moment.tz(slot, timezone);
      const slotEndTime = slotStartTime.clone().add(30, "minutes"); // Assuming each slot is 30 minutes

      return !bookedSlots.some(({ eventStartTime, eventEndTime }) => {
        return (
          (slotStartTime.isSameOrAfter(eventStartTime) &&
            slotStartTime.isBefore(eventEndTime)) ||
          (slotEndTime.isAfter(eventStartTime) &&
            slotEndTime.isSameOrBefore(eventEndTime)) ||
          (slotStartTime.isBefore(eventStartTime) &&
            slotEndTime.isAfter(eventEndTime))
        );
      });
    });

    response.data = freeSlots.map((slot) => slot.tz(timezone).format());
    return response;
  } catch (error) {
    logger.log("Error getting document:", error);
    return {
      status: 500,
      message: "Internal Server Error",
      data: [],
    };
  }
};
