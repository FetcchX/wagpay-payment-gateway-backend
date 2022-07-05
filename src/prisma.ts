import { PrismaClient } from "@prisma/client";

class PrismaDB {
	prisma = new PrismaClient();
}

export default PrismaDB