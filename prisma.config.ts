export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'mysql://root:sumo@123@localhost:3306/gujrera_db'
    }
  }
}