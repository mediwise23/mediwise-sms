import React, { useEffect, useState } from "react";
import MediwiseLoginModal from "../modals/MediwiseLoginModal";
import AddWorkScheduleModal from "../modals/AddWorkScheduleModal";
import CreateBarangayItemModal from "../modals/CreateBarangayItemModal";
import CreateDoctorModal from "../modals/CreateDoctorModal";


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
      <CreateBarangayItemModal />
      <CreateDoctorModal />
    </>
  );
};

export default ModalProvider;
