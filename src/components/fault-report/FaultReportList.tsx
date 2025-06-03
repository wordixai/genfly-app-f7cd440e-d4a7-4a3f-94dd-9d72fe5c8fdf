import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpDown,
  ChevronDown,
  Filter,
  PlusCircle,
  Search,
  SlidersHorizontal,
  Download
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// 模拟数据
const faultReports = [
  {
    id: "FR-2023-12-31-001",
    title: "2023年12月31日20:42 产品A 登录功能故障",
    department: "平台产品技术",
    level: "D",
    score: 51.25,
    startTime: "2023-12-31T20:42:00",
    recoveryTime: "2023-12-31T23:16:00",
    impactDuration: 86,
    status: "已完成",
    responsiblePersons: ["张三", "李四"],
    faultCategory: "系统过载"
  },
  {
    id: "FR-2023-12-25-002",
    title: "2023年12月25日14:30 产品B 支付功能故障",
    department: "支付技术部",
    level: "C",
    score: 68.75,
    startTime: "2023-12-25T14:30:00",
    recoveryTime: "2023-12-25T15:45:00",
    impactDuration: 75,
    status: "已完成",
    responsiblePersons: ["王五", "赵六"],
    faultCategory: "数据库异常"
  },
  {
    id: "FR-2024-01-05-003",
    title: "2024年01月05日09:15 产品C 搜索功能故障",
    department: "搜索技术部",
    level: "E",
    score: 42.50,
    startTime: "2024-01-05T09:15:00",
    recoveryTime: "2024-01-05T10:00:00",
    impactDuration: 45,
    status: "进行中",
    responsiblePersons: ["李四", "孙七"],
    faultCategory: "缓存失效"
  },
  {
    id: "FR-2024-01-10-004",
    title: "2024年01月10日16:20 产品D 订单功能故障",
    department: "订单技术部",
    level: "B",
    score: 78.25,
    startTime: "2024-01-10T16:20:00",
    recoveryTime: "2024-01-10T18:30:00",
    impactDuration: 130,
    status: "待复盘",
    responsiblePersons: ["周八", "吴九"],
    faultCategory: "网络中断"
  },
  {
    id: "FR-2024-01-15-005",
    title: "2024年01月15日11:05 产品E 消息功能故障",
    department: "消息技术部",
    level: "A",
    score: 92.00,
    startTime: "2024-01-15T11:05:00",
    recoveryTime: "2024-01-15T15:45:00",
    impactDuration: 280,
    status: "待复盘",
    responsiblePersons: ["郑十", "钱十一"],
    faultCategory: "服务宕机"
  }
];

const FaultReportList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredReports = faultReports
    .filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(report.status);
      const matchesLevel = !selectedLevel || report.level === selectedLevel;
      const matchesDepartment = !selectedDepartment || report.department === selectedDepartment;
      
      return matchesSearch && matchesStatus && matchesLevel && matchesDepartment;
    })
    .sort((a, b) => {
      if (!sortColumn) return 0;
      
      let comparison = 0;
      switch (sortColumn) {
        case "id":
          comparison = a.id.localeCompare(b.id);
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "level":
          comparison = a.level.localeCompare(b.level);
          break;
        case "score":
          comparison = a.score - b.score;
          break;
        case "startTime":
          comparison = new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
          break;
        case "impactDuration":
          comparison = a.impactDuration - b.impactDuration;
          break;
        default:
          break;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const getLevelBadge = (level: string) => {
    const levelColors: Record<string, string> = {
      "A": "bg-red-100 text-red-800 hover:bg-red-100",
      "B": "bg-orange-100 text-orange-800 hover:bg-orange-100",
      "C": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      "D": "bg-blue-100 text-blue-800 hover:bg-blue-100",
      "E": "bg-green-100 text-green-800 hover:bg-green-100"
    };
    
    return (
      <Badge className={levelColors[level] || "bg-gray-100 text-gray-800"}>
        {level}级
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      "已完成": "bg-green-100 text-green-800 hover:bg-green-100",
      "进行中": "bg-blue-100 text-blue-800 hover:bg-blue-100",
      "待复盘": "bg-orange-100 text-orange-800 hover:bg-orange-100"
    };
    
    return (
      <Badge className={statusColors[status] || "bg-gray-100 text-gray-800"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">故障报告列表</h1>
          <p className="text-sm text-muted-foreground">
            查看和管理所有故障报告
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
          <Button asChild>
            <Link to="/fault-reports/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              创建故障报告
            </Link>
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="pending">待复盘</TabsTrigger>
              <TabsTrigger value="inProgress">进行中</TabsTrigger>
              <TabsTrigger value="completed">已完成</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索故障报告..."
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>筛选条件</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">状态</p>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatus.includes("已完成")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedStatus([...selectedStatus, "已完成"]);
                        } else {
                          setSelectedStatus(selectedStatus.filter(s => s !== "已完成"));
                        }
                      }}
                    >
                      已完成
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatus.includes("进行中")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedStatus([...selectedStatus, "进行中"]);
                        } else {
                          setSelectedStatus(selectedStatus.filter(s => s !== "进行中"));
                        }
                      }}
                    >
                      进行中
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatus.includes("待复盘")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedStatus([...selectedStatus, "待复盘"]);
                        } else {
                          setSelectedStatus(selectedStatus.filter(s => s !== "待复盘"));
                        }
                      }}
                    >
                      待复盘
                    </DropdownMenuCheckboxItem>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">故障级别</p>
                    <Select
                      value={selectedLevel}
                      onValueChange={setSelectedLevel}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择级别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">全部</SelectItem>
                        <SelectItem value="A">A级</SelectItem>
                        <SelectItem value="B">B级</SelectItem>
                        <SelectItem value="C">C级</SelectItem>
                        <SelectItem value="D">D级</SelectItem>
                        <SelectItem value="E">E级</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">所属部门</p>
                    <Select
                      value={selectedDepartment}
                      onValueChange={setSelectedDepartment}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择部门" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">全部</SelectItem>
                        <SelectItem value="平台产品技术">平台产品技术</SelectItem>
                        <SelectItem value="支付技术部">支付技术部</SelectItem>
                        <SelectItem value="搜索技术部">搜索技术部</SelectItem>
                        <SelectItem value="订单技术部">订单技术部</SelectItem>
                        <SelectItem value="消息技术部">消息技术部</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort("id")}
                        >
                          ID
                          {sortColumn === "id" && (
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort("title")}
                        >
                          故障标题
                          {sortColumn === "title" && (
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>所属部门</TableHead>
                      <TableHead className="w-[80px]">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort("level")}
                        >
                          级别
                          {sortColumn === "level" && (
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="w-[80px]">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort("score")}
                        >
                          评分
                          {sortColumn === "score" && (
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="w-[150px]">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort("startTime")}
                        >
                          故障时间
                          {sortColumn === "startTime" && (
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort("impactDuration")}
                        >
                          影响时长
                          {sortColumn === "impactDuration" && (
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]">状态</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>
                          <Link 
                            to={`/fault-reports/${report.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {report.title}
                          </Link>
                        </TableCell>
                        <TableCell>{report.department}</TableCell>
                        <TableCell>{getLevelBadge(report.level)}</TableCell>
                        <TableCell>{report.score}</TableCell>
                        <TableCell>
                          {new Date(report.startTime).toLocaleString('zh-CN', {
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                        <TableCell>{report.impactDuration}分钟</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    asChild
                                  >
                                    <Link to={`/fault-reports/${report.id}`}>
                                      <Search className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>查看</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    asChild
                                  >
                                    <Link to={`/fault-reports/${report.id}/edit`}>
                                      <SlidersHorizontal className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>编辑</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            {/* 待复盘的故障报告 */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  {/* 表头与全部相同 */}
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">ID</TableHead>
                      <TableHead>故障标题</TableHead>
                      <TableHead>所属部门</TableHead>
                      <TableHead className="w-[80px]">级别</TableHead>
                      <TableHead className="w-[80px]">评分</TableHead>
                      <TableHead className="w-[150px]">故障时间</TableHead>
                      <TableHead className="w-[100px]">影响时长</TableHead>
                      <TableHead className="w-[100px]">状态</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports
                      .filter(report => report.status === "待复盘")
                      .map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>
                            <Link 
                              to={`/fault-reports/${report.id}`}
                              className="text-blue-600 hover:underline"
                            >
                              {report.title}
                            </Link>
                          </TableCell>
                          <TableCell>{report.department}</TableCell>
                          <TableCell>{getLevelBadge(report.level)}</TableCell>
                          <TableCell>{report.score}</TableCell>
                          <TableCell>
                            {new Date(report.startTime).toLocaleString('zh-CN', {
                              month: 'numeric',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </TableCell>
                          <TableCell>{report.impactDuration}分钟</TableCell>
                          <TableCell>{getStatusBadge(report.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                asChild
                              >
                                <Link to={`/fault-reports/${report.id}`}>
                                  <Search className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                asChild
                              >
                                <Link to={`/fault-reports/${report.id}/edit`}>
                                  <SlidersHorizontal className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inProgress" className="mt-4">
            {/* 进行中的故障报告 */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  {/* 表头与全部相同 */}
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">ID</TableHead>
                      <TableHead>故障标题</TableHead>
                      <TableHead>所属部门</TableHead>
                      <TableHead className="w-[80px]">级别</TableHead>
                      <TableHead className="w-[80px]">评分</TableHead>
                      <TableHead className="w-[150px]">故障时间</TableHead>
                      <TableHead className="w-[100px]">影响时长</TableHead>
                      <TableHead className="w-[100px]">状态</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports
                      .filter(report => report.status === "进行中")
                      .map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>
                            <Link 
                              to={`/fault-reports/${report.id}`}
                              className="text-blue-600 hover:underline"
                            >
                              {report.title}
                            </Link>
                          </TableCell>
                          <TableCell>{report.department}</TableCell>
                          <TableCell>{getLevelBadge(report.level)}</TableCell>
                          <TableCell>{report.score}</TableCell>
                          <TableCell>
                            {new Date(report.startTime).toLocaleString('zh-CN', {
                              month: 'numeric',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </TableCell>
                          <TableCell>{report.impactDuration}分钟</TableCell>
                          <TableCell>{getStatusBadge(report.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                asChild
                              >
                                <Link to={`/fault-reports/${report.id}`}>
                                  <Search className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                asChild
                              >
                                <Link to={`/fault-reports/${report.id}/edit`}>
                                  <SlidersHorizontal className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            {/* 已完成的故障报告 */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  {/* 表头与全部相同 */}
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">ID</TableHead>
                      <TableHead>故障标题</TableHead>
                      <TableHead>所属部门</TableHead>
                      <TableHead className="w-[80px]">级别</TableHead>
                      <TableHead className="w-[80px]">评分</TableHead>
                      <TableHead className="w-[150px]">故障时间</TableHead>
                      <TableHead className="w-[100px]">影响时长</TableHead>
                      <TableHead className="w-[100px]">状态</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports
                      .filter(report => report.status === "已完成")
                      .map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>
                            <Link 
                              to={`/fault-reports/${report.id}`}
                              className="text-blue-600 hover:underline"
                            >
                              {report.title}
                            </Link>
                          </TableCell>
                          <TableCell>{report.department}</TableCell>
                          <TableCell>{getLevelBadge(report.level)}</TableCell>
                          <TableCell>{report.score}</TableCell>
                          <TableCell>
                            {new Date(report.startTime).toLocaleString('zh-CN', {
                              month: 'numeric',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </TableCell>
                          <TableCell>{report.impactDuration}分钟</TableCell>
                          <TableCell>{getStatusBadge(report.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                asChild
                              >
                                <Link to={`/fault-reports/${report.id}`}>
                                  <Search className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                asChild
                              >
                                <Link to={`/fault-reports/${report.id}/edit`}>
                                  <SlidersHorizontal className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FaultReportList;