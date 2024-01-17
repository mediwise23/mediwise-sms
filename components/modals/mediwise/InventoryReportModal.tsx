"use client";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";

import { PDFExport } from "@progress/kendo-react-pdf";
import { Button } from "@progress/kendo-react-buttons";
import { cn } from "@/lib/utils";

const InventoryReportModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "inventoryReport";
  const totalStocks = data?.brgyItems?.reduce(
    (sum, item) => sum + (item?.stock || 0),
    0
  );
  const pdfExportYearComponent = useRef<any>(null);
  const [reportClicked, setReportClcked] = useState(false)

  const handleExportYearlyPdf = (e: any) => {
    if (pdfExportYearComponent.current) {
      setReportClcked(true)
      setTimeout(() => {
        pdfExportYearComponent.current?.save();
        setReportClcked(false)
      }, 0)
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={cn(" min-w-[90vw] min-h-[95vh] bg-white text-black p-0 overflow-hidden dark:bg-[#020817] dark:text-white h-[80%] rounded-md flex flex-col items-center justify-center")}>
        <div className="flex flex-col  min-w-[90vw]">
          <PDFExport ref={pdfExportYearComponent}>
            <div className="container mx-auto mt-8 w-full">
              <div className="">
                <h1 className="text-4xl font-bold mb-2">
                  Barangay Inventory Report
                </h1>
                <p className="text-gray-600">
                  A summary of available items in the inventory as of {months[new Date().getMonth()]} {new Date().getFullYear()}
                </p>
              </div>

              <div className="mt-10">
                <p className="text-lg font-semibold">Summary:</p>
                <p>Total stocks: {totalStocks}</p>
              </div>
              <div className={cn("max-h-[60vh] overflow-auto", reportClicked && 'overflow-visible')}>
                <table className="min-w-full bg-white shadow-md rounded-lg mt-10  ">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="py-2 pl-4">ID</th>
                      <th className="py-2">Item Name</th>
                      <th className="py-2">Stock</th>
                      <th className="py-2">Dosage</th>
                    </tr>
                  </thead>
                  <tbody className=" overflow-y-auto">
                    {data.brgyItems?.map((item) => (
                      <tr key={item.id} className="border-t border-gray-200 ">
                        <td className="py-2 pl-4">{item.id}</td>
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">
                          {item.stock} {item.unit}
                        </td>
                        <td className="py-2">{item.dosage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

             
            </div>
          </PDFExport>

          <Button
            className="bg-[#16A34A] text-white border py-5 px-10 self-center w-fit rounded-md"
            onClick={handleExportYearlyPdf}
          >
            Print Report (PDF)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryReportModal;
