import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

// Temporary solution: Define client ID directly in the component
// TODO: Move this to environment variables when deploying
const PAYPAL_CLIENT_ID =
  "AW0J1XTUJbGHBj4cx1wRt9H1OdSxRlLVYC84SI5Sx3CLPAnF_rwiuHQBI2PX27UrJfd4VYt6ftETzAAa";

// Exchange rate VND to USD (approximate)
const VND_TO_USD_RATE = 0.000041; // 1 VND = 0.000041 USD (approx.)

const PayPalButton = ({ amount, onSuccess, onError, onCancel, onClose }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const paypalRef = useRef(null);

  // Convert VND to USD
  const convertVNDtoUSD = (vndAmount) => {
    const usdAmount = vndAmount * VND_TO_USD_RATE;
    return Math.round(usdAmount * 100) / 100; // Round to 2 decimal places
  };

  useEffect(() => {
    const loadPayPalScript = () => {
      // Remove any existing PayPal script
      const existingScript = document.querySelector(
        'script[src*="sdk/js?client-id="]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      // Clear any existing PayPal buttons
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }

      // Create new script with all required parameters
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons&currency=USD`;
      script.type = "text/javascript";
      script.async = true;

      script.onload = () => {
        setSdkReady(true);
      };

      script.onerror = (err) => {
        console.error("PayPal SDK loading error:", err);
        onError(new Error("Failed to load PayPal SDK"));
      };

      document.body.appendChild(script);
    };

    if (!window.paypal) {
      loadPayPalScript();
    } else {
      setSdkReady(true);
    }

    return () => {
      // Cleanup function
      const script = document.querySelector('script[src*="sdk/js?client-id="]');
      if (script) {
        script.remove();
      }
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    };
  }, []); // Empty dependency array as we only want to load the script once

  useEffect(() => {
    if (sdkReady && paypalRef.current) {
      // Clear existing buttons
      paypalRef.current.innerHTML = "";

      // Convert amount to USD
      const usdAmount = convertVNDtoUSD(amount);

      // Create new PayPal button
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
                  description: `Thanh toán đơn hàng tại Musée Du Pin (${amount.toLocaleString()} VND)`,
                  amount: {
                    currency_code: "USD",
                    value: usdAmount.toString(),
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const order = await actions.order.capture();
              const orderWithVND = {
                ...order,
                vnd_amount: amount,
                usd_amount: usdAmount,
                exchange_rate: VND_TO_USD_RATE,
              };
              console.log("Payment successful:", orderWithVND);
              onSuccess(orderWithVND);
            } catch (err) {
              console.error("Payment error:", err);
              onError(err);
            }
          },
          onError: (err) => {
            console.error("PayPal error:", err);
            onError(err);
          },
          onCancel: () => {
            console.log("Payment cancelled");
            onCancel();
          },
        })
        .render(paypalRef.current)
        .catch((err) => {
          console.error("Error rendering PayPal button:", err);
          onError(err);
        });
    }
  }, [sdkReady, amount, onSuccess, onError, onCancel]);

  return (
    <div className="paypal-button-wrapper">
      <button
        className="paypal-modal-close"
        onClick={onClose}
        aria-label="Đóng"
      >
        ×
      </button>
      {!sdkReady ? (
        <div className="payment-loading">
          <span className="payment-loading-spinner">⌛</span>
          Đang tải PayPal...
        </div>
      ) : (
        <>
          <div ref={paypalRef} className="paypal-button-container" />
          <div className="currency-note">
            <p>
              <strong>Thông tin thanh toán:</strong>
            </p>
            <p>
              Số tiền: {amount.toLocaleString()} VND ={" "}
              {convertVNDtoUSD(amount).toFixed(2)} USD
            </p>
            <p>
              Tỷ giá: 1 USD = {Math.round(1 / VND_TO_USD_RATE).toLocaleString()}{" "}
              VND
            </p>
          </div>
        </>
      )}
    </div>
  );
};

PayPalButton.propTypes = {
  amount: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PayPalButton;
