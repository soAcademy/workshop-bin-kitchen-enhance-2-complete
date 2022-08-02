import React, { useState, useEffect } from "react";

export const Order = ({ orders }) => {
  const [tableId, setTableId] = useState(0);

  const isNoOrders = orders.length === 0
  const isNoOrdersAtSelectedTableId = orders.filter((order) => tableId === order.tableId).length === 0

  return (
    <main className="relative">
      <div className="px-4">
        <h1 className="text-3xl text-center mt-4">รายการสั่งอาหาร</h1>
        <div className="grid grid-cols-4 grid-flow-row gap-4 my-4">
          {[...Array(20).keys()].map((id) => (
            <button
              key={id}
              onClick={e => { 
                if (id + 1 === tableId) {
                  setTableId(0)
                  e.target.blur()
                } else {
                  setTableId(id + 1)
                }
              }}
              className="bg-red-200 active:bg-red-300 text-center py-2 rounded-lg focus:ring focus:ring-red-800"
            >
              {id + 1}
            </button>
          ))}
        </div>
        {
          isNoOrders ? <div>ไม่มีการสั่งอาหารทุกโต๊ะ</div> :
          tableId !== 0 && isNoOrdersAtSelectedTableId ? <div>ไม่มีการสั่งอาหารที่โต๊ะ {tableId}</div> :
          orders
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
