"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CirclePlus,
  LoaderCircle,
  LogOut,
  Trash2,
} from "lucide-react";
import type { Doctor } from "@/lib/doctors";

type DoctorAccount = Doctor & { email: string };
type DashboardReel = {
  id: string;
  title: string;
  category: string;
  coverUrl: string;
  videoUrl: string;
  views: number;
};

type ApiResult<T> = T & { error?: string };

export function DoctorDashboard() {
  const router = useRouter();
  const [doctor, setDoctor] = useState<DoctorAccount | null>(null);
  const [reels, setReels] = useState<DashboardReel[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingReel, setAddingReel] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [profileFields, setProfileFields] = useState({
    name: "",
    specialty: "",
    experience: "0",
    clinic: "",
    location: "",
    address: "",
    image: "",
    price: "100000",
    bio: "",
    languages: "",
    certifications: "",
    schedule: "",
  });

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const [profileResponse, reelsResponse] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/doctor/reels"),
        ]);
        if (profileResponse.status === 401) {
          router.replace("/login");
          return;
        }
        const profileResult: ApiResult<{ doctor: DoctorAccount }> =
          await profileResponse.json();
        if (!profileResponse.ok) {
          throw new Error(profileResult.error ?? "Profilni yuklab bo‘lmadi.");
        }
        const reelsResult: ApiResult<{ reels: DashboardReel[] }> =
          await reelsResponse.json();
        if (!reelsResponse.ok) {
          throw new Error(reelsResult.error ?? "Videolarni yuklab bo‘lmadi.");
        }
        if (!active) return;

        const current = profileResult.doctor;
        setDoctor(current);
        setReels(reelsResult.reels);
        setProfileFields({
          name: current.name,
          specialty: current.specialty,
          experience: String(current.experience),
          clinic: current.clinic,
          location: current.location,
          address: current.address,
          image: current.image,
          price: String(current.price),
          bio: current.bio,
          languages: current.languages.join(", "),
          certifications: current.certifications.join("\n"),
          schedule: current.schedule.map((item) => `${item.day} | ${item.hours}`).join("\n"),
        });
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Kabinetni yuklab bo‘lmadi.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadDashboard();
    return () => {
      active = false;
    };
  }, [router]);

  function updateField(field: keyof typeof profileFields, value: string) {
    setProfileFields((current) => ({ ...current, [field]: value }));
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    const schedule = profileFields.schedule
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [day = "", hours = ""] = line.split("|").map((part) => part.trim());
        return { day, hours };
      });

    try {
      const response = await fetch("/api/doctor/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profileFields,
          experience: Number(profileFields.experience),
          price: Number(profileFields.price),
          languages: profileFields.languages.split(",").map((value) => value.trim()).filter(Boolean),
          certifications: profileFields.certifications.split("\n").map((value) => value.trim()).filter(Boolean),
          schedule,
        }),
      });
      const result: ApiResult<{ doctor: DoctorAccount }> = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Profilni saqlab bo‘lmadi.");
      setDoctor(result.doctor);
      setNotice("Profilingiz PostgreSQL’da saqlandi.");
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Profilni saqlab bo‘lmadi.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function addReel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setError("");
    setNotice("");
    setAddingReel(true);
    const data = new FormData(form);

    try {
      const response = await fetch("/api/doctor/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result: ApiResult<{ reel: DashboardReel }> = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Videoni saqlab bo‘lmadi.");
      setReels((current) => [result.reel, ...current]);
      setNotice("Video profilingizga qo‘shildi.");
      form.reset();
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Videoni saqlab bo‘lmadi.",
      );
    } finally {
      setAddingReel(false);
    }
  }

  async function deleteReel(id: string) {
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/doctor/reels/${id}`, { method: "DELETE" });
      const result: { error?: string } = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Videoni o‘chirib bo‘lmadi.");
      setReels((current) => current.filter((reel) => reel.id !== id));
      setNotice("Video o‘chirildi.");
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Videoni o‘chirib bo‘lmadi.",
      );
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-transparent">
        <LoaderCircle size={28} className="animate-spin text-teal-700" />
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-5 text-center">
        <p className="text-lg font-bold text-slate-900">Kabinetni ochib bo‘lmadi</p>
        <p role="alert" className="mt-2 text-sm text-rose-700">
          {error || "Doktor akkaunti topilmadi."}
        </p>
        <Link href="/login" className="mt-5 font-semibold text-teal-700">
          Qayta kirish
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent px-5 pb-16 pt-7 sm:px-8">
      <div aria-hidden="true" className="ambient ambient-one" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-teal-800"
          >
            <ArrowLeft size={16} /> Medora bosh sahifasi
          </Link>
          <div className="flex items-center gap-3">
            <p className="hidden text-sm font-medium text-slate-500 sm:block">
              {doctor.email}
            </p>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
            >
              <LogOut size={15} /> Chiqish
            </button>
          </div>
        </header>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-teal-700">
              <BadgeCheck size={15} /> Doktor kabineti
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.055em] text-slate-900 sm:text-4xl">
              Assalomu alaykum, {doctor.name.split(" ")[0]}!
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Profilingiz va video maslahatlaringizni yangilang. Saqlangan
              o‘zgarishlar ommaviy doktoringiz sahifasida ko‘rinadi.
            </p>
          </div>
          <Link
            href={`/doctors/${doctor.id}`}
            className="rounded-full border border-teal-200 bg-white px-4 py-2.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
          >
            Profilni ko‘rish
          </Link>
        </div>

        {(error || notice) && (
          <p
            role={error ? "alert" : "status"}
            className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
              error
                ? "border-rose-100 bg-rose-50 text-rose-700"
                : "border-teal-100 bg-teal-50 text-teal-800"
            }`}
          >
            {error || notice}
          </p>
        )}

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[26px] border border-white bg-white p-5 shadow-[0_14px_45px_rgba(16,54,61,0.07)] sm:p-7">
            <h2 className="text-xl font-bold tracking-[-0.04em] text-slate-900">
              Profil ma’lumotlari
            </h2>
            <form onSubmit={saveProfile} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ism va familiya" name="name" value={profileFields.name} onChange={(value) => updateField("name", value)} required />
                <Field label="Mutaxassislik" name="specialty" value={profileFields.specialty} onChange={(value) => updateField("specialty", value)} required />
                <Field label="Tajriba (yil)" name="experience" value={profileFields.experience} onChange={(value) => updateField("experience", value)} type="number" required />
                <Field label="Qabul narxi (so‘m)" name="price" value={profileFields.price} onChange={(value) => updateField("price", value)} type="number" required />
                <Field label="Klinika" name="clinic" value={profileFields.clinic} onChange={(value) => updateField("clinic", value)} required />
                <Field label="Shahar" name="location" value={profileFields.location} onChange={(value) => updateField("location", value)} required />
                <Field label="Manzil" name="address" value={profileFields.address} onChange={(value) => updateField("address", value)} />
                <Field label="Profil rasmi URL" name="image" value={profileFields.image} onChange={(value) => updateField("image", value)} type="url" />
              </div>
              <TextArea label="Bio" name="bio" value={profileFields.bio} onChange={updateField} rows={4} />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextArea
                  label="Tillar (vergul bilan)"
                  name="languages"
                  value={profileFields.languages}
                  onChange={updateField}
                  rows={3}
                  placeholder="O‘zbek, Русский, English"
                />
                <TextArea
                  label="Sertifikatlar (har qatorda bittadan)"
                  name="certifications"
                  value={profileFields.certifications}
                  onChange={updateField}
                  rows={3}
                />
              </div>
              <TextArea
                label="Ish vaqti (har qatorda: kun | soat)"
                name="schedule"
                value={profileFields.schedule}
                onChange={updateField}
                rows={3}
                placeholder={"Dushanba – Juma | 09:00 – 17:00"}
              />
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-teal-700 px-6 text-sm font-bold text-white shadow-md shadow-teal-700/15 transition hover:bg-teal-800 active:scale-95 disabled:opacity-60"
              >
                {saving && <LoaderCircle size={16} className="animate-spin" />}
                O‘zgarishlarni saqlash
              </button>
            </form>
          </section>

          <div className="space-y-6">
            <section className="rounded-[26px] border border-white bg-white p-5 shadow-[0_14px_45px_rgba(16,54,61,0.07)] sm:p-7">
              <h2 className="text-xl font-bold tracking-[-0.04em] text-slate-900">
                Yangi video maslahat
              </h2>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Video va muqova uchun ochiq havola kiriting (masalan, MP4 va
                JPG/PNG).
              </p>
              <form onSubmit={addReel} className="mt-5 space-y-3">
                <Field label="Video sarlavhasi" name="title" required />
                <Field label="Kategoriya" name="category" defaultValue="Foydali maslahat" required />
                <Field label="Video URL" name="videoUrl" type="url" required />
                <Field label="Muqova rasmi URL" name="coverUrl" type="url" required />
                <button
                  type="submit"
                  disabled={addingReel}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-teal-700 px-5 text-sm font-bold text-white shadow-md shadow-teal-700/15 transition hover:bg-teal-800 active:scale-95 disabled:opacity-60"
                >
                  {addingReel ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <CirclePlus size={16} />
                  )}
                  Videoni qo‘shish
                </button>
              </form>
            </section>

            <section className="rounded-[26px] border border-white bg-white p-5 shadow-[0_14px_45px_rgba(16,54,61,0.07)] sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold tracking-[-0.04em] text-slate-900">
                  Mening videolarim
                </h2>
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">
                  {reels.length}
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {reels.map((reel) => (
                  <li
                    key={reel.id}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3"
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <Image
                        src={reel.coverUrl}
                        alt=""
                        fill
                        unoptimized
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {reel.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{reel.category}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteReel(reel.id)}
                      aria-label={`${reel.title} videosini o‘chirish`}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
                {reels.length === 0 && (
                  <li className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400">
                    Hozircha video qo‘shilmagan.
                  </li>
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value?: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  onChange?: (value: string) => void;
};

function Field({
  label,
  name,
  value,
  defaultValue,
  type = "text",
  required,
  onChange,
}: FieldProps) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      {label}
      <input
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={(event) => onChange?.(event.target.value)}
        type={type}
        required={required}
        className="form-input mt-2"
      />
    </label>
  );
}

type TextAreaFieldName = "bio" | "languages" | "certifications" | "schedule";

type TextAreaProps = {
  label: string;
  name: TextAreaFieldName;
  value: string;
  onChange: (name: TextAreaFieldName, value: string) => void;
  rows: number;
  placeholder?: string;
};

function TextArea({
  label,
  name,
  value,
  onChange,
  rows,
  placeholder,
}: TextAreaProps) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      {label}
      <textarea
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="form-input mt-2 h-auto min-h-[46px] resize-y py-3 leading-5"
      />
    </label>
  );
}
