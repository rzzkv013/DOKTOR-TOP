"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownWideNarrow,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { doctors, formatPrice, type Doctor } from "@/lib/doctors";
import { AppointmentModal } from "@/components/appointment-modal";
import { DoctorCard } from "@/components/doctor-card";

export function DoctorDirectory() {
  const [registeredDoctors, setRegisteredDoctors] = useState<Doctor[]>([]);
  const [databaseError, setDatabaseError] = useState("");
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [clinic, setClinic] = useState("");
  const [location, setLocation] = useState("");
  const [minimumRating, setMinimumRating] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(250000);
  const [sortBy, setSortBy] = useState("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    let active = true;
    async function loadRegisteredDoctors() {
      try {
        const response = await fetch("/api/doctors");
        const result: { doctors?: Doctor[]; error?: string } = await response.json();
        if (!response.ok) {
          throw new Error(result.error ?? "Ro‘yxatdan o‘tgan shifokorlarni yuklab bo‘lmadi.");
        }
        if (active) setRegisteredDoctors(result.doctors ?? []);
      } catch (error) {
        if (active) {
          setDatabaseError(
            error instanceof Error
              ? error.message
              : "Ro‘yxatdan o‘tgan shifokorlarni yuklab bo‘lmadi.",
          );
        }
      }
    }
    void loadRegisteredDoctors();
    return () => {
      active = false;
    };
  }, []);

  const allDoctors = useMemo(() => {
    const demoIds = new Set(doctors.map((doctor) => doctor.id));
    return [...doctors, ...registeredDoctors.filter((doctor) => !demoIds.has(doctor.id))];
  }, [registeredDoctors]);
  const specialties = useMemo(
    () => [...new Set(allDoctors.map((doctor) => doctor.specialty))],
    [allDoctors],
  );
  const clinics = useMemo(
    () => [...new Set(allDoctors.map((doctor) => doctor.clinic))],
    [allDoctors],
  );
  const locations = useMemo(
    () => [...new Set(allDoctors.map((doctor) => doctor.location))],
    [allDoctors],
  );

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const result = allDoctors.filter((doctor) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          doctor.name,
          doctor.specialty,
          doctor.specialtyUz,
          doctor.clinic,
          doctor.location,
        ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));

      return (
        matchesQuery &&
        (!specialty || doctor.specialty === specialty) &&
        (!clinic || doctor.clinic === clinic) &&
        (!location || doctor.location === location) &&
        doctor.rating >= minimumRating &&
        doctor.price <= maximumPrice
      );
    });

    return result.sort((first, second) => {
      if (sortBy === "rating") return second.rating - first.rating;
      if (sortBy === "experience") return second.experience - first.experience;
      if (sortBy === "price") return first.price - second.price;
      return second.reviewCount - first.reviewCount;
    });
  }, [
    allDoctors,
    clinic,
    location,
    maximumPrice,
    minimumRating,
    query,
    sortBy,
    specialty,
  ]);

  const activeFilters = [
    query.trim().length > 0,
    specialty.length > 0,
    clinic.length > 0,
    location.length > 0,
    minimumRating > 0,
    maximumPrice < 250000,
  ].filter(Boolean).length;

  function clearFilters() {
    setQuery("");
    setSpecialty("");
    setClinic("");
    setLocation("");
    setMinimumRating(0);
    setMaximumPrice(250000);
  }

  return (
    <>
      <section
        id="doctors"
        className="scroll-mt-24 px-5 pb-24 pt-20 sm:px-8 sm:pt-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-sm">
                <Sparkles size={14} />
                Siz uchun eng yaxshi mutaxassislar
              </div>
              <h2 className="text-3xl font-bold tracking-[-0.055em] text-slate-900 sm:text-[40px]">
                O‘zingizga mos shifokorni toping
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Mutaxassislarni solishtiring, tajriba va sharhlar bilan tanishing
                va qulay vaqtda qabulga yoziling.
              </p>
            </div>
            <div className="hidden items-center gap-3 rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-sm backdrop-blur md:flex">
              <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <MapPin size={19} />
              </span>
              <div>
                <p className="text-[11px] font-medium text-slate-400">
                  Sizning hududingiz
                </p>
                <p className="mt-0.5 text-sm font-semibold text-slate-800">
                  Toshkent, O‘zbekiston
                </p>
              </div>
              <ChevronDown size={16} className="ml-2 text-slate-400" />
            </div>
          </div>

          <div className="mt-9 rounded-[24px] border border-white bg-white/90 p-3 shadow-[0_16px_50px_rgba(21,75,77,0.07)] backdrop-blur-xl sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row">
              <label className="relative min-w-0 flex-1">
                <Search
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Shifokor, mutaxassislik yoki klinika..."
                  aria-label="Shifokor, mutaxassislik yoki klinika bo‘yicha qidirish"
                  className="h-[52px] w-full rounded-2xl border border-transparent bg-slate-50 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-200 focus:bg-white focus:ring-4 focus:ring-teal-50"
                />
              </label>
              <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50/70 hover:text-teal-800 active:scale-[0.98]"
              >
                <SlidersHorizontal size={17} />
                Filtrlar
                {activeFilters > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-teal-700 text-[10px] font-bold text-white">
                    {activeFilters}
                  </span>
                )}
              </button>
              <label className="relative lg:w-[190px]">
                <ArrowDownWideNarrow
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal-700"
                />
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  aria-label="Shifokorlarni saralash"
                  className="h-[52px] w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-10 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-300 focus:ring-4 focus:ring-teal-50"
                >
                  <option value="recommended">Tavsiya etilgan</option>
                  <option value="rating">Eng yuqori reyting</option>
                  <option value="experience">Eng tajribali</option>
                  <option value="price">Narxi: arzonidan</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </label>
            </div>

            {filtersOpen && (
              <div className="mt-4 grid gap-4 border-t border-slate-100 px-1 pt-4 sm:grid-cols-2 lg:grid-cols-5">
                <label className="block text-xs font-semibold text-slate-600">
                  Mutaxassislik
                  <span className="relative mt-2 block">
                    <select
                      value={specialty}
                      onChange={(event) => setSpecialty(event.target.value)}
                      className="filter-select"
                    >
                      <option value="">Barchasi</option>
                      {specialties.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </span>
                </label>
                <label className="block text-xs font-semibold text-slate-600">
                  Shahar
                  <span className="relative mt-2 block">
                    <select
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      className="filter-select"
                    >
                      <option value="">Barcha shaharlar</option>
                      {locations.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </span>
                </label>
                <label className="block text-xs font-semibold text-slate-600">
                  Klinikani tanlang
                  <span className="relative mt-2 block">
                    <select
                      value={clinic}
                      onChange={(event) => setClinic(event.target.value)}
                      className="filter-select"
                    >
                      <option value="">Barcha klinikalar</option>
                      {clinics.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </span>
                </label>
                <label className="block text-xs font-semibold text-slate-600">
                  Minimal reyting:{" "}
                  <span className="text-teal-700">
                    {minimumRating === 0 ? "Barchasi" : `${minimumRating}+`}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minimumRating}
                    onChange={(event) =>
                      setMinimumRating(Number(event.target.value))
                    }
                    className="mt-4 block w-full accent-teal-700"
                  />
                  <span className="mt-1 flex justify-between text-[10px] font-medium text-slate-400">
                    <span>Barchasi</span>
                    <span>5.0</span>
                  </span>
                </label>
                <label className="block text-xs font-semibold text-slate-600">
                  Qabul narxi:{" "}
                  <span className="text-teal-700">
                    {maximumPrice === 250000
                      ? "Barchasi"
                      : `${formatPrice(maximumPrice)} so‘mgacha`}
                  </span>
                  <input
                    type="range"
                    min="50000"
                    max="250000"
                    step="10000"
                    value={maximumPrice}
                    onChange={(event) =>
                      setMaximumPrice(Number(event.target.value))
                    }
                    className="mt-4 block w-full accent-teal-700"
                  />
                  <span className="mt-1 flex justify-between text-[10px] font-medium text-slate-400">
                    <span>50 ming</span>
                    <span>250 ming so‘m</span>
                  </span>
                </label>
              </div>
            )}

            {activeFilters > 0 && (
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                >
                  <X size={13} />
                  Filtrlarni tozalash
                </button>
              </div>
            )}
          </div>

          {databaseError && (
            <p
              role="status"
              className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800"
            >
              {databaseError} Demo shifokorlar ro‘yxati mavjud; yangi profillar
              uchun PostgreSQL sozlamasini tekshiring.
            </p>
          )}

          <div className="mt-7 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              <span className="font-bold text-slate-900">
                {filteredDoctors.length} ta shifokor
              </span>{" "}
              topildi
            </p>
            <span className="hidden items-center gap-1.5 text-xs font-medium text-teal-700 sm:flex">
              <span className="size-1.5 rounded-full bg-teal-500" />
              Barchasi tekshirilgan mutaxassislar
            </span>
          </div>

          {filteredDoctors.length > 0 ? (
            <div
              key={`${query}-${specialty}-${clinic}-${location}-${minimumRating}-${maximumPrice}-${sortBy}`}
              className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filteredDoctors.map((doctor, index) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  index={index}
                  onBook={setSelectedDoctor}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[24px] border border-dashed border-slate-200 bg-white/70 px-6 py-14 text-center">
              <Search size={27} className="mx-auto text-slate-300" />
              <h3 className="mt-3 font-semibold text-slate-800">
                Mos shifokor topilmadi
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Boshqa so‘z bilan qidiring yoki filtrlarni o‘zgartiring.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-teal-700 hover:text-teal-900"
              >
                Filtrlarni tozalash
              </button>
            </div>
          )}
        </div>
      </section>

      <AppointmentModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />
    </>
  );
}
