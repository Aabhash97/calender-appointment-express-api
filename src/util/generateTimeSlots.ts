import moment from "moment-timezone";
import {
  END_HOUR,
  SLOT_DURATION,
  START_HOUR,
  TIMEZONE,
} from "../config/constant";
import logger from "../../logger";

export const generateTimeSlots = (
  date: string,
  userTimezone: string
): moment.Moment[] => {
  logger.info("Generating time slots for the doctor");
  const slots: moment.Moment[] = [];

  // Generate slots for the doctor's timezone starting from 12:00 AM
  let currentTime = moment
    .tz(date, TIMEZONE)
    .startOf("day")
    .hour(START_HOUR)
    .minute(0)
    .second(0);
  const endTime = moment
    .tz(date, TIMEZONE)
    .startOf("day")
    .hour(END_HOUR)
    .minute(0)
    .second(0);

  while (currentTime.isBefore(endTime)) {
    slots.push(currentTime.clone());
    currentTime.add(SLOT_DURATION, "minutes");
  }

  // Convert doctor's slots to the user's timezone
  const userTimezoneSlots = slots.map((slot) => slot.clone().tz(userTimezone));

  // Filter the slots based on the user's provided date
  const userDateStart = moment.tz(date, userTimezone).startOf("day");
  const userDateEnd = moment.tz(date, userTimezone).endOf("day");

  const availableTimeSlots = userTimezoneSlots.filter((slot) =>
    slot.isBetween(userDateStart, userDateEnd, null, "[]")
  );
  logger.info(availableTimeSlots);
  return availableTimeSlots;
};
