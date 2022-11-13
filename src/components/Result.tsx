import React from 'react';
import Card from 'react-bootstrap/Card';
import {LogResult} from '../types/Log';

type ResultProps = {
    result: LogResult | null
}
const Result = (props: ResultProps) => {
    const {result} = props;
    return (
        <Card data-testid="resultContainer" style={{width: '40rem'}}>
            <Card.Header>Results</Card.Header>
            <Card.Body>
                {result &&
                <>
                    <Card.Title>Unique IP addresses count</Card.Title>
                    <Card.Text>
                        {result.uniqueIpCount}
                    </Card.Text>

                    {/* Set the title number/count dynamically since we may have logfiles less than 3 records  */}
                    <Card.Title>Top {result.mostActiveIps.length} IP addresses</Card.Title>
                    <Card.Body>
                        {result.mostActiveIps.map((ipAddress, key) =>
                            <div key={key}>{ipAddress}</div>
                        )}
                    </Card.Body>

                    <Card.Title>Top {result.mostVisitedUrls.length} visited URLs</Card.Title>
                    <Card.Body>
                        {result.mostVisitedUrls.map((url, key) =>
                            <div key={key}>{url}</div>
                        )}
                    </Card.Body>
                </>
                }
            </Card.Body>
        </Card>
    );
}

export default Result;
