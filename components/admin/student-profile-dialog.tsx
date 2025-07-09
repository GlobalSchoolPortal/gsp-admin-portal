import React, { useEffect, useState } from "react";
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
  teacher: any; // Use 'any' for now to avoid linter errors
};
type Parent = {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  occupation: string;
  emergencyContact: boolean;
};

type StudentProfileDialogProps = {
  student: any; // Replace with your Student type
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

const fetchClassroom = async (studentId: string, academicYear: string, token?: string) => {
  if (!studentId || !academicYear) return null;
  return await apiClient.getClassroomByStudentId(studentId, academicYear, token);
};
const fetchParents = async (studentId: string, academicYear: string, token?: string) => {
  if (!studentId) return [];
  return await apiClient.getParentsByStudentId(studentId, academicYear, token);
};
const fetchStudentAcademic = async (studentId: string, academicYear: string, token?: string) => {
  if (!studentId || !academicYear) return null;
  return await apiClient.getStudentByIdAcademicYear(studentId, academicYear, token);
};
const fetchClassroomSubjects = async (classroomId: string, academicYear: string, token?: string) => {
  if (!classroomId || !academicYear) return [];
  return await apiClient.getClassroomSubjects(classroomId, academicYear, token);
};

export const StudentProfileDialog: React.FC<StudentProfileDialogProps> = ({
  student,
  open,
  onOpenChange,
}) => {
  const academicYear = student.academicYear || "2023-2024";
  const token = typeof window !== 'undefined' ? getCookie('token') || undefined : undefined;
  const [activeTab, setActiveTab] = useState("parents");

  // Prefetch Overview data when dialog opens
  useEffect(() => {
    if (open && student.id && academicYear) {
      mutate([
        "studentAcademic",
        student.id,
        academicYear,
        token,
      ], fetchStudentAcademic(student.id, academicYear, token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, student.id, academicYear, token]);

  // Prefetch handlers for each tab
  const handlePrefetchClassroom = () => {
    if (open && student.id && academicYear) {
      mutate([
        "studentAcademic",
        student.id,
        academicYear,
        token,
      ], fetchStudentAcademic(student.id, academicYear, token));
    }
  };
  const handlePrefetchParents = () => {
    if (open && student.id) {
      mutate([
        "parents",
        student.id,
        token,
      ], fetchParents(student.id, academicYear, token));
    }
  };
  // Add more prefetch handlers as needed for other tabs

  // SWR for student academic (replaces teachers)
  const { data: studentAcademicRaw, error: studentAcademicError, isLoading: studentAcademicLoading } = useSWR(
    open && student.id && academicYear ? ["studentAcademic", student.id, academicYear, token] : null,
    () => fetchStudentAcademic(student.id, academicYear, token)
  );
  // SWR for parents
  const { data: parentsRaw, error: parentsError, isLoading: parentsLoading } = useSWR(
    open && student.id ? ["parents", student.id, token] : null,
    () => fetchParents(student.id, academicYear, token)
  );

  // Data normalization
  const classroomData = studentAcademicRaw && typeof studentAcademicRaw === 'object' && 'content' in studentAcademicRaw && studentAcademicRaw.content && typeof studentAcademicRaw.content === 'object' && 'code' in studentAcademicRaw.content
    ? (studentAcademicRaw.content as unknown as Classroom)
    : (studentAcademicRaw && typeof studentAcademicRaw === 'object' && 'code' in studentAcademicRaw ? (studentAcademicRaw as unknown as Classroom) : null);
  const parentData = Array.isArray(parentsRaw) ? parentsRaw : [];

  // Always get classroomId from studentAcademicRaw
  const classroomId = studentAcademicRaw?.classroom?.id;

  // SWR for classroom subjects (only fetch when Classroom tab is active and classroomId is available)
  const { data: classroomSubjectsRaw, error: classroomSubjectsError, isLoading: classroomSubjectsLoading } = useSWR(
    open && activeTab === "classroom" && classroomId && academicYear
      ? ["classroomSubjects", classroomId, academicYear, token]
      : null,
    () => classroomId ? fetchClassroomSubjects(classroomId, academicYear, token) : []
  );

  // Prefetch handler for Classroom tab
  const handlePrefetchClassroomSubjects = () => {
    if (open && classroomId && academicYear) {
      mutate([
        "classroomSubjects",
        classroomId,
        academicYear,
        token,
      ], fetchClassroomSubjects(classroomId, academicYear, token));
    }
  };

  const loading = studentAcademicLoading || parentsLoading;
  const error = studentAcademicError || parentsError;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 bg-background">
        <DialogHeader className="bg-gradient-to-br from-muted/80 via-background to-muted/60 border-b border-border rounded-t-lg px-0 pt-0 pb-0">
          {/* Accessible DialogTitle for screen readers */}
          <DialogTitle asChild>
            <span className="sr-only">Student Profile</span>
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
              <span>{error.message || "Failed to load student details."}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {/* Avatar, Name, Status */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-0 px-8 pt-8 pb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                  <div className="flex justify-center md:justify-start w-full md:w-auto">
                    <Avatar className="h-24 w-24 bg-gray-200 text-gray-900 font-bold shadow-lg border-4 border-primary ring-4 ring-primary/10">
                      <AvatarFallback>{studentAcademicRaw?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col items-center md:items-start w-full md:w-auto mt-4 md:mt-0">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-extrabold text-foreground leading-tight">{studentAcademicRaw?.name}</span>
                      <Badge variant={studentAcademicRaw?.active ? "default" : "secondary"} className="px-3 py-1 text-xs rounded-full">
                        {studentAcademicRaw?.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium">Reg. No: {studentAcademicRaw?.registrationNumber}</div>
                    <div className="flex gap-2 flex-wrap items-center mt-3">
                      <Badge variant="outline" className="px-3 py-1 text-xs">Classroom: {studentAcademicRaw?.classroom.code}</Badge>
                      <Badge variant="outline" className="px-3 py-1 text-xs">Year: {studentAcademicRaw?.academicYear}</Badge>
                      <Badge variant="outline" className="px-3 py-1 text-xs">Language: {studentAcademicRaw?.language}</Badge>
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
                    <a href={`mailto:${studentAcademicRaw?.email}`} className="text-blue-700 hover:underline hover:text-primary transition-colors font-medium">{studentAcademicRaw?.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-base">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href={`tel:${studentAcademicRaw?.phoneNumber}`} className="text-blue-700 hover:underline hover:text-primary transition-colors font-medium">{studentAcademicRaw?.phoneNumber}</a>
                  </div>
                </div>
                {/* Divider for desktop */}
                <div className="hidden md:block w-2" />
                {/* Address Card */}
                {studentAcademicRaw?.address && (
                  <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-5 flex flex-col gap-3 shadow-sm min-w-0">
                    <div className="text-xs font-semibold text-muted-foreground mb-1 tracking-wide uppercase">Address</div>
                    <div className="flex items-start gap-3 text-base">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div className="text-muted-foreground font-medium">
                        {studentAcademicRaw.address.addressLine1}, {studentAcademicRaw.address.addressLine2 && `${studentAcademicRaw.address.addressLine2}, `}{studentAcademicRaw.address.city}, {studentAcademicRaw.address.state}, {studentAcademicRaw.address.country} {studentAcademicRaw.address.zipCode}
                      </div>
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
                <TabsTrigger value="parents" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Parents</span>
                </TabsTrigger>
                <TabsTrigger value="classroom" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Classroom</span>
                </TabsTrigger>
              </TabsList>
              {/* Parents Tab */}
              <TabsContent value="parents" className="space-y-6">
                <Card className="p-6 bg-card rounded-xl shadow-md border border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {parentData.length > 0
                      ? parentData.map((parent: any) => (
                          <Card key={parent.id} className="p-5 border border-border bg-background rounded-xl shadow flex flex-col gap-3">
                            <div className="flex items-center gap-3 mb-2">
                              <Avatar className="h-12 w-12 bg-gray-200 text-gray-900 font-bold border-2 border-primary">
                                <AvatarFallback>{parent.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold text-lg text-foreground flex items-center gap-2">
                                  {parent.name}
                                  <Badge variant="outline" className="ml-2 uppercase tracking-wide bg-blue-100 text-blue-800 border-blue-200 px-2 py-0.5 text-xs">{parent.relationshipType}</Badge>
                                  {parent.emergencyContact && <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs">Emergency</Badge>}
                                </div>
                                {parent.occupation && <Badge variant="secondary" className="mt-1 px-2 py-0.5 text-xs">{parent.occupation}</Badge>}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {parent.email && (
                                <a href={`mailto:${parent.email}`} className="flex items-center gap-2 text-blue-700 hover:underline">
                                  <Mail className="h-4 w-4" /> {parent.email}
                                </a>
                              )}
                              {parent.phoneNumber && (
                                <a href={`tel:${parent.phoneNumber}`} className="flex items-center gap-2 text-blue-700 hover:underline">
                                  <Phone className="h-4 w-4" /> {parent.phoneNumber}
                                </a>
                              )}
                            </div>
                            {parent.address && (
                              <div className="bg-muted rounded-lg p-3 border mt-2 flex items-start gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4 mt-1 text-primary" />
                                <div className="text-xs">
                                  {parent.address.addressLine1}, {parent.address.addressLine2 && `${parent.address.addressLine2}, `}{parent.address.city}, {parent.address.state}, {parent.address.country} {parent.address.zipCode}
                                </div>
                              </div>
                            )}
                          </Card>
                        ))
                      : Array.from({ length: 2 }).map((_: any, i: number) => (
                          <Skeleton key={i} className="h-20 w-full" />
                        ))}
                  </div>
                </Card>
              </TabsContent>
              {/* Classroom Tab */}
              <TabsContent value="classroom" className="space-y-6">
                <Card className="p-6 bg-card rounded-xl shadow-md border border-border">
                  {classroomSubjectsLoading ? (
                    <Skeleton className="h-20 w-full" />
                  ) : classroomSubjectsError ? (
                    <div className="text-red-500">Failed to load classroom subjects.</div>
                  ) : classroomSubjectsRaw && Array.isArray(classroomSubjectsRaw) && classroomSubjectsRaw.length > 0 ? (
                    <div className="max-h-[400px] overflow-auto pr-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {classroomSubjectsRaw.map((item: any, idx: number) => (
                          <Card key={idx} className="p-4 shadow border border-border bg-background rounded-xl flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold text-lg text-foreground">{item.subject.name}</div>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">{item.subject.code}</Badge>
                              {item.subject.active ? (
                                <Badge variant="default" className="ml-2 px-2 py-0.5 text-xs">Active</Badge>
                              ) : (
                                <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">Inactive</Badge>
                              )}
                            </div>
                            {item.subject.description && <div className="text-xs text-muted-foreground mb-1">{item.subject.description}</div>}
                            {/* Teacher Card */}
                            {item.teacher && (
                              <Card className="bg-muted border border-border mt-2 rounded-lg">
                                <div className="p-3">
                                  <div className="text-base font-semibold flex items-center gap-2 text-foreground">
                                    <User className="h-4 w-4" />
                                    {item.teacher.name}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                    {item.teacher.email && (
                                      <a href={`mailto:${item.teacher.email}`} className="flex items-center gap-1 text-blue-700 hover:underline">
                                        <Mail className="h-3 w-3" /> {item.teacher.email}
                                      </a>
                                    )}
                                    {item.teacher.phoneNumber && (
                                      <a href={`tel:${item.teacher.phoneNumber}`} className="flex items-center gap-1 text-blue-700 hover:underline">
                                        <Phone className="h-3 w-3 ml-2" /> {item.teacher.phoneNumber}
                                      </a>
                                    )}
                                  </div>
                                  {Array.isArray(item.teacher.qualification) && item.teacher.qualification.length > 0 && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      <span className="font-semibold">Qualifications:</span>
                                      <ul className="list-disc ml-5">
                                        {item.teacher.qualification.map((q: any, qidx: number) => (
                                          <li key={qidx}>{q.name} ({q.level}, {q.institution}, {q.yearObtained})</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {Array.isArray(item.teacher.experience) && item.teacher.experience.length > 0 && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      <span className="font-semibold">Experience:</span>
                                      <ul className="list-disc ml-5">
                                        {item.teacher.experience.map((exp: any, eidx: number) => (
                                          <li key={eidx}>{exp.position} at {exp.institutionName} ({exp.startDate} - {exp.endDate || 'Present'})</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </Card>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">No subjects found for this classroom.</div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}; 