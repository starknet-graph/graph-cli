# `graph-cli` Fork with StarkNet Support

This is a [`graph-cli`](https://github.com/graphprotocol/graph-cli) fork with support for [StarkNet](https://starknet.io/). It's created and maintained by the [zkLend](https://zklend.com/) team.

This fork syncs the `main` branch with the upstream continuously, after which it applies a single commit replacing the `README.md` file with the one you're reading right now. The actual code for StarkNet support lives in another branch `patch`, which always builds on the latest `main` branch.

Whenever a version is released on the upstream project, we will make the same release except with the patch applied. Our release would essentially be the patch branch rebased on the corresponding upstream tag.

## Installing

We don't currently publish our fork to npm until the code matures enough. To install the patched `graph-cli`, you must install directly from GitHub:

```console
$ yarn global add git+https://github.com/starknet-graph/graph-cli#patch
```

Due to the constant rebasing, commit hashes can change in a non-fast-forward way. If installation fails, retry after running:

```console
$ yarn cache clean
```
