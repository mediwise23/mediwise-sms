import React, { useEffect, useState } from "react";
import MediwiseLoginModal from "../modals/mediwise/MediwiseLoginModal";
import AddWorkScheduleModal from "../modals/mediwise/AddWorkScheduleModal";
import CreateBarangayItemModal from "../modals/mediwise/CreateBarangayItemModal";
import CreateDoctorModal from "../modals/mediwise/CreateDoctorModal";
import AddAppointmentModal from "../modals/mediwise/AddAppointmentModal";
import AddPrescriptionModal from "../modals/mediwise/AddPrescriptionModal";
import ViewPrescriptionModal from "../modals/mediwise/ViewPrescriptionModal";
import CreateSupplierModal from "../modals/sms/CreateSupplierModal";


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
      <AddAppointmentModal />
      <AddPrescriptionModal />
      <ViewPrescriptionModal />
      <CreateSupplierModal />
    </>
  );
};

export default ModalProvider;
