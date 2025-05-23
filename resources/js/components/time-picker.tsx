
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  value: string | null
  onChange: (time: string | null) => void
  className?: string
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState<number | null>(null)
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null)
  const [isSelectingHour, setIsSelectingHour] = useState(true)

  // Initialiser avec la valeur fournie
  useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(":").map(Number)
      setSelectedHour(hours)
      setSelectedMinute(minutes)
    }
  }, [value])

  // Mettre à jour la valeur lorsque l'heure ou les minutes changent
  useEffect(() => {
    if (selectedHour !== null && selectedMinute !== null) {
      const formattedHour = selectedHour.toString().padStart(2, "0")
      const formattedMinute = selectedMinute.toString().padStart(2, "0")
      onChange(`${formattedHour}:${formattedMinute}`)
    } else {
      onChange(null)
    }
  }, [selectedHour, selectedMinute, onChange])

  // Générer les positions des heures sur l'horloge
  const hourPositions = Array.from({ length: 12 }, (_, i) => {
    const hour = i === 0 ? 12 : i
    const angle = ((hour - 3) * 30 * Math.PI) / 180
    const x = 50 + 40 * Math.cos(angle)
    const y = 50 + 40 * Math.sin(angle)
    return { hour: hour === 12 ? 0 : hour, x, y }
  })

  // Générer les positions des minutes sur l'horloge (par pas de 5 minutes)
  const minutePositions = Array.from({ length: 12 }, (_, i) => {
    const minute = i * 5
    const angle = ((i - 3) * 30 * Math.PI) / 180
    const x = 50 + 40 * Math.cos(angle)
    const y = 50 + 40 * Math.sin(angle)
    return { minute, x, y }
  })

  // Calculer l'angle de l'aiguille des heures
  const hourHandAngle = selectedHour !== null ? ((selectedHour % 12) * 30 + (selectedMinute || 0) / 2 - 90) % 360 : 0

  // Calculer l'angle de l'aiguille des minutes
  const minuteHandAngle = selectedMinute !== null ? (selectedMinute * 6 - 90) % 360 : 0

  // Sélectionner une heure en cliquant sur l'horloge
  const handleHourClick = (hour: number) => {
    // Ajuster pour AM/PM (9-22h)
    const adjustedHour = hour + (hour < 9 ? 12 : 0)
    if (adjustedHour >= 9 && adjustedHour <= 22) {
      setSelectedHour(adjustedHour)
      setIsSelectingHour(false)
    }
  }

  // Sélectionner les minutes en cliquant sur l'horloge
  const handleMinuteClick = (minute: number) => {
    setSelectedMinute(minute)
    setIsSelectingHour(true)
  }

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="flex items-center justify-center space-x-2 text-2xl font-semibold">
        <span
          className={cn(
            "cursor-pointer rounded px-2 py-1",
            isSelectingHour ? "bg-[#465baa] text-white" : "hover:bg-gray-100",
            selectedHour === null && "text-gray-400",
          )}
          onClick={() => setIsSelectingHour(true)}
        >
          {selectedHour !== null ? selectedHour.toString().padStart(2, "0") : "--"}
        </span>
        <span>:</span>
        <span
          className={cn(
            "cursor-pointer rounded px-2 py-1",
            !isSelectingHour ? "bg-[#465baa] text-white" : "hover:bg-gray-100",
            selectedMinute === null && "text-gray-400",
          )}
          onClick={() => setIsSelectingHour(false)}
        >
          {selectedMinute !== null ? selectedMinute.toString().padStart(2, "0") : "--"}
        </span>
      </div>

      <div className="relative h-64 w-64 rounded-full border-2 border-gray-200 bg-white">
        {/* Fond de l'horloge */}
        <div className="absolute inset-0 rounded-full bg-white"></div>

        {/* Centre de l'horloge */}
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#465baa]"></div>

        {/* Aiguille des heures (visible seulement si une heure est sélectionnée) */}
        {selectedHour !== null && (
          <div
            className="absolute left-1/2 top-1/2 h-1 w-16 -translate-y-1/2 origin-left rounded bg-[#465baa]"
            style={{ transform: `translateX(0) rotate(${hourHandAngle}deg)` }}
          ></div>
        )}

        {/* Aiguille des minutes (visible seulement si des minutes sont sélectionnées) */}
        {selectedMinute !== null && (
          <div
            className="absolute left-1/2 top-1/2 h-0.5 w-20 -translate-y-1/2 origin-left rounded bg-[#465baa]/70"
            style={{ transform: `translateX(0) rotate(${minuteHandAngle}deg)` }}
          ></div>
        )}

        {/* Message au centre si aucune heure n'est sélectionnée */}
        {selectedHour === null && isSelectingHour && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm font-medium text-gray-500">
            Sélectionnez
            <br />
            une heure
          </div>
        )}

        {/* Message au centre si aucune minute n'est sélectionnée */}
        {selectedMinute === null && !isSelectingHour && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm font-medium text-gray-500">
            Sélectionnez
            <br />
            les minutes
          </div>
        )}

        {/* Heures */}
        {isSelectingHour &&
          hourPositions.map(({ hour, x, y }) => {
            const displayHour = hour + (hour < 9 ? 12 : 0)
            const isSelectable = displayHour >= 9 && displayHour <= 22
            const isSelected = displayHour === selectedHour

            return (
              <div
                key={`hour-${hour}`}
                className={cn(
                  "absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-sm font-medium",
                  isSelected
                    ? "bg-[#465baa] text-white"
                    : isSelectable
                      ? "hover:bg-[#465baa]/10"
                      : "cursor-not-allowed opacity-30",
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => isSelectable && handleHourClick(hour)}
              >
                {displayHour}
              </div>
            )
          })}

        {/* Minutes */}
        {!isSelectingHour &&
          minutePositions.map(({ minute, x, y }) => (
            <div
              key={`minute-${minute}`}
              className={cn(
                "absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-sm font-medium",
                minute === selectedMinute ? "bg-[#465baa] text-white" : "hover:bg-[#465baa]/10",
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => handleMinuteClick(minute)}
            >
              {minute.toString().padStart(2, "0")}
            </div>
          ))}
      </div>

      <div className="flex w-full justify-between">
        <button
          className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
          onClick={() => {
            setSelectedHour(9)
            setSelectedMinute(0)
          }}
        >
          9:00
        </button>
        <button
          className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
          onClick={() => {
            setSelectedHour(12)
            setSelectedMinute(0)
          }}
        >
          12:00
        </button>
        <button
          className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
          onClick={() => {
            setSelectedHour(15)
            setSelectedMinute(0)
          }}
        >
          15:00
        </button>
        <button
          className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
          onClick={() => {
            setSelectedHour(18)
            setSelectedMinute(0)
          }}
        >
          18:00
        </button>
      </div>
    </div>
  )
}
