# gflow-cli


## Usage
**:point_right: `gflow feature start <feature_name>`**

This will do follows: 
- git checkout develop
- git pull
- git checkout -B feature/<feature_name>
- git push


**:point_right: `gflow feature finish <feature_name>`**

This will do follows: 
- git checkout develop
- git pull
- git merge feature/<feature_name>



**:point_right: `gflow feature publish <feature_name>`**

This will do follows: 
- git checkout develop
- git pull
- git merge feature/<feature_name>
- git push
- git push origin :feature/<feature_name>

:warning: This will delete the remote branch `feature/<feature_name>`, but do not delete local feature branch.


**:point_right: `gflow release start <release_name>`**

This will do follows: 
- git checkout develop
- git pull
- git checkout -B release/<release_name>
- git push

**:point_right: `gflow release finish <release_name>`**

This will do follows: 
- git checkout master
- git pull
- git merge release/<release_name>

- git checkout develop
- git pull
- git merge master


**:point_right: `gflow release publish <release_name>`**

This will do follows: 
- git checkout master
- git pull
- git merge release/<release_name>
- git push
- git tag <release_name>
- git push --tags
- git checkout develop
- git pull
- git merge master
- git push
- git push origin :release/<release_name>

:warning: This will delete the remote branch `release/<release_name>`, but do not delete local release branch.

This will add a tag base master, named <release_name>, you can use `--no-tag` to avoid it.

You can also using `-t <tag_name>` or `--tag <tag_name>` to replace <release_name>.



**:point_right: `gflow hotfix start <name>`**

This will do follows: 
- git checkout master
- git pull
- git checkout -B hotfix/<name>
- git push

**:point_right: `gflow hotfix finish <name>`**

This will do follows: 
- git checkout master
- git pull
- git merge hotfix/<name>

- git checkout develop
- git pull
- git merge master


**:point_right: `gflow hotfix publish <name>`**

This will do follows: 
- git checkout master
- git pull
- git merge hotfix/<name>
- git push

- git checkout develop
- git pull
- git merge master
- git push
- git push origin :release/<name>

:warning: This will delete the remote branch `hotfix/<name>`, but do not delete local  branch.




**:point_right: `gflow bugfix start <name>`**

This will do follows: 
- git checkout develop
- git pull
- git checkout -B bugfix/<name>
- git push


**:point_right: `gflow bugfix finish <name>`**

This will do follows: 
- git checkout develop
- git pull
- git merge bugfix/<name>



**:point_right: `gflow bugfix publish <name>`**

This will do follows: 
- git checkout develop
- git pull
- git merge bugfix/<name>
- git push
- git push origin :bugfix/<name>

:warning: This will delete the remote branch `bugfix/<name>`, but do not delete local branch.