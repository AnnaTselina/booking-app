import { Controller, Get, Param, Res } from "@nestjs/common";
import { join } from "path";
import { AppService } from "./app.service";
import { Response } from "express";

const UPLOAD_DIR = join(process.cwd(), "uploads");

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(["/images/:id"])
  sendImage(@Param("id") id: string, @Res() res: Response) {
    res.sendFile(`${UPLOAD_DIR}/${id}`);
  }
}
