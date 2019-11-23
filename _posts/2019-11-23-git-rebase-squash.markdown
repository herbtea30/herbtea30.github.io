---
layout: post
title:  "git rebase (squash) 사용하기"
description: git commit squash
date:   2019-11-23 13:06:00 00000
categories: git rebase squash 
---
![Git](https://git-scm.com/images/logo@2x.png)

# git rebase (squash) 사용하기
<br>
git을 사용하면서 하나의 작업에 많은 커밋이 포함되어 있을 경우가 있다.<br><br>
커밋 이후에 수정할 부분이 있어서 커밋을 다시하게 되거나<br>
본의 아니게 작업을 하다가 보니 커밋이 여러개로 쪼개지기도 한다.<br>
의미없는 커밋이 추가되게 되고, 커밋 히스토리를 정리하고 싶어진다. <br><br>
그럴때 이 명령어를 이용해서 커밋 히스토리를 정리할 수 있다.


> 예제로 파일을 수정하여 4개의 커밋 생성했다.
```shell
herbtea@herbtea-Laptop MINGW64 /c/study/clien/git-rebase (master)
$ git lg
* 9b805e1 - (HEAD -> master) task 4 (72 seconds ago) <herbtea>
* 9aaac2d - task 3 (15 minutes ago) <herbtea>
* a732f52 - task 2 (16 minutes ago) <herbtea>
* 33ea20e - task 1 (17 minutes ago) <herbtea>
```

> 그리고 다음 명령어를 실행했다.
```shell
git rebase -i HEAD~3
```
옵션에 대한 설명은 다음과 같다.
+ -i : interactive 명령어를 대화형으로 실행
+ HEAD~3 : 현재 커밋을 의미하는 HEAD에서 수정을 시작 할 이전 커밋의 범위를 나타낸다<br>
즉, HEAD~2, HEAD~1, HEAD 커밋이 출력된다.

```shell
pick a732f52 task 2
pick 9aaac2d task 3
pick 9b805e1 task 4

# Rebase 33ea20e..9b805e1 onto 33ea20e (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out

~
~
C:/study/clien/git-rebase/.git/rebase-merge/git-rebase-todo [unix] (13:55 23/11/2019)
```

에디터 창에 커밋리스트와 사용가능한 명령어들이 주석으로 표시된다.<br>

---
# squash
---
### **squash는 해당 커밋을 이전 커밋과 합치는 명령어**
```shell
pick a732f52 task 2
squash 9aaac2d task 3
pick 9b805e1 task 4
```
세번째 커밋을 squash하게 변경하고, 저장하면 커밋 메세지를 수정할 수있는 에디터가 뜬다.

```shell
# This is a combination of 2 commits.
# This is the 1st commit message:

task 2

# This is the commit message #2:

task 3

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Sat Nov 23 13:38:44 2019 +0900
#
# interactive rebase in progress; onto 33ea20e
# Last commands done (2 commands done):
#    pick a732f52 task 2
#    squash 9aaac2d task 3
# Next command to do (1 remaining command):
#    pick 9b805e1 task 4
# You are currently rebasing branch 'master' on '33ea20e'.
#
# Changes to be committed:
#       modified:   readme
#
~
~
C:/study/clien/git-rebase/.git/COMMIT_EDITMSG [unix] (14:01 23/11/2019)  
```
```shell
task 2 ~ task 3 squash


[detached HEAD fd84742] task 2 ~ task 3 squash
 Date: Sat Nov 23 13:38:44 2019 +0900
 1 file changed, 2 insertions(+)
Successfully rebased and updated refs/heads/master.

```
위와 같이 커밋 메세지를 변경하고 저장하면, **이전 커밋과 합쳐진 것**을 확인할 수 있다.
```bash
herbtea@herbtea-Laptop MINGW64 /c/study/clien/git-rebase (master)
$ git lg
* cc4c788 - (HEAD -> master) task 4 (56 seconds ago) <herbtea>
* fd84742 - task 2 ~ task 3 squash (4 minutes ago) <herbtea> 
* 33ea20e - task 1 (28 minutes ago) <herbtea>

```
---

## pick
pick은 해당 커밋을 사용하겠다는 의미. 순서변경 가능


## reword
reword는 커밋 메세지를 변경할 커밋앞에 사용하면, 해당 커밋의 메세지를 다시입력할 수 있다.<br>
이전 커밋의 메세지만 변경시에는 아래 명령어로도 가능하다.
```git
git commit -amend
```

## edit
edit은 커밋 메세지 뿐만아니라 커밋 작업내용도 변경 할수 있다.(파일추가/삭제, 내용변경 등)


## fixup
fixup은 squash와 동일하지만, 커밋메세지는 합치지 않는다.이전 커밋메세지만 남게 된다.


## exec
각 커밋이 적용된 후 실행할 shell 명령어를 지정하는 기능

## drop
drop은 커밋 히스토리에서 커밋을 삭제하는 기능
<br>

--- 
### git rebase는 이전 커밋 히스토리를 변경하기 때문에 원격저장소에 push한 뒤에는 가급적 사용하지 말고, 어쩔수 없이 하는 경우에는 force push를 사용해서 반영 할 수는 있다.<br>
### 협업 중일 경우에는 사용에 주의 해야한다.


