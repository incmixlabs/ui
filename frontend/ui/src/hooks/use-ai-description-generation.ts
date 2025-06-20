import { useEffect } from 'react';
import { useDebounce } from './use-debounce';

/**
 * Custom hook to handle AI description generation with debouncing
 * 
 * @param title The task title to generate a description for
 * @param useAI Whether AI features are enabled
 * @param hasDescription Whether the task already has a description
 * @param hadGenerationError Whether there was a previous generation error
 * @param lastProcessedTitle The last title that was processed
 * @param onGenerate Function to call to generate the description
 * @param onResetError Function to reset error state when title changes
 */
export function useAIDescriptionGeneration(
  title: string | undefined, 
  useAI: boolean,
  hasDescription: boolean,
  hadGenerationError: boolean,
  lastProcessedTitle: string,
  onGenerate: (title: string) => Promise<void>,
  onResetError: () => void
): void {
  // Debounce the title input to avoid unnecessary API calls
  const debouncedTitle = useDebounce(title, 1000);
  
  // Reset error state when title changes
  useEffect(() => {
    if (title && title !== lastProcessedTitle) {
      onResetError();
    }
  }, [title, lastProcessedTitle, onResetError]);
  
  // Generate description when debounced title changes
  useEffect(() => {
    if (
      useAI &&
      !hadGenerationError &&
      debouncedTitle &&
      debouncedTitle.trim() &&
      debouncedTitle.trim() !== lastProcessedTitle &&
      debouncedTitle.length > 3 &&
      !hasDescription
    ) {
      onGenerate(debouncedTitle);
    }
  }, [debouncedTitle, useAI, hasDescription, hadGenerationError, lastProcessedTitle, onGenerate]);
}
