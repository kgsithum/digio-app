# Log analyser - Programming Task - DigIO

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

There are some high severity vulnerabilities in create-react-app. Here is an excellent article about the issues with npm audit in create-react-app.
[Vulnerabilities](https://overreacted.io/npm-audit-broken-by-design/)

`npm audit --production` should be working fine.

## The task

The task is to parse a log file containing HTTP requests and to report on its contents.

## Tech

- ReactJS
- TypeScript
- Jest
- ES6
- React Bootstrap

## Installation

Developed environment:  `Node >= 18.10.0` and `npm >= 8.19.2`. 

To install the project, run:

```sh
cd digio-app
npm install
```

Run
```sh
npm start
```

Test
```sh
npm test
```

## Instructions

- Upload a log file using the file uploader.
- A sample log file (`programming-task-example-data.log`) can be found in the directory `/logs`.
- The log file content should be in the following format to get the accurate results.
```sh
177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"
168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
168.41.191.41 - - [11/Jul/2018:17:41:30 +0200] "GET /this/page/does/not/exist/ HTTP/1.1" 404 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
168.41.191.40 - - [09/Jul/2018:10:10:38 +0200] "GET http://example.net/blog/category/meta/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) RockMelt/0.9.58.494 Chrome/11.0.696.71 Safari/534.24"
```
- The analytic results will be displayed in the `Results` section below.
- There are two demo files (`run-app.gif`, `run-app-test.gif`) available in the `/demo` directory.

## Assumptions

- There is no backend service to retrieve analytic data. The best practice  is to parse the logfile read content to the backend and handle all the logic in the backend. The frontend should be responsible for the upload the file and display the results.
- The log file content is with the format mentioned in the `Instructions` section.
- URL `http://example.net/faq/` and URL `/faq/` are two different URLs.
- Any unsuccessful responses will not be considered to analyse most visited URLs.

## Reference

[Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

[Log parse RegEx](https://catalog.us-east-1.prod.workshops.aws/workshops/60a6ee4e-e32d-42f5-bd9b-4a2f7c135a72/en-US/05-ingest-and-process-application-logs/05-5-parse-logs-regex)

[RegEx101](https://regex101.com/)
