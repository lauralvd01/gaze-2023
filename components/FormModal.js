// import "../styles/Modal.css";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useEffect, useContext, createContext } from "react";

const ModalContext = createContext();

const FormModal = ({ children, isOpen, onClose }) => {
  const handleEscape = (e) => {
    // if (e.key === "Escape") {
    if (e.keyCode === 27) onClose();
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const modalTransition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: { duration: 300 },
  });
  const springs = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(-100%)",
    config: { duration: 300 },
  });

  return modalTransition(
    (styles, isOpen) =>
      isOpen && (
        <animated.div
          style={styles}
          className="react-modal-overlay"
          onClick={onClose}
        >
          <animated.div
            style={springs}
            className="react-modal-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Explication du stopPropagation : en gros quand on va cliquer sur le bouton close ça va appeler onClose mais le bouton close est à l'intérieur du react-modal-overlay du coup quand on clique sur le bouton on clique en même temps dessus donc ça va appeler 2 fois onClose. Mais bon je comprends pas trop pcq là où j'en suis dans le tuto ça revient à juste enlever le onClick du react-modal-overlay */}
            <div className="react-modal-content">
              <ModalContext.Provider value={{ onClose }}>
                {children}
              </ModalContext.Provider>
            </div>
          </animated.div>
        </animated.div>
      )
  );
};

// Je sais pas pourquoi mais quand le modal disparait il fade au lieu de remonter en fadant mais pg
// Je pense que c'est parce qu'il voit pas le styles donné en argument de la fonction de modalTransition

const DismissButton = ({ children, className }) => {
  const { onClose } = useContext(ModalContext);

  return (
    <button type="button" onClick={onClose} className={className}>
      {children}
    </button>
  );
};

const ModalHeader = ({ children }) => {
  return (
    <div className="react-modal-header">
      <div className="react-modal-title">{children}</div>
      <DismissButton className="btn-close">&times;</DismissButton>
    </div>
  );
};

const ModalBody = ({ children }) => {
  return <div className="react-modal-body">{children}</div>;
};

const ModalFooter = ({ children }) => {
  return <div className="react-modal-footer">{children}</div>;
};

FormModal.Header = ModalHeader;
FormModal.Body = ModalBody;
FormModal.Footer = ModalFooter;
FormModal.DismissButton = DismissButton;

export default FormModal;
