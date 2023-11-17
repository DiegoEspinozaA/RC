import React from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

import { useAppContext } from "../../AppContext";

export default function UnderlineTabs({ activeTab, data, onTabClick }) {
  const { state, dispatch } = useAppContext();
  


  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-lg bg-gray-200 border border-gray-200 p-0"
        indicatorProps={{
          className: "bg-white shadow-md border border-gray-200 rounded-lg",
        }}
      >
        {data.map(({ label, value, icon }) => (
          <Tab 
            key={value} 
            value={value} 
            onClick={() => onTabClick (value)}
            style={{ whiteSpace: 'nowrap' }}
          >
            <div className="flex items-center gap-2 px-4">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
