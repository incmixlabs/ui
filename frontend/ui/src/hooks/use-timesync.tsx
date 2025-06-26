import { useState, useEffect } from 'react';
import axios from 'axios';

export function useTimeSync() {
  const [serverTimeOffset, setServerTimeOffset] = useState(0);

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await axios('/api/timestamp');
        const data = response.data;
        const serverTime = data.time;
        const clientTime = Date.now();
        setServerTimeOffset(serverTime - clientTime);
      } catch (error) {
        console.error('Error fetching server time:', error);
      }
    };

    fetchServerTime();
    }, []);
    return serverTimeOffset;
  }

  export default useTimeSync;
