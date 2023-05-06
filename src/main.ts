import { Page } from "./indexer/page.js";

const MAX_PAGES = 100;

let pageMap = new Map();
let queue: string[] = ["/wiki/Power_iteration"];

while (queue.length != 0) {
    let url = "https://en.wikipedia.org"+queue.pop();
    if (pageMap.get(url.replace("https://en.wikipedia.org", "")) != undefined) continue;
    
    console.log(url);
    const response = await fetch(url);
    const text = await response.text();
    let page = new Page(url, text);
    let links = page.getOutlinks();

    if (pageMap.get(url.replace("https://en.wikipedia.org", "")) == undefined) {
        pageMap.set(url.replace("https://en.wikipedia.org", ""), links);
        page.saveToDisk();
        queue = [...queue, ...links];
    }
}

console.log(pageMap);

