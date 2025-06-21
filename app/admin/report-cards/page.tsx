import { ReportCardsTable } from "@/components/admin/report-cards-table"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportCardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Report Cards</h1>
          <p className="text-muted-foreground">Generate and manage student report cards</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Generate Reports
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Cards</CardTitle>
          <CardDescription>View and manage student report cards</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportCardsTable />
        </CardContent>
      </Card>
    </div>
  )
}
