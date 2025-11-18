import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const fileService = {
  // Generate a unique filename
  generateFilename(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const ext = path.extname(originalName);
    return `${timestamp}_${random}${ext}`;
  },

  // Save uploaded file
  async saveFile(
    fileBuffer: Buffer,
    originalFilename: string,
  ): Promise<{filename: string; path: string; url: string}> {
    const filename = this.generateFilename(originalFilename);
    const filepath = path.join(UPLOAD_DIR, filename);

    await fs.promises.writeFile(filepath, fileBuffer);

    return {
      filename,
      path: filepath,
      url: `/uploads/${filename}`,
    };
  },

  // Get file
  async getFile(filename: string): Promise<Buffer> {
    const filepath = path.join(UPLOAD_DIR, filename);

    // Security: prevent directory traversal
    if (!filepath.startsWith(UPLOAD_DIR)) {
      throw new Error('Invalid file path');
    }

    return await fs.promises.readFile(filepath);
  },

  // Delete file
  async deleteFile(filename: string): Promise<void> {
    const filepath = path.join(UPLOAD_DIR, filename);

    // Security: prevent directory traversal
    if (!filepath.startsWith(UPLOAD_DIR)) {
      throw new Error('Invalid file path');
    }

    if (fs.existsSync(filepath)) {
      await fs.promises.unlink(filepath);
    }
  },

  // List files
  async listFiles(): Promise<string[]> {
    const files = await fs.promises.readdir(UPLOAD_DIR);
    return files;
  },
};
