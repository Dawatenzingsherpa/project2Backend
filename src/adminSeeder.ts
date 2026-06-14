import User from "./Database/models/userModel";
import bcrypt from 'bcrypt';

const adminSeeder = async()=>{
  const [data] = await User.findAll({
    where : {
      email : "p2admin@gmail.com"
    }
  })

  if(!data){
    await User.create({
      email : "p2admin@gmail.com",
      password : bcrypt.hashSync("p2password",8),
      role : 'admin',
      username : 'p2admin'
    });
    console.log("admin credentials seeded successfully");
  }else {
    console.log("admin credentials already seeded");
  }
}

export default adminSeeder