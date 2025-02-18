// fileUtils.ts
import { promises as fs } from 'fs';

// Function to write a list (array) to a JSON file
export async function writeListToJsonFile<T>(filePath: string, list: T[]): Promise<void> {
    try {
      const jsonData = JSON.stringify(list, null, 2);
      await fs.writeFile(filePath, jsonData, 'utf-8');
      console.log(`List successfully written to ${filePath}`);
    } catch (error) {
      console.error(`Error writing to file: ${error}`);
    }
  }
  
  // Function to read a list (array) from a JSON file
  export async function readListFromJsonFile<T>(filePath: string): Promise<T[]> {
    try {
      const data = await fs.readFile(filePath, 'utf-8'); 
      return JSON.parse(data) as T[]; 
    } catch (error) {
      console.error(`Error reading from file: ${error}`);
      return []; 
    }
  }
