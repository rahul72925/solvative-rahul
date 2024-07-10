import { useEffect } from "react";
import { redirect } from "next/navigation";

export const isAuthorized = (Component) => {
  return function IsAuth(props) {
    const auth = localStorage.getItem("user-id");

    useEffect(() => {
      if (!auth) {
        return redirect("/login");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
};
