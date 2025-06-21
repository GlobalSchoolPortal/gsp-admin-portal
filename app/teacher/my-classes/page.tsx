import { MyClassesTable } from "@/components/teacher/my-classes-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MyClassesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Classes</h1>
        <p className="text-muted-foreground">View and manage your assigned classes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Classes</CardTitle>
          <CardDescription>Classes you are teaching this semester</CardDescription>
        </CardHeader>
        <CardContent>
          <MyClassesTable />
        </CardContent>
      </Card>
    </div>
  )
}
