const fs = require('fs');
const path = require('path');

// Set the absolute path to the `geins` repository
const repoRoot = path.resolve(__dirname, '..');

// Function to ensure a path is within the repository root
const isWithinRepo = (itemPath) => {
  return itemPath.startsWith(repoRoot);
};

// Function to delete a file or directory
const deleteItem = (itemPath) => {
  if (fs.existsSync(itemPath) && isWithinRepo(itemPath)) {
    try {
      if (fs.lstatSync(itemPath).isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`Deleted directory: ${itemPath}`);
      } else {
        fs.unlinkSync(itemPath);
        console.log(`Deleted file: ${itemPath}`);
      }
    } catch (err) {
      console.error(`Error deleting ${itemPath}: ${err.message}`);
    }
  } else {
    console.log(`Skipped non-existent or out-of-repo item: ${itemPath}`);
  }
};

// List of patterns to exclude from deletion
const excludePatterns = ['.temp', '.env'];

// Function to read .gitignore and build delete patterns
const buildDeletePatterns = (gitignorePath) => {
  const deletePatterns = [];
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    const patterns = gitignoreContent.split('\n').filter(Boolean);

    patterns.forEach(pattern => {
      pattern = pattern.trim();
      if (!pattern.startsWith('#') && pattern !== '') {
        // Exclude specific patterns
        if (!excludePatterns.includes(pattern)) {
          deletePatterns.push(pattern);
        }
      }
    });
  }
  return deletePatterns;
};

// Function to recursively find and delete patterns based on local .gitignore
const processDirectory = (dir) => {
  // Ensure we are only processing within the intended repo
  if (!isWithinRepo(dir)) {
    console.log(`Skipping directory outside of repo: ${dir}`);
    return;
  }

  // Check for a .gitignore file in the current directory
  const gitignorePath = path.join(dir, '.gitignore');
  const deletePatterns = buildDeletePatterns(gitignorePath);

  // Recursively process subdirectories first to ensure we clean from the bottom up
  fs.readdirSync(dir).forEach(file => {
    const subDir = path.join(dir, file);
    if (fs.existsSync(subDir) && fs.lstatSync(subDir).isDirectory() && !excludePatterns.includes(file)) {
      processDirectory(subDir);
    }
  });

  // Delete items that match the deletePatterns for this directory
  deletePatterns.forEach(pattern => {
    const fullPattern = path.join(dir, pattern);
    if (fs.existsSync(fullPattern)) {
      deleteItem(fullPattern);
    }
  });
};

// Start the cleanup process from the repo root
processDirectory(repoRoot);

console.log('Cleanup complete!');
