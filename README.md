# `graph-cli` Fork with StarkNet Support

This is a [`graph-cli`](https://github.com/graphprotocol/graph-cli) fork with support for
[StarkNet](https://starknet.io/). It's created and maintained by the [zkLend](https://zklend.com/)
team.

Powered by a
[GitHub Actions workflow](https://github.com/starknet-graph/graph-cli/actions/workflows/sync.yml),
this fork syncs the `main` branch with the upstream continuously:

- First, a commit is made on top of the upstream `main` branch to bring files from the
  [`home`](https://github.com/starknet-graph/graph-cli/tree/home) branch to `main`. This is
  necessary for making changes to CI workflows and the README file you're reading right now.

- Then, actual patch commits living on the fork `main` branch gets rebased. Before pushing, the
  branch is compiled to make sure it still builds, and the team gets notified if it doesn't.

Whenever a version is released on the upstream project, we will make the same release except with
the patch applied.

## Installing

We don't currently publish our fork to npm until the code matures enough. To install the patched
`graph-cli`, you must install directly from GitHub:

```console
$ yarn global add git+https://github.com/starknet-graph/graph-cli#patch
```

Due to the constant rebasing, commit hashes can change in a non-fast-forward way. If installation
fails, retry after running:

```console
$ yarn cache clean
```
