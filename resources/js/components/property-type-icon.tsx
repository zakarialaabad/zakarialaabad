import type { FC } from "react"
import { Home, Building, Building2, Landmark, BriefcaseIcon } from "lucide-react"

type PropertyType = "tout" | "appartement" | "garconniere" | "maison" | "villa" | "bureau"

interface PropertyTypeIconProps {
  type: PropertyType
  className?: string
  size?: number
  color?: string
}

export const PropertyTypeIcon: FC<PropertyTypeIconProps> = ({
  type,
  className = "",
  size = 24,
  color = "currentColor",
}): JSX.Element => {
  switch (type) {
    case "appartement":
      return <Building size={size} className={className} color={color} />
    case "garconniere":
      return <Building2 size={size} className={className} color={color} />
    case "maison":
      return <Home size={size} className={className} color={color} />
    case "villa":
      return <Landmark size={size} className={className} color={color} />
    case "bureau":
      return <BriefcaseIcon size={size} className={className} color={color} />
    case "tout":
    default:
      return <Home size={size} className={className} color={color} />
  }
}
