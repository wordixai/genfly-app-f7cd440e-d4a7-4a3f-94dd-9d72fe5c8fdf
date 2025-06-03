import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface ScoreDetail {
  item: string;
  weight: string;
  score: number;
  weightedScore: number;
  basis: string;
}

interface FaultScoreCardProps {
  scoreDetails: ScoreDetail[];
  totalScore: number;
}

const FaultScoreCard: React.FC<FaultScoreCardProps> = ({ scoreDetails, totalScore }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>故障评分详情</span>
          <span className="text-lg">总分: {totalScore}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">评分项</TableHead>
              <TableHead className="w-[80px]">权重</TableHead>
              <TableHead className="w-[100px]">得分</TableHead>
              <TableHead className="w-[100px]">加权得分</TableHead>
              <TableHead>评分依据</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scoreDetails.map((detail, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{detail.item}</TableCell>
                <TableCell>{detail.weight}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span>{detail.score}</span>
                    <Progress value={detail.score} className="h-1" />
                  </div>
                </TableCell>
                <TableCell>{detail.weightedScore}</TableCell>
                <TableCell className="text-sm">{detail.basis}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 p-4 bg-muted rounded-md">
          <div className="flex justify-between mb-2">
            <span className="font-medium">累计得分</span>
            <span>{totalScore}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">故障级别</span>
            <span>D (41-60分为D级)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaultScoreCard;