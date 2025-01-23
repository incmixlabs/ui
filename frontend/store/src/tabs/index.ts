"use client";
import { useEffect, useRef } from "react"
import { create } from "zustand"
export type Tab = {
  id: string
  createdAt: number
  lastActive: number
}

type UseTabCloseCallback = () => void

export const tabActions = {
  BEFOREUNLOAD: "beforeunload",
  VISIBILITYCHANGE: "visibilitychange",
  VISIBLE: "visible",
}

export type TabsStore = {
  tabs: Tab[]
  setTabs: (tabs: Tab[]) => void
  activeTab?: Tab
  setActiveTab: (activeTab: Tab) => void
  addTab: (tab: Tab) => void
  removeTab: (tab: Tab) => void
  getTabs: () => Tab[]
  leaderTab?: Tab
  setLeaderTab: (tab: Tab) => void
}
export const useTabStore = create((set) => ({
  tabs: [],
  setTabs: (tabs: Tab[]) => set(() => ({ tabs })),
  activeTab: undefined,
  setActiveTab: (activeTab: Tab) => set(() => ({ activeTab })),
  addTab: (tab: Tab) =>
    set((state: TabsStore) => ({ tabs: [...state.tabs, tab] })),
  removeTab: (tab: Tab) =>
    set((state: TabsStore) => ({
      tabs: state.tabs.filter((t) => t.id !== tab.id),
    })),
  getTabs: () => set((state: TabsStore) => state.tabs),
  leaderTab: undefined,
  setLeaderTab: (tab: Tab) => set(() => ({ leaderTab: tab })),
}))

/*
document.addEventListener(tabActions.VISIBILITYCHANGE, () => {

  if (document.visibilityState === tabActions.VISIBLE) {
    const tabs = useTabsStore.getState().tabs
    const leaderTab = useTabsStore.getState().leaderTab
    if (leaderTab) {
      leaderTab.lastActive = Date.now()
      useTabsStore.setState({ leaderTab })
    }
    tabs.forEach((tab) => {
      if (tab.lastActive + 1000 * 60 * 5 < Date.now()) {
        useTabsStore.setState({ activeTab: tab })
      }
    })
  if (document.visibilityState === "visible") {
    // console.log("Tab is active")
  } else {
    // console.log("Tab is inactive")
  }
}) */

export function useTabClose(callback: UseTabCloseCallback): void {
  const callbackRef = useRef<UseTabCloseCallback>(callback)
  const _tabStore = useTabStore.getState()
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
      event.preventDefault()

      event.returnValue = "" // Cancel the event

      callbackRef.current()
    }
    window.addEventListener(tabActions.BEFOREUNLOAD, handleBeforeUnload)
    return () => {
      window.removeEventListener(tabActions.BEFOREUNLOAD, handleBeforeUnload)
    }
  }, [])
}
