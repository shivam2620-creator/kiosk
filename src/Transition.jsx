import { motion } from "framer-motion";
import { useNavigationType } from "react-router-dom";

export default function Transition(Component) {
  return function WrappedComponent(props) {
    const navigationType = useNavigationType();

    const isNext = navigationType === "PUSH" || navigationType === "REPLACE";
    const initialX = isNext ? "100%" : "-100%";
    const exitX = isNext ? "-100%" : "100%";

    return (
      <motion.div
        initial={{ x: initialX, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: exitX, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width: "100%"}}
      >
        <Component {...props} />
      </motion.div>
    );
  };
}