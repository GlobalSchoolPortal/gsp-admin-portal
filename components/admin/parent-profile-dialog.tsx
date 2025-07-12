import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Users,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { apiClient } from "@/lib/api";
import useSWR, { mutate } from 'swr';

// Types for fetched data
type Teacher = {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  avatar: string;
  experience: string;
  department: string;
  office: string;
  officeHours: string;
};
type Classroom = {
  id: string;
  code: string;
  section: string;
  description: string;
  academicYear: string;
  roomCapacity: number;
  active: boolean;
  teacher: any;
};
type Student = {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  occupation: string;
  emergencyContact: boolean;
};

type ParentProfileDialogProps = {
  parent: any; // Replace with your Parent type
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Helper to get cookie value by name
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

// Remove unused fetchStudents function since we're getting data from props
// const fetchStudents = async (parentId: string, academicYear: string, token?: string) => {
//   if (!parentId) return [];
//   return await apiClient.getStudentsByParentId(parentId, academicYear, token);
// };

export const ParentProfileDialog: React.FC<ParentProfileDialogProps> = ({
  parent,
  open,
  onOpenChange,
}) => {
  const academicYear = parent.academicYear || "2023-2024";
  const token = typeof window !== 'undefined' ? getCookie('token') || undefined : undefined;
  const [activeTab, setActiveTab] = useState("students");

  // Console log to see what data is being passed from the table
  console.log("Parent data passed from table:", parent);
  console.log("Students array:", parent?.students);
  console.log("Number of students:", parent?.students?.length);

  // Use parent data directly from props instead of API call
  const parentData = parent;
  const parentError = null;
  const parentLoading = false;

  const loading = parentLoading;
  const error = parentError;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 bg-background">
        <DialogHeader className="bg-gradient-to-br from-muted/80 via-background to-muted/60 border-b border-border rounded-t-lg px-0 pt-0 pb-0">
          {/* Accessible DialogTitle for screen readers */}
          <DialogTitle asChild>
            <span className="sr-only">Parent Profile</span>
          </DialogTitle>
          {loading ? (
            <div className="p-8 flex flex-col gap-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500 flex flex-col items-center gap-2">
              <AlertCircle className="h-8 w-8" />
              <span>{"Failed to load parent details."}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {/* Avatar, Name, Status */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-0 px-8 pt-8 pb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                  <div className="flex justify-center md:justify-start w-full md:w-auto">
                    <Avatar className="h-24 w-24 bg-gray-200 text-gray-900 font-bold shadow-lg border-4 border-primary ring-4 ring-primary/10">
                      <AvatarFallback>{parentData?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col items-center md:items-start w-full md:w-auto mt-4 md:mt-0">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-extrabold text-foreground leading-tight">{parentData?.name}</span>
                      <Badge variant={parentData?.active ? "default" : "secondary"} className="px-3 py-1 text-xs rounded-full">
                        {parentData?.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium">Parent ID: {parentData?.id}</div>
                    <div className="flex gap-2 flex-wrap items-center mt-3">
                      <Badge variant="outline" className="px-3 py-1 text-xs">Relationship: {parentData?.relationshipType || 'N/A'}</Badge>
                      <Badge variant="outline" className="px-3 py-1 text-xs">Occupation: {parentData?.occupation || 'N/A'}</Badge>
                      <Badge variant="outline" className="px-3 py-1 text-xs">Language: {parentData?.language || 'N/A'}</Badge>
                    </div>
                  </div>
                </div>
              </div>
              {/* Contact & Address Card */}
              <div className="flex flex-col md:flex-row gap-4 px-8 pb-8">
                {/* Contact Card */}
                <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col gap-3 shadow-sm min-w-0">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 tracking-wide uppercase">Contact</div>
                  <div className="flex items-center gap-3 text-base">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href={`mailto:${parentData?.email}`} className="text-blue-700 hover:underline hover:text-primary transition-colors font-medium">{parentData?.email || 'N/A'}</a>
                  </div>
                  <div className="flex items-center gap-3 text-base">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href={`tel:${parentData?.phoneNumber}`} className="text-blue-700 hover:underline hover:text-primary transition-colors font-medium">{parentData?.phoneNumber || 'N/A'}</a>
                  </div>
                </div>
                {/* Divider for desktop */}
                <div className="hidden md:block w-2" />
                {/* Address Card */}
                {parentData?.address ? (
                  <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-5 flex flex-col gap-3 shadow-sm min-w-0">
                    <div className="text-xs font-semibold text-muted-foreground mb-1 tracking-wide uppercase">Address</div>
                    <div className="flex items-start gap-3 text-base">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div className="text-muted-foreground font-medium">
                        {parentData.address.addressLine1}, {parentData.address.addressLine2 && `${parentData.address.addressLine2}, `}{parentData.address.city}, {parentData.address.state}, {parentData.address.country} {parentData.address.zipCode}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-5 flex flex-col gap-3 shadow-sm min-w-0">
                    <div className="text-xs font-semibold text-muted-foreground mb-1 tracking-wide uppercase">Address</div>
                    <div className="flex items-start gap-3 text-base">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div className="text-muted-foreground font-medium">No address information available</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogHeader>
        {/* Only show tabs if not loading/error */}
        {!loading && !error && (
          <div className="px-4 pb-6 pt-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-2">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted rounded-lg p-1">
                <TabsTrigger value="students" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Students</span>
                </TabsTrigger>
                <TabsTrigger value="classroom" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Classroom</span>
                </TabsTrigger>
              </TabsList>
              {/* Students Tab */}
              <TabsContent value="students" className="space-y-6">
                <Card className="p-6 bg-card rounded-xl shadow-md border border-border">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Students ({parentData?.students?.length || 0} students)
                    </h3>
                    <p className="text-sm text-muted-foreground">All students associated with this parent</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {parentData?.students && parentData.students.length > 0
                      ? parentData.students.map((student: any) => (
                          <Card key={student.id} className="p-5 border border-border bg-background rounded-xl shadow flex flex-col gap-3">
                            <div className="flex items-center gap-3 mb-2">
                              <Avatar className="h-12 w-12 bg-gray-200 text-gray-900 font-bold border-2 border-primary">
                                <AvatarFallback>{student.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold text-lg text-foreground flex items-center gap-2">
                                  {student.name}
                                  <Badge variant={student.active ? "default" : "secondary"} className="ml-2 px-2 py-0.5 text-xs">
                                    {student.active ? "Active" : "Inactive"}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">Reg. No: {student.registrationNumber}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {student.email && (
                                <a href={`mailto:${student.email}`} className="flex items-center gap-2 text-blue-700 hover:underline">
                                  <Mail className="h-4 w-4" /> {student.email}
                                </a>
                              )}
                              {student.phoneNumber && (
                                <a href={`tel:${student.phoneNumber}`} className="flex items-center gap-2 text-blue-700 hover:underline">
                                  <Phone className="h-4 w-4" /> {student.phoneNumber}
                                </a>
                              )}
                            </div>
                            {student.address && (
                              <div className="bg-muted rounded-lg p-3 border mt-2 flex items-start gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4 mt-1 text-primary" />
                                <div className="text-xs">
                                  {student.address.addressLine1}, {student.address.addressLine2 && `${student.address.addressLine2}, `}{student.address.city}, {student.address.state}, {student.address.country} {student.address.zipCode}
                                </div>
                              </div>
                            )}
                            {console.log(student.classroom)}
                            {student.classroom ? (
                              <div className="bg-blue-50 rounded-lg p-3 border mt-2">
                                <div className="text-xs font-semibold text-blue-800 mb-1">Classroom</div>
                                <div className="text-xs text-blue-700">
                                  {student.classroom.code} - {student.classroom.section}
                                </div>
                              </div>
                            ) : (
                              <div className="bg-gray-50 rounded-lg p-3 border mt-2">
                                <div className="text-xs text-muted-foreground">No classroom assigned</div>
                              </div>
                            )}
                          </Card>
                        ))
                      : (
                        <div className="col-span-full text-center py-8">
                          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">No students found for this parent.</p>
                        </div>
                      )}
                  </div>
                </Card>
              </TabsContent>
              {/* Classroom Tab */}
              <TabsContent value="classroom" className="space-y-6">
                <Card className="p-6 bg-card rounded-xl shadow-md border border-border">
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Classroom details will be loaded here</p>
                    <p className="text-xs text-muted-foreground mt-1">Waiting for data structure...</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}; 