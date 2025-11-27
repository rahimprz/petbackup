"use client"

import { motion } from "framer-motion"
import { RadioGroup, clx } from "@medusajs/ui"
import { Sparkles, TrendingDown, TrendingUp } from "lucide-react"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const getIconForOption = (value: string) => {
  switch (value) {
    case "created_at":
      return Sparkles
    case "price_asc":
      return TrendingDown
    case "price_desc":
      return TrendingUp
    default:
      return Sparkles
  }
}

const getColorForOption = (value: string) => {
  switch (value) {
    case "created_at":
      return {
        text: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        activeBg: "from-purple-500/20 to-purple-500/10",
        shadow: "shadow-purple-500/20"
      }
    case "price_asc":
      return {
        text: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        activeBg: "from-green-500/20 to-green-500/10",
        shadow: "shadow-green-500/20"
      }
    case "price_desc":
      return {
        text: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        activeBg: "from-blue-500/20 to-blue-500/10",
        shadow: "shadow-blue-500/20"
      }
    default:
      return {
        text: "text-gray-400",
        bg: "bg-gray-500/10",
        border: "border-gray-500/30",
        activeBg: "from-gray-500/20 to-gray-500/10",
        shadow: "shadow-gray-500/20"
      }
  }
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        <div className="flex flex-col gap-3">
          {items?.map((item, index) => {
            const Icon = getIconForOption(item.value)
            const colors = getColorForOption(item.value)
            const isActive = item.value === value

            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <RadioGroup.Item
                  checked={isActive}
                  className="hidden peer"
                  id={item.value}
                  value={item.value}
                />
                <motion.label
                  htmlFor={item.value}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={clx(
                    "relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm",
                    isActive
                      ? `${colors.border} bg-gradient-to-r ${colors.activeBg} shadow-lg ${colors.shadow}`
                      : `border-border/50 ${colors.bg} hover:border-border hover:shadow-md`
                  )}
                  data-testid="radio-label"
                  data-active={isActive}
                >
                  {/* Icon */}
                  <motion.div
                    animate={isActive ? { rotate: [0, -10, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className={clx(
                      "flex-shrink-0 p-2 rounded-lg",
                      isActive ? colors.bg : "bg-transparent"
                    )}
                  >
                    <Icon className={clx("h-5 w-5", isActive ? colors.text : "text-muted-foreground")} />
                  </motion.div>

                  {/* Label */}
                  <span
                    className={clx(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={clx("absolute right-3 w-2 h-2 rounded-full", colors.text.replace('text-', 'bg-'))}
                      initial={false}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}

                  {/* Glow effect on hover */}
                  {isActive && (
                    <motion.div
                      className={clx("absolute inset-0 rounded-xl opacity-50 blur-md -z-10", colors.text.replace('text-', 'bg-'))}
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </motion.label>
              </motion.div>
            )
          })}
        </div>
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
