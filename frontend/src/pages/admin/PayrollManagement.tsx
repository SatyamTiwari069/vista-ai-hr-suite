import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DollarSign, Download, Plus, Eye } from 'lucide-react';

export default function PayrollManagement() {
  const [selectedMonth, setSelectedMonth] = useState('June 2024');
  const form = useForm();

  const payrollData = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      basicSalary: 50000,
      allowances: 5000,
      deductions: 3000,
      netSalary: 52000,
      status: 'paid',
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      basicSalary: 55000,
      allowances: 6000,
      deductions: 3500,
      netSalary: 57500,
      status: 'processed',
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      basicSalary: 45000,
      allowances: 4500,
      deductions: 2700,
      netSalary: 46800,
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payroll Management</h1>
          <p className="text-muted-foreground mt-2">Manage employee salaries and payslips</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Process Payroll
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process Payroll</DialogTitle>
              <DialogDescription>Create and process payroll for selected month</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <FormItem>
                <FormLabel>Month</FormLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jan">January 2024</SelectItem>
                    <SelectItem value="feb">February 2024</SelectItem>
                    <SelectItem value="mar">March 2024</SelectItem>
                    <SelectItem value="apr">April 2024</SelectItem>
                    <SelectItem value="may">May 2024</SelectItem>
                    <SelectItem value="jun">June 2024</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
              <Button className="w-full">Process Payroll</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payslips">Payslips</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Payroll</p>
                  <p className="text-2xl font-bold mt-2">$2,456,000</p>
                  <p className="text-xs text-muted-foreground mt-2">June 2024</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Processed</p>
                  <p className="text-2xl font-bold mt-2">156</p>
                  <p className="text-xs text-green-600 mt-2">Out of 200</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold mt-2">44</p>
                  <p className="text-xs text-yellow-600 mt-2">22% pending</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Avg Salary</p>
                  <p className="text-2xl font-bold mt-2">$12,280</p>
                  <p className="text-xs text-muted-foreground mt-2">Per employee</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Payroll List</CardTitle>
                  <CardDescription>{selectedMonth}</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Employee</th>
                      <th className="text-left py-3 px-4">Employee ID</th>
                      <th className="text-right py-3 px-4">Basic Salary</th>
                      <th className="text-right py-3 px-4">Allowances</th>
                      <th className="text-right py-3 px-4">Deductions</th>
                      <th className="text-right py-3 px-4">Net Salary</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.map((entry) => (
                      <tr key={entry.id} className="border-b hover:bg-accent">
                        <td className="py-3 px-4">{entry.employeeName}</td>
                        <td className="py-3 px-4">{entry.employeeId}</td>
                        <td className="py-3 px-4 text-right">${entry.basicSalary.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">${entry.allowances.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">${entry.deductions.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-medium">${entry.netSalary.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            entry.status === 'paid' ? 'bg-green-100 text-green-700' :
                            entry.status === 'processed' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payslips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payslip Details</CardTitle>
              <CardDescription>View and download individual payslips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {payrollData.map((entry) => (
                  <Card key={entry.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="font-medium">{entry.employeeName}</div>
                        <div className="text-sm text-muted-foreground">{entry.employeeId}</div>
                        <div className="border-t pt-3 mt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Basic Salary:</span>
                            <span>${entry.basicSalary.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Allowances:</span>
                            <span>${entry.allowances.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm text-red-600">
                            <span>Deductions:</span>
                            <span>-${entry.deductions.toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-3 flex justify-between font-medium">
                            <span>Net Salary:</span>
                            <span>${entry.netSalary.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Payslip
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Reports</CardTitle>
              <CardDescription>Generate and download payroll reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-24">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Monthly Summary</p>
                      <p className="text-sm text-muted-foreground">Total payroll breakdown</p>
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Tax Report</p>
                      <p className="text-sm text-muted-foreground">Tax deductions summary</p>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
