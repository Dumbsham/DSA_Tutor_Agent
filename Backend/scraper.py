import httpx
from bs4 import BeautifulSoup

async def scrape_leetcode(url: str) -> dict:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    # Extract slug from URL: leetcode.com/problems/two-sum/ → two-sum
    slug = url.rstrip("/").split("/problems/")[-1].split("/")[0]
    
    api_url = f"https://leetcode.com/graphql"
    query = {
        "query": """
        query getQuestion($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                title
                content
                difficulty
            }
        }
        """,
        "variables": {"titleSlug": slug}
    }
    
    async with httpx.AsyncClient(headers=headers, timeout=15) as client:
        res = await client.post(api_url, json=query)
        data = res.json()
    
    question = data["data"]["question"]
    soup = BeautifulSoup(question["content"], "lxml")
    
    return {
        "title": question["title"],
        "description": soup.get_text(separator="\n").strip(),
        "difficulty": question["difficulty"]
    }


async def scrape_codeforces(url: str) -> dict:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    async with httpx.AsyncClient(headers=headers, timeout=15) as client:
        res = await client.get(url)
    
    soup = BeautifulSoup(res.text, "lxml")
    
    title = soup.select_one(".title").get_text(strip=True)
    
    statement = soup.select_one(".problem-statement")
    # Remove input/output spec divs, keep only problem body
    for tag in statement.select(".input-specification, .output-specification, .sample-tests"):
        tag.decompose()
    
    description = statement.get_text(separator="\n").strip()
    
    return {
        "title": title,
        "description": description,
        "difficulty": "N/A"
    }


async def scrape_problem(url: str) -> dict:
    if "leetcode.com" in url:
        return await scrape_leetcode(url)
    elif "codeforces.com" in url:
        return await scrape_codeforces(url)
    else:
        raise ValueError(f"Unsupported platform. Use LeetCode or Codeforces URLs.")