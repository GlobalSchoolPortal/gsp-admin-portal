import { SchoolSettingsForm } from "@/components/admin/school-settings-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">School Settings</h1>
        <p className="text-muted-foreground">Configure school settings and preferences</p>
      </div>

      <SchoolSettingsForm />
    </div>
  )
}
