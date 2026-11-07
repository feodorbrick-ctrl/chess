import React from "react";
import { createPortal } from "react-dom";
import cl from "./modal.module.css";

const Modal = ({ children, visible, setVisible }) => {
    const rootClasses = [cl.MyModal];

    if (visible) {
        rootClasses.push(cl.active);
    }

    return createPortal(
        <div
            className={rootClasses.join(" ")}
            onClick={() => setVisible(false)}
        >
            <div
                className={cl.MyModalContent}
            >
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Modal;