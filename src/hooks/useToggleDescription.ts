import { useState } from 'react'

export function useToggleDescription() {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const toggleDescriptionVisibility = () =>
    setIsDescriptionVisible(!isDescriptionVisible)

  return { isDescriptionVisible, toggleDescriptionVisibility }
}
