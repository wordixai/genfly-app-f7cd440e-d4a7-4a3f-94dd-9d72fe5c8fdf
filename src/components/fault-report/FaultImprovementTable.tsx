import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Improvement {
  task: string;
  responsible: string;
  deadline: string;
  status: string;
}

interface FaultImprovementTableProps {
  improvements: Improvement[];
}

const FaultImprovementTable: React.FC<FaultImprovementTableProps> = ({ improvements }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "已完成":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            已完成
          </Badge>
        );
      case "进行中":
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-800">
            <Clock className="mr-1 h-3 w-3" />
            进行中
          </Badge>
        );
      case "待开始":
        return (
          <Badge variant="outline" className="border-orange-200 text-orange-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            待开始
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>改进措施</CardTitle>
            <CardDescription>
              针对故障分析提出的改进措施及跟进状态
            </CardDescription>
          </div>
          <Button size="sm">
            创建改进事项
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">改进任务</TableHead>
              <TableHead>负责人</TableHead>
              <TableHead>完成时限</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {improvements.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.task}</TableCell>
                <TableCell>{item.responsible}</TableCell>
                <TableCell>{new Date(item.deadline).toLocaleDateString('zh-CN')}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    更新
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FaultImprovementTable;