import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  users() {
    return this.adminService.listUsers();
  }

  @Post("users")
  createUser(@Body() body: Record<string, unknown>) {
    return this.adminService.createUser(body);
  }

  @Patch("users/:id")
  updateUser(@Param("id") id: string, @Body() body: Record<string, unknown>) {
    return this.adminService.updateUser(id, body);
  }

  @Delete("users/:id")
  deleteUser(@Param("id") id: string) {
    return this.adminService.deleteUser(id);
  }

  @Get("categories")
  categories() {
    return this.adminService.listCategories();
  }

  @Post("categories")
  createCategory(@Body() body: Record<string, unknown>) {
    return this.adminService.createCategory(body);
  }

  @Patch("categories/:id")
  updateCategory(@Param("id") id: string, @Body() body: Record<string, unknown>) {
    return this.adminService.updateCategory(id, body);
  }

  @Delete("categories/:id")
  deleteCategory(@Param("id") id: string) {
    return this.adminService.deleteCategory(id);
  }

  @Get("articles")
  articles() {
    return this.adminService.listArticles();
  }

  @Post("articles")
  createArticle(@Body() body: Record<string, unknown>) {
    return this.adminService.createArticle(body);
  }

  @Patch("articles/:id")
  updateArticle(@Param("id") id: string, @Body() body: Record<string, unknown>) {
    return this.adminService.updateArticle(id, body);
  }

  @Delete("articles/:id")
  deleteArticle(@Param("id") id: string) {
    return this.adminService.deleteArticle(id);
  }

  @Get("tracks")
  tracks() {
    return this.adminService.listTracks();
  }

  @Post("tracks")
  createTrack(@Body() body: Record<string, unknown>) {
    return this.adminService.createTrack(body);
  }

  @Patch("tracks/:id")
  updateTrack(@Param("id") id: string, @Body() body: Record<string, unknown>) {
    return this.adminService.updateTrack(id, body);
  }

  @Delete("tracks/:id")
  deleteTrack(@Param("id") id: string) {
    return this.adminService.deleteTrack(id);
  }

  @Get("certificates")
  certificates() {
    return this.adminService.listCertificates();
  }

  @Patch("certificates/:id/revoke")
  revokeCertificate(@Param("id") id: string) {
    return this.adminService.revokeCertificate(id);
  }
}
