import { readdirSync, readFileSync } from "fs";
import { type NextRequest } from "next/server";
import path from "path";
const currentDirectory = __dirname;
function allJsonFiles(id: string) {
    // console.log(`_${category}.json`)
    const products: object[] = [];; // Use an array to store all products
    // Read all files in the directory
    const files = readdirSync(path.resolve(__dirname, '../../../../../public'));
    files.forEach(file => {
        if (path.extname(file) === '.json') { // Check if file is JSON
            // Read the JSON file
            const data = JSON.parse(readFileSync(path.resolve(__dirname, '../../../../../public', file), 'utf-8'));
            data.forEach((item: any) => {
                item.product_id === id && products.push(item)
            });
        }
    });
    if (products.length)
        return products[0]
    else
        return null
}
export const GET = (request: NextRequest) => {
    const params = request.nextUrl.searchParams
    const pd_id = params.get('pd_id')
    const pd_category = params.get('pd_category')
    if(!pd_category &&  pd_id)
        return Response.json(allJsonFiles(pd_id as string))
    try {
        const FileData = JSON.parse(readFileSync(path.resolve(__dirname, `../../../../../public/_${pd_category}.json`), 'utf-8'));
        const item = FileData.find((e: { product_id: string }) => e.product_id === pd_id);
        return Response.json(item)
    } catch {
        return Response.json(allJsonFiles(pd_id as string))
    }
}