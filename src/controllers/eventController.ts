import { Request, Response } from "express";

import { createEvent } from "../services/createEvent";
import { getEvents } from "../services/getEvents";
import { getFreeSlots } from "../services/getFreeSlots";
import logger from "../../logger";
import { ResponseBody } from "../models/response";
import { Event } from "../models/event";
import { eventSchema } from "../models/eventSchema";

export const bookEvent = async (req: Request, res: Response) => {
  const { error } = eventSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { dateTime, duration, timeZone }: Event = req.body;

  try {
    const response = await createEvent(dateTime, Number(duration), timeZone);
    res.status(response.status).json(response.message);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEventList = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "startDate and endDate are required" });
  }

  try {
    const events = await getEvents(startDate as string, endDate as string);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFreeEventSlots = async (req: Request, res: Response) => {
  const { date, timezone, duration } = req.query;

  if (!date || !timezone || !duration) {
    return res.status(400).json({ error: "date and timezone are required" });
  }
  try {
    const response: ResponseBody = await getFreeSlots(
      date as string,
      timezone as string
    );
    res.json(response);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
