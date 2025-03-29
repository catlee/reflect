# Reflect

A Node.js tool that generates a reflection document of your GitHub activity by collecting and formatting merged pull requests and closed issues.

## Quickstart 🚀

### Prerequisites ⚙️

1. Install Node.js v22 or higher
2. Install and authenticate GitHub CLI (`gh`)
3. Install npm or yarn package manager
4. OpenAI API key (optional, for summary and brag document generation)

### Usage 💻

1. Install dependencies:
```bash
npm install
```

2. Run the tool:
```bash
npx ts-node index.ts <github-username> <months-to-look-back> --brag --api-key=sk-...
```

This will generate three markdown files in the `output` directory:
- A detailed list of your GitHub contributions
- A summarized version of your contributions
- A professional brag document highlighting your achievements

## Features ✨

- 📥 Fetches merged pull requests and closed issues from GitHub
- 🔍 Filters by author and date range (last 6 months by default)
- 📝 Generates a clean, chronological markdown document
- 🔄 Combines both PRs and issues into a single reflection document
- ⚡ Uses GitHub CLI for efficient data retrieval
- 🤖 Optional AI-powered summary and brag document generation

## Usage 🛠️

You can run the script in one of two ways:

### Development Mode 🔧

Run directly with ts-node:

```bash
npx ts-node index.ts <github-username> <months-to-look-back> [--brag] [--api-key <openai-api-key>]
```

Example:

```bash
npx ts-node index.ts bostonaholic 6 --brag --api-key sk-...
```

### Production Mode 🚀

Compile and run:

```bash
npx tsc --outDir dist && node dist/index.js <github-username> <months-to-look-back> [--brag] [--api-key <openai-api-key>]
```

Example:

```bash
npx tsc --outDir dist && node dist/index.js bostonaholic 6 --brag --api-key sk-...
```

### Arguments 📋

- `github-username`: Your GitHub username to fetch activity for
- `months-to-look-back`: Number of months to look back for activity (must be a positive number)
- `--brag`: Optional flag to generate a summary and brag document
- `--api-key`: OpenAI API key (optional if set in .env file)

## Output 📁

The script will generate one or more markdown files in the `output` directory:

### output/contributions.md 📊
Contains:
- A chronological list of your merged pull requests and closed issues
- Each item includes:
  - Title
  - Closing date
  - Description/body
- Items are sorted by closing date (most recent first)
- Activity for the specified time period

### output/summarized.md (with --brag flag) 📝
Contains:
- A technical summary of your contributions
- Groups similar contributions together
- Highlights key technical changes and improvements
- Identifies patterns in the work
- Notes significant architectural changes

### output/brag_document.md (with --brag flag) 🎯
Contains:
- A professional achievement-oriented document
- Highlights technical expertise and impact
- Emphasizes business value and problem-solving
- Showcases leadership and collaboration
- Demonstrates innovation and creativity

Note: The `output` directory and all generated files are automatically git-ignored to prevent accidental commits.

## Troubleshooting 🔍

1. Make sure your GitHub CLI (`gh`) is authenticated:

```bash
gh auth status
```

If not authenticated, run:

```bash
gh auth login
```

2. If you get TypeScript errors, ensure you're using Node.js v22 or higher:

```bash
node --version
```

3. If the script runs but generates an empty file, check your GitHub CLI permissions and ensure you have activity in the specified time period.

4. If you get an error about the OpenAI API key:
   - Make sure you've either provided it with the `--api-key` flag
   - Or set it in your `.env` file
   - Check that the API key is valid and has sufficient credits
