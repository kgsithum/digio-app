import {LogLine, LogResult} from '../types/Log';

const getLogFileAnalyticData = (content: string | ArrayBuffer | null): LogResult | null => {
    // Unsupported file format
    if (typeof content !== "string") {
        return null;
    }

    const lines = content.split("\n");
    const logData: Array<LogLine> = [];

    lines.forEach((line) => {
        const extractedLogLine = extractLogLineData(line);
        if (extractedLogLine === null) {
            return;
        }

        logData.push(extractedLogLine);
    });

    return {
        uniqueIpCount: getUniqueIpCount(logData),
        mostVisitedUrls: getMostVisitedUrls(logData),
        mostActiveIps: getMostActiveIpAddresses(logData)
    };
}

const extractLogLineData = (logLine: string): LogLine | null => {
    const regexMatch = /^([^ ]+) ([^ ]+) ([^ ]+) \[([^\[\]]+)] "([^ ]+) (.*) (HTTP\/.*)" ([^ ]+) ([^ ]+) "(.+)" "(.+)"/
    const logLineArray = logLine.split(regexMatch);

    // Unsupported log line format or not a successful response
    if (logLineArray.length !== 13) {
        return null;
    }

    const ipAddress = logLineArray[1];
    const url = logLineArray[6];

    return {ipAddress: ipAddress, url: url, statusCode: parseInt(logLineArray[8])};
};

const getUniqueIpCount = (logData: Array<LogLine>): number => {
    const ipAddresses: Array<string> = [];

    logData.forEach((logLine) => {
        ipAddresses.push(logLine.ipAddress);
    });

    return Array.from(new Set(ipAddresses)).length;
}

const getMostActiveIpAddresses = (logData: Array<LogLine>, count: number = 3): Array<string> => {
    const ipAddressesCount = logData.reduce(function (ipAddressCount, {ipAddress}) {
        // @ts-ignore
        ipAddressCount[ipAddress] = ipAddressCount[ipAddress] ? (ipAddressCount[ipAddress] + 1) : 1;

        return ipAddressCount;
    }, {});

    // @ts-ignore
    const sorted = Object.keys(ipAddressesCount).sort((a, b) => ipAddressesCount[b] - ipAddressesCount[a]);

    // Top most active IP addresses based on the count
    return sorted.slice(0, count);
}

const getMostVisitedUrls = (logData: Array<LogLine>, count: number = 3): Array<string> => {
    const urlsCount = logData.reduce(function (urlCount, {url, statusCode}) {
        // We consider only the successful responses
        if (statusCode !== 200) {
            return urlCount;
        }

        // @ts-ignore
        urlCount[url] = urlCount[url] ? (urlCount[url] + 1) : 1;

        return urlCount;
    }, {});

    // @ts-ignore
    const sorted = Object.keys(urlsCount).sort((a, b) => urlsCount[b] - urlsCount[a]);

    // Top most visited URLs based on the count
    return sorted.slice(0, count);
}

export {
    getLogFileAnalyticData,
    extractLogLineData,
    getUniqueIpCount,
    getMostActiveIpAddresses,
    getMostVisitedUrls
};

