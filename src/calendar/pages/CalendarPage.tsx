import { FC, useState, useEffect } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Toolbar } from "@mui/material";
import { localizer, getMessagesEs } from "../../helpers";
import {
  NavBar,
  CalendarModal,
  Fab,
  CalendarEvent as CalendarEventComp,
} from "..";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";
import { CalendarEvent } from "../../store/calendar/calendarSlice";

export const CalendarPage: FC = (): JSX.Element => {
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();

  type StyleProps = {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: number;
  };

  const eventStyleGetter = (event: StyleProps) => {
 
    const isMyEvent = user._id === event.user;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  type View = "agenda" | "day" | "month" | "week" | "work_week";

  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem("lastView") as View) || "week"
  );

  const onDoubleClick = (event: any) => {
    openDateModal();
  };

  const onSelec = (event: CalendarEvent) => {
    setActiveEvent(event);
  };

  const onViewChange = (view: View) => {
    localStorage.setItem("lastView", view);
    setLastView(view);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <NavBar />

      <Toolbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={getMessagesEs()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEventComp,
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelec}
          onView={onViewChange}
        />
      </Box>
      <CalendarModal />
      <Fab />
    </>
  );
};
