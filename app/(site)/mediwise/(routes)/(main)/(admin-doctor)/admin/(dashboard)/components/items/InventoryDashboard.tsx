// InventoryDashboard.js
import { TItemBrgy } from "@/schema/item-brgy";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type InventoryDashboard = {
  inventoryData: TItemBrgy[];
};
const InventoryDashboard: React.FC<InventoryDashboard> = ({
  inventoryData,
}) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Inventory Dashboard</h1>
      <div className="w-full">
        <ResizablePanelGroup direction="horizontal" className="w-[900px]">
          <ResizablePanel className="p-2" defaultSize={60} minSize={25}>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-md border border-gray-300 h-[70vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-2">Inventory List</h2>
              <ul>
                {inventoryData?.map((item) => (
                  <li
                    key={item.id}
                    className="mb-2  even:bg-slate-200 dark:even:bg-slate-700"
                  >
                    {item.name} - Stock: {item.stock} - Dosage: {item.dosage} -
                    Unit: {item.unit}
                  </li>
                ))}
              </ul>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="p-2" defaultSize={40} minSize={25}>
            <div className="bg-red-100 dark:bg-slate-900 p-4 rounded-md border border-red-300 h-[70vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-2">Low Stock Warning</h2>
              <ul>
                {inventoryData?.map((item) => {
                  if (item.unit === "pcs" && item?.stock! < 25) {
                    return (
                      <li key={item.id} className="text-red-500 mb-2">
                        {item.name} - Stock: {item.stock} - Dosage:{" "}
                        {item.dosage} - Unit: {item.unit}
                      </li>
                    );
                  }

                  if (item.unit === "box" && item?.stock! < 5) {
                    return (
                      <li key={item.id} className="text-red-500 mb-2">
                        {item.name} - Stock: {item.stock} - Dosage:{" "}
                        {item.dosage} - Unit: {item.unit}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        {/* <div className="bg-white dark:bg-slate-900 p-4 rounded-md border border-gray-300 h-[70vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Inventory List</h2>
          <ul>
            {inventoryData?.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name} - Stock: {item.stock} - Dosage: {item.dosage} -
                Unit: {item.unit}
              </li>
            ))}
          </ul>
        </div> */}
        {/* <div className="bg-red-100 dark:bg-slate-900 p-4 rounded-md border border-red-300 h-[70vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Low Stock Warning</h2>
          <ul>
            {inventoryData?.map((item) => {
              if (item.unit === "pcs" && item?.stock! < 25) {
                return (
                  <li key={item.id} className="text-red-500 mb-2">
                    {item.name} - Stock: {item.stock} - Dosage: {item.dosage} -
                    Unit: {item.unit}
                  </li>
                );
              }

              if (item.unit === "box" && item?.stock! < 5) {
                return (
                  <li key={item.id} className="text-red-500 mb-2">
                    {item.name} - Stock: {item.stock} - Dosage: {item.dosage} -
                    Unit: {item.unit}
                  </li>
                );
              }
            })}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default InventoryDashboard;
