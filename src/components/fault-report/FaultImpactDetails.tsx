import React from "react";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FaultImpactDetailsProps {
  userImpact: string;
}

const FaultImpactDetails: React.FC<FaultImpactDetailsProps> = ({ userImpact }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Users className="mr-2 h-5 w-5 text-muted-foreground" />
          对用户的影响
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">受影响程度:</h4>
            <p className="text-sm">{userImpact}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground mb-1">总请求数</div>
              <div className="text-2xl font-semibold">993,889,344</div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground mb-1">慢请求比例</div>
              <div className="text-2xl font-semibold">2.01%</div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground mb-1">错误请求比例</div>
              <div className="text-2xl font-semibold">0.0001%</div>
              <div className="text-xs text-muted-foreground">96,833 / 993,889,344</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaultImpactDetails;