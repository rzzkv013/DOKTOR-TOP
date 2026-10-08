import type { Metadata } from "next";
import { DoctorAuthForm } from "@/components/doctor-auth-form";

export const metadata: Metadata = {
  title: "Doktor sifatida ro‘yxatdan o‘tish",
};

export default function RegisterPage() {
  return <DoctorAuthForm mode="register" />;
}
