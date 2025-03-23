import React, { useEffect, useRef, useContext } from "react";
import { chatContext } from "../context/Context";
import "../style/Alertbox.css";

interface AlertProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const Alert: React.FC<AlertProps> = ({ onConfirm, onCancel }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const context = useContext(chatContext);

  if (!context) {
    throw new Error("Alert must be used within a ContextProvider");
  }

  const { setShowAlert } = context; 

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  return (
    <div
      className="overallalert"
      onClick={() => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
        setShowAlert(false);
      }}
    >
      <dialog  className="alert" ref={dialogRef}>
        <p>
          Are You <strong>Sure</strong> You Want To Delete This?
        </p>
        <div className="alertbtn">
          <button className="confirmbtn" onClick={onConfirm}>
            Yes
          </button>
          <button
            className="cancelbtn"
            onClick={() => {
              if (dialogRef.current) {
                dialogRef.current.close();
              }
              onCancel();
            }}
          >
            No
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Alert;
