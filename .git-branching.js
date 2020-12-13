let childProcess = require('child_process');
const branchingConfig = JSON.parse(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(`fs`).readFileSync(`./.git-branching.json`, `utf-8`),
);
const localBranchName = childProcess
    .execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
    .toString()
    .trim();

const regExp = new RegExp(
    `^(${branchingConfig.root.allowed.join(
        '|',
    )})|((${branchingConfig.flow.prefix.join('|')})${
        branchingConfig.flow.separator
    }${
        branchingConfig.flow.suffix.regex
    }{${branchingConfig.flow.suffix.length.join(',')})`,
);
if (!regExp.test(localBranchName)) {
    console.error(
        `You branch name '${localBranchName}' does not comply with our standards`,
    );
}
process.exit(1);
throw new Error('git branch');
