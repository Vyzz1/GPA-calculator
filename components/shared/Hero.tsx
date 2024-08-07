import { useTranslations } from "next-intl";
import { Spotlight } from "../ui/SpotLight";

const Hero = () => {
  const t = useTranslations("hero");
  return (
    <section className="py-8  overflow-hidden relative">
      <Spotlight className="-top-5 left-0 md:left-60 md:-top-20" fill="white" />
      <h1 className="relative z-10 mt-16 text-3xl md:text-5xl py-2  bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-950 dark:to-slate-300  text-center  drop-shadow-lg font-sans font-bold">
        {t("title")}
        <p className="text-sky-400 font-bold ml-2 inline-block">
          {t("subtitle")}
        </p>
      </h1>
    </section>
  );
};

export default Hero;
