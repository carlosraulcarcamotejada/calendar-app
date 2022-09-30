import { FC, useState } from "react";
import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Toolbar } from "@mui/material";
import { localizer, getMessagesEs } from "../../helpers";
import { NavBar, CalendarEvent, CalendarModal } from "..";

const events = [
  {
    title: "Cumpleaños del jefe",
    notes: "Hay que comprar el pastel",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: 123,
      name: "Carlos",
    },
  },
];

type StyleProps = {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: { _id: number; name: string };
};

const eventStyleGetter = (e: StyleProps) => {
  const style = {
    backgroundColor: "#347CF7",
    borderRadius: "0px",
    opacity: 0.8,
    color: "white",
  };

  return {
    style,
  };
};

type View = "agenda" | "day" | "month" | "week" | "work_week";

export const CalendarPage: FC = (): JSX.Element => {
  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem("lastView") as View) || "week"
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };


  const onDoubleClick = (event: any) => {
    console.log({ doubleClick: event });
  };

  const onSelec = (event: any) => {
    console.log({ click: event });
    setIsOpen(true);
  };

  const onViewChange = (view: View) => {
    localStorage.setItem("lastView", view);
    setLastView(view);
  };

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
            event: CalendarEvent,
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelec}
          onView={onViewChange}
        />
      </Box>
      <CalendarModal isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};
