import { useSelector, useDispatch } from "react-redux";
import { calendarApi } from "../api";
import {
  CalendarEvent,
  onAddNewEvent,
  onDeleteEvent,
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
        // if there isn't an event, it will create one

        const { data } = await calendarApi.post("/events", { ...calendaEvent });
        console.log({ data });

        dispatch(onAddNewEvent({ ...data.savedEvent }));
      } else {
        //For update an existing event
        dispatch(onUpdateEvent({ ...calendaEvent }));
      }
    } catch (error) {}
  };

  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent());
  };

  return {
    //Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
