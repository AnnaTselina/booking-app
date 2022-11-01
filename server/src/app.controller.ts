import { Controller, Get, Param, Res } from "@nestjs/common";
import { join } from "path";
import { Response } from "express";

const UPLOAD_DIR = join(process.cwd(), "uploads");

@Controller()
export class AppController {
  @Get(["/images/:id"])
  sendImage(@Param("id") id: string, @Res() res: Response) {
    res.sendFile(`${UPLOAD_DIR}/${id}`);
  }
}
