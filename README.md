# idea

A simple CLI tool to capture and store ideas in a GitHub repository.

## Installation

```bash
npm install -g @hughgramelspacher/idea
```

Or use locally:

```bash
npm install
npm link
```

## Usage

Simply type `idea` followed by your idea:

```bash
idea Build a CLI tool for storing ideas
```

This will:
1. Append your idea as a numbered entry to `ideas.md`
2. Automatically commit and push to GitHub (if configured)

## Setup

After cloning this repository:

1. Clone the repo:
```bash
git clone https://github.com/hughgramel/idea.git
cd idea
```

2. Install and link:
```bash
npm install
npm link
```

3. Configure your GitHub credentials (if not already done)

Now you can use `idea` from anywhere on your system!

## Ideas Storage

All ideas are stored in `ideas.md` as a numbered list. Each entry follows this format:

```
1. Your first idea here

2. Your second idea here

3. Your third idea here
```

## License

MIT
