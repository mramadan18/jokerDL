import { Card, CardBody } from "@heroui/react";
import { CalendarDays } from "lucide-react";

export const HistoryEmptyState = () => {
  return (
    <Card className="bg-default-50/50 border-2 border-dashed border-default-200">
      <CardBody className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-default-100 rounded-full flex items-center justify-center mb-4">
          <CalendarDays size={40} className="text-default-300" />
        </div>
        <h3 className="text-xl font-bold text-default-700">No History Yet</h3>
        <p className="text-default-500 mt-2 max-w-xs">
          Your download history will appear here once you start downloading
          files.
        </p>
      </CardBody>
    </Card>
  );
};
