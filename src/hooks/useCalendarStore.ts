import { useSelector, useDispatch } from "react-redux";
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
    if (!calendaEvent._id) {
      // if there isn't an event, it will create one
      dispatch(onAddNewEvent({ _id: new Date().getTime(), ...calendaEvent }));
    } else {
      //For update an existing event
      dispatch(onUpdateEvent({ ...calendaEvent }));
    }
  };

  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent());
  };

  return {
    //Properties
    events,
    activeEvent,
    //Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
