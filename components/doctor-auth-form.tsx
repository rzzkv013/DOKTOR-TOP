"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, HeartPulse, LoaderCircle } from "lucide-react";

type DoctorAuthFormProps = {
  mode: "register" | "login";
};

export function DoctorAuthForm({ mode }: DoctorAuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { error?: string } = await response.json();
      if (!response.ok) {
        setError(result.error ?? "So‘rovni bajarib bo‘lmadi.");
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Server bilan bog‘lanib bo‘lmadi. Internet aloqasini tekshiring.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-5 py-12">
      <div aria-hidden="true" className="ambient ambient-one" />
      <div aria-hidden="true" className="floating-pill floating-pill-one" />
      <section className="relative w-full max-w-lg rounded-[30px] border border-white bg-white p-6 shadow-[0_24px_80px_rgba(16,54,61,0.1)] sm:p-9">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-teal-800"
        >
          <ArrowLeft size={16} />
          Bosh sahifaga
        </Link>
        <div className="mt-7 flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
          <HeartPulse size={23} />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
          Doktorlar uchun
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.055em] text-slate-900">
          {isRegister ? "Medora’ga qo‘shiling" : "Xush kelibsiz"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {isRegister
            ? "Akkaunt ochib profilingiz va video maslahatlaringizni boshqaring."
            : "Profilingizni boshqarish uchun akkauntingizga kiring."}
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {isRegister && (
            <>
              <label className="block text-sm font-semibold text-slate-700">
                Ism va familiya
                <input
                  required
                  name="name"
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Masalan, Amira Karimova"
                  className="form-input mt-2"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Mutaxassislik
                  <select required name="specialty" className="form-input mt-2">
                    <option value="">Tanlang</option>
                    {[
                      "Cardiologist",
                      "Dentist",
                      "Neurologist",
                      "Pediatrician",
                      "Dermatologist",
                      "Ophthalmologist",
                      "Boshqa",
                    ].map((specialty) => (
                      <option key={specialty}>{specialty}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Tajriba (yil)
                  <input
                    required
                    name="experience"
                    type="number"
                    min={0}
                    max={70}
                    defaultValue={0}
                    className="form-input mt-2"
                  />
                </label>
              </div>
              <label className="block text-sm font-semibold text-slate-700">
                Klinika nomi
                <input
                  name="clinic"
                  maxLength={120}
                  placeholder="Klinika yoki mustaqil amaliyot"
                  className="form-input mt-2"
                />
              </label>
            </>
          )}
          <label className="block text-sm font-semibold text-slate-700">
            Email
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder="doctor@example.com"
              className="form-input mt-2"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Parol
            <input
              required
              name="password"
              type="password"
              minLength={8}
              maxLength={72}
              autoComplete={isRegister ? "new-password" : "current-password"}
              placeholder={isRegister ? "Kamida 8 ta belgi" : "Parolingiz"}
              className="form-input mt-2"
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-teal-700 px-6 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all hover:-translate-y-0.5 hover:bg-teal-800 active:scale-95 disabled:cursor-wait disabled:opacity-70"
          >
            {submitting && <LoaderCircle size={17} className="animate-spin" />}
            {isRegister ? "Doktor akkauntini ochish" : "Kirish"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {isRegister ? "Akkauntingiz bormi?" : "Yangi doktor hisobimisiz?"}{" "}
          <Link
            href={isRegister ? "/login" : "/register"}
            className="font-bold text-teal-700 hover:text-teal-900"
          >
            {isRegister ? "Kirish" : "Ro‘yxatdan o‘tish"}
          </Link>
        </p>
      </section>
    </main>
  );
}
