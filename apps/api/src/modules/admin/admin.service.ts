import { BadRequestException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function optionalText(value: unknown) {
  const normalized = text(value);
  return normalized.length > 0 ? normalized : undefined;
}

function bool(value: unknown) {
  return value === true || value === "true";
}

function numberValue(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  listUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscription: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async createUser(body: Record<string, unknown>) {
    const email = text(body.email).toLowerCase();
    const password = text(body.password);

    if (!email || !password) {
      throw new BadRequestException("Email and password are required");
    }

    return this.prisma.user.create({
      data: {
        email,
        name: optionalText(body.name),
        role: text(body.role, "STUDENT") as never,
        subscription: text(body.subscription, "FREE") as never,
        passwordHash: await bcrypt.hash(password, 10)
      },
      select: { id: true, email: true, name: true, role: true, subscription: true }
    });
  }

  updateUser(id: string, body: Record<string, unknown>) {
    return this.prisma.user.update({
      where: { id },
      data: {
        email: optionalText(body.email)?.toLowerCase(),
        name: optionalText(body.name),
        role: optionalText(body.role) as never,
        subscription: optionalText(body.subscription) as never
      },
      select: { id: true, email: true, name: true, role: true, subscription: true }
    });
  }

  deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id }, select: { id: true } });
  }

  listCategories() {
    return this.prisma.category.findMany({
      include: { _count: { select: { articles: true, tracks: true } } },
      orderBy: { name: "asc" }
    });
  }

  createCategory(body: Record<string, unknown>) {
    const name = text(body.name);
    if (!name) {
      throw new BadRequestException("Name is required");
    }

    return this.prisma.category.create({
      data: {
        name,
        slug: optionalText(body.slug) ?? slugify(name)
      }
    });
  }

  updateCategory(id: string, body: Record<string, unknown>) {
    return this.prisma.category.update({
      where: { id },
      data: {
        name: optionalText(body.name),
        slug: optionalText(body.slug)
      }
    });
  }

  deleteCategory(id: string) {
    return this.prisma.category.delete({ where: { id }, select: { id: true } });
  }

  listArticles() {
    return this.prisma.article.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });
  }

  createArticle(body: Record<string, unknown>) {
    const title = text(body.title);
    const sourceUrl = text(body.sourceUrl);

    if (!title || !sourceUrl) {
      throw new BadRequestException("Title and sourceUrl are required");
    }

    return this.prisma.article.create({
      data: {
        title,
        abstract: optionalText(body.abstract),
        authors: text(body.authors)
          .split(",")
          .map((author) => author.trim())
          .filter(Boolean),
        journal: optionalText(body.journal),
        language: optionalText(body.language),
        source: text(body.source, "PUBMED") as never,
        sourceUrl,
        doi: optionalText(body.doi),
        pmid: optionalText(body.pmid),
        pmcid: optionalText(body.pmcid),
        license: optionalText(body.license),
        openAccess: bool(body.openAccess),
        status: text(body.status, "DRAFT") as never,
        categoryId: optionalText(body.categoryId)
      }
    });
  }

  updateArticle(id: string, body: Record<string, unknown>) {
    return this.prisma.article.update({
      where: { id },
      data: {
        title: optionalText(body.title),
        abstract: optionalText(body.abstract),
        authors:
          typeof body.authors === "string"
            ? body.authors
                .split(",")
                .map((author) => author.trim())
                .filter(Boolean)
            : undefined,
        journal: optionalText(body.journal),
        language: optionalText(body.language),
        source: optionalText(body.source) as never,
        sourceUrl: optionalText(body.sourceUrl),
        doi: optionalText(body.doi),
        pmid: optionalText(body.pmid),
        pmcid: optionalText(body.pmcid),
        license: optionalText(body.license),
        openAccess: body.openAccess === undefined ? undefined : bool(body.openAccess),
        status: optionalText(body.status) as never,
        categoryId: optionalText(body.categoryId)
      }
    });
  }

  deleteArticle(id: string) {
    return this.prisma.article.delete({ where: { id }, select: { id: true } });
  }

  listTracks() {
    return this.prisma.learningTrack.findMany({
      include: { category: true, modules: true },
      orderBy: { createdAt: "desc" }
    });
  }

  createTrack(body: Record<string, unknown>) {
    const title = text(body.title);
    const categoryId = text(body.categoryId);

    if (!title || !categoryId) {
      throw new BadRequestException("Title and categoryId are required");
    }

    return this.prisma.learningTrack.create({
      data: {
        title,
        slug: optionalText(body.slug) ?? slugify(title),
        description: text(body.description),
        categoryId,
        estimatedMinutes: numberValue(body.estimatedMinutes),
        isPremium: bool(body.isPremium),
        publishedAt: bool(body.published) ? new Date() : undefined
      }
    });
  }

  updateTrack(id: string, body: Record<string, unknown>) {
    return this.prisma.learningTrack.update({
      where: { id },
      data: {
        title: optionalText(body.title),
        slug: optionalText(body.slug),
        description: optionalText(body.description),
        categoryId: optionalText(body.categoryId),
        estimatedMinutes:
          body.estimatedMinutes === undefined ? undefined : numberValue(body.estimatedMinutes),
        isPremium: body.isPremium === undefined ? undefined : bool(body.isPremium),
        publishedAt: body.published === undefined ? undefined : bool(body.published) ? new Date() : null
      }
    });
  }

  deleteTrack(id: string) {
    return this.prisma.learningTrack.delete({ where: { id }, select: { id: true } });
  }

  listCertificates() {
    return this.prisma.certificate.findMany({
      include: { user: true, track: true },
      orderBy: { issuedAt: "desc" }
    });
  }

  revokeCertificate(id: string) {
    return this.prisma.certificate.update({
      where: { id },
      data: { status: "REVOKED" }
    });
  }
}
