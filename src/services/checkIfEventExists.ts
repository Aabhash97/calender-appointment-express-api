import { query, where, collection, getDocs } from "firebase/firestore";
import { fireStoreDb } from "../config/firebase";
import moment from "moment-timezone";

export const checkIfEventExists = async (
  dateTime: string,
  duration: number
) => {
  const eventStartTime = moment(dateTime);
  const eventEndTime = eventStartTime.clone().add(duration, "minutes");

  const eventsRef = collection(fireStoreDb, "events");
  const eventsSnapshot = await getDocs(eventsRef);

  const overlappingEventExists = eventsSnapshot.docs.some((doc) => {
    const existingEventStartTime = moment(doc.data().dateTime);
    const existingEventEndTime = existingEventStartTime
      .clone()
      .add(doc.data().duration, "minutes");

    return (
      (eventStartTime.isSameOrAfter(existingEventStartTime) &&
        eventStartTime.isBefore(existingEventEndTime)) ||
      (eventEndTime.isAfter(existingEventStartTime) &&
        eventEndTime.isSameOrBefore(existingEventEndTime)) ||
      (eventStartTime.isBefore(existingEventStartTime) &&
        eventEndTime.isAfter(existingEventEndTime))
    );
  });

  return overlappingEventExists;
};
