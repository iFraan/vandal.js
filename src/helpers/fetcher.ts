import { exec } from "node:child_process";

const fetchWithCurl = (url: string) =>
    new Promise((resolve, reject) => {
        exec(`curl --max-time 5 --user-agent 'Chrome/121' --url ${url}`, (err, result) => {
            if (!result) {
                reject(err);
            }
            resolve(JSON.parse(result));
        });
    });

const fetchWithNode = (url: string) =>
    new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((json) => resolve(json))
            .catch((err) => reject(err));
    });

const fetchWithFlaresolverr = (url: string, { flaresolverrUrl }: { flaresolverrUrl: string }) => fetch(flaresolverrUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cmd: "request.get",
      url: url,
      maxTimeout: 60000,
    }),
}).then(async (res) => {
    if (res.ok) {
        const data = await res.json();
        const responseText = data.solution.response;
        
        let jsonContent = responseText;

        if (responseText.startsWith('<html>')) {
            // Extract content between <pre> tags
            const match = responseText.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
            if (match && match[1]) {
                jsonContent = match[1].trim();
            }
        }
        
        return JSON.parse(jsonContent);
    }
    throw new Error(res.statusText);
});

export const getFetcher = (options?: {  
    flaresolverrUrl?: string, 
    useCurl?: boolean 
  }) => {
    if (options?.flaresolverrUrl) {
      return (url: string) => fetchWithFlaresolverr(url, { flaresolverrUrl: options.flaresolverrUrl });
    }
    
    if (options?.useCurl) {
      return fetchWithCurl;
    }
    
    return fetchWithNode;
  };
  

