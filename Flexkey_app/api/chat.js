export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // The Vercel backend securely makes the request on behalf of your frontend
        const response = await fetch('https://ai.hackclub.com/proxy/v1/chat/completions', {
            method: 'POST',
            headers: {
                // This pulls the secret key directly from Vercel's servers, hiding it from the browser
                'Authorization': `Bearer ${process.env.FLEXBOT_API_KEY}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`HackClub API responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        // Send the secure response back to your frontend
        res.status(200).json(data);

    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: 'Failed to communicate with AI provider.' });
    }
}
