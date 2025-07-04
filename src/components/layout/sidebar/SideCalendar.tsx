'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { format } from "date-fns";
import getFormattedDate from '@/helpers/get-date-in-format';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Event } from '@/models/Event';
import { ScrollArea } from '@/components/ui/scroll-area';

const SideCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const formattedDate = getFormattedDate(date);
    axios
      .get("/api/get_events?date=" + formattedDate)
      .then((response) => {
        if (response.data.success) {
          setEvents(response.data.events);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, [date]);

  // setDate(new Date());
  return (
    <Card className="bg-background shadow-lg border-border/50 p-2">
      <CardHeader className="p-3 flex flex-row items-center">

        <h2 className="mx-auto md:mx-0 text-lg md:text-xl  font-semibold px-2 font-oswald md:w-[30%] lg:w-full">
          {format(date, 'dd MMMM, yyyy')}
        </h2>
        <div className="relative md:flex hidden lg:hidden items-center justify-center group w-full max-w-[280px] mx-auto md:ml-10 lg:mx-auto cursor-pointer mb-3 sm:max-w-[150px] lg:max-w-[150px] mt-5">
          <div className="absolute bg-gradient-to-r from-pink-200 to-pink-300 transform -skew-x-12 px-4 py-2 w-full h-full -translate-x-1 translate-y-1 shadow-lg transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2 z-0"></div>
          <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white font-oswald text-base sm:text-lg md:text-xl lg:text-xl px-5 py-2.5 transform -skew-x-12 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 z-10 flex items-center justify-center">
            EVENTS
          </div>
        </div>

      </CardHeader>

      <CardContent className="justify-center flex flex-col md:flex-row lg:flex-col p-2">
        <div className="rounded-lg border shadow-sm max-w-[275px] mx-auto lg:mb-0 mb-5">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => day && setDate(day)}
            className="p-5"
          />
        </div>

        <div className="w-full p-2">
          <div className="relative md:hidden flex lg:flex items-center justify-center group w-full max-w-[280px] mx-auto md:ml-10 lg:mx-auto cursor-pointer mb-3 sm:max-w-[150px] lg:max-w-[150px] mt-5">
            <div className="absolute bg-gradient-to-r from-pink-200 to-pink-300 transform -skew-x-12 px-4 py-2 w-full h-full -translate-x-1 translate-y-1 shadow-lg transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2 z-0 max-w-[200px]"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white font-oswald text-base sm:text-lg md:text-xl lg:text-md px-5 py-2.5 transform -skew-x-12 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 z-10 flex items-center justify-center">
              EVENTS
            </div>
          </div>
          <div className=" max-h-[500px] overflow-y-auto ">
            <ScrollArea className="h-[200px] w-[250px] rounded-md p-2">
              {events.length > 0 ? (
                events.map((event) => (
                  <Card
                    key={`${event._id}`}
                    className="shadow-none mb-2 rounded-none border-none relative flex items-center" // Added flex and items-center
                  >
                    <div className="bg-primary h-full w-[2px] absolute left-0 top-0 rounded-2xl"></div> {/* h-full and top-0 */}
                    <CardHeader className="p-3 pl-5 flex-grow"> {/* Added pl-5 and flex-grow */}
                      <CardTitle className="text-sm font-medium text-wrap font-roboto">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground py-4 font-roboto">
                  No events for this day
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SideCalendar;