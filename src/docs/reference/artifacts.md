# Artifacts

An artifact is the concept of a thing you wish to version and provide binaries for in pursuit of
ultimately distributing those binaries to devices. For example, `Cat-Finder ML Model` may be the
`name` of your artifact. Note that the artifact itself is neither a version nor a binary, as those
are distinctly manageable resources. See [artifact versions](/reference/artifact-versions.md) and
[binaries](/reference/binaries.md).

The distinction between artifacts and artifact versions allows artifacts to act as a common thread
across its associated artifact versions. Peridio, and you, are more easily able to track that a
thing that changes between releases is actually two different version of the same thing, rather
than two distinctly unrelated things.
