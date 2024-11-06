// src/swagger.ts
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API ELLY STORE',
    description: 'API documentation for the project',
  },
  host: 'localhost:3000', // Chỉnh cổng nếu cần
  schemes: ['http'],
};

const outputFile = './common/configs/swagger_output.json'; // File JSON lưu cấu hình Swagger
const endpointsFiles = ['./routes/index.ts']; // Đường dẫn tới file chứa các route chính

swaggerAutogen()(outputFile, endpointsFiles, doc);
