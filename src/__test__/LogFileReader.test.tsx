import React from 'react';
import {
  getLogFileAnalyticData,
  getUniqueIpCount,
  extractLogLineData,
  getMostActiveIpAddresses,
  getMostVisitedUrls
} from '../service/LogFileReader';
import { LogLine } from "../types/Log";

const mockDataLogLines: Array<LogLine> = [
  { ipAddress: '168.41.191.40', url: 'http://example.net/faq1/', statusCode: 200 },
  { ipAddress: '168.41.191.40', url: 'http://example.net/faq2/', statusCode: 200 },
  { ipAddress: '168.41.191.40', url: 'http://example.net/faq3/', statusCode: 200 },
  { ipAddress: '168.41.191.42', url: 'http://example.net/faq2/', statusCode: 200 },
  { ipAddress: '168.41.191.42', url: 'http://example.net/faq3/', statusCode: 200 },
  { ipAddress: '168.41.191.43', url: 'http://example.net/faq2/', statusCode: 200 },
  { ipAddress: '168.41.191.44', url: 'http://example.net/faq2/', statusCode: 200 },
  { ipAddress: '168.41.191.45', url: 'http://example.net/faq4/', statusCode: 200 }
];

test('it return unique IP address count', () => {
  const uniqueIpCount = getUniqueIpCount(mockDataLogLines);
  expect(uniqueIpCount).toEqual(5);
});

test('it returns most active IP addresses', () => {
  const mostActiveIps = getMostActiveIpAddresses(mockDataLogLines);
  expect(mostActiveIps).toEqual(expect.arrayContaining(['168.41.191.40', '168.41.191.42', '168.41.191.43']));
});

test('it returns most visited URLs', () => {
  const mostVisitedUrls = getMostVisitedUrls(mockDataLogLines);
  expect(mostVisitedUrls).toEqual(expect.arrayContaining(['http://example.net/faq2/', 'http://example.net/faq3/', 'http://example.net/faq1/']));
});

test('it excludes unsuccessful responses', () => {
  const mockDataLogLinesUnsuccessful: Array<LogLine> = [
    { ipAddress: '168.41.191.40', url: 'http://example.net/faq1/', statusCode: 400 }
  ];
  const mostVisitedSuccessfulUrls = getMostVisitedUrls(mockDataLogLinesUnsuccessful);
  expect(mostVisitedSuccessfulUrls.length).toEqual(0);
});

test('it extract log file data and return LogLine object', () => {
  const mockDataLogFileString: string = '168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"';
  const extractedLogLine = extractLogLineData(mockDataLogFileString);

  expect(extractedLogLine).toEqual(expect.objectContaining(
      {
        ipAddress: '168.41.191.40',
        url: 'http://example.net/faq/',
        statusCode: 200
      }
  ));
});

test('it analyse log file content', () => {
  const logFileContent: string = '168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"\n' +
      '168.41.191.41 - - [11/Jul/2018:17:41:30 +0200] "GET /this/page/does/not/exist/ HTTP/1.1" 404 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"\n' +
      '177.71.128.21 - - [10/Jul/2018:22:21:03 +0200] "GET /docs/manage-websites/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"';
  const logData = getLogFileAnalyticData(logFileContent);

  expect(logData).toEqual(expect.objectContaining(
      {
        uniqueIpCount: 3,
        mostVisitedUrls: ['http://example.net/faq/', '/docs/manage-websites/'],
        mostActiveIps: ['168.41.191.40', '168.41.191.41', '177.71.128.21']
      }
  ));
});
