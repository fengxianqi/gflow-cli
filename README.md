# gitflow-cli


## Usage
**- feature start**
```
gitflow feature start <feature_name>
```
This will do follows: 
- git checkout develop
- git pull
- git checkout -B feature/<feature_name>
- git push

**- feature finish**
```
gitflow feature finish <feature_name>
```
This will do follows: 
- git checkout develop
- git pull
- git merge feature/<feature_name>
- git push
- git push origin :feature/<feature_name>
:warning: This will delete the remote branch `feature/<feature_name>`, but do not delete local feature branch.


- feature publish

- release start
- release finish
- release publish