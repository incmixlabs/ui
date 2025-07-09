import React from "react";
import { Flex, Avatar } from "@incmix/ui";

export interface AssignedUser {
  id: string;
  name: string;
  image?: string;
}

interface OverlappingAvatarGroupProps {
  users: AssignedUser[];
  maxDisplayed?: number;
  size?: "sm" | "md" | "lg"; // Support different sizes
  className?: string;
}

export const OverlappingAvatarGroup: React.FC<OverlappingAvatarGroupProps> = ({
  users,
  maxDisplayed = 3,
  size = "md",
  className = "",
}) => {
  // No users case
  if (!users || users.length === 0) {
    return null;
  }

  // Determine size dimensions
  const sizeMap = {
    sm: {
      width: "w-5",
      height: "h-5",
      borderWidth: "border-1",
      spacing: "-space-x-1",
      fontSize: "text-[8px]",
      zIndexBase: 30,
    },
    md: {
      width: "w-7",
      height: "h-7",
      borderWidth: "border-2",
      spacing: "-space-x-2",
      fontSize: "text-[10px]",
      zIndexBase: 30,
    },
    lg: {
      width: "w-8",
      height: "h-8",
      borderWidth: "border-2",
      spacing: "-space-x-3",
      fontSize: "text-[12px]",
      zIndexBase: 30,
    },
  };

  const { width, height, borderWidth, spacing, fontSize, zIndexBase } = sizeMap[size];
  
  // Users to display - limit to maxDisplayed
  const displayUsers = users.slice(0, maxDisplayed);
  // Count of additional users not shown
  const remainingCount = Math.max(0, users.length - maxDisplayed);

  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate consistent color based on user ID
  const getColorForUser = (userId: string) => {
    const colors = [
      "bg-blue-9", "bg-amber-9", "bg-green-9", 
      "bg-purple-9", "bg-pink-9", "bg-orange-9"
    ];
    
    // Simple hash function to get consistent color for same user ID
    const hash = userId.split("").reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <Flex className={`${spacing} flex-shrink-0 ${className}`}>
      {displayUsers.map((user, index) => (
        <div 
          key={user.id} 
          className={`${width} ${height} rounded-full ${borderWidth} border-background overflow-hidden`} 
          style={{ zIndex: zIndexBase - index }}
        >
          {user.image && user.image !== "/placeholder-avatar.png" && user.image !== "/placeholder.svg" ? (
            // Real image
            <Avatar
              src={user.image}
              className="w-full h-full"
            />
          ) : (
            // Placeholder with initials
            <div className={`w-full h-full rounded-full ${getColorForUser(user.id)} flex items-center justify-center`}>
              <span className={`${fontSize} font-medium text-white`}>
                {getInitials(user.name)}
              </span>
            </div>
          )}
        </div>
      ))}
      
      {/* Show additional count if there are more users than maxDisplayed */}
      {remainingCount > 0 && (
        <div 
          className={`${width} ${height} rounded-full ${borderWidth} border-background overflow-hidden bg-gray-9 flex items-center justify-center`} 
          style={{ zIndex: zIndexBase - maxDisplayed }}
        >
          <span className={`${fontSize} font-medium text-white`}>+{remainingCount}</span>
        </div>
      )}
    </Flex>
  );
};
