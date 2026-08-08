import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@workspace/ui/components/avatar"

export function AvatarRtlExample() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="کاربر" />
        <AvatarFallback>کا</AvatarFallback>
        <AvatarBadge className="bg-emerald-500" />
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="کاربر یک" />
          <AvatarFallback>ک۱</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/leerob.png" alt="کاربر دو" />
          <AvatarFallback>ک۲</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" alt="کاربر سه" />
          <AvatarFallback>ک۳</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+۳</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
