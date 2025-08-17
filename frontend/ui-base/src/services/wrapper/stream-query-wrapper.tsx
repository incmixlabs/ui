import { experimental_streamedQuery as streamedQuery, useQuery, useQueryClient } from '@tanstack/react-query';


// Assume you have a function that returns an AsyncIterable of data
async function* fetchDataStream() {
  yield 'chunk 1';
  await new Promise(resolve => setTimeout(resolve, 1000));
  yield 'chunk 2';
  await new Promise(resolve => setTimeout(resolve, 1000));
  yield 'chunk 3';
}


export function MyStreamingComponent() {
  const queryClient = useQueryClient();

  // Use streamedQuery to create a query function for your stream
  const { data, status, fetchStatus } = useQuery({
    queryKey: ['myStream'],
    queryFn: streamedQuery({
      queryFn: async (_context) => fetchDataStream(),
    }),
  });

  if (status === 'pending') {
    return <div>Loading stream...</div>;
  }

  if (status === 'error') {
    return <div>Error loading stream.</div>;
  }

  return (
    <div>
      <h1>Streamed Data:</h1>
      <ul>
        {data?.map((chunk, index) => (
          <li key={index}>{chunk}</li>
        ))}
      </ul>
      <p>Fetch Status: {fetchStatus}</p>
    </div>
  );
}
