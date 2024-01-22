import {useEffect, useRef} from "react";

const Modal = ({onConfirm, onCancel}) => {
  const modalOverlayRef = useRef(null);
  const handleOverlayClick = (e) => {
    if (modalOverlayRef.current && e.target === modalOverlayRef.current) {
      onCancel();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOverlayClick);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
    }
  }, []);

  return (
    <div className="base-modal__overlay" ref={modalOverlayRef}>
      <div className="base-modal">
        <h2>Are you sure to delete this blog!</h2>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;