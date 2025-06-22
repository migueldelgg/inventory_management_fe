import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FormModalProps {
  visible: boolean
  title: string
  fields: Record<string, string> // Ex: { email: '', cpf: '' }
  submitLabel?: string
  onSubmit: (data: Record<string, string>) => void
  onClose: () => void
}

export function FormModal({ visible, title, fields, submitLabel = "Salvar", onSubmit, onClose }: FormModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>(fields)

  useEffect(() => {
    if (visible) setFormData(fields) // Reset ao abrir
  }, [visible, fields])

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="text-sm font-medium capitalize mb-1 block" htmlFor={key}>
                {key}
              </label>
              <Input
                id={key}
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={`Digite o ${key}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{submitLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
