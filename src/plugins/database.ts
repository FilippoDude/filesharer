import mysql from 'mysql2/promise';

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function generateReferCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let referCode = '';
  
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referCode += characters[randomIndex];
  }
  
  return referCode;
}

// Function to add a new user with default money 0 and empty found_pieces
export async function addUser(userId: number): Promise<void> {
  console.log("I HAVE BEEN CALLED")
  await pool.query('INSERT INTO users (userid, money, found_pieces, refer_code, people_that_referred) VALUES (?, 0, ?, ?, ?)', [userId, JSON.stringify([]), generateReferCode(), JSON.stringify([])]);
}

// Function to get the money value of a specific user
export async function getMoney(userId: number): Promise<number | false> {
  const [rows] = await pool.query('SELECT money FROM users WHERE userid = ?', [userId]);
  if ((rows as any[]).length === 0) {
    return false; // No user found
  }
  return parseInt((rows as any[])[0].money);
}

// Function to set the money value of a specific user
export async function setMoney(userId: number, amount: number): Promise<void> {
  await pool.query('UPDATE users SET money = ? WHERE userid = ?', [amount, userId]);
}


// Function to clear the found_pieces column for all users (set it to NULL)
export async function clearFoundPiecesForAllUsers(): Promise<void> {
  await pool.query('UPDATE users SET found_pieces = ?', [JSON.stringify([])]);
  console.log('Cleared found_pieces for all users.');
}

// Function to update the found_pieces column for a specific user with a JSON list
export async function setFoundPieces(userid: number, piecesList: any[]): Promise<void> {
  const piecesJson = JSON.stringify(piecesList);
  await pool.query('UPDATE users SET found_pieces = ? WHERE userid = ?', [piecesJson, userid]);
  console.log(`Updated found_pieces for user ${userid}.`);
}

// Function to get found_pieces for a specific user
export async function getFoundPieces(userid: number): Promise<any[] | null> {

  const [rows] = await pool.query('SELECT found_pieces FROM users WHERE userid = ?', [userid]);
  const result = rows as any[];
  if (result.length > 0) {
      return JSON.parse(result[0].found_pieces);
  }
  return null

}

// REFER
export async function getReferCode(userid: number): Promise<string | false> {
  const [rows] = await pool.query('SELECT refer_code FROM users WHERE userid = ?', [userid]);
  if ((rows as any[]).length === 0) {
    return false; // No user found
  }
  return (rows as any[])[0].refer_code;  
}

export async function getUserIdByReferCode(referCode: string): Promise<number | false> {
  const [rows] = await pool.query('SELECT userid FROM users WHERE refer_code = ?', [referCode]);
  if ((rows as any[]).length === 0) {
    return false; // No user found
  }
  return parseInt((rows as any[])[0].userid);  
}

export async function getRefer(userid: number): Promise<string | null | false> {
  const [rows] = await pool.query('SELECT referred_person FROM users WHERE userid = ?', [userid]);
  if ((rows as any[]).length === 0) {
    return false; // No user found
  }

  const referredPerson = (rows as any[])[0].referred_person;
  return referredPerson === null ? null : referredPerson;  // Return null if no referral, else return the string
}


export async function setRefer(userId: number, referredUserId: number): Promise<void> {
  await pool.query('UPDATE users SET referred_person = ? WHERE userid = ?', [referredUserId, userId]);
}


export async function setPeopleThatReferred(userid: number, peopleThatReferredList: any[]): Promise<void> {
  const piecesJson = JSON.stringify(peopleThatReferredList);
  await pool.query('UPDATE users SET people_that_referred = ? WHERE userid = ?', [piecesJson, userid]);
  console.log(`Updated found_pieces for user ${userid}.`);
}

// Function to get found_pieces for a specific user
export async function getPeopleThatReferred(userid: number): Promise<any[] | null> {

  const [rows] = await pool.query('SELECT people_that_referred FROM users WHERE userid = ?', [userid]);
  const result = rows as any[];
  if (result.length > 0) {
      return JSON.parse(result[0].people_that_referred);
  }
  return null

}

// TASKS
export async function getTaskYoutube(userId: number): Promise<boolean> {
  const [rows] = await pool.query('SELECT youtube FROM users WHERE userid = ?', [userId]);
  if ((rows as any[]).length === 0) {
    return false; // No user found
  }
  return Boolean((rows as any[])[0].youtube);
}
export async function completeTaskYoutube(userId: number): Promise<void> {
  await pool.query('UPDATE users SET youtube = ? WHERE userid = ?', [1, userId]);
}


export async function getTaskTwitter(userId: number): Promise<boolean> {
  const [rows] = await pool.query('SELECT twitter FROM users WHERE userid = ?', [userId]);
  if ((rows as any[]).length === 0) {
    return false; // No user found
  }
  return Boolean((rows as any[])[0].twitter);
}
export async function completeTaskTwitter(userId: number): Promise<void> {
  await pool.query('UPDATE users SET twitter = ? WHERE userid = ?', [1, userId]);
}


export async function getTaskTiktok(userId: number): Promise<boolean> {
  const [rows] = await pool.query('SELECT tiktok FROM users WHERE userid = ?', [userId]);
  if ((rows as any[]).length === 0) {
    return false; // No user found
  }
  return Boolean((rows as any[])[0].tiktok);
}
export async function completeTaskTiktok(userId: number): Promise<void> {
  await pool.query('UPDATE users SET tiktok = ? WHERE userid = ?', [1, userId]);
}

export async function getTaskGroup(userId: number): Promise<boolean> {
  const [rows] = await pool.query('SELECT joinedgroup FROM users WHERE userid = ?', [userId]);
  if ((rows as any[]).length === 0) {
    return false; // No user found
  }
  return Boolean((rows as any[])[0].joinedgroup);
}
export async function completeTaskGroup(userId: number): Promise<void> {
  await pool.query('UPDATE users SET joinedgroup = ? WHERE userid = ?', [1, userId]);
}