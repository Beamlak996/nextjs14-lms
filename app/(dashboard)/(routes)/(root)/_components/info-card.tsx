import { IconBadge } from "@/components/icon-badge"
import { LucideIcon } from "lucide-react"


type InfoCardProps = {
    label: string
    numberOfItems: number
    icon: LucideIcon
    variant?: "default" | "success"
}

export const InfoCard = ({
    label,
    numberOfItems,
    icon: Icon,
    variant
}: InfoCardProps) => {

    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3" >
            <IconBadge 
              variant={variant}
              icon={Icon}
            />
            <div>
                <p className="font-medium" >
                    {label}
                </p>
                <p className="text-gray-500 text-sm" >
                    {numberOfItems} {numberOfItems === 1 ? "Course": "Courses"}
                </p>
            </div>
        </div>
    )
}