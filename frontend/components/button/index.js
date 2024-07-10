import styles from "./button.module.css";

export const Button = ({ children, ...props }) => {
  return (
    <button className={styles.common_button} {...props}>
      {children}
    </button>
  );
};
