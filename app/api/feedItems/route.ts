import fs from "fs";
import path from "path";

const currentDirectory = __dirname;

function extractAllProducts() {
    try {
        const products: object[] = [];; // Use an array to store all products
        // Read all files in the directory
        const files = fs.readdirSync(path.resolve(__dirname, '../../../../../public'));
        // Loop through each file
        files.forEach(file => {
            if (path.extname(file) === '.json') { // Check if file is JSON
                // Read the JSON file
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../../public', file), 'utf-8'));
         
                data.forEach((item: any) => {
                    products.push(item);
                });
            }
        });
        return products;
    } catch (error) {
        console.error('Error extracting all products:', error);
        return { error: 'Internal Server Error' };
    }
}

function getRandomProduct() {
    const random: object[] = [];
    try {
        const products: object[] = extractAllProducts() as object[];


        if (products.length === 0) {
            return { error: 'No products found' };
        }
        for (let i = 0; i < 50; i++) {
            const randomIndex = Math.floor(Math.random() * products.length);
            random.push(products[randomIndex]);
        }
        return random;
    } catch (error) {
        console.error('Error getting random product:', error);
        return { error: 'Internal Server Error' };
    }
}

export const GET = () => {

    return Response.json(getRandomProduct());
};


