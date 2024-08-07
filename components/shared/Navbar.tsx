"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CookieIcon } from "lucide-react";
import ToggleDark from "../ui/ToggleDark";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Link from "next/link";
import ToggleLan from "./ToggleLan";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
const ToggleDarkNoSSr = dynamic(() => import("@/components/ui/ToggleDark"), {
  ssr: false,
});

const Navbar = () => {
  function stringToBoolean(str: string): boolean {
    return str === "true";
  }

  if (!hasCookie("isAccepted")) {
    setCookie("isAccepted", false, { maxAge: 180 * 60 * 24 * 30 });
  }

  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    const isAccepted = stringToBoolean(getCookie("isAccepted") || "false");
    setAccepted(isAccepted);
  }, []);

  const handleToggle = () => {
    const newAccepted = !accepted;
    setAccepted(newAccepted);
    setCookie("isAccepted", newAccepted, { maxAge: 180 * 60 * 24 * 30 });
  };
  const t = useTranslations("navbar");

  return (
    <div className="border-b-2 shadow-sm bg-zinc-100 dark:bg-[#09111f] text-white px-5 py-2 top-0">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Image
            src="/favicon.ico"
            alt="GPA Calculator"
            width={40}
            height={32}
          />
          <p className="text-gray-950 dark:text-white font-semibold text-nowrap truncate">
            GPA Calc
          </p>
        </div>
        <div className="items-center text-[15px] hidden lg:flex font-semibold dark:text-white brightness-100 capitalize text-slate-800 space-x-3">
          <Link href={"#cumulative"}>{t("gpacalc")}</Link>
          <Link href={"#average"}>{t("average")}</Link>
          <Link href={"#information"}>{t("information")} </Link>
        </div>
        <div className="flex items-center space-x-3">
          <ToggleLan />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ scale: 0.2, y: -200 }}
                  animate={{
                    scale: 1,
                    y: 0,
                    opacity: 1,
                  }}
                  className="space-x-3 flex items-center"
                >
                  <span className="text-muted-foreground hidden md:block">
                    {t("StoreIn")}
                    <CookieIcon className="w-6 h-5 text-black dark:text-white inline-block" />
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={accepted}
                      onClick={handleToggle}
                    />
                    <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['🍪'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
                  </label>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>{t("tooltip")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <ToggleDarkNoSSr />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
