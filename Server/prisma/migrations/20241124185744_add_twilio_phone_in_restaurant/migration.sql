-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "twilioPhone" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;
