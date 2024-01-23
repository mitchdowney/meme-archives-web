import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export default function FAIcon({ className, color, height, icon, spin, title,
  width }: FontAwesomeIconProps) {
  return (
    <FontAwesomeIcon
      className={className}
      color={color}
      height={height}
      icon={icon}
      spin={spin}
      title={title}
      titleId={title}
      width={width}
    />
  )
}
