# Submit a harness

Anyone can submit through the [GitHub issue form](https://github.com/Ker102/harness-library/issues/new?template=submit-harness.yml) or a pull request. Open an issue if you would rather not edit JSON. A maintainer reviews it before it appears publicly.

For a PR, copy `docs/listing.example.json` to `data/listings/your-slug.json`. Use the same lowercase slug in the filename and `id`. Run `python scripts/catalog.py validate` and the tests described in the README.

Required information:

- Name, short summary, category, source repository, license and version or pinned revision.
- Focused distribution URL, what it contains and whether the source repo also contains irrelevant material. Use a downloadable package or a dedicated harness branch for mixed repos; do not require users to clone a large unrelated project.
- Clear, ordered installation instructions. State working directory, prerequisites, agent/client integration and how to begin. Link client-specific guidance where discovery differs.
- Manual connections/configuration, required MCPs or tools, credentials if any, and additional notes. Use empty lists when none are required. Never submit secrets.

Optional: skill/reference/file counts, top-level MCP tool count, execution tools, detailed composition and a “Built with Harneloop” attribution with evidence. Distinguish optional tools from required ones and top-level dispatch tools from downstream operations.

Allowed categories: Creative, 3D & Blender, Coding, Research, Data, Operations, Other. Suggest a new category in the issue if none fits.

Do not add review or boost fields to your listing, or modify maintainer receipts. Maintainers own `data/reviews.json` and `data/boosts.json`. Source attribution and test claims need evidence; a released package alone is not proof that it runs correctly. Maintainers inspect instructions, source scope, licenses, URLs and claimed artifacts; submission scripts are never automatically executed.

Please keep changes focused. Updates to source packages or installation steps should include the version and what changed. Reports about broken installs can use a normal issue.
