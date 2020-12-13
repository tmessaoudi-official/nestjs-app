let childProcess = require(`child_process`);
let colors = require(`colors`);
const branchingConfig = JSON.parse(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(`fs`).readFileSync(`./.git-branching.json`, `utf-8`),
);
const localBranchName = childProcess
    .execFileSync(`git`, [`rev-parse`, `--abbrev-ref`, `HEAD`])
    .toString()
    .trim();
if (!branchingConfig.root.allowed) {
    branchingConfig.root.allowed = [];
}
if (!branchingConfig.root.disallowed) {
    branchingConfig.root.disallowed = [];
}

const regExp = new RegExp(
    `^${
        branchingConfig.root.allowed.length > 0
            ? `(${branchingConfig.root.allowed.join(`|`)})|`
            : ``
    }((${branchingConfig.flow.prefix.join(`|`)})${
        branchingConfig.flow.separator || `/`
    }${branchingConfig.flow.suffix.regex}{${branchingConfig.flow.range.join(
        `,`,
    )})`,
);
if (!regExp.test(localBranchName)) {
    let unknownError = true;
    if (
        branchingConfig.root.disallowed.includes(localBranchName) ||
        localBranchName.indexOf(branchingConfig.flow.separator) === -1
    ) {
        unknownError = false;
        console.error(
            `You are not allowed to push to '${localBranchName}' !! use gitflow`
                .bgRed.white,
        );
        if (branchingConfig.root.allowed.length > 0) {
            console.error(
                `If you want to push to a root branch here are the authorized ones [${branchingConfig.root.allowed.join(
                    `, `,
                )}]`.bgRed.white,
            );
        }
    }
    if (localBranchName.length > branchingConfig.flow.range[1]) {
        unknownError = false;
        console.error(
            `Branch name '${localBranchName}' exceeds the maximums characters allowed '${
                branchingConfig.flow.range[1]
            }' by '${localBranchName.length - branchingConfig.flow.range[1]}'`
                .bgRed.white,
        );
    }
    if (localBranchName.length < branchingConfig.flow.range[0]) {
        unknownError = false;
        console.error(
            `Branch name '${localBranchName}' cannot contain less than '${branchingConfig.flow.range[0]}' characters, '${localBranchName.length}' given`
                .bgRed.white,
        );
    }
    if (
        localBranchName.indexOf(branchingConfig.flow.separator) !== -1 &&
        !branchingConfig.flow.prefix.includes(
            localBranchName.split(branchingConfig.flow.separator)[0],
        )
    ) {
        unknownError = false;
        console.error(
            `Branch name '${localBranchName}' has an unknown prefix ${
                localBranchName.split(branchingConfig.flow.separator)[0]
            }`.bgRed.white,
        );
        console.error(
            `Here are the supported prefixes [${branchingConfig.flow.prefix.join(
                `, `,
            )}]`.bgRed.white,
        );
    }
    if (unknownError) {
        console.error(
            `Branch name '${localBranchName}' does not comply with our standards!! please use gitflow`
                .bgRed.white,
        );
    }
    process.exit(1);
}
