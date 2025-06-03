import React from "react";
import { FileText, Upload, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Document {
  name: string;
  uploadTime: string;
  uploader: string;
}

interface FaultDocumentUploadProps {
  documents: Document[];
}

const FaultDocumentUpload: React.FC<FaultDocumentUploadProps> = ({ documents }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>相关文档</CardTitle>
            <CardDescription>
              故障相关的报告、分析文档和总结
            </CardDescription>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            上传文档
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>文档名称</TableHead>
              <TableHead>上传时间</TableHead>
              <TableHead>上传人</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell>{new Date(doc.uploadTime).toLocaleString('zh-CN')}</TableCell>
                <TableCell>{doc.uploader}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FaultDocumentUpload;