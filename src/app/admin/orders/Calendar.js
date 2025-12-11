"use client";

import * as React from "react";
import { parseDate } from "chrono-node";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function Calendar29({ onDateSelect, selectedDate, onClear }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    selectedDate ? formatDate(selectedDate) : ""
  );
  const [date, setDate] = useState(selectedDate);
  const [month, setMonth] = useState(selectedDate);

  useEffect(() => {
    if (selectedDate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(formatDate(selectedDate));
      setDate(selectedDate);
    } else {
      setValue("");
      setDate(undefined);
    }
  }, [selectedDate]);
  return (
    <div className="flex gap-2">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="Select date"
          className="bg-background pr-10"
          onChange={(e) => {
            const inputValue = e.target.value;
            setValue(inputValue);

            const parsedDate = parseDate(inputValue);
            if (parsedDate) {
              setDate(parsedDate);
              setMonth(parsedDate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setValue(formatDate(selectedDate));
                setOpen(false);
                onDateSelect(selectedDate);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {selectedDate && (
        <Button variant="outline" size="sm" onClick={onClear} className="h-10">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
