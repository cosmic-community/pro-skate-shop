const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Script to inject console capture into HTML files after build
function injectConsoleCapture() {
  const distPath = path.join(process.cwd(), '.next');
  const htmlFiles = glob.sync('**/*.html', { cwd: distPath });
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  htmlFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Inject script before closing head tag
    if (content.includes('</head>') && !content.includes('dashboard-console-capture.js')) {
      content = content.replace('</head>', `  ${scriptTag}\n</head>`);
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture script into ${file}`);
    }
  });
}

// Run if called directly
if (require.main === module) {
  injectConsoleCapture();
}

module.exports = injectConsoleCapture;