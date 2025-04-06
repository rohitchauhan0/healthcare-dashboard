import clsx from "clsx";
import Image from "next/image";
import { StatusIcon } from "@/constants";
declare type Status = "pending" | "scheduled" | "cancelled";
export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge flex items-center gap-2", {
        "": status === "scheduled",
        "": status === "pending",
        "": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status as keyof typeof StatusIcon]}
        alt="doctor"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          " text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};
