import { useState } from "react";
import updateCart from "../utils/updateCart"

const CartPopup = ({
  cart,
  setCart,
  tableId,
  setTableId,
  orders,
  setOrders,
  toggleCartPopup,
  setToggleCartPopup,
}) => {
  const [isOrderComplete, setIsOrderComplete] = useState(false)

  const submitOrder = async () => {
    const order = {
      tableId: tableId,
      orderId: orders.length + 1,
      status: "WAITING",
      totalPrice: cart
        .filter((r) => r.quantity > 0)
        .reduce((arr, c) => {
          return arr + c.totalPrice
        }, 0),
      items: cart
        .filter((r) => r.quantity > 0)
        .map((r) => ({
          menuId: r.id,
          name: r.name,
          price: r.price,
          quantity: r.quantity,
          totalPrice: r.totalPrice,
        })),
    }
    const newOrders = [
      ...orders,
      order
    ]
    setOrders(newOrders)
    setCart([])
    setTableId(1)
    setIsOrderComplete(true)
  }

  return (
    <>
      <div className="bg-black opacity-50 fixed top-0 left-0 w-full h-full"></div>
      <div className="bottom-0 fixed bg-white w-full px-2 py-4">
        <div className="flex">
          <div className="flex-auto">รายการอาหาร</div>
          <div onClick={() => setToggleCartPopup(!toggleCartPopup)}>[X]</div>
        </div>
        {!isOrderComplete && (
          <div>
            <div className="flex mt-4">
              <div className="flex-auto">หมายเลขโต๊ะ</div>
              <div>
                <input
                  type="number"
                  id="tableId"
                  value={tableId}
                  onInput={(e) => setTableId(parseInt(e.target.value))}
                  className="border border-gray-300 p-1 text-right w-12"
                />
              </div>
            </div>
            {cart.map((item) => (
              <div className="flex mt-2" key={item.id}>
                <div className="flex-auto">{item.name}</div>
                <div>
                  <button
                    onClick={() =>
                      setCart(
                        updateCart({
                          sign: -1,
                          cart,
                          id: item.id,
                          name: item.name,
                          price: item.price,
                        })
                      )
                    }
                    className="button bg-red-200 active:bg-red-400 px-2"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      setCart(
                        updateCart({
                          sign: 1,
                          cart,
                          id: item.id,
                          name: item.name,
                          price: item.price,
                        })
                      )
                    }
                    className="button bg-red-200 active:bg-red-400 px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div>
              <button
                onClick={() => submitOrder()}
                className="button bg-red-200 w-full rounded-lg py-2 mt-8"
              >
                สั่งอาหาร
              </button>
            </div>
          </div>
        )}
        {isOrderComplete && <div className="mt-4">คำสั่งซื้อสำเร็จ</div>}
      </div>
      )
    </>
  );
};

export default CartPopup