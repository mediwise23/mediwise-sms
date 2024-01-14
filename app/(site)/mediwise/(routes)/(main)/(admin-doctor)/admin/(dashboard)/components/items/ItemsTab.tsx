"use client"
import React from 'react';
import InventoryDashboard from './InventoryDashboard';
import { useQueryProcessor } from '@/hooks/useTanstackQuery';
import { TItemBrgy } from '@/schema/item-brgy';
import { Session } from 'next-auth';


type ItemsTabProps = {
  currentUser: Session['user']
};

const ItemsTab:React.FC<ItemsTabProps> = ({currentUser}) => {
  // Example inventory data (you can replace this with data from your database)

  const items = useQueryProcessor<TItemBrgy[]>({
    url: `/brgy-item`,
    key: ['brgy-item-dashboard'],
    queryParams: {
        barangayId: currentUser.barangayId
    },
    options: {
        enabled: !!currentUser.barangayId
    }
  })

  console.log(items.data)

  return (
    <div>
      <InventoryDashboard inventoryData={items?.data || []} />
    </div>
  );
};

export default ItemsTab;