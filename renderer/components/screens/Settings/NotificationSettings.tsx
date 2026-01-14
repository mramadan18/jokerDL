import { Card, CardBody, CardHeader, Switch, Divider } from "@heroui/react";

export const NotificationSettings = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="font-bold text-lg px-6 pt-6">
        Notifications
      </CardHeader>
      <CardBody className="px-6 pb-6 pt-2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Show completion notification</span>
          <Switch defaultSelected size="sm" />
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <span>Play sound on completion</span>
          <Switch size="sm" />
        </div>
      </CardBody>
    </Card>
  );
};
