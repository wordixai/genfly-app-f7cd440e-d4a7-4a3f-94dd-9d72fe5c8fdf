import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Calendar,
  Clock,
  FileText,
  Users,
  Save,
  X,
  Plus,
  Trash,
  ArrowLeft
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";

// 模拟数据 - 实际应用中会从API获取
const faultReport = {
  id: "FR-2023-12-31-001",
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

// 表单验证模式
const formSchema = z.object({
  title: z.string().min(5, { message: "标题至少需要5个字符" }),
  department: z.string().min(1, { message: "请选择部门" }),
  affectedFunction: z.string().min(1, { message: "请填写影响功能" }),
  level: z.string().min(1, { message: "请选择故障级别" }),
  startTime: z.string().min(1, { message: "请选择故障开始时间" }),
  discoveryTime: z.string().min(1, { message: "请选择故障发现时间" }),
  recoveryTime: z.string().min(1, { message: "请选择服务恢复时间" }),
  rootCause: z.string().min(1, { message: "请填写根本原因" }),
  triggerCause: z.string().min(1, { message: "请填写触发原因" }),
  delayReason: z.string().optional(),
  userImpact: z.string().min(1, { message: "请填写用户影响" }),
  faultCategory: z.string().min(1, { message: "请选择故障分类" }),
});

const FaultReportEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCreating = !id;
  
  const [timeline, setTimeline] = useState(faultReport.timeline);
  const [reflections, setReflections] = useState(faultReport.reflections);
  const [improvements, setImprovements] = useState(faultReport.improvements);
  const [responsibleDepartments, setResponsibleDepartments] = useState(faultReport.responsibleDepartments);
  const [responsiblePersons, setResponsiblePersons] = useState(faultReport.responsiblePersons);
  
  // 初始化表单
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: faultReport.title,
      department: faultReport.department,
      affectedFunction: faultReport.affectedFunction,
      level: faultReport.level,
      startTime: faultReport.startTime,
      discoveryTime: faultReport.discoveryTime,
      recoveryTime: faultReport.recoveryTime,
      rootCause: faultReport.rootCause,
      triggerCause: faultReport.triggerCause,
      delayReason: faultReport.delayReason,
      userImpact: faultReport.userImpact,
      faultCategory: faultReport.faultCategory,
    },
  });
  
  // 表单提交处理
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // 在实际应用中，这里会调用API保存数据
    console.log({
      ...values,
      timeline,
      reflections,
      improvements,
      responsibleDepartments,
      responsiblePersons,
    });
    
    // 保存成功后跳转到详情页
    navigate(`/fault-reports/${id || 'new-id'}`);
  };
  
  // 添加时间线项
  const addTimelineItem = () => {
    setTimeline([
      ...timeline,
      { time: new Date().toISOString(), person: "", action: "", notes: "" }
    ]);
  };
  
  // 删除时间线项
  const removeTimelineItem = (index: number) => {
    setTimeline(timeline.filter((_, i) => i !== index));
  };
  
  // 更新时间线项
  const updateTimelineItem = (index: number, field: string, value: string) => {
    const newTimeline = [...timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setTimeline(newTimeline);
  };
  
  // 添加反思项
  const addReflectionItem = () => {
    setReflections([
      ...reflections,
      { category: "", reflection: "" }
    ]);
  };
  
  // 删除反思项
  const removeReflectionItem = (index: number) => {
    setReflections(reflections.filter((_, i) => i !== index));
  };
  
  // 更新反思项
  const updateReflectionItem = (index: number, field: string, value: string) => {
    const newReflections = [...reflections];
    newReflections[index] = { ...newReflections[index], [field]: value };
    setReflections(newReflections);
  };
  
  // 添加改进项
  const addImprovementItem = () => {
    setImprovements([
      ...improvements,
      { task: "", responsible: "", deadline: new Date().toISOString().split('T')[0], status: "待开始" }
    ]);
  };
  
  // 删除改进项
  const removeImprovementItem = (index: number) => {
    setImprovements(improvements.filter((_, i) => i !== index));
  };
  
  // 更新改进项
  const updateImprovementItem = (index: number, field: string, value: string) => {
    const newImprovements = [...improvements];
    newImprovements[index] = { ...newImprovements[index], [field]: value };
    setImprovements(newImprovements);
  };
  
  // 添加责任部门
  const addResponsibleDepartment = () => {
    setResponsibleDepartments([
      ...responsibleDepartments,
      { name: "", percentage: 0 }
    ]);
  };
  
  // 删除责任部门
  const removeResponsibleDepartment = (index: number) => {
    setResponsibleDepartments(responsibleDepartments.filter((_, i) => i !== index));
  };
  
  // 更新责任部门
  const updateResponsibleDepartment = (index: number, field: string, value: any) => {
    const newDepartments = [...responsibleDepartments];
    newDepartments[index] = { ...newDepartments[index], [field]: value };
    setResponsibleDepartments(newDepartments);
  };
  
  // 添加责任人
  const addResponsiblePerson = (person: string) => {
    if (person && !responsiblePersons.includes(person)) {
      setResponsiblePersons([...responsiblePersons, person]);
    }
  };
  
  // 删除责任人
  const removeResponsiblePerson = (person: string) => {
    setResponsiblePersons(responsiblePersons.filter(p => p !== person));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">
              {isCreating ? "创建故障报告" : `编辑故障报告: ${faultReport.id}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isCreating ? "创建新的故障报告记录" : "修改现有故障报告信息"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            <X className="mr-2 h-4 w-4" />
            取消
          </Button>
          <Button 
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            <Save className="mr-2 h-4 w-4" />
            保存
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>故障标题</FormLabel>
                      <FormControl>
                        <Input placeholder="例如：2023年12月31日20:42 产品A 登录功能故障 D级" {...field} />
                      </FormControl>
                      <FormDescription>
                        建议格式：日期时间 产品名称 故障功能 故障级别
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>所属部门</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择部门" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="平台产品技术">平台产品技术</SelectItem>
                            <SelectItem value="支付技术部">支付技术部</SelectItem>
                            <SelectItem value="搜索技术部">搜索技术部</SelectItem>
                            <SelectItem value="订单技术部">订单技术部</SelectItem>
                            <SelectItem value="消息技术部">消息技术部</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>故障级别</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择级别" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="A">A级 (最严重)</SelectItem>
                            <SelectItem value="B">B级</SelectItem>
                            <SelectItem value="C">C级</SelectItem>
                            <SelectItem value="D">D级</SelectItem>
                            <SelectItem value="E">E级 (最轻微)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="affectedFunction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>影响功能</FormLabel>
                      <FormControl>
                        <Input placeholder="例如：产品A 登录模块" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>时间信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>故障开始时间</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="discoveryTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>故障发现时间</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="recoveryTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>服务恢复时间</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="p-4 bg-muted rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">服务影响时长</span>
                    <span className="text-lg font-bold">
                      {faultReport.impactDuration}分钟
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    根据故障开始时间和服务恢复时间自动计算
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>故障原因</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="rootCause"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>根本原因</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="描述导致故障的根本原因" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="triggerCause"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>触发原因</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="描述触发故障的直接原因" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="delayReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>导致故障时间增长的原因</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="描述导致故障持续时间延长的原因（如有）" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="faultCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>故障原因分类</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择分类" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="系统过载">系统过载</SelectItem>
                          <SelectItem value="数据库异常">数据库异常</SelectItem>
                          <SelectItem value="网络中断">网络中断</SelectItem>
                          <SelectItem value="缓存失效">缓存失效</SelectItem>
                          <SelectItem value="服务宕机">服务宕机</SelectItem>
                          <SelectItem value="代码缺陷">代码缺陷</SelectItem>
                          <SelectItem value="配置错误">配置错误</SelectItem>
                          <SelectItem value="第三方依赖">第三方依赖</SelectItem>
                          <SelectItem value="其他">其他</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>用户影响</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="userImpact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>对用户的影响</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="描述故障对用户的影响范围和程度" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        包括影响用户数量、比例、用户体验影响等
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>总请求数</Label>
                    <Input 
                      type="number" 
                      placeholder="例如：993889344"
                      defaultValue="993889344"
                    />
                  </div>
                  
                  <div>
                    <Label>慢请求比例 (%)</Label>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="例如：2.01"
                      defaultValue="2.01"
                    />
                  </div>
                  
                  <div>
                    <Label>错误请求数</Label>
                    <Input 
                      type="number" 
                      placeholder="例如：96833"
                      defaultValue="96833"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>责任部门与责任人</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>责任部门分配</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addResponsibleDepartment}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      添加部门
                    </Button>
                  </div>
                  
                  {responsibleDepartments.map((dept, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Select 
                        value={dept.name}
                        onValueChange={(value) => updateResponsibleDepartment(index, "name", value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="选择部门" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="平台产品技术">平台产品技术</SelectItem>
                          <SelectItem value="支付技术部">支付技术部</SelectItem>
                          <SelectItem value="搜索技术部">搜索技术部</SelectItem>
                          <SelectItem value="订单技术部">订单技术部</SelectItem>
                          <SelectItem value="消息技术部">消息技术部</SelectItem>
                          <SelectItem value="产品运维">产品运维</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Input 
                        type="number" 
                        placeholder="责任比例 (%)" 
                        className="w-[120px]"
                        value={dept.percentage}
                        onChange={(e) => updateResponsibleDepartment(index, "percentage", parseInt(e.target.value))}
                      />
                      
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeResponsibleDepartment(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <Label>责任人</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {responsiblePersons.map((person, index) => (
                        <Badge key={index} variant="secondary" className="px-2 py-1">
                          {person}
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-4 ml-1"
                            onClick={() => removeResponsiblePerson(person)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                      
                      <div className="flex items-center space-x-2">
                        <Input 
                          placeholder="添加责任人" 
                          className="w-[150px]"
                          id="newResponsiblePerson"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const input = document.getElementById('newResponsiblePerson') as HTMLInputElement;
                            addResponsiblePerson(input.value);
                            input.value = '';
                          }}
                        >
                          添加
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="timeline">故障处理过程</TabsTrigger>
                <TabsTrigger value="reflection">处理过程反思</TabsTrigger>
                <TabsTrigger value="improvements">改进措施</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timeline" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>故障处理时间线</CardTitle>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addTimelineItem}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        添加时间点
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {timeline.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md relative">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeTimelineItem(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label>时间</Label>
                              <Input 
                                type="datetime-local" 
                                value={item.time.split('.')[0]} // 移除毫秒部分
                                onChange={(e) => updateTimelineItem(index, "time", e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label>处理人</Label>
                              <Input 
                                placeholder="例如：张三" 
                                value={item.person}
                                onChange={(e) => updateTimelineItem(index, "person", e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label>操作</Label>
                              <Input 
                                placeholder="例如：发现告警" 
                                value={item.action}
                                onChange={(e) => updateTimelineItem(index, "action", e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label>备注</Label>
                              <Textarea 
                                placeholder="例如：收到监控系统告警邮件" 
                                value={item.notes}
                                onChange={(e) => updateTimelineItem(index, "notes", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reflection" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>故障处理过程反思</CardTitle>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addReflectionItem}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        添加反思
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reflections.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md relative">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeReflectionItem(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          
                          <div className="space-y-4">
                            <div>
                              <Label>分类</Label>
                              <Input 
                                placeholder="例如：监控" 
                                value={item.category}
                                onChange={(e) => updateReflectionItem(index, "category", e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label>反思内容</Label>
                              <Textarea 
                                placeholder="例如：监控告警阈值设置不合理，导致发现延迟" 
                                value={item.reflection}
                                onChange={(e) => updateReflectionItem(index, "reflection", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="improvements" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>改进措施</CardTitle>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addImprovementItem}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        添加改进措施
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {improvements.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md relative">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeImprovementItem(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          
                          <div className="space-y-4">
                            <div>
                              <Label>改进任务</Label>
                              <Input 
                                placeholder="例如：优化监控告警阈值" 
                                value={item.task}
                                onChange={(e) => updateImprovementItem(index, "task", e.target.value)}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label>负责人</Label>
                                <Input 
                                  placeholder="例如：张三" 
                                  value={item.responsible}
                                  onChange={(e) => updateImprovementItem(index, "responsible", e.target.value)}
                                />
                              </div>
                              
                              <div>
                                <Label>完成时限</Label>
                                <Input 
                                  type="date" 
                                  value={item.deadline.split('T')[0]}
                                  onChange={(e) => updateImprovementItem(index, "deadline", e.target.value)}
                                />
                              </div>
                              
                              <div>
                                <Label>状态</Label>
                                <Select 
                                  value={item.status}
                                  onValueChange={(value) => updateImprovementItem(index, "status", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="选择状态" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="待开始">待开始</SelectItem>
                                    <SelectItem value="进行中">进行中</SelectItem>
                                    <SelectItem value="已完成">已完成</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FaultReportEdit;