import { useState, useEffect } from 'react';

// Type definitions for member data
export interface Member {
  id: string;
  value: string;
  name: string;
  label: string;
  avatar: string;
  position: string;
  color: string;
}

// Mock data - in a real app, this would be fetched from an API
const mockMembers: Member[] = [
  {
    id: "1",
    value: "shane-black",
    name: "Shane Black",
    label: "Shane Black",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    position: "UI/UX Designer",
    color: "blue",
  },
  {
    id: "2",
    value: "john-doe",
    name: "John Doe", 
    label: "John Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    position: "Project Manager",
    color: "amber",
  },
  {
    id: "3",
    value: "jane-smith",
    name: "Jane Smith",
    label: "Jane Smith", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b589?w=32&h=32&fit=crop&crop=face",
    position: "Business Analyst",
    color: "indigo",
  },
  {
    id: "4",
    value: "emily-johnson",
    name: "Emily Johnson",
    label: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    color: "cyan",
    position: "Web Developer",
  },
  {
    id: "5",
    value: "micheal-brown",
    label: "Michael Brown",
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    position: "Product Designer", 
    color: "orange",
  },
];

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
        setMembers(mockMembers);
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
