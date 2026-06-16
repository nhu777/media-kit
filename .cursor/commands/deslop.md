# Remove AI code slop

Check the diff against main, and remove all AI generated slop introduced in this branch.

This includes:

- Extra comments that a human wouldn’t write (especially obvious, redundant, or “tutorial” comments)
- Placeholder/mock/demo data left in production paths (e.g. `mock*`, hard-coded IDs/URLs, fake counts)
- Overly verbose types/props or unnecessary abstractions created “just because”
- Dead code, unused imports, unreachable branches, and commented-out blocks
- Debug statements and scaffolding (`console.log`, temporary flags, TODO spam)
- Non-idiomatic patterns (e.g. awkward state shape, needless `useEffect`, excessive `clsx`/wrappers)
- Inconsistent formatting/naming vs the repo’s conventions
