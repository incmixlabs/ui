 import { useState, useEffect, useRef } from 'react';

export const useUserActivity = (inactivityTimeout = 60000) => { // Default to 60 seconds
  const [isActive, setIsActive] = useState(true);
  const timeoutRef = useRef(null);

      // ... (rest of the hook logic)
};

export default useUserActivity;
