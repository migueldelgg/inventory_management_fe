import { Button } from "../ui/button"

type HeaderProps = {
  title: string
  actionText?: string
  onActionClick?: () => void
}

export default function Header({ title, actionText, onActionClick }: HeaderProps) {
  return (
    <div className="w-full px-6 py-6 flex items-center justify-between border-b">
      <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
      {actionText && (
        <Button className="h-9 px-4" onClick={onActionClick}>
          {actionText}
        </Button>
      )}
    </div>
  )
}
