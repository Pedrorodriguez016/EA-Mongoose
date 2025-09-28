import mongoose from 'mongoose';
import { UserModel, IUser } from './user.js';
import { PostModel, IPost } from './post.js';

async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  await mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

  const user1:  IUser = {
    "name": 'Bill',
    "email": 'bill@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
  };
    const user33:  IUser = {
    "name": 'Pedro',
    "email": 'pedro@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
  };
   console.log("user33", user33); 
  const newUser2= new UserModel(user33);
  const user34: IUser = await newUser2.save();
  console.log("user34",user34);

  console.log("user1", user1); 
  const newUser= new UserModel(user1);
  const user2: IUser = await newUser.save();
  console.log("user2",user2);

  const post1: IPost = {
    title: 'Primer Post',
    body:'Este es el cuerpo del primer post',
    userid: user2._id! 
  }
   console.log("post1", post1); 
  const newPost= new PostModel(post1);
  const post2: IPost = await newPost.save();
  console.log("post",post2);

  const post3: IPost = {
    title: 'Segundo Post',
    body:'Este es el cuerpo del segundo post',
    userid: user34._id! 
  }
   console.log("post3", post3); 
  const newPost3= new PostModel(post3);
  const post4: IPost = await newPost3.save();
  console.log("post4",post4);

  const post5: IPost = {
    title: 'Tercer Post',
    body:'Este es el cuerpo del tercer post',
    userid: user34._id! 
  }
   console.log("post5", post5); 
  const newPost4= new PostModel(post5);
  const post6: IPost = await newPost4.save();
  console.log("post6",post6);
  
  // Ver un post por ID
  const postEncontrado: IPost | null = await PostModel.findById(post2._id);
  console.log("Post encontrado por ID:", postEncontrado);

  // Editar un post
  const postEditado: IPost | null = await PostModel.findByIdAndUpdate(
    post2._id,
    { title: "Título editado",},
    { new: true }
  );
  console.log("Post editado:", postEditado);

  // Listar todos los posts
  const posts = await PostModel.find();
  console.log("Todos los posts:", posts);

  // Borrar un post
  const postBorrado: IPost | null = await PostModel.findByIdAndDelete(post2._id);
  console.log("Post borrado:", postBorrado);

  // findById devuelve un objeto usando el _id.
  const user3: IUser | null = await UserModel.findById(user2._id);
  console.log("user3",user3);

  // findOne devuelve un objeto usando un filtro.
  const user4: IUser | null = await UserModel.findOne({name: 'Bill'});
  console.log("user4",user4);

  // Partial<IUser> Indica que el objeto puede tener solo algunos campos de IUser.
  // select('name email') solo devuelve name y email.
  // lean() devuelve un objeto plano de JS en lugar de un documento de Mongoose.
  const user5: Partial<IUser> | null  = await UserModel.findOne({ name: 'Bill' })
    .select('name email').lean();
  console.log("user5",user5);

  const users = await UserModel.find();
  console.log("Usuarios:", users);
  const postsPorUsuario = await PostModel.aggregate([
    {
      $group: {
        _id: "$userid",
        totalPosts: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "usuario"
      }
    }
  ]);
  console.log("Posts por usuario (aggregation):", JSON.stringify(postsPorUsuario, null, 2));
  await mongoose.disconnect();
  console.log('Desconectado de MongoDB');
}

main()

  