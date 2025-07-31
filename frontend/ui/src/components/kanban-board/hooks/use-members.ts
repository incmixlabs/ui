import { useState, useEffect } from 'react';
import { MOCK_MEMBERS, type MockMember } from '../constants/mock-members';

// Type definitions for member data (re-export for backward compatibility)
export interface Member extends MockMember {}

interface UseMembers {
  members: Member[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch and manage member data for a project
 * @param projectId - The ID of the project to get members for
 * @returns Object containing members array, loading state and error
 */
export function useMembers(projectId?: string): UseMembers {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // For now, just return the mock data
        // In a real implementation, this would fetch from an API endpoint based on projectId
        setMembers(MOCK_MEMBERS);
        setError(null);
      } catch (err) {
        setError('Failed to load members');
        console.error('Error loading members:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [projectId]);

  return { members, isLoading, error };
}
