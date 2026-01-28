import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Image } from './images/image.entity';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'observer',
    entities: [User, Image],
    synchronize: true,
});

async function seed() {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);
    const imageRepository = AppDataSource.getRepository(Image);
    // Clear existing data
    await userRepository.clear();
    await imageRepository.clear();
    
    // Seed data
    const password = await bcrypt.hash('123456', 10);
    const users = [
        { username: 'manager', ipAddress: '172.20.1.23', password },
        { username: 'kjy', ipAddress: '172.20.1.22', password },
        { username: 'sjm', ipAddress: '172.20.1.19', password },
        { username: 'kdh', ipAddress: '172.20.1.16', password },
        { username: 'cjk', ipAddress: '172.20.1.17', password },
        { username: 'khs', ipAddress: '172.20.1.21', password },
        { username: 'sjw', ipAddress: '172.20.1.20', password },
        { username: 'rhg', ipAddress: '172.20.1.18', password },
    ];

    for (const user of users) {
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
    }
    
    console.log('Seeding completed!');
}

seed().catch((error) => console.log(error));
