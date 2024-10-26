const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const semver = require('semver');

const apidocJsonPath = path.resolve(__dirname, 'apidoc.json');

// Read the current apidoc.json content
const apidocJsonContent = fs.readFileSync(apidocJsonPath, 'utf8');

// Parse the JSON content
const apidocConfig = JSON.parse(apidocJsonContent);

// Get the current version
const currentVersion = apidocConfig.version;

// Increment the version (you can customize this logic)
const newVersion = semver.inc(currentVersion, 'patch');

// Update the version field
apidocConfig.version = newVersion;

// Write the updated content back to apidoc.json
fs.writeFileSync(apidocJsonPath, JSON.stringify(apidocConfig, null, 2), 'utf8');

// Run the apidoc command
execSync('apidoc -i "../ecom-web-app/server/v1/controller" -o "./apidoc/doc"', { stdio: 'inherit' });

console.log(`Documentation generated with version ${newVersion}`);
