import Joi from "joi";
import moment from "moment-timezone";

// Get the list of valid time zones
const validTimeZones = moment.tz.names();
export const eventSchema = Joi.object({
  dateTime: Joi.string().isoDate().required(),
  duration: Joi.number().positive().required(),
  timeZone: Joi.string()
    .valid(...validTimeZones)
    .required(),
});
