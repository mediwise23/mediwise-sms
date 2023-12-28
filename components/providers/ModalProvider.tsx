import React, { useEffect, useState } from "react";
import MediwiseLoginModal from "../modals/MediwiseLoginModal";


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
    </>
  );
};

export default ModalProvider;
