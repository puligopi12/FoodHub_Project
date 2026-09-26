import "./Notification.css";

function Notification({ message, onClose }) {

  if (!message) {
    return null;
  }

  return (
    <div className="success-notification">

      <div className="notification-icon">
        ✓
      </div>

      <div className="notification-content">
        <strong>Added to Cart</strong>
        <span>{message}</span>
      </div>

      <button
        className="notification-close"
        onClick={onClose}
      >
        ×
      </button>

    </div>
  );
}

export default Notification;