"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../ui/DataTable";
import { ColumnHeader } from "../ui/ColumnHeader";
import { Button } from "../ui/button";
import ShimmerButton from "../magicui/shimmer-button";
import { MoreHorizontal, PlusCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RenderFormField from "./RenderFormField";
import EditGPA from "./EditGPA";
import { CumulativeForm } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addSemester } from "@/features/cumulative";
import DeleteGPA from "./DeleteGPA";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Download from "./Download";
const CumulativeGPA = () => {
  const columns: ColumnDef<CumulativeForm>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },

    {
      accessorKey: "name",
      header: ({ column }) => {
        return <ColumnHeader column={column} title={c("name")} />;
      },
    },
    {
      accessorKey: "gpa",
      header: ({ column }) => {
        return <ColumnHeader column={column} title="GPA" />;
      },
    },
    {
      accessorKey: "credits",
      header: ({ column }) => {
        return <ColumnHeader column={column} title={c("credits")} />;
      },
    },

    {
      id: "actions",
      header: () => {
        return (
          <p className="text-zinc-600 font-bold  hidden md:block dark:text-slate-300">
            {c("actions")}
          </p>
        );
      },
      cell: ({ row }) => {
        return (
          <section>
            <div className="space-x-3 hidden md:flex items-center">
              <EditGPA row={row.original} />
              <DeleteGPA id={row.original.id || 0} />
            </div>
            <div className="md:hidden m-0 p-0 inline-block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="left"
                  className="flex space-x-2 py-2 px-3 items-center"
                >
                  <EditGPA row={row.original} />
                  <DeleteGPA id={row.original.id || 0} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </section>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const initialData = useSelector((state: RootState) => state.cumulative);
  const c = useTranslations("cumulative-column");
  const t = useTranslations("cumulative-form");

  const dialogTrigger = (
    <ShimmerButton>
      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
        {t("add")}
      </span>{" "}
      <PlusCircleIcon className="h-5 w-5 ml-2 dark:text-slate-100" />
    </ShimmerButton>
  );

  const form = useForm<CumulativeForm>({
    resolver: zodResolver(CumulativeForm),
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (data: CumulativeForm) => {
    dispatch(addSemester(data));
    form.reset(
      {},
      { keepDirtyValues: false, keepIsSubmitted: false, keepValues: false }
    );
    setShowDialog(false);
  };
  const calculateCredits = useMemo(() => {
    if (initialData.length === 0) {
      return 0;
    }
    return initialData.reduce((acc, curr) => acc + curr.credits, 0);
  }, [initialData]);
  const calculateGPA = useMemo(() => {
    if (initialData.length === 0) {
      return 0;
    }

    const totalGPA = initialData.reduce(
      (acc, curr) => acc + curr.gpa * curr.credits,
      0
    );

    return Math.round((totalGPA / calculateCredits) * 100) / 100;
  }, [initialData, calculateCredits]);

  const [loading, setLoading] = useState(true);
  const isAccepted = getCookie("isAccepted");
  useEffect(() => {
    if (isAccepted) {
      setLoading(false);
    }
  }, [isAccepted]);

  return (
    <section className="py-8 z-50 mx-5" id="cumulative">
      <div className=" flex flex-col space-y-10 items-center justify-center">
        <div className="max-w-7xl w-full font-sans  ">
          <DataTable columns={columns} data={initialData} isLoading={loading} />
        </div>
        {!loading && (
          <motion.div
            whileHover={{ x: 5 }}
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-5  max-w-7xl w-full   items-start "
          >
            <p className="text-sky-700  border-l-2 border-slate-950  dark:border-white px-4   font-semibold brightness-150 pointer-events-none font-be   tracking-wide">
              {t("gpa-result")}
              <span className="font-bold dark:text-white text-black text-md">
                {calculateGPA}
              </span>
            </p>
            <blockquote className="text-black dark:text-white border-l-2 dark:border-sky-700 border-slate-950 px-4  brightness-150 pointer-events-none   tracking-wide">
              {t("credits-result")}
              <span className="font-bold text-sky-700 ">
                {calculateCredits}
              </span>
            </blockquote>
          </motion.div>
        )}
        <div className="flex max-w-7xl  w-full justify-between  items-center ">
          <Download />

          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
            <DialogContent>
              <DialogHeader>{t("add")}</DialogHeader>
              <DialogDescription>{t("desc")}</DialogDescription>
              <Form {...form}>
                <form
                  className="space-y-5 px-2"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <RenderFormField
                    control={form.control}
                    name="name"
                    title={t("name")}
                    placeholder="Add an alias name"
                    type="input"
                  />
                  <RenderFormField
                    control={form.control}
                    name="gpa"
                    title={t("gpa")}
                    placeholder="Add your GPA"
                    type="input"
                    inputType="number"
                  />
                  <RenderFormField
                    control={form.control}
                    name="credits"
                    title={t("credits")}
                    placeholder="Add your Credits"
                    type="input"
                    inputType="number"
                  />
                  <DialogFooter>
                    <Button type="submit" className="bg-primary">
                      {t("submit")}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default CumulativeGPA;
