"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addDays, format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useCallback } from "react";

export function DatePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDate = searchParams.get("date")
    ? parse(searchParams.get("date")!, "yyyy-MM-dd", new Date())
    : new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  // Function to update the URL with the new date
  const updateDateQuery = useCallback(
    (date: Date | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (date) {
        params.set("date", format(date, "yyyy-MM-dd"));
      } else {
        params.delete("date");
      }
      params.set("page", "1"); // Reset to page 1 on new date
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Handle date selection from Calendar or Select
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    updateDateQuery(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value) => {
            const newDate = addDays(new Date(), parseInt(value));
            handleDateSelect(newDate);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="-1">Yesterday</SelectItem>
            <SelectItem value="-3">3 Days Before</SelectItem>
            <SelectItem value="-7">Last Week</SelectItem>
            <SelectItem value="-30">Last Month</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>

  );
}