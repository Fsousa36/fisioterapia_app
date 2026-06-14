import { Controller, Get, Param, Post } from "@nestjs/common";
import { CertificatesService } from "./certificates.service";

@Controller("certificates")
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post(":userId/tracks/:trackId")
  issue(@Param("userId") userId: string, @Param("trackId") trackId: string) {
    return this.certificatesService.issue(userId, trackId);
  }

  @Get("validate/:code")
  validate(@Param("code") code: string) {
    return this.certificatesService.validate(code);
  }
}
