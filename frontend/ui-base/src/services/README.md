https://medium.com/@gvfullstack/handling-a-continuous-stream-of-data-in-react-multi-field-population-from-openai-api-112b4a7c93a6

https://tanstack.com/query/latest/docs/reference/streamedQuery


// App.jsx
    import React, { useState, useEffect } from 'react';

    function App() {
      const [streamedData, setStreamedData] = useState('');

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/stream-data'); // Replace with your Hono endpoint
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let result;

            while (!(result = await reader.read()).done) {
              const chunk = decoder.decode(result.value, { stream: true });
              setStreamedData(prevData => prevData + chunk);
            }
          } catch (error) {
            console.error('Error fetching stream:', error);
          }
        };

        fetchData();
      }, []);

      return (
        <div>
          <h1>Streaming Data:</h1>
          <p>{streamedData}</p>
        </div>
      );
    }

    export default App;


https://www.google.com/search?q=get+streaming+data+hono+bun+react&oq=get+streaming+data+hono+bun+react&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigATIHCAQQIRigATIHCAUQIRiPAjIHCAYQIRiPAtIBCTExNzUzajBqMagCALACAA&sourceid=chrome&ie=UTF-8

x
