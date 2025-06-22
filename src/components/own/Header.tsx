import { Button } from "../ui/button"

type HeaderProps = {
  title: string
  actionText?: string
  onActionClick?: () => void
  deleteText?: string
  onDeleteClick?: () => void
  disabledDelete?: boolean
}

export default function Header({
  title,
  actionText,
  onActionClick,
  deleteText,
  onDeleteClick,
  disabledDelete, // 🔑 você esqueceu de extrair isso
}: HeaderProps) {
  return (
    <div className="w-full px-6 py-6 flex items-center justify-between border-b">
      <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
      <div className="flex gap-2">
        {deleteText && (
          <Button
            variant="destructive"
            className="h-9 px-4"
            onClick={onDeleteClick}
            disabled={disabledDelete}
          >
            {deleteText}
          </Button>
        )}
        {actionText && (
          <Button className="h-9 px-4" onClick={onActionClick}>
            {actionText}
          </Button>
        )}
      </div>
    </div>
  )
}
