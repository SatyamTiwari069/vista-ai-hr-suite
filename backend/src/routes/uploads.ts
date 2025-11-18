import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import { fileService } from '../services/fileService.js';
import { authenticateToken } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

const router: Router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req: any, file: any, cb: any) => {
    // Allow common document formats
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'text/plain',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  },
});

/**
 * Upload a file (resumes, documents, etc.)
 */
router.post('/upload', authenticateToken, upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const result = await fileService.saveFile(file.buffer, file.originalname);

    logger.info(`File uploaded: ${result.filename}`);

    res.json({
      success: true,
      file: {
        filename: result.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        url: result.url,
      },
    });
  } catch (error: any) {
    logger.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Upload failed' });
  }
});

/**
 * Download a file
 */
router.get('/download/:filename', authenticateToken, async (req: Request, res: Response) => {
  try {
    const fileBuffer = await fileService.getFile(req.params.filename);

    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(fileBuffer);
  } catch (error: any) {
    logger.error('Download error:', error);
    res.status(500).json({ error: error.message || 'Download failed' });
  }
});

/**
 * List all uploaded files
 */
router.get('/list', authenticateToken, async (req: Request, res: Response) => {
  try {
    const files = await fileService.listFiles();
    res.json({ files });
  } catch (error: any) {
    logger.error('List files error:', error);
    res.status(500).json({ error: error.message || 'Failed to list files' });
  }
});

/**
 * Delete a file
 */
router.delete('/:filename', authenticateToken, async (req: Request, res: Response) => {
  try {
    await fileService.deleteFile(req.params.filename);
    res.json({ success: true, message: 'File deleted' });
  } catch (error: any) {
    logger.error('Delete error:', error);
    res.status(500).json({ error: error.message || 'Delete failed' });
  }
});

export default router;
