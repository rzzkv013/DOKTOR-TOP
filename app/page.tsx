import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck2,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { DoctorDirectory } from "@/components/doctor-directory";
import { SiteHeader } from "@/components/site-header";
import { doctors } from "@/lib/doctors";

const benefits = [
  { icon: BadgeCheck, label: "Tekshirilgan shifokorlar" },
  { icon: CalendarCheck2, label: "Oson onlayn yozilish" },
  { icon: ShieldCheck, label: "Ishonchli klinikalar" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <div aria-hidden="true" className="ambient ambient-one" />
      <div aria-hidden="true" className="ambient ambient-two" />
      <div aria-hidden="true" className="floating-pill floating-pill-one" />
      <div aria-hidden="true" className="floating-pill floating-pill-two" />
      <div aria-hidden="true" className="floating-ring" />

      <SiteHeader />

      <section className="relative px-5 pb-8 pt-14 sm:px-8 sm:pt-20 lg:pb-12 lg:pt-[92px]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3.5 py-2 text-xs font-semibold text-teal-800 shadow-sm backdrop-blur">
              <span className="flex size-5 items-center justify-center rounded-full bg-teal-100">
                <Sparkles size={12} />
              </span>
              Sog‘lig‘ingiz uchun to‘g‘ri tanlov
            </div>
            <h1 className="max-w-[680px] text-[42px] font-bold leading-[1.08] tracking-[-0.07em] text-slate-900 sm:text-6xl lg:text-[68px]">
              Sog‘lom hayot sari{" "}
              <span className="relative whitespace-nowrap text-teal-700">
                bir qadam.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 14"
                  className="absolute -bottom-1 left-1 h-2.5 w-[90%] text-teal-200"
                  fill="none"
                >
                  <path
                    d="M2 9C70 1 198 0 298 7"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-[520px] text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              Ishonchli shifokorlarni toping, mutaxassislar bilan tanishing va
              o‘zingizga qulay vaqtda qabulga yoziling.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#doctors"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-teal-800/20 transition-all hover:-translate-y-0.5 hover:bg-teal-800 active:scale-95"
              >
                Shifokor topish <ArrowRight size={17} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-teal-200 hover:bg-white active:scale-95"
              >
                Qanday ishlaydi
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3">
              {benefits.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-xs font-medium text-slate-500"
                >
                  <Icon size={15} className="text-teal-700" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            <div className="absolute inset-6 rounded-[44px] bg-teal-200/50 blur-3xl" />
            <div className="hero-visual relative overflow-hidden rounded-[36px] border border-white/90 bg-gradient-to-br from-[#c9f0e6] via-[#edf9f6] to-[#def3ef] p-6 shadow-[0_30px_80px_rgba(22,100,91,0.14)] sm:p-8">
              <div className="hero-orbit absolute -right-16 -top-20 size-64 rounded-full border border-white/60" />
              <div className="hero-orbit hero-orbit-slow absolute -right-7 -top-10 size-48 rounded-full border border-white/60" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-800/65">
                    Medora bilan
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-[-0.05em] text-slate-900">
                    O‘zingizga g‘amxo‘rlik
                  </p>
                </div>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-white/75 text-teal-700 shadow-sm">
                  <HeartPulse size={21} />
                </span>
              </div>

              <div className="relative mt-7 flex min-h-[212px] items-center justify-center">
                <div className="absolute size-[205px] rounded-full border border-white/80 sm:size-[230px]" />
                <div className="absolute size-[158px] rounded-full bg-white/35 shadow-inner sm:size-[178px]" />
                <div className="relative grid grid-cols-2 gap-3">
                  {doctors.slice(0, 4).map((doctor, index) => (
                    <Link
                      href={`/doctors/${doctor.id}`}
                      key={doctor.id}
                      className={`portrait-float portrait-float-${index + 1} group relative size-[78px] overflow-hidden rounded-[24px] border-[3px] border-white shadow-xl transition-transform hover:z-10 hover:scale-110 sm:size-[88px] ${
                        index === 0
                          ? "translate-y-1"
                          : index === 1
                            ? "translate-y-[-4px]"
                            : index === 2
                              ? "translate-y-[-3px]"
                              : "translate-y-2"
                      }`}
                      aria-label={`${doctor.name} profilini ko‘rish`}
                    >
                      {/* Remote portraits stay unoptimized so no image host configuration is needed. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={doctor.image}
                        alt=""
                        className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                    </Link>
                  ))}
                </div>
                <span className="absolute bottom-0 right-2 flex size-12 items-center justify-center rounded-2xl border border-white/90 bg-white/85 text-teal-700 shadow-lg backdrop-blur">
                  <Stethoscope size={21} />
                </span>
              </div>

              <div className="relative mt-5 flex items-center justify-between rounded-2xl border border-white/80 bg-white/65 p-4 backdrop-blur">
                <div>
                  <p className="text-[11px] font-medium text-slate-500">
                    Sizga yordam berishga tayyor
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    120+ mutaxassis
                  </p>
                </div>
                <a
                  href="#doctors"
                  aria-label="Shifokorlar ro‘yxatini ko‘rish"
                  className="flex size-10 items-center justify-center rounded-full bg-teal-700 text-white transition hover:rotate-45 hover:bg-teal-800"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <div className="absolute -left-5 top-[43%] hidden items-center gap-2.5 rounded-2xl border border-white/90 bg-white/90 px-3.5 py-3 shadow-xl shadow-teal-950/10 backdrop-blur sm:flex">
              <span className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <span className="text-lg">★</span>
              </span>
              <span>
                <span className="block text-sm font-bold text-slate-900">
                  4.9 / 5
                </span>
                <span className="block text-[10px] text-slate-400">
                  bemorlar bahosi
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <DoctorDirectory />

      <section id="how-it-works" className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#0e4a4b] px-6 py-12 text-white sm:px-12 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
                Oddiy. Qulay. Ishonchli.
              </p>
              <h2 className="mt-3 max-w-lg text-3xl font-bold leading-tight tracking-[-0.055em] sm:text-4xl">
                Sog‘lig‘ingiz uchun g‘amxo‘rlik qilish oson bo‘lishi kerak.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-teal-50/70">
                Medora kerakli mutaxassisni topishdan tortib qabulni
                tasdiqlashgacha bo‘lgan jarayonni soddalashtiradi.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Shifokorni tanlang", "Mutaxassislarni solishtiring."],
                ["02", "Qulay vaqtni belgilang", "So‘rovni bir necha soniyada yuboring."],
                ["03", "Ishonch bilan boring", "Klinika siz bilan bog‘lanadi."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
                >
                  <span className="text-xs font-bold tracking-widest text-teal-200">
                    {number}
                  </span>
                  <h3 className="mt-5 text-sm font-bold">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-teal-50/60">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/70 bg-white/70 px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <Link
            href="/"
            className="text-base font-bold tracking-[-0.06em] text-slate-900"
          >
            medora<span className="text-teal-600">.</span>
          </Link>
          <p className="text-xs text-slate-400">
            © 2025 Medora. Sog‘lig‘ingizga mehr bilan.
          </p>
          <a
            href="tel:+998712000000"
            className="text-xs font-semibold text-slate-600 transition hover:text-teal-700"
          >
            Yordam: +998 71 200 00 00
          </a>
        </div>
      </footer>
    </main>
  );
}
