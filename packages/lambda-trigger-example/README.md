# Lambda Triggers

아래 두 가지 이벤트를 활용한 Lambda 호출 예시

- Post-Confirmation Event: 회원가입 후 이메일 인증 후 발생
- S3 Upload Event: 파일 업로드 후 발생

## Add 'Admin' Group after email confirmation

```
$ amplify add auth
...
? Do you want to enable any of the following capabilities? Add User to Group
...
```

Using Post-Confirmation Lambda Trigger

## Resize Image after upload on s3 storage

<a href="https://asciinema.org/a/UkFYO79WlMUzEhpHLLBOFYaxq" target="_blank"><img src="https://asciinema.org/a/UkFYO79WlMUzEhpHLLBOFYaxq.svg" /></a>

```
$ amplify add storage
...
? Select from one of the below mentioned services: (Use arrow keys)
?
```
