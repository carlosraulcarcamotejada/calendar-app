import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, onCloseDateModal, onOpenDateModal, RootState } from "../store";

export const useUiStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isDateModalOpen } = useSelector((store: RootState) => store.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  return {
    //Properties
    isDateModalOpen,
    //Methods
    openDateModal,
    closeDateModal,
  };
};
