#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the idea text from command line arguments
const ideaText = process.argv.slice(2).join(' ');

if (!ideaText) {
  console.log('Usage: idea <your idea here>');
  process.exit(1);
}

// Path to ideas.md in the package directory
const ideasFile = path.join(__dirname, '..', 'ideas.md');

// Read the current file to count existing ideas
let content = '';
let ideaNumber = 1;
try {
  content = fs.readFileSync(ideasFile, 'utf8');
  // Count existing numbered ideas
  const matches = content.match(/^\d+\. /gm);
  if (matches) {
    ideaNumber = matches.length + 1;
  }
} catch (error) {
  // File doesn't exist yet, start at 1
}

// Format the idea entry
const entry = `${ideaNumber}. ${ideaText}\n\n`;

// Append to ideas.md
fs.appendFileSync(ideasFile, entry);

// Try to commit and push to GitHub (if in a git repo)
try {
  const repoPath = path.join(__dirname, '..');
  process.chdir(repoPath);

  execSync('git add ideas.md', { stdio: 'ignore' });
  execSync(`git commit -m "Add idea: ${ideaText.substring(0, 50)}${ideaText.length > 50 ? '...' : ''}"`, { stdio: 'ignore' });
  execSync('git push', { stdio: 'ignore' });
} catch (error) {
  // Silently fail if git operations don't work
  // This is fine for local development or if not yet connected to GitHub
}
