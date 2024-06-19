import fs from "fs";
import { type NextRequest } from "next/server";
import path from "path";

const currentDirectory = __dirname;

function extractAllProductsForBrand(brand:string) {
   
    try {
        // console.log(`_${category}.json`)
        const products: object[] = [];; // Use an array to store all products
        // Read all files in the directory
        const files = fs.readdirSync(path.resolve(__dirname, '../../../../../public'));

        
        files.forEach(file => {
         

            if (path.extname(file) === '.json') { // Check if file is JSON
                // Read the JSON file
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../../public', file), 'utf-8'));

                data.forEach((item: any) => {
                    item.brand === brand && products.push(item)
                });
            }
        });
   
        return products;
    } catch (error) {
        console.error('Error extracting all products:', error);
        return { error: 'Internal Server Error' };
    }
}


export const GET = (request: NextRequest)=>{
const searchParams = request.nextUrl.searchParams
const query = searchParams.get("brand")

//@ts-ignore
return  Response.json(extractAllProductsForBrand(query?.replace(/-/g, " ")  as string))
}