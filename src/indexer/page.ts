import fs from 'fs';

class Page {
    public url: string;
    public contents: string;

    constructor(url: string, contents: string) {
        this.url = url;
        this.contents = contents;
    }

    saveToDisk(): boolean {
        let tmpUrl = this.url.split("/");
        let filename = tmpUrl[tmpUrl.length - 1];
        if (fs.existsSync("./indexed/"+filename+".html")) return false; 
        fs.writeFileSync("./indexed/"+filename+".html", this.contents, "utf8");
        return true;
    }

    getOutlinks(): string[] {
        let matches = this.contents.match(/href="\/wiki[^"]*\"/gm);
        if (matches != null) {
            return matches
                .filter((mUrl: string) => 
                    !this.url.includes(mUrl) &&
                    !mUrl.includes("#") &&
                    !mUrl.includes(":")
                )
                .map((l: string) => l
                    .replace(/href=/g, "")
                    .replace(/"/g, "")
                    .replace(/\)/g, "")
                    .replace(/\(/g, "")
                ); 
        }
        return [];
    }
}

interface PageMap {
    [key: string]: string[];
}

export { Page, PageMap };
