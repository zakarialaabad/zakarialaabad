import type { FC } from "react"
import { Users, GraduationCap, User, Heart, Briefcase } from "lucide-react"

type TenantType = "tous" | "famille" | "etudiants" | "celibataire" | "marie" | "fonctionnaire"

interface TenantTypeIconProps {
  type: TenantType
  className?: string
  size?: number
  color?: string
}

export const TenantTypeIcon: FC<TenantTypeIconProps> = ({
  type,
  className = "",
  size = 24,
  color = "currentColor",
}) => {
  switch (type) {
    case "famille":
      return <Users size={size} className={className} color={color} />
    case "etudiants":
      return <GraduationCap size={size} className={className} color={color} />
    case "celibataire":
      return <User size={size} className={className} color={color} />
    case "marie":
      return <Heart size={size} className={className} color={color} />
    case "fonctionnaire":
      return <Briefcase size={size} className={className} color={color} />
    case "tous":
    default:
      return <Users size={size} className={className} color={color} />
  }
}
