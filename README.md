# `graph-tooling` Fork with Starknet Support

This is a [`graph-tooling`](https://github.com/graphprotocol/graph-tooling) fork with support for
[Starknet](https://starknet.io/). It's created and maintained by the [zkLend](https://zklend.com/)
team.

Powered by a
[GitHub Actions workflow](https://github.com/starknet-graph/graph-tooling/actions/workflows/sync.yml),
this fork syncs the `main` branch with the upstream continuously:

- First, a commit is made on top of the upstream `main` branch to bring files from the
  [`home`](https://github.com/starknet-graph/graph-tooling/tree/home) branch to `main`. This is
  necessary for making changes to CI workflows and the README file you're reading right now.

- Then, actual patch commits living on the fork `main` branch gets rebased. Before pushing, the
  branch is compiled to make sure it still builds, and the team gets notified if it doesn't.

Whenever a version is released on the upstream project, we will make the same release except with
the patch applied.

## Installing

Install the patched `graph` CLI from npm with:

```console
$ yarn global add @starknet-graph/graph-cli
```
