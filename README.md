# gitflow-cli


## Usage
**:point_right: `gitflow feature start <feature_name>`**

This will do follows: 
- git checkout develop
- git pull
- git checkout -B feature/<feature_name>
- git push


**:point_right: `gitflow feature finish <feature_name>`**

This will do follows: 
- git checkout develop
- git pull
- git merge feature/<feature_name>



**:point_right: `gitflow feature publish <feature_name>`**

This will do follows: 
- git checkout develop
- git pull
- git merge feature/<feature_name>
- git push
- git push origin :feature/<feature_name>

:warning: This will delete the remote branch `feature/<feature_name>`, but do not delete local feature branch.


**:point_right: `gitflow release start <release_name>`**

This will do follows: 
- git checkout develop
- git pull
- git checkout -B release/<feature_name>
- git push

**:point_right: `gitflow release finish <release_name>`**

This will do follows: 
- git checkout master
- git pull
- git merge release/<release_name>

- git checkout develop
- git pull
- git merge master


**:point_right: `gitflow release publish <release_name>`**

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



`hotfix`, `bugfix`