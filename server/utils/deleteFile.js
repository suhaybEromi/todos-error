import path from "path";
import fs from "fs";

const deleteFile = async filePath => {
  try {
    if (!filePath) return;

    // Remove leading slash if exists
    const normalizedPath = filePath.replace(/^\//, "");
    const fullPath = path.join(process.cwd(), normalizedPath);

    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      console.log("Deleted file: ", fullPath);
    } else {
      console.log("File not found, skipping delete: ", fullPath);
    }
  } catch (err) {
    console.log(err);
  }
};

export default deleteFile;
