import React, { useState, useEffect } from "react";

export const Order = ({ orders }) => {
  const [tableId, setTableId] = useState(0);

  return (
    <main className="relative">
      <div className="px-4">
        <h1 className="text-3xl text-center mt-4">รายการสั่งอาหาร</h1>
        <div className="grid grid-cols-4 grid-flow-row gap-4 my-4">
          {[...Array(20).keys()].map((id) => (
            <div
              key={id}
              onClick={() => setTableId(id + 1)}
              className="bg-red-200 active:bg-red-300 text-center py-2 rounded-lg"
            >
              {id + 1}
            </div>
          ))}
        </div>
        {orders
          .filter((order) => tableId === 0 || tableId === order.tableId)
          .map((order) => (
            <div key={order.orderId} className="py-2 text-sm">
              <div>หมายเลขคำสั่ง #{order.orderId}</div>
              <div>โต๊ะ: {order.tableId}</div>
              <div>สถานะ: {order.status}</div>
              {order.items.map((item) => (
                <div key={item.menuId} className="flex">
                  <div className="flex-auto">{item.name}</div>
                  <div>
                    ฿{item.price} x {item.quantity}
                  </div>
                </div>
              ))}
              <div className="text-right">
                รวม ฿{order.totalPrice}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};
