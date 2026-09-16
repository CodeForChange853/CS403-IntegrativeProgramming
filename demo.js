const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function runDemo() {
    console.log("==================================================");
    console.log("          JWT AUTHENTICATION LIVE DEMO");
    console.log("==================================================\n");

    const username = "classmate_demo";
    const password = "mysecretpassword";

    try {
        // Registration (it ignore if already exists) 
        console.log(`[STEP 1] Creating a new user: '${username}'`);
        let response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        let data = await response.json();
        if (response.status === 201) {
            console.log(`✅ Success (201): User created!\n`);
        } else if (response.status === 400 && data.error === 'Username already exists') {
            console.log(`ℹ️ Info (400): User '${username}' already exists. We can proceed to login.\n`);
        } else {
            console.log(`❌ Error (${response.status}):`, data);
        }

        // Successful Login 
        console.log(`[STEP 2] Attempting to login with CORRECT credentials...`);
        console.log(`         Username: ${username} | Password: ${password}`);
        response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        data = await response.json();

        if (response.status === 200) {
            console.log(`✅ Success (200): Logged in!`);
            console.log(`🔑 Access Token Received:  ${data.accessToken.substring(0, 30)}...`);
            console.log(`🔄 Refresh Token Received: ${data.refreshToken.substring(0, 30)}...\n`);
        } else {
            console.log(`❌ Failed to login:`, data);
        }

        // Failed Login (Wrong Password)
        console.log(`[STEP 3] Attempting to login with WRONG password...`);
        console.log(`         Username: ${username} | Password: wrongpassword123`);
        response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: "wrongpassword123" })
        });
        data = await response.json();

        if (response.status === 401) {
            console.log(`🚫 Blocked (401 Unauthorized): ${data.error}\n`);
        } else {
            console.log(`Unexpected status ${response.status}:`, data);
        }

        // Failed Login (Wrong Username)
        console.log(`[STEP 4] Attempting to login with UNKNOWN username...`);
        console.log(`         Username: nobody_here | Password: ${password}`);
        response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: "nobody_here", password })
        });
        data = await response.json();

        if (response.status === 401) {
            console.log(`🚫 Blocked (401 Unauthorized): ${data.error}\n`);
        } else {
            console.log(`Unexpected status ${response.status}:`, data);
        }

        console.log("==================================================");
        console.log("                DEMO CONCLUDED");
        console.log("==================================================");

    } catch (error) {
        console.error(`\n❌ DEMO SCRIPT ERROR: ${error.message}`);
        console.log("Make sure you are running 'node server.js' in another terminal first!");
    }
}

runDemo();
