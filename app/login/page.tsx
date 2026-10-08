import type { Metadata } from "next";
import { DoctorAuthForm } from "@/components/doctor-auth-form";

export const metadata: Metadata = {
  title: "Doktor kabinetiga kirish",
};

export default function LoginPage() {
  return <DoctorAuthForm mode="login" />;
}
