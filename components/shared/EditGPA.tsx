import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import RenderFormField from "./RenderFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { CumulativeForm } from "@/types";
import { Form } from "../ui/form";
import { useDispatch } from "react-redux";
import { editSemester } from "@/features/cumulative";
import { useTranslations } from "next-intl";

const EditGPA = ({ row }: { row: CumulativeForm }) => {
  const form = useForm<CumulativeForm>({
    resolver: zodResolver(CumulativeForm),
    defaultValues: row,
  });
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (data: CumulativeForm) => {
    dispatch(editSemester(data));
    form.reset(
      {},
      { keepDirtyValues: false, keepIsSubmitted: false, keepValues: false }
    );
    setShowDialog(false);
  };
  const t = useTranslations("cumulative-form");

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button
          className="bg-transparent text-slate-800 dark:text-white hover:bg-slate-300 hover:text-white border-sky-300 border"
          size={"sm"}
        >
          {t("edit")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>{t("edit-gpa")}</DialogHeader>

        <Form {...form}>
          <form
            className="space-y-5 px-2"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <RenderFormField
              control={form.control}
              name="name"
              title={t("name")}
              placeholder="Add a alias name"
              type="input"
            />
            <RenderFormField
              control={form.control}
              name="gpa"
              title="GPA"
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
              <Button type="submit">{t("edit")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGPA;
