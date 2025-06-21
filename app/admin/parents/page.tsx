import { ParentsTable } from "@/components/admin/parents-table"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ParentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Parent Management</h1>
          <p className="text-muted-foreground">Manage parent accounts and contact information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Parent
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Parents</CardTitle>
          <CardDescription>View and manage parent records</CardDescription>
        </CardHeader>
        <CardContent>
          <ParentsTable />
        </CardContent>
      </Card>
    </div>
  )
}
