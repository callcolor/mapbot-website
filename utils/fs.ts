import path from 'path';
import fs from 'fs';

export const deleteFolder = async (name: string) => {
  try {
    const filePath = path.join(__dirname, `../public/static-api/${name}`);
    await fs.promises.rm(filePath, { recursive: true });
  } catch (e) {
    console.warn(e);
  }
};

export const writeFile = async (name: string, data: string) => {
  const filePath = path.join(__dirname, `../public/static-api/${name}`);
  const dirname = path.dirname(filePath);
  await fs.promises.mkdir(dirname, { recursive: true });
  await fs.promises.writeFile(filePath, data);
};

export const fileExists = (name: string) => {
  const filePath = path.join(__dirname, `../public/static-api/${name}`);
  return fs.existsSync(filePath);
};
