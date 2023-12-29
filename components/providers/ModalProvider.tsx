import React, { useEffect, useState } from "react";
import MediwiseLoginModal from "../modals/MediwiseLoginModal";
import AddWorkScheduleModal from "../modals/AddWorkScheduleModal";


const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <MediwiseLoginModal />
      <AddWorkScheduleModal />
    </>
  );
};

export default ModalProvider;
