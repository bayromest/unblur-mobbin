# Mobbin Scene Unblur Extension

This browser extension helps you unlock and view the blurred pro scenes on Mobbin.com. It modifies the content of the Mobbin site to reveal detailed visuals that are normally hidden behind a blur.

## Features

- **Unblur Pro Scenes**: Automatically unblurs pro scenes on Mobbin.com for enhanced viewing.

## Installation

1. **Clone the Repository**

   \`\`\`sh
   gh repo clone bayromest/unblur-mobbin
   cd your-repo-name
   \`\`\`

2. **Install Dependencies**

   This project uses Vite for bundling. Install dependencies with:

   \`\`\`sh
   npm install
   \`\`\`

   or

   \`\`\`sh
   yarn install
   \`\`\`

3. **Build the Extension**

   To build the extension for your browser, run:

   \`\`\`sh
   npm run build
   \`\`\`

   or

   \`\`\`sh
   yarn build
   \`\`\`

4. **Load the Extension**

   - Open your browser and navigate to the Extensions page (e.g., \`chrome://extensions/\` for Chrome).
   - Enable "Developer mode".
   - Click "Load unpacked" and select the \`dist\` directory created by the build process.

## Usage

Once installed, the extension will automatically detect and unblur pro scenes on Mobbin.com. Simply navigate to the Mobbin site, and the extension will handle the rest.

## Configuration

To adjust the settings of the extension:

1. Open the extension popup or options page (if available).
2. Customize settings such as the level of unblurring or visual enhancements.

## Contributing

If you’d like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a feature branch (\`git checkout -b feature/YourFeature\`).
3. Commit your changes (\`git commit -am 'Add new feature'\`).
4. Push to the branch (\`git push origin feature/YourFeature\`).
5. Create a Pull Request.
