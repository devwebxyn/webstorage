// backend/src/database/schema.ts
import * as usersSchema from '../users/entities/user.entity';
import * as filesSchema from '../files/entities/file.entity';

// Gabungkan semua skema Anda di sini
const schema = {
  ...usersSchema,
  ...filesSchema,
};

export default schema;