# gflow-cli
[![NPM version](https://img.shields.io/npm/v/gflow-cli.svg)](https://www.npmjs.com/package/gflow-cli)
[![npm download](https://img.shields.io/npm/dt/gflow-cli.svg?style=flat-square)](https://www.npmjs.com/package/gflow-cli)
[![license](https://img.shields.io/npm/l/gflow-cli.svg?style=flat-square)](https://github.com/fengxianqi/gflow-cli/blob/master/LICENSE)

A git flow cli using nodejs, which improve your efficiency.

![gitflow png](/assets/gitflow.png)

## Installation
```
npm i gflow-cli -g
```

## Usage
- [FEATURE](#FEATURE)
- [RELEASE](#RELEASE)
- [HOTFIX](#HOTFIX)
- [BUGFIX](#BUGFIX)

------
### FEATURE


**:point_right: `gflow feature start <feature_name>`**

This will do follows: 
```
- git checkout develop
- git pull
- git checkout -B feature/<feature_name>
- git push
```

**:point_right: `gflow feature finish <feature_name>`**

This will do follows: 
```
- git checkout develop
- git pull
- git merge feature/<feature_name>
```


**:point_right: `gflow feature publish <feature_name>`**

This will do follows: 
```
- git checkout develop
- git pull
- git merge feature/<feature_name>
- git push
- git push origin :feature/<feature_name>
```

:warning: This will delete the remote branch `feature/<feature_name>`, but do not delete local feature branch.


------
### RELEASE

**:point_right: `gflow release start <release_name>`**

This will do follows: 
```
- git checkout develop
- git pull
- git checkout -B release/<release_name>
- git push
```

**:point_right: `gflow release finish <release_name>`**

This will do follows: 
```
- git checkout master
- git pull
- git merge release/<release_name>

- git tag <release_name> master -f

- git checkout develop
- git pull
- git merge release/<release_name>
```
- This will add a tag base master, named <release_name>, you can use `--no-tag` to avoid it.
- You can also using `-t <tag_name>` or `--tag <tag_name>` to replace <release_name>.

**:point_right: `gflow release publish <release_name>`**

This will do follows: 
```
- git checkout master
- git pull
- git merge release/<release_name>
- git push

- git tag <release_name> master -f
- git push --tags

- git checkout develop
- git pull
- git merge release/<release_name>
- git push
- git push origin :release/<release_name>
```

:warning: 
- This will delete the remote branch `release/<release_name>`, but do not delete local release branch.
- This will add a tag base master, named <release_name>, you can use `--no-tag` to avoid it.
- You can also using `-t <tag_name>` or `--tag <tag_name>` to replace <release_name>.

------
### HOTFIX


**:point_right: `gflow hotfix start <name>`**

This will do follows: 
```
- git checkout master
- git pull
- git checkout -B hotfix/<name>
- git push
```

**:point_right: `gflow hotfix finish <name>`**

This will do follows: 
```
- git checkout master
- git pull
- git merge hotfix/<name>

- git tag <name> master -f

- git checkout develop
- git pull
- git merge hotfix/<name>
```
- This will add a tag base master, named <hotfix_name>, you can use `--no-tag` to avoid it.
- You can also using `-t <tag_name>` or `--tag <tag_name>` to replace <hotfix_name>.

**:point_right: `gflow hotfix publish <name>`**

This will do follows: 
```
- git checkout master
- git pull
- git merge hotfix/<name>
- git push

- git tag <name> master -f
- git push --tags

- git checkout develop
- git pull
- git merge hotfix/<name>
- git push
- git push origin :release/<name>
```
:warning: 
- This will delete the remote branch `hotfix/<name>`, but do not delete local  branch.
- This will add a tag base master, named <hotfix_name>, you can use `--no-tag` to avoid it.
- You can also using `-t <tag_name>` or `--tag <tag_name>` to replace <hotfix_name>.
------
### BUGFIX

**:point_right: `gflow bugfix start <name>`**

This will do follows: 
```
- git checkout develop
- git pull
- git checkout -B bugfix/<name>
- git push
```

**:point_right: `gflow bugfix finish <name>`**

This will do follows: 
```
- git checkout develop
- git pull
- git merge bugfix/<name>
```


**:point_right: `gflow bugfix publish <name>`**

This will do follows: 
```
- git checkout develop
- git pull
- git merge bugfix/<name>
- git push
- git push origin :bugfix/<name>
```

:warning: This will delete the remote branch `bugfix/<name>`, but do not delete local branch.
