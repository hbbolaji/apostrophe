import React from "react";
import moment from "moment";
import {
  PiBuildingsThin,
  PiCalendar,
  PiClockAfternoonThin,
} from "react-icons/pi";

const Course: React.FC<{ course: any }> = ({ course }) => {
  return (
    <div className="shadow-lg rounded-lg cursor-pointer">
      <div className="h-32 w-full bg-orange-400 rounded-t-lg"></div>
      <div className="py-2 px-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 ">
            <PiBuildingsThin className="text-xl text-gray-500 font-semibold" />
            {course.physical ? (
              <p className="text-sm text-gray-500 font-semibold">
                {course.venueLink}
              </p>
            ) : (
              <a href={course.venueLink} target="blank">
                Venue
              </a>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <PiClockAfternoonThin className="text-xl text-gray-500 font-semibold" />
            <p className="text-sm text-gray-500 font-semibold">
              {course.scheduleDay}
            </p>
          </div>
        </div>
        <div>
          <p className="font-xl text-orange-500 font-semibold">
            {course.courseCode}
          </p>
        </div>
        <div className=" flex items-center justify-between">
          <p className="font-xl font-semibold">{course.courseTitle}</p>
          <p className="font-semibold text-gray-500">${course.amount}</p>
        </div>
        <div className="flex items-center space-x-3 ">
          <PiCalendar className="text-xl text-gray-500 font-semibold" />
          <p className="text-sm text-gray-500">
            {moment(course.startDate).format("MMM Do YY")} -{" "}
            {moment(course.endDate).format("MMM Do YY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Course;
