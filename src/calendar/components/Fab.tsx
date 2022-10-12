import { FC } from "react";
import { Fab as FavMUI } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCalendarStore, useUiStore } from "../../hooks";
import { addHours } from "date-fns";
import Zoom from "@mui/material/Zoom";
import { useTheme } from "@mui/material/styles";

export const Fab: FC = (): JSX.Element => {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const { openDateModal, closeDateModal, isDateModalOpen } = useUiStore();
  const { setActiveEvent, hasEventSelected, startDeletingEvent, activeEvent } =
    useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: 123,
        name: "Carlos",
      },
    });
    openDateModal();
  };

  const handleClickDelete = () => {
    closeDateModal();
    startDeletingEvent();
  };

  return (
    <>
      {!!activeEvent?._id && isDateModalOpen ? (
        <Zoom
          key="delete"
          in={hasEventSelected && isDateModalOpen}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              hasEventSelected && isDateModalOpen ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <FavMUI
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 9999,
            }}
            color="error"
            aria-label="add"
            onClick={handleClickDelete}
          >
            <DeleteIcon />
          </FavMUI>
        </Zoom>
      ) : (
        <Zoom
          key="add"
          in={!hasEventSelected && !isDateModalOpen}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              !hasEventSelected && !isDateModalOpen
                ? transitionDuration.exit
                : 0
            }ms`,
          }}
          unmountOnExit
        >
          <FavMUI
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
            color="primary"
            aria-label="add"
            onClick={handleClickNew}
          >
            <AddIcon />
          </FavMUI>
        </Zoom>
      )}
    </>
  );
};
