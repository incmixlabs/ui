import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { VITE_CHECK_INTERVAL, VITE_IDLE_TIME } from "../utils/constants"

interface UserActivityState {
  trackBattery?: boolean;
  batteryLevel: number | null
  isCharging: boolean | null
  idleTime: number
  lastActivityTime: number
  isIdle: boolean
  idleThreshold: number
  setTrackBattery: (track: boolean) => void
  getBatteryInfo: (trackBattery: boolean) => Promise<void>
  updateIdleTime: () => void
  resetIdleTime: () => void
  setIdleThreshold: (minutes: number) => void
}

const useUserActivityStore = create<UserActivityState>()(
  persist(
    (set, get) => ({
  trackBattery: true,
  batteryLevel: null,
  isCharging: null,
  idleTime: 0,
  lastActivityTime: Date.now(),
  isIdle: false,
  idleThreshold: VITE_IDLE_TIME,
  setTrackBattery: (track: boolean) => set({ trackBattery: track }),

  getBatteryInfo: async (trackBattery = true) => {
    if (trackBattery && 'getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery()

        set({
          batteryLevel: battery.level,
          isCharging: battery.charging,
        });

        // Listen for changes in battery level or charging status
        battery.addEventListener('levelchange', () => {
          set({ batteryLevel: battery.level });
        });

        battery.addEventListener('chargingchange', () => {
          set({ isCharging: battery.charging });
        });
      } catch (error) {
        console.error('Error fetching battery information:', error);
      }
    } else {
      console.warn('Battery Status API is not supported in this browser.');
    }
  },

  updateIdleTime: () => {
    const now = Date.now()
    const { lastActivityTime, idleThreshold } = get()
    const idleTimeInSeconds = Math.floor((now - lastActivityTime) / 1000)
    const idleTimeInMinutes = idleTimeInSeconds / 60
    const isIdle = idleTimeInMinutes >= idleThreshold
    if (isIdle) {
      // send user status to server
      // TBD
    }
    set({
      idleTime: idleTimeInSeconds,
      isIdle
    })
  },

  resetIdleTime: () => {
    // TBD  // send user status to server
    set({
      idleTime: 0,
      lastActivityTime: Date.now(),
      isIdle: false
    })
  },

  setIdleThreshold: (minutes: number) => {
    set({ idleThreshold: minutes })
  }
    }),
    {
      name: 'user-activity-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        idleThreshold: state.idleThreshold,
        batteryLevel: state.batteryLevel,
        isCharging: state.isCharging
      })
    }
  )
);

interface MonitoringOptions {
  checkInterval?: number
  idleThresholdMinutes?: number
}

export const initializeUserActivityMonitoring = (options: MonitoringOptions = {}) => {
  const {
    checkInterval = VITE_CHECK_INTERVAL,
    idleThresholdMinutes = VITE_IDLE_TIME
  } = options

  const store = useUserActivityStore.getState()

  store.getBatteryInfo(store.trackBattery)
  store.setIdleThreshold(idleThresholdMinutes)

  const intervalId = setInterval(() => {
    store.getBatteryInfo(store.trackBattery)
    store.updateIdleTime()
  }, checkInterval)

  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

  const handleActivity = () => {
    store.resetIdleTime()
  }

  activityEvents.forEach(event => {
    document.addEventListener(event, handleActivity, true)
  })

  return () => {
    clearInterval(intervalId)
    activityEvents.forEach(event => {
      document.removeEventListener(event, handleActivity, true)
    })
  }
}

export default useUserActivityStore;
