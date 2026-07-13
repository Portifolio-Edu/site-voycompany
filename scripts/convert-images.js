import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

async function convertImages() {
    try {
        const files = fs.readdirSync(publicDir);
        for (const file of files) {
            if (file.toLowerCase().endsWith('.png')) {
                const oldPath = path.join(publicDir, file);
                
                // Format name: lowercase, replace spaces with dashes, remove special chars
                let nameWithoutExt = path.parse(file).name;
                const newName = nameWithoutExt
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '') + '.webp';
                
                const newPath = path.join(publicDir, newName);
                
                console.log(`Converting ${file} to ${newName}...`);
                
                await sharp(oldPath)
                    .webp({ quality: 80 })
                    .toFile(newPath);
                    
                fs.unlinkSync(oldPath);
                console.log(`Deleted ${file}`);
            }
        }
        console.log('All images converted to WebP successfully!');
    } catch (err) {
        console.error('Error converting images:', err);
    }
}

convertImages();
