import React from "react";
import { useParams } from "react-router-dom";
import { 
  AlertTriangle, 
  Clock, 
  FileText, 
  Users, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpDown,
  Upload,
  Copy,
  Trash,
  Search,
  Edit,
  FileUp
} from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import FaultTimeline from "./FaultTimeline";
import FaultScoreCard from "./FaultScoreCard";
import FaultImpactDetails from "./FaultImpactDetails";
import FaultImprovementTable from "./FaultImprovementTable";
import FaultDocumentUpload from "./FaultDocumentUpload";

const FaultReportDetail = () => {
  const { id } = useParams();
  
  // Mock data - would be fetched from API in real implementation
  const faultReport = {
    id: id || "FR-2023-12-31-001",
    title: "2023年12月31日20:42 产品A 登录功能故障 D级",
    department: "平台产品技术",
    affectedFunction: "产品A 登录模块",
    level: "D",
    score: 51.25,
    deduction: 0.1,
    impactDuration: 86,
    startTime: "2023-12-31T20:42:00",
    discoveryTime: "2023-12-31T22:50:00",
    recoveryTime: "2023-12-31T23:16:00",
    rootCause: "流量突增导致服务down机",
    triggerCause: "节日期间用户访问量激增",
    delayReason: "监控告警延迟，值班人员响应不及时",
    userImpact: "故障时间段受影响用户比例：当天总请求数993889344，慢请求比例2.01%，错误请求比例96833/993889344=0.00009742835114%。影响用户低于10%",
    responsibleDepartments: [
      { name: "平台产品技术", percentage: 50 },
      { name: "产品运维", percentage: 50 }
    ],
    responsiblePersons: ["张三", "李四"],
    faultCategory: "系统过载",
    timeline: [
      { time: "2023-12-31T20:42:00", person: "系统", action: "服务开始出现异常", notes: "监控系统记录到响应时间增加" },
      { time: "2023-12-31T22:50:00", person: "张三", action: "发现告警", notes: "收到监控系统告警邮件" },
      { time: "2023-12-31T22:55:00", person: "张三", action: "初步分析", notes: "确认为登录服务异常" },
      { time: "2023-12-31T23:00:00", person: "李四", action: "加入处理", notes: "协助排查问题" },
      { time: "2023-12-31T23:10:00", person: "张三", action: "确认原因", notes: "流量突增导致服务实例不足" },
      { time: "2023-12-31T23:16:00", person: "李四", action: "扩容服务", notes: "增加服务实例数量，服务恢复正常" }
    ],
    reflections: [
      { category: "监控", reflection: "监控告警阈值设置不合理，导致发现延迟" },
      { category: "容量规划", reflection: "节假日流量预估不足，未提前扩容" },
      { category: "应急响应", reflection: "值班人员响应流程不够清晰" }
    ],
    improvements: [
      { task: "优化监控告警阈值", responsible: "张三", deadline: "2024-01-15", status: "进行中" },
      { task: "完善节假日容量规划", responsible: "李四", deadline: "2024-01-20", status: "待开始" },
      { task: "更新应急响应手册", responsible: "王五", deadline: "2024-01-10", status: "已完成" }
    ],
    documents: [
      { name: "故障分析报告.pdf", uploadTime: "2024-01-02T10:30:00", uploader: "张三" },
      { name: "系统架构图.png", uploadTime: "2024-01-02T11:15:00", uploader: "李四" }
    ],
    scoreDetails: [
      { item: "故障对服务的影响", weight: "35%", score: 50, weightedScore: 17.5, basis: "主要功能部分不能使用：3级" },
      { item: "服务影响时长", weight: "20%", score: 75, weightedScore: 15, basis: "51分钟-90分钟：2级" },
      { item: "故障所处时段", weight: "10%", score: 100, weightedScore: 10, basis: "最活跃的时段：晚20点至24点时段：1级" },
      { item: "对用户的影响范围", weight: "35%", score: 25, weightedScore: 8.75, basis: "异常请求占全天比例：影响用户低于10%：4级" },
      { item: "资损影响", weight: "0%", score: 0, weightedScore: 0, basis: "无资损" }
    ]
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <div>
            <h1 className="text-xl font-semibold">{faultReport.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>ID: {faultReport.id}</span>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <span>所属部门: {faultReport.department}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>克隆</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>删除</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>检索</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <FileUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>一键迁移</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button variant="default">
            <Edit className="mr-2 h-4 w-4" />
            编辑
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">影响功能</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-medium">{faultReport.affectedFunction}</div>
              <p className="text-sm text-muted-foreground mt-2">
                故障影响了产品A的登录模块，导致部分用户无法正常登录系统。
                登录页面加载缓慢，部分用户提交登录表单后出现超时错误。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">故障级别</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {faultReport.level}级
                </Badge>
                <span className="text-sm text-muted-foreground">扣{faultReport.deduction}分</span>
              </div>
              <Progress value={faultReport.score} className="h-2" />
              <div className="text-xs text-right text-muted-foreground">
                评分: {faultReport.score}/100
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                服务影响时长
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{faultReport.impactDuration}分钟</div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">故障开始时间:</span>
                  <span>{new Date(faultReport.startTime).toLocaleString('zh-CN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">故障发现时间:</span>
                  <span>{new Date(faultReport.discoveryTime).toLocaleString('zh-CN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">服务恢复时间:</span>
                  <span>{new Date(faultReport.recoveryTime).toLocaleString('zh-CN')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                故障原因
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">根本原因:</h4>
                  <p>{faultReport.rootCause}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">触发原因:</h4>
                  <p>{faultReport.triggerCause}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">导致故障时间增长的原因:</h4>
                  <p>{faultReport.delayReason}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <FaultImpactDetails userImpact={faultReport.userImpact} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                责任部门
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faultReport.responsibleDepartments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{dept.name}</span>
                    <Badge variant="outline">{dept.percentage}%</Badge>
                  </div>
                ))}
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">责任人:</h4>
                  <div className="flex flex-wrap gap-2">
                    {faultReport.responsiblePersons.map((person, index) => (
                      <Badge key={index} variant="secondary">{person}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                故障原因分类
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge className="px-3 py-1">{faultReport.faultCategory}</Badge>
                <span className="text-sm text-muted-foreground">系统资源不足导致的服务不可用</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="timeline">故障处理过程</TabsTrigger>
            <TabsTrigger value="reflection">处理过程反思</TabsTrigger>
            <TabsTrigger value="improvements">改进措施</TabsTrigger>
            <TabsTrigger value="documents">相关文档</TabsTrigger>
            <TabsTrigger value="score">评分详情</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>故障处理时间线</CardTitle>
                <CardDescription>
                  记录故障从发生到解决的完整过程
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FaultTimeline timeline={faultReport.timeline} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reflection" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>故障处理过程反思</CardTitle>
                <CardDescription>
                  对故障处理过程中的问题和可改进点的分析
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">分类</TableHead>
                      <TableHead>反思内容</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faultReport.reflections.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell>{item.reflection}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="improvements" className="mt-4">
            <FaultImprovementTable improvements={faultReport.improvements} />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-4">
            <FaultDocumentUpload documents={faultReport.documents} />
          </TabsContent>
          
          <TabsContent value="score" className="mt-4">
            <FaultScoreCard scoreDetails={faultReport.scoreDetails} totalScore={faultReport.score} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FaultReportDetail;