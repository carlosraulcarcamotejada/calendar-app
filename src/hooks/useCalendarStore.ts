import { parseISO } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { calendarApi } from "../api";
import {
  CalendarEvent,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
  RootState,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(
    (store: RootState) => store.calendar
  );

  const setActiveEvent = (calendarEvent: CalendarEvent | null) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendaEvent: CalendarEvent) => {
    try {
      if (!calendaEvent._id) {
        //Creating
        const { data } = await calendarApi.post("/events", { ...calendaEvent });
        dispatch(onAddNewEvent({ ...data.savedEvent }));
      } else {
        //Updating
        const { data } = await calendarApi.put(`/events/${calendaEvent._id}`, {
          ...calendaEvent,
        });

        dispatch(onUpdateEvent({ ...data.updatedEvent }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingEvent = async () => {
    try {
      if (activeEvent?._id) {

        const {data} = await calendarApi.delete(`/events/${activeEvent?._id}`);

        dispatch(onDeleteEvent(data.deletedEvent._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");

      const events: CalendarEvent[] = data.events.map((event: any) => {
        event.start = parseISO(event.start);
        event.end = parseISO(event.end);
        return event;
      });

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //Methods
    setActiveEvent,
    startLoadingEvents,
    startSavingEvent,
    startDeletingEvent,
  };
};
