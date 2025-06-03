import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  time: string;
  person: string;
  action: string;
  notes: string;
}

interface FaultTimelineProps {
  timeline: TimelineItem[];
}

const FaultTimeline: React.FC<FaultTimelineProps> = ({ timeline }) => {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-9 before:border-l-2 before:border-dashed before:border-muted">
        {timeline.map((item, index) => {
          const date = new Date(item.time);
          const formattedTime = date.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          
          return (
            <div key={index} className="relative pl-12">
              <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <time className="text-sm tabular-nums text-muted-foreground">
                    {formattedTime}
                  </time>
                  <Badge variant="outline" className="text-xs">
                    {item.person}
                  </Badge>
                </div>
                <div className="font-semibold">{item.action}</div>
                <div className="text-sm text-muted-foreground">{item.notes}</div>
              </div>
              {index < timeline.length - 1 && (
                <Separator className="my-4 ml-[-3rem]" />
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default FaultTimeline;