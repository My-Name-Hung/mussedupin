import React from "react";
import "./TicketSelection.css";

const TicketSelection = ({
  tickets,
  onQuantityChange,
  onVisitorNameChange,
  packageData,
}) => {
  return (
    <div className="ticket-selection-containers">
      <h2>Chọn vé của bạn</h2>

      {packageData && (
        <div className="package-infos">
          <div className="package-detailss">
            <h3>Chi tiết gói trải nghiệm</h3>
            <ul>
              {packageData.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          {packageData.note && (
            <div className="package-notes">
              <strong>Lưu ý:</strong> {packageData.note}
            </div>
          )}
          {packageData.time && (
            <div className="package-times">
              <strong>Thời gian:</strong> {packageData.time}
            </div>
          )}
        </div>
      )}

      <div className="tickets-lists">
        {tickets.map((ticket, index) => (
          <div key={index} className="ticket-items">
            <div className="ticket-headers">
              <h3>{ticket.title}</h3>
              <p className="price">{ticket.price.toLocaleString()}đ</p>
            </div>
            <div className="quantity-controls">
              <button
                onClick={() =>
                  onQuantityChange(index, Math.max(0, ticket.quantity - 1))
                }
                disabled={ticket.quantity === 0}
              >
                -
              </button>
              <input
                type="number"
                value={ticket.quantity}
                onChange={(e) =>
                  onQuantityChange(index, parseInt(e.target.value) || 0)
                }
                min="0"
                max="10"
              />
              <button
                onClick={() => onQuantityChange(index, ticket.quantity + 1)}
                disabled={ticket.quantity >= 10}
              >
                +
              </button>
            </div>
            {ticket.quantity > 0 && (
              <div className="visitor-namess">
                {Array.from({ length: ticket.quantity }).map(
                  (_, visitorIndex) => (
                    <div key={visitorIndex} className="visitor-inputs">
                      <label>
                        Họ và tên người tham quan {visitorIndex + 1}
                      </label>
                      <input
                        type="text"
                        value={ticket.visitors[visitorIndex]?.name || ""}
                        onChange={(e) =>
                          onVisitorNameChange(
                            index,
                            visitorIndex,
                            e.target.value
                          )
                        }
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketSelection;
