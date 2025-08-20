import { useEffect, useRef, useState } from "react"

export const useUserActivity = (_inactivityTimeout = 60000) => {
  // Default to 60 seconds
  const [_isActive, _setIsActive] = useState(true)
  const _timeoutRef = useRef(null)

  // ... (rest of the hook logic)
}

export default useUserActivity
