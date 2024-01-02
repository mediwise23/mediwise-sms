import { Gender, PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
/* 
Database seeding happens in two ways with Prisma: manually with prisma db seed and automatically in prisma migrate dev and prisma migrate reset.

To seed the database, run the db seed CLI command:
$ npx prisma db seed

To reset the database and seed it using db push
$ npx prisma migrate reset --skip-seed
$ npx prisma db push    // push the schema to the database first
$ npx prisma generate  // (optional)
$ npx prisma db seed  // then you can seed the database

OR

$ npx prisma db push --force-reset
$ npx prisma db seed

*/
const password = bcrypt.hashSync("@Dev1234", 12);

// create user n times
const createUser = async ({ role }: { role: Role }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = await prisma.user.create({
    data: {
      isArchived: false,
      name: faker.person.firstName(),
      email: `${role}.${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      image: faker.image.avatar(),
      hashedPassword: password,
      role: Role[role as keyof typeof Role], // convert string to enum

      profile: {
        create: {
          firstname: firstName,
          lastname: lastName,
          middlename: faker.person.lastName(),
          gender: faker.helpers.enumValue(Gender),
          dateOfBirth: faker.date.between({
            from: "2000-01-01T00:00:00.000Z",
            to: "2005-01-01T00:00:00.000Z",
          }),
          homeNo: faker.location.buildingNumber(),
          street: faker.location.street(),
          barangay: faker.location.state(),
          city: faker.location.city(),
          contactNo: faker.phone.number(),
        },
      },
    },
  });

  return user;
};

async function main() {
  // admin
  await createUser({ role: "ADMIN" });

  // stock manager
  await createUser({ role: "STOCK_MANAGER" });

  // doctors
  await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      await createUser({ role: "DOCTOR" });
    })
  );

  // patients
  await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      await createUser({ role: "PATIENT" });
    })
  );

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
