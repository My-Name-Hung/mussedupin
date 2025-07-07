import React, { useEffect, useRef } from "react";
import "./PayPalButton.css";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const paypal = useRef();

  useEffect(() => {
    // Load PayPal SDK script
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AW0J1XTUJbGHBj4cx1wRt9H1OdSxRlLVYC84SI5Sx3CLPAnF_rwiuHQBI2PX27UrJfd4VYt6ftETzAAa&currency=USD&components=buttons,marks";
    script.async = true;

    script.onload = () => {
      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2), // Convert to USD and ensure 2 decimal places
                    breakdown: {
                      item_total: {
                        currency_code: "USD",
                        value: amount.toFixed(2),
                      },
                    },
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            onSuccess(order);
          },
          onError: (err) => {
            onError(err);
          },
        })
        .render(paypal.current);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [amount, onSuccess, onError]);

  return (
    <div className="paypal-button-wrapper">
      <div className="currency-conversion">
        <p>Số tiền thanh toán: {(amount * 23000).toLocaleString()} VND</p>
        <p>≈ {amount.toFixed(2)} USD</p>
      </div>
      <div ref={paypal} className="paypal-button-container"></div>
    </div>
  );
};

export default PayPalButton;
