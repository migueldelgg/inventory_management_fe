import { Button } from "../ui/button"

type HeaderProps = {
  title: string
  actionText?: string
  onActionClick?: () => void
  updateText?: string
  onUpdateClick?: () => void
  deleteText?: string
  onDeleteClick?: () => void
  disabledDelete?: boolean
  realodText?: string
  onRealodClick?: () => void
}

export default function Header({
  title,
  actionText,
  onActionClick,
  deleteText,
  onDeleteClick,
  onUpdateClick,
  updateText,
  onRealodClick,
  realodText
}: HeaderProps) {
  return (
    <div className="w-full px-6 py-6 flex items-center justify-between border-b">
      <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
      <div className="flex gap-2">
        {actionText && (
          <Button className="h-9 px-4" onClick={onActionClick}>
            {actionText}
          </Button>
        )}
        {actionText && (
          <Button
            className="h-9 px-4" onClick={onUpdateClick}>
            {updateText}
          </Button>
        )}
        {deleteText && (
          <Button
            variant="destructive"
            className="h-9 px-4"
            onClick={onDeleteClick}
          >
            {deleteText}
          </Button>
        )}
        {actionText && (
          <Button
            className="h-9 px-4 bg-black text-white hover:bg-neutral-900"
            onClick={onRealodClick}
          >
            {realodText}
          </Button>
        )}
      </div>
    </div>
  )
}
