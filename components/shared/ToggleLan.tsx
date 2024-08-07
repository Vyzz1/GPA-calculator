"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "lucide-react";

export default function ToggleLan() {
  const locale = useLocale();

  const [lang, setLang] = React.useState(locale);
  const router = useRouter();
  const t = useTranslations("navbar");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-transparent border-none">
          <GlobeIcon className="w-5 h-5 text-black dark:text-white dark:brightness-150" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("lang")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={lang}
          onValueChange={(e) => {
            setLang(e);
            router.push(e);
          }}
        >
          <DropdownMenuRadioItem value="en">{t("en")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="vi">{t("vi")}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
