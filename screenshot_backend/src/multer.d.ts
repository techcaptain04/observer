// src/multer.d.ts
import * as multer from 'multer';

declare global {
  namespace Express {
    interface Multer {
      File: multer.File;
    }
  }
}
