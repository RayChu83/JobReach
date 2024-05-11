"use client";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormMessage from "@/components/FormMessage";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TiDelete } from "react-icons/ti";

import React, { useState, useTransition } from "react";

export default function EditUserExperienceForm({ fetchedExperience, id }) {
  const router = useRouter();
  const [experience, setExperience] = useState(
    fetchedExperience || [
      { jobTitle: "", jobCompany: "", jobDescription: "", id: uuidv4() },
    ]
  );
  const removeExperience = (id) => {
    setExperience(experience.filter((job) => job.id !== id));
  };
  const [isPending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState(null);
  const handleInputChange = (id, field, newValue) => {
    setExperience((prev) => {
      const itemIndex = prev.findIndex((experience) => experience.id === id);
      const updatedArray = [...prev];
      updatedArray[itemIndex] = {
        ...updatedArray[itemIndex],
        [field]: newValue,
      };

      return updatedArray;
    });
  };
  const handleAction = () => {
    startTransition(async () => {
      setFormMessage(null);
      const res = await fetch("api/user/work", {
        method: "put",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experience, id }),
      });
      const { message } = await res.json();
      if (!res.ok) {
        setFormMessage({
          status: 500,
          message: message,
        });
        return;
      }
      if (res.ok) {
        setFormMessage({
          status: 200,
          message: message,
        });
        router.refresh();
      }
    });
  };
  return (
    <form className="flex flex-col gap-2" action={handleAction}>
      {formMessage && (
        <FormMessage
          status={formMessage.status}
          message={formMessage.message}
        />
      )}
      <Accordion type="single" collapsible className="w-full">
        {experience &&
          experience.map((job, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <span className="flex items-center gap-2">
                <TiDelete
                  className="text-red-500 text-xl cursor-pointer"
                  onClick={() => removeExperience(job.id)}
                  title="Are you sure you want to remove this job experience?"
                />
                <span className="w-full">
                  <AccordionTrigger>
                    {job.jobTitle || `Job ${index + 1}`}
                  </AccordionTrigger>
                </span>
              </span>
              <AccordionContent>
                <article className="flex flex-col gap-1 py-2 px-[1px]">
                  <Label htmlFor={`jt-${index + 1}`} className="w-fit ml-1">
                    Job title #{index + 1}
                  </Label>
                  <Input
                    id={`jt-${index + 1}`}
                    defaultValue={job.jobTitle}
                    onChange={(e) =>
                      handleInputChange(
                        job.id,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    type="text"
                    className="text-gray-500"
                    required
                  />
                </article>
                <article className="flex flex-col gap-1 py-2 px-[1px]">
                  <Label htmlFor={`jc-${index + 1}`} className="w-fit ml-1">
                    Job company #{index + 1}
                  </Label>
                  <Input
                    id={`jc-${index + 1}`}
                    defaultValue={job.jobCompany}
                    onChange={(e) =>
                      handleInputChange(job.id, "jobCompany", e.target.value)
                    }
                    type="text"
                    className="text-gray-500"
                    required
                  />
                </article>
                <article className="flex flex-col gap-1 py-2 px-[1px]">
                  <Label htmlFor={`jd-${index + 1}`} className="w-fit ml-1">
                    Job description #{index + 1}
                  </Label>
                  <Textarea
                    id={`jd-${index + 1}`}
                    defaultValue={job.jobDescription}
                    onChange={(e) =>
                      handleInputChange(
                        job.id,
                        "jobDescription",
                        e.target.value
                      )
                    }
                    rows="5"
                    className="text-gray-500"
                    required
                  />
                </article>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
      <Button
        variant="link"
        size="paddingNone"
        onClick={() =>
          setExperience((prev) =>
            prev.length
              ? [
                  ...prev,
                  {
                    jobTitle: "",
                    jobCompany: "",
                    jobDescription: "",
                    id: uuidv4(),
                  },
                ]
              : [
                  {
                    jobTitle: "",
                    jobCompany: "",
                    jobDescription: "",
                    id: uuidv4(),
                  },
                ]
          )
        }
        className="w-fit"
        type="button"
      >
        + Add
      </Button>
      <DialogFooter>
        <Button type="submit" disabled={isPending} variant="cta">
          {isPending ? "Saving Changes..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
