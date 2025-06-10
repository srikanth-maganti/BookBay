import React from "react";

function CartItem({ item,onIncrement, onDecrement, onRemove }) {
  return (
    <div className="cart-item border rounded p-3 mb-3 shadow-sm bg-white">
      <div className="row align-items-center">
        {/* Book Image */}
        <div className="col-4 col-md-2">
          <img
            src={item.book.Image}
            alt={item.book.Title}
            className="img-fluid rounded"
            style={{ maxHeight: "120px", objectFit: "cover" }}
          />
        </div>

        {/* Book Details + Quantity */}
        <div className="col-8 col-md-6">
          <div className="ms-md-3">
            <h5 className="mb-1">{item.book.Title}</h5>
            <p className="text-muted mb-1">{item.book.Author}</p>
            <p className="small text-secondary mb-2">Condition: Good</p>

            {/* Quantity Control */}
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => onDecrement(item._id,item.book._id)}
              >
                −
              </button>
              <input
                type="number"
                value={item.count}
                min="1"
                readOnly
                className="form-control form-control-sm text-center"
                style={{ width: "60px" }}
              />
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => onIncrement(item._id,item.book._id)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price & Remove */}
        <div className="col-12 col-md-4 text-end mt-3 mt-md-0">
          <h6 className="text-success mb-2">₹{item.book.Price}</h6>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onRemove(item._id,item.book._id)}
          >
            <i className="fas fa-trash me-1"></i> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
