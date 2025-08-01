import { AlertCircle, Clock, Flag } from 'lucide-react';
import type { LabelOption } from './label-dropdown-selector';
import type { LucideIcon } from 'lucide-react';

export interface LabelConfig {
  label: string;
  icon: LucideIcon;
  color?: string;
}

// Utility function to get priority configuration
export function getPriorityConfig(priorityId: string | undefined, priorityLabels: LabelOption[] = []): LabelConfig {
  // First try to find the priority in the provided labels
  const priorityLabel = priorityLabels.find(label => label.id === priorityId);
  
  if (priorityLabel) {
    // If found in labels, return with default icon mapping
    let icon: LucideIcon = Clock; // Default icon
    
    // Map icons based on priority name patterns
    const lowerName = priorityLabel.name.toLowerCase();
    if (lowerName.includes('urgent')) {
      icon = AlertCircle;
    } else if (lowerName.includes('high')) {
      icon = Flag;
    } else if (lowerName.includes('medium') || lowerName.includes('normal')) {
      icon = Clock;
    } else {
      icon = Clock;
    }
    
    return {
      label: priorityLabel.name,
      icon,
      color: priorityLabel.color,
    };
  }
  
  // If we get here, the priority ID wasn't found in the labels array
  // Look for a default/medium priority in the labels
  const defaultPriority = priorityLabels.find(label => {
    const lowerName = label.name.toLowerCase();
    return lowerName.includes('medium') || lowerName.includes('normal');
  });
  
  if (defaultPriority) {
    return {
      label: defaultPriority.name,
      icon: Clock,
      color: defaultPriority.color,
    };
  }
  
  // If there are any priority labels, use the first one as fallback
  if (priorityLabels.length > 0) {
    return {
      label: priorityLabels[0].name,
      icon: Clock,
      color: priorityLabels[0].color,
    };
  }
  
  // Absolute last resort - return a minimal default
  return { 
    label: 'Priority', 
    icon: Clock, 
    color: '#3b82f6' 
  };
}

// Utility function to filter status labels from all labels
export function getStatusLabels(labels: LabelOption[]): LabelOption[] {
  return labels.filter(label => {
    // Check if label has a type property (coming from database) 
    if ('type' in label && typeof label.type === 'string') {
      return label.type === 'status';
    }
    return false;
  }).sort((a, b) => (a.order || 0) - (b.order || 0));
}

// Utility function to filter priority labels from all labels
export function getPriorityLabels(labels: LabelOption[]): LabelOption[] {
  return labels.filter(label => {
    // Check if label has a type property (coming from database)
    if ('type' in label && typeof label.type === 'string') {
      return label.type === 'priority';
    }
    return false;
  }).sort((a, b) => (a.order || 0) - (b.order || 0));
}

// Utility to find a label by its ID
export function findLabelById(labels: LabelOption[], id: string): LabelOption | undefined {
  return labels.find(label => label.id === id);
}
