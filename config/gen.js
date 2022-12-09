const { faker } = require("@faker-js/faker")
const { prisma } = require("./db")

const lengthGen = 50

function genRandomMember() {
	return {
		// id: faker.datatype.number({max: 100}),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		memberId: faker.phone.number('A#######'),
		nik: faker.random.numeric(20),
		occupation: faker.name.jobType(),
		telephone: faker.phone.number('+628########'),
		birthdate: new Date(`${faker.date.birthdate({mode: 'age', min: 20, max: 65})}`),
		address: {
			create: {
				street: faker.address.street(),
				district: faker.address.state(),
				city: faker.address.city(),
				desa: faker.address.city(),
				kecamatan: faker.address.city(),
				zipcode: faker.address.zipCodeByState("ID")
			}
		},
		createdAt: faker.date.past(50),
	};
}

async function main() {
	const member = await prisma.member.findMany()
	if (!member.length) {
		Array.from({ length: lengthGen}).forEach(async () => {
			await prisma.member.create({
				data: genRandomMember(),
			})
		})
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.log(e)
		await prisma.$disconnect()
		process.exit(1)
	})
