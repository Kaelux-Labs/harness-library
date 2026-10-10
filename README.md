<p align="center"><img src="site/assets/mark.svg" width="70" alt="Harness Library"></p>
<h1 align="center">Harness Library</h1>
<p align="center">Discover, install and share reusable agent harnesses.</p>
<p align="center"><a href="https://ker102.github.io/harness-library/">Browse the library</a> · <a href="https://github.com/Ker102/harness-library/issues/new?template=submit-harness.yml">Submit a harness</a> · <a href="CONTRIBUTING.md">Submission guide</a></p>

An open directory of the instructions, skills, tools and workflows that help an agent do a specific job well. A harness can be a few files or a larger tool setup. Every listing explains how to install it, what to configure manually and which part of the source repository you need.

The first entries are [Smooth Motion Graphics](https://github.com/Ker102/smooth-motion-graphics) and [ViperMesh for Blender](https://github.com/Ker102/vipermesh-blender). ViperMesh's existing repository and releases are listed unchanged. Harneloop is optional; harnesses built with it can display the attribution after review.

## Submit a harness

**New submissions are welcome.** We’re looking for useful harnesses for coding, research, data, creative work, Blender and operations. A few skills can be enough; you do not need to use Harneloop.

1. [Open the short GitHub submission form](https://github.com/Ker102/harness-library/issues/new?template=submit-harness.yml) with your repository and the task it helps an agent do.
2. Add clear installation steps, category, license, version/distribution scope and any manual setup. Component counts and test evidence are optional.
3. A maintainer reviews the setup, follows up in your issue if needed, and publishes approved entries.

**No fork, pull request or Harness Library account is needed.** A GitHub account is needed for the form. You can also send a PR adding one JSON file in `data/listings/`. See the [public submission guide](https://ker102.github.io/harness-library/submit/), [CONTRIBUTING.md](CONTRIBUTING.md) and [the template](docs/listing.example.json).

A mixed repository must provide a focused package or a dedicated harness branch. Uploaders do not set verification or promotion labels. Maintainers review setup, scope and any evidence before publishing the listing. “Artifacts checked” means the documented artifacts were inspected; it does not imply every model, platform or use case works.

## Free badge program

Add the exact “Listed in Harness Library” badge and listing backlink within the first 30 lines of your source README. After verification, your listing receives **one 14-day community boost**, clearly labelled in the directory. A boost affects ordering, not review status. It is free, optional and expires automatically. Removing/readding the badge does not restart it. [Policy and verification](docs/badge-program.md).

## Development

No frontend dependencies or backend service are needed. Python 3.11+ runs the validator and builder; the UI is plain HTML, CSS and JavaScript.

```sh
python scripts/catalog.py validate
python -m unittest discover -s tests -v
python scripts/catalog.py build
python -c "import shutil; shutil.copytree('dist', '.preview/harness-library', dirs_exist_ok=True)"
python -m http.server 4201 --directory .preview
```

Open `http://localhost:4201/harness-library/`. The preview copy serves the production base path correctly; refresh it after rebuilding. Asset and navigation paths intentionally match the GitHub Pages project URL.

`site/layout.html`, `site/style.css` and `scripts/publishing.py` generate complete HTML pages for the directory, each harness, the submission guide and the about page. JavaScript progressively adds search, filters and copying; installation content and navigation remain usable without it. Builds also publish a sitemap, Markdown page mirrors, `llms.txt` and the reviewed JSON catalog. See [Discovery and indexing](docs/discovery.md) for owner setup and crawl details.

`python scripts/catalog.py refresh` verifies opted-in badges by reading public GitHub README content. It never executes submitted code. GitHub Pages publishes reviewed main; a daily workflow refreshes badge receipts and rebuilds. External PR checks have read-only permissions.

Source data and review receipts live in this repository. Harness source and release assets live in their own repositories. No harness videos, dependencies or private development traces are installed with Harneloop's framework.
