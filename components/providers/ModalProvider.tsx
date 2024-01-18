import React, { useEffect, useState } from "react";
import MediwiseLoginModal from "../modals/mediwise/MediwiseLoginModal";
import AddWorkScheduleModal from "../modals/mediwise/AddWorkScheduleModal";
import CreateBarangayItemModal from "../modals/mediwise/CreateBarangayItemModal";
import CreateDoctorModal from "../modals/mediwise/CreateDoctorModal";
import AddAppointmentModal from "../modals/mediwise/AddAppointmentModal";
import AddPrescriptionModal from "../modals/mediwise/AddPrescriptionModal";
import ViewPrescriptionModal from "../modals/mediwise/ViewPrescriptionModal";
import CreateSupplierModal from "../modals/sms/CreateSupplierModal";
import CreateBarangayModal from "../modals/sms/CreateBarangayModal";
import CreateAdminModal from "../modals/sms/CreateAdminModal";
import CreateSmsItemModal from "../modals/sms/CreateSmsItemModal";
import CreatePatientModal from "../modals/mediwise/CreatePatientModal";
import CreateEventModal from "../modals/mediwise/CreateEventModal";
import InventoryReportModal from "../modals/mediwise/InventoryReportModal";
import CreateRequestModal from "../modals/mediwise/CreateRequestModal";
import ViewRequestModal from "../modals/mediwise/ViewRequestModal";
import ManageAppointmentModal from "../modals/mediwise/ManageAppointmentModal";


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
      <CreateBarangayModal />
      <CreateAdminModal />
      <CreateSmsItemModal />
      <CreatePatientModal />
      <CreateEventModal />
      <InventoryReportModal />
      <CreateRequestModal />
      <ViewRequestModal />
      <ManageAppointmentModal />
    </>
  );
};

export default ModalProvider;
