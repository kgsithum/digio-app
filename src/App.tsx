import React, { ChangeEvent, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getLogFileAnalyticData } from './service/LogFileReader';
import { LogResult } from './types/Log';
import Result from './components/Result'

const App = () => {
    const [file, setFile] = useState<File>();
    const [logResult, setLogResult] = useState<LogResult | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (file) {
            readLogFile(file);
        }
    }, [file]);

    const readLogFile = (file: File): void => {
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
            const logData: LogResult | null = getLogFileAnalyticData(reader.result);

            if (logData === null) {
                setError("Unsupported file format!");
                return;
            }
            setLogResult(logData);
        }

        reader.onerror = () => {
            setError("Error on reading the file!");
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setLogResult(null);
        if (!event.target.files) {
            setError('File not found!');
            return;
        }

        const file = event.target.files[0];
        if (!validateFile(file.name)) {
            setError('Unsupported file type!');
            return;
        }

        setFile(file);
    }

    const validateFile = (fileName: string): boolean => {
        const extension = fileName.split('.').pop();

        if (extension && extension.toLowerCase() === 'log') {
            return true;
        }

        return false;
    };

    return (
        <Container>
            <Card style={{width: '40rem'}}>
                <Card.Header>Log file analyser</Card.Header>
                <Card.Body>
                    <Card.Title>Upload log file</Card.Title>
                    <Card.Text>
                        Upload a log file to analyse the content. Supported file types - [text/x-log]
                    </Card.Text>
                    <Form.Group controlId="formFile" className="mb-3 file-uploader">
                        <Form.Control data-testid="fileInput" type="file" onChange={handleFileChange}/>
                    </Form.Group>
                    {error &&
                    <Alert variant={'danger'}>{error}</Alert>
                    }
                </Card.Body>
                <Card.Footer className="text-muted">DigIO - assignment</Card.Footer>
            </Card>
            <Result result={logResult} />
        </Container>
    );
}

export default App;
