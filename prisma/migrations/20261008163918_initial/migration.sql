-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "DoctorAccount" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "clinic" TEXT NOT NULL DEFAULT 'Mustaqil amaliyot',
    "location" TEXT NOT NULL DEFAULT 'Tashkent',
    "address" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL DEFAULT 100000,
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "certifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "schedule" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorReel" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Foydali maslahat',
    "coverUrl" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoctorReel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorAccount_email_key" ON "DoctorAccount"("email");

-- CreateIndex
CREATE INDEX "DoctorAccount_specialty_idx" ON "DoctorAccount"("specialty");

-- CreateIndex
CREATE INDEX "DoctorAccount_location_idx" ON "DoctorAccount"("location");

-- CreateIndex
CREATE INDEX "DoctorReel_doctorId_createdAt_idx" ON "DoctorReel"("doctorId", "createdAt");

-- AddForeignKey
ALTER TABLE "DoctorReel" ADD CONSTRAINT "DoctorReel_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "DoctorAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
