import React from "react";
import { TechStack } from "@/components/shared/TechStack";
import About from "@/components/shared/About";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
const Information = () => {
  const t = useTranslations("accordition");
  return (
    <div className="px-4 py-8" id="information">
      <Accordion className="mx-auto max-w-7xl" collapsible type="single">
        <AccordionItem value="about">
          <AccordionTrigger className="text-zinc-500">
            {t("about")}
          </AccordionTrigger>
          <AccordionContent>
            <About />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tech-stack">
          <AccordionTrigger className="text-zinc-500">
            {t("TechStackUsed")}
          </AccordionTrigger>
          <AccordionContent>
            <TechStack />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Information;
