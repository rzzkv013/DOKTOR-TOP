"use client";

import { useState, type FormEvent } from "react";
import { Check, Clock3, X } from "lucide-react";
import type { Doctor } from "@/lib/doctors";
import { formatPrice } from "@/lib/doctors";

type AppointmentModalProps = {
  doctor: Doctor | null;
  onClose: () => void;
};

export function AppointmentModal({ doctor, onClose }: AppointmentModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!doctor) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    setSubmitted(false);
    onClose();
  }

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-title"
        className="modal-card relative my-auto w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Oynani yopish"
          className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <Check size={30} strokeWidth={2.5} />
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              So‘rovingiz qabul qilindi!
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              {doctor.name} klinikasi siz bilan bog‘lanib, qabul vaqtini
              tasdiqlaydi.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-7 rounded-full bg-teal-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 active:scale-95"
            >
              Yopish
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              Qabulga yozilish
            </p>
            <h2
              id="appointment-title"
              className="mt-2 pr-8 text-2xl font-bold tracking-tight text-slate-900"
            >
              Shifokor bilan uchrashuv
            </h2>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-teal-50/70 p-4">
              <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                {/* Remote doctor portraits do not need Next's image optimization. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900">
                  {doctor.name}
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {doctor.specialtyUz} · {doctor.clinic}
                </p>
              </div>
              <p className="shrink-0 text-sm font-bold text-teal-800">
                {formatPrice(doctor.price)} so‘m
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-slate-700">
                Ism va familiya
                <input
                  required
                  name="name"
                  autoComplete="name"
                  placeholder="Ismingizni kiriting"
                  className="form-input mt-2"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Telefon raqamingiz
                <input
                  required
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+998 90 123 45 67"
                  pattern="[\d+\s()-]{9,}"
                  className="form-input mt-2"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Sana
                  <input
                    required
                    name="date"
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    className="form-input mt-2"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Qulay vaqt
                  <span className="relative mt-2 block">
                    <Clock3
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <select
                      required
                      name="time"
                      defaultValue=""
                      className="form-input appearance-none pl-10"
                    >
                      <option value="" disabled>
                        Vaqtni tanlang
                      </option>
                      <option>09:00 – 11:00</option>
                      <option>11:00 – 13:00</option>
                      <option>14:00 – 16:00</option>
                      <option>16:00 – 18:00</option>
                    </select>
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all hover:-translate-y-0.5 hover:bg-teal-800 active:scale-95"
              >
                Qabulni so‘rash
              </button>
              <p className="text-center text-xs leading-5 text-slate-400">
                So‘rov bepul. Klinikadan tasdiq olish uchun sizga qo‘ng‘iroq
                qilinadi.
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
