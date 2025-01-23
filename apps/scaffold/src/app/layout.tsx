import React from "react";
import {AdminPanelLayout} from "@incmix/pages/admin-panel";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
