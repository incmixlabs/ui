// This is a utility file to reset the RxDB database when schema changes cause critical failures
// Import it and call resetDatabase() in your main.ts before creating the database

export async function resetDatabase(databaseName = 'incmix-db'): Promise<boolean> {
  try {
    // Request to delete the entire database
    const deleteRequest = indexedDB.deleteDatabase(databaseName);
    
    return new Promise((resolve, reject) => {
      deleteRequest.onsuccess = () => {
        console.log(`Database ${databaseName} successfully deleted`);
        resolve(true);
      };
      
      deleteRequest.onerror = () => {
        console.error(`Error deleting database ${databaseName}`);
        reject(new Error('Failed to delete database'));
      };
      
      // Handle edge case where db is being blocked
      deleteRequest.onblocked = () => {
        console.warn(`Database ${databaseName} deletion was blocked`);
        // We still resolve with false to indicate it wasn't fully successful
        resolve(false);
      };
    });
  } catch (error) {
    console.error('Error in resetDatabase:', error);
    return false;
  }
}

// This adds a function to the window object that can be called from the console
// to reset the database when the app is crashing
if (typeof window !== 'undefined') {
  (window as any).resetIncmixDatabase = async () => {
    try {
      const result = await resetDatabase();
      alert(`Database reset ${result ? 'successful' : 'failed'}. Please refresh the page.`);
    } catch (error) {
      console.error('Error resetting database:', error);
      alert('Error resetting database. See console for details.');
    }
  };
}
