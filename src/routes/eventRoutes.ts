import { RequestHandler, Router } from "express";
import {
  bookEvent,
  getEventList,
  getFreeEventSlots,
} from "../controllers/eventController";

const router = Router();

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Book an event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-10-01T10:00:00Z"
 *               duration:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       200:
 *         description: Event booked successfully
 *       400:
 *         description: Bad request
 *       422:
 *         description: Slot already booked
 *       500:
 *         description: Internal server error
 */
router.post("/book", bookEvent as RequestHandler);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get list of events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: dateTime
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Filter events by date and time
 *       - in: query
 *         name: duration
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter events by duration in minutes
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                   duration:
 *                     type: integer

 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/events", getEventList as RequestHandler);

/**
 * @swagger
 * /api/free-slots:
 *   get:
 *     summary: Get free event slots
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: dateTime
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Filter free slots by date and time
 *       - in: query
 *         name: duration
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter free slots by duration in minutes
 *     responses:
 *       200:
 *         description: List of free event slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   slot:
 *                     type: string
 *                     example: "2023-10-01T10:00:00Z"
 *       500:
 *         description: Internal server error
 */
router.get("/free-slots", getFreeEventSlots as RequestHandler);

export default router;
