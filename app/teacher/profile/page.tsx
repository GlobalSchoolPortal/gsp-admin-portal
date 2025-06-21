import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function TeacherProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your profile information and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt="Teacher" />
                <AvatarFallback>TU</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Photo</Button>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Teacher User" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="teacher@school.edu" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 234-567-8900" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teaching Information</CardTitle>
            <CardDescription>Your subjects and classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Subjects Teaching</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge>Mathematics</Badge>
                <Badge>Physics</Badge>
                <Badge>Chemistry</Badge>
              </div>
            </div>

            <div>
              <Label>Assigned Classes</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">10A</Badge>
                <Badge variant="outline">10B</Badge>
                <Badge variant="outline">11A</Badge>
              </div>
            </div>

            <div>
              <Label>Employee ID</Label>
              <Input defaultValue="EMP001" disabled />
            </div>

            <div>
              <Label>Department</Label>
              <Input defaultValue="Science" disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
