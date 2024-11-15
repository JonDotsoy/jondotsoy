# Bun Release Package

> **TL;DR:**
> 
> Add the next job on your workflow:
> ```
> release:
>   uses: jondotsoy/jondotsoy/.github/workflows/bun-release-package.yml@v1
>   permissions:
>     contents: write
>     pull-requests: write
>   secrets:
>     NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
> ```


This workflow automates the release process of a Bun package to NPM. It uses release-please to generate release PRs based on conventional commits. Upon merging the PR, the workflow publishes the package using the provided NPM_TOKEN. It requires the following:

**Inputs:**
- `NPM_TOKEN`: Token to publish package

**Permissions:**
- action permissions:
    - id-token: `write`
    - contents: `write`
- Option **Allow GitHub Actions to create and approve pull requests** on github settings

## Setup release-please

**TL;DR:** Run `release-please bootstrap` command.

```shell
bunx release-please bootstrap --repo-url=https://github.com/JonDotsoy/evoldata --initial-version=0.11.1 --token=$(gh auth token) --release-type=node 
```
