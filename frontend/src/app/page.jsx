"use client";

import { useEffect, useContext } from "react";
import { Context } from "../context/contextProvider";
import { useRouter } from "next/navigation";
import logo from "../img/CFG_logo.png";

const HomePage = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(Context);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/statistics");
    }
  }),
    [isLoggedIn];
  return <p></p>;
};
export default HomePage;
