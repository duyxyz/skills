#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];
const repo = args[1];

if (command === 'add' && repo === 'duyxyz/SkillAnti') {
  const source = path.join(__dirname, '.agents');
  const target = path.join(process.cwd(), '.agents');

  if (!fs.existsSync(source)) {
    console.error('Error: Source .agents folder not found in the package.');
    process.exit(1);
  }

  try {
    // Copy the .agents folder recursively to the current working directory
    fs.cpSync(source, target, { recursive: true, force: true });
    console.log('Successfully added duyxyz/SkillAnti to the current directory!');
  } catch (err) {
    console.error('Error adding SkillAnti:', err.message);
    process.exit(1);
  }
} else {
  console.log('Skills Manager CLI');
  console.log('Usage: npx skills add duyxyz/SkillAnti');
}
