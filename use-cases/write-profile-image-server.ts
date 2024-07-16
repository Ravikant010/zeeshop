// "ues server"

// // import bun from "bun"
// import fs from 'fs/promises'
// import path from 'path'
// const upload_dir = "../profile/profile"


// export async function writeProfileOnServer(profileBase64: string,image_name:string, user_name:string, ){
//     const buffer = Buffer.from(profileBase64, 'base64')
//      const filename = `${user_name}-${Date.now()}.png`
//     console.log(user_name, image_name)
//     const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
//     await fs.writeFile(filepath, buffer)
//     return `/uploads/${filename}`
//     // fs.mkdirSync(`${upload_dir}/${user_name}`, { recursive: true });
//     // fs.writeFile(`${upload_dir}/${image_name}`, profileBase64, () => {});
// } 