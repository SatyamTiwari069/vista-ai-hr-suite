import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ClockInOut() {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    const now = new Date().toLocaleTimeString();
    setClockInTime(now);
    setClockedIn(true);
    toast.success('Clocked in successfully');
  };

  const handleClockOut = () => {
    const now = new Date().toLocaleTimeString();
    setClockOutTime(now);
    setClockedIn(false);
    toast.success('Clocked out successfully');
  };

  const recentAttendance = [
    { date: '2024-06-14', clockIn: '09:05', clockOut: '17:32', duration: '8h 27m', status: 'present' },
    { date: '2024-06-13', clockIn: '08:55', clockOut: '17:45', duration: '8h 50m', status: 'present' },
    { date: '2024-06-12', clockIn: '09:15', clockOut: '17:20', duration: '8h 05m', status: 'present' },
    { date: '2024-06-11', clockIn: '-', clockOut: '-', duration: '-', status: 'on_leave' },
    { date: '2024-06-10', clockIn: '09:00', clockOut: '17:30', duration: '8h 30m', status: 'present' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Clock In/Out</h1>
        <p className="text-muted-foreground mt-2">Manage your daily attendance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Status</CardTitle>
            <CardDescription>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center py-8">
              <div className="text-6xl font-bold text-blue-600 font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
              <p className="text-muted-foreground mt-4">Current time</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-muted-foreground">Clock In</p>
                <p className="font-bold mt-2">{clockInTime || '--:--'}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-bold mt-2">
                  {clockInTime && clockOutTime ? '8h 30m' : clockInTime && !clockOutTime ? '0h 15m' : '--:--'}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-muted-foreground">Clock Out</p>
                <p className="font-bold mt-2">{clockOutTime || '--:--'}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1 h-14 text-lg"
                onClick={handleClockIn}
                disabled={clockedIn}
                variant={clockedIn ? 'secondary' : 'default'}
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Clock In
              </Button>
              <Button
                className="flex-1 h-14 text-lg"
                onClick={handleClockOut}
                disabled={!clockedIn}
                variant={!clockedIn ? 'secondary' : 'destructive'}
              >
                <XCircle className="mr-2 h-5 w-5" />
                Clock Out
              </Button>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Status:</strong> {clockedIn ? '✓ You are clocked in' : '○ You are clocked out'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Days Present</span>
              <span className="font-bold">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Days On Leave</span>
              <span className="font-bold">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Hours</span>
              <span className="font-bold">33h 52m</span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-sm font-medium">Attendance Rate</span>
              <span className="font-bold text-green-600">80%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList>
          <TabsTrigger value="recent">Recent Attendance</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Last 5 Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Clock In</th>
                      <th className="text-left py-3 px-4">Clock Out</th>
                      <th className="text-left py-3 px-4">Duration</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAttendance.map((entry, i) => (
                      <tr key={i} className="border-b hover:bg-accent">
                        <td className="py-3 px-4">{entry.date}</td>
                        <td className="py-3 px-4">{entry.clockIn}</td>
                        <td className="py-3 px-4">{entry.clockOut}</td>
                        <td className="py-3 px-4">{entry.duration}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            entry.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>June 2024 Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Present Days</p>
                  <p className="text-2xl font-bold">21</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Leave Days</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Half Days</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                  <p className="text-2xl font-bold">168h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
