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

// Get current timestamp in human-readable format
const now = new Date();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = months[now.getMonth()];
const day = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes().toString().padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
const displayHours = hours % 12 || 12;
const timestamp = `${month} ${day} at ${displayHours}:${minutes} ${ampm}`;

// Format the idea entry
const entry = `${timestamp}: ${ideaText}\n`;

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
