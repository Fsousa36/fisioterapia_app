import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import QRCode from "qrcode";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CertificatesService {
  constructor(private readonly prisma: PrismaService) {}

  async issue(userId: string, trackId: string) {
    const code = `FB-${randomUUID().slice(0, 8).toUpperCase()}`;
    const publicUrl = `${process.env.ADMIN_PUBLIC_URL ?? "http://localhost:3000"}/certificates/${code}`;
    const qrCodeUrl = await QRCode.toDataURL(publicUrl);

    return this.prisma.certificate.create({
      data: {
        userId,
        trackId,
        code,
        qrCodeUrl
      }
    });
  }

  validate(code: string) {
    return this.prisma.certificate.findUnique({
      where: { code },
      include: { user: true, track: true }
    });
  }
}
