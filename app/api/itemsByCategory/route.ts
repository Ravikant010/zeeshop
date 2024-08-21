import fs from "fs";
import { type NextRequest } from "next/server";
import path from "path";
const currentDirectory =  path.join(process.cwd(), 'public')
function extractAllProducts(category: string) {
    console.log(category.toLowerCase())
    try {
        // console.log(`_${category}.json`)
        let products: object[] = [];; // Use an array to store all products
        // Read all files in the directory
        const files = fs.readdirSync(currentDirectory);
        files.forEach(file => {
            if (path.extname(file) === '.json') { // Check if file is JSON
                // Read the JSON file

                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../../public', file), 'utf-8'));
                if (file === `_${category.toLowerCase()}.json`) {
                    products = data
                 
                }
                else {
                    const brand = category
                    data.forEach((item: any) => {
                        item.brand === brand && products.push(item)
                    });
                    
                  
                }

            }
        })
        // data.forEach((item: any) => {
        //     item === `_${category}.json` && products.push(item);
        // });
        return products
    } catch (error) {
        console.error('Error extracting all products:', error);
        return { error: 'Internal Server Error' };
    }
}
export const GET = (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("category")
    console.log(query)
  
    //@ts-ignore
    return Response.json(extractAllProducts(query as string))
}