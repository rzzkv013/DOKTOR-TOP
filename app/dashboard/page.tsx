import type { Metadata } from "next";
import { DoctorDashboard } from "@/components/doctor-dashboard";

export const metadata: Metadata = {
  title: "Doktor kabineti",
};

export default function DashboardPage() {
  return <DoctorDashboard />;
}
