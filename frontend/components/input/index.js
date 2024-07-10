import styles from "./input.module.css";

export const Input = ({ ...props }) => {
  return <input className={styles.common_input} {...props} />;
};
