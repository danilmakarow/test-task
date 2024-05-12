import { google } from "googleapis";
import { Errors } from "../constants/errors.js";

export class GoogleService {
  /**
   * @type {calendar_v3.Calendar}
   */
  #calendarApi;

  /**
   * @type {string}
   */
  #authCredentials;

  get authCredentials() {
    if (!this.#authCredentials) {
      this.#authCredentials = process.env.GOOGLE_API_KEY;

      if (!this.#authCredentials) {
        throw new Error(Errors.NO_GOOGLE_API_KEY);
      }
    }
    return this.#authCredentials;
  }

  constructor() {
    this.#calendarApi = google.calendar("v3");
  }

  /**
   * @param {string} calendarId
   * @param {string} timeMin
   * @param {string} timeMax
   * @return {Promise<calendar_v3.Schema$TimePeriod[]>}
   */
  async getCalendarBusyIntervals(calendarId, timeMin, timeMax) {
    try {
      const response = await this.#calendarApi.freebusy.query({
        auth: this.authCredentials,
        requestBody: {
          timeMin,
          timeMax,
          items: [{ id: calendarId }],
        },
      });

      return response.data.calendars[calendarId].busy;
    } catch (error) {
      throw new Error(error.message || Errors.DEFAULT_GOOGLE_ERROR);
    }
  }
}

export const googleService = new GoogleService();
