"use client"
import React from 'react';
import InventoryDashboard from './InventoryDashboard';
import { useQueryProcessor } from '@/hooks/useTanstackQuery';
import { TItemBrgy } from '@/schema/item-brgy';
import { Session } from 'next-auth';
import { TItemSms } from '@/schema/item-sms';
import { Item } from '@prisma/client';


type ItemsTabProps = {
  currentUser: Session['user']
};

const ItemsTab:React.FC<ItemsTabProps> = ({currentUser}) => {
  // Example inventory data (you can replace this with data from your database)

  const items = useQueryProcessor<(TItemSms & {items: Item[]})[]>({
    url: `/sms-item`,
    key: ['sms-item-dashboard'],
    
  })

  console.log(items.data)

  return (
    <div>
      <InventoryDashboard inventoryData={items?.data || []} />
    </div>
  );
};

export default ItemsTab;