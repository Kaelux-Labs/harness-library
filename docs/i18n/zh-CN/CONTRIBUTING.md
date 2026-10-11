# 提交 harness

**欢迎提交新条目。** 我们希望收录实用、可复用的智能体配置，包括小型技能文件夹。Harneloop 并非必需。

最简单的提交方式不需要 fork 或 pull request：

1. [打开 GitHub 提交表单](https://github.com/Ker102/harness-library/issues/new?template=submit-harness.yml)。提供仓库、名称和任务/类别。
2. 说明安装方法、专门的分发内容、版本/许可证和手动连接要求。额外的组成细节和测试证据为可选内容。
3. 维护者审核你的 issue，必要时在其中要求补充信息，并发布获批条目。后续变更可以通过另一个 issue 或 PR 提交。

使用表单只需要 GitHub 账号。[网站指南](https://ker102.github.io/harness-library/submit/) 说明了相同流程。

如使用 PR，将 `docs/listing.example.json` 复制为 `data/listings/your-slug.json`。文件名与 `id` 必须使用相同的小写 slug。运行 `python scripts/catalog.py validate` 以及 README 中说明的测试。

必需信息：

- 名称、简短摘要、类别、源仓库、许可证，以及版本或固定的修订版本。
- 专门的分发 URL、其内容，以及源仓库是否还包含无关材料。混合内容仓库应使用可下载的软件包或独立的 harness 分支；不要要求用户克隆大型无关项目。
- 清晰且有序的安装说明。注明工作目录、前置条件、智能体/客户端集成方式以及如何开始使用。当发现机制因客户端而异时，链接到对应客户端的指南。
- 手动连接/配置、必需的 MCPs 或工具、可能需要的凭据，以及补充说明。没有要求时使用空列表。绝不提交秘密信息。

可选信息：技能/参考资料/文件数量、顶层 MCP 工具数量、执行工具、详细组成，以及附有证据的“Built with Harneloop”署名。请区分可选工具和必需工具，以及顶层调度工具和下游操作。

允许的类别：Creative、3D & Blender、Coding、Research、Data、Operations、Other。如果都不适用，可在 issue 中建议新类别。

不要在条目中添加审核或推广字段，也不要修改维护者记录。`data/reviews.json` 和 `data/boosts.json` 由维护者管理。来源署名和测试声明需要证据；仅仅发布了软件包，并不能证明它能正确运行。维护者会检查说明、源代码范围、许可证、URLs 和声明的产物；提交的脚本绝不会自动执行。

请保持变更范围集中。更新源软件包或安装步骤时，应说明版本和变更内容。安装故障可通过普通 issue 报告。
