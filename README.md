# aec-flow
For AEC Hackathon Copenhagen 2025

## Getting Started
```
git clone https://github.com/bldrs-ai/aec-flow
yarn install
```

You'll see a `simple-slab.ifc` test file.

### Browser
```
yarn browser simple-slab.ifc
# tab-complete class names to expand out and view values
```

### Validator
```
pablo@air:~/c/b/aec-flow> grep IFCSLAB simple-slab.ifc
#59=IFCSLAB('0BBuCQ$yP3vv79FAe9WSFo',#5,'Structure','',$,#56,#58,$,.FLOOR.);
pablo@air:~/c/b/aec-flow> yarn validator simple-slab.ifc "IFCSLAB[#59].height < 5"
yarn run v1.22.22
$ /Users/pablo/c/b/aec-flow/node_modules/.bin/validator simple-slab.ifc 'IFCSLAB[#59].height < 5'

Validation Report for Query: IFCSLAB[#59].height < 5

✔️ Passing Entries:

❌ Failing Entries:
❌ IFCSLAB[#59] => FAILED (no "height" property)

✅ Total Passing: 0
❌ Total Failing: 1
✨  Done in 0.26s.
pablo@air:~/c/b/aec-flow> fg
[1]  + continued  emacs README.md

zsh: suspended  emacs README.md
```
