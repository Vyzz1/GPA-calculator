"use client";
import { useMemo, useRef, useState } from "react";
import { Form } from "../ui/form";
import { z } from "zod";
import { motion } from "framer-motion";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RenderFormField from "./RenderFormField";
import { Button } from "../ui/button";
import { CalculatorIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const AverageCalculate = () => {
  const averageSchema = z.object({
    grade: z.array(
      z.object({
        score: z.coerce.number(),
        weight: z.coerce.number(),
        name: z.string().optional(),
      })
    ),
  });

  type Average = z.infer<typeof averageSchema>;
  const form = useForm<Average>({
    resolver: zodResolver(averageSchema),
    defaultValues: {
      grade: [
        { name: "Midterm", score: 9, weight: 0.5 },
        {
          name: "Final",
          score: 9.5,
          weight: 0.5,
        },
      ],
    },
  });
  const ref = useRef(null);

  const [averageScore, setAverageScore] = useState(0);
  const handleSubmit = (data: Average) => {
    const totalScore = data.grade.reduce(
      (acc, curr) => acc + curr.score * curr.weight,
      0
    );

    setAverageScore(Math.round(totalScore * 10) / 10);
    (ref.current as HTMLElement | null)?.scrollIntoView({ behavior: "smooth" });
  };

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "grade",
  });

  const [isChange, setIsChange] = useState(false);
  useMemo(() => {
    if (isChange) {
      form.trigger();
      setIsChange(false);
    }
  }, [isChange, form]);
  const t = useTranslations("average");

  return (
    <section className="py-8 px-4" id="average">
      <div className="lg:mx-20 mx-auto max-w-7xl">
        <h2 className="bg-gradient-to-b bg-clip-text mb-5 dark:to-zinc-500 text-transparent from-neutral-200 to-zinc-800 relative  text-2xl">
          {t("title")}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col space-y-4 max-w-xl">
              {fields.map((currField, index) => (
                <div
                  key={currField.id}
                  className="grid grid-cols-10 gap-2 items-center place-content-center"
                >
                  <RenderFormField
                    type="input"
                    className="col-span-3"
                    name={`grade.${index}.name`}
                    title={t("name")}
                    placeholder="Optional"
                    control={form.control}
                  />
                  <RenderFormField
                    type="input"
                    className="col-span-3"
                    name={`grade.${index}.score`}
                    title={t("score")}
                    inputType="number"
                    control={form.control}
                  />
                  <RenderFormField
                    type="input"
                    className="col-span-3"
                    name={`grade.${index}.weight`}
                    title={t("weight")}
                    inputType="number"
                    control={form.control}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      size={"icon"}
                      onClick={() => remove(index)}
                      className="mt-8"
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="space-x-3">
              <Button
                size={"sm"}
                type="button"
                className="mt-8 "
                onClick={() => {
                  append({
                    name: "",
                    score: 0,
                    weight: 0,
                  });
                }}
              >
                {t("add")}
              </Button>
              <Button size={"sm"} type="submit" className="mt-8 ">
                {t("submit")} <CalculatorIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
          <div className="mt-6" ref={ref}>
            {form.formState.isSubmitted && (
              <motion.blockquote
                whileHover={{ x: 20, y: 1.2, transition: { duration: 0.5 } }}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 5, scale: 1 }}
                className="border-l-2 border-sky-400 text-lg  px-4"
              >
                {t("result")}
                <span className="font-bold text-indigo-400">
                  {averageScore}
                </span>
              </motion.blockquote>
            )}
          </div>
        </Form>
      </div>
    </section>
  );
};

export default AverageCalculate;
