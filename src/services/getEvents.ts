import { fireStoreDb } from "../config/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export const getEvents = async (startDate: string, endDate: string) => {
  const eventQuery = query(
    collection(fireStoreDb, "events"),
    where("dateTime", ">=", startDate),
    where("dateTime", "<=", endDate)
  );
  const eventSnapshot = await getDocs(eventQuery);
  return eventSnapshot.docs.map((doc) => doc.data());
};
